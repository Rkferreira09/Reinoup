/**
 * Recebe as notificações do PagBank sobre um pedido (PIX pago, expirado...).
 *
 * A URL é registrada em `notification_urls` na criação do pedido, então não há
 * nada a configurar no painel: aponta sozinho para
 * https://<dominio>/api/pagbank-webhook
 *
 * Autenticidade: o PagBank manda `x-authenticity-token`, que é o SHA-256 de
 * `{token}-{corpo cru}`. O corpo precisa ser o texto exato recebido — qualquer
 * reserialização muda o hash e derruba a verificação.
 *
 * Docs: https://developer.pagbank.com.br/reference/confirmar-autenticidade-da-notificacao
 */

import { lerReferencia, registrarAssinaturaPaga, type SupabaseEnv } from './_supabase';

interface Env extends SupabaseEnv {
  PAGBANK_TOKEN: string;
}

async function sha256Hex(texto: string): Promise<string> {
  const bytes = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Comparação em tempo constante, para não vazar o hash por timing. */
function iguaisSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diferenca === 0;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.PAGBANK_TOKEN) {
    return new Response('Webhook não configurado (falta PAGBANK_TOKEN).', { status: 503 });
  }

  const corpoCru = await request.text();
  const assinatura = request.headers.get('x-authenticity-token');

  if (!assinatura) {
    return new Response('Notificação sem x-authenticity-token.', { status: 400 });
  }

  const esperado = await sha256Hex(`${env.PAGBANK_TOKEN}-${corpoCru}`);
  if (!iguaisSeguro(esperado, assinatura.toLowerCase())) {
    // Não é do PagBank, ou o corpo foi alterado no caminho.
    return new Response('Assinatura inválida.', { status: 401 });
  }

  let evento: {
    id?: string;
    reference_id?: string;
    charges?: { status?: string; paid_at?: string; amount?: { value?: number } }[];
  };
  try {
    evento = JSON.parse(corpoCru);
  } catch {
    return new Response('Corpo inválido.', { status: 400 });
  }

  const cobranca = evento.charges?.[0];
  const status = cobranca?.status ?? 'SEM_COBRANCA';

  console.log(
    `[pagbank-webhook] pedido=${evento.id} ref=${evento.reference_id} status=${status} origem=${request.headers.get('x-product-origin')}`
  );

  if (status === 'PAID' && evento.reference_id) {
    const dados = lerReferencia(evento.reference_id);

    if (!dados) {
      // Pedido criado fora do nosso fluxo, ou formato mudou. Não é erro do
      // PagBank: responder 200 evita reenvio infinito de algo insalvável.
      console.error(`[pagbank-webhook] reference_id fora do padrão: ${evento.reference_id}`);
    } else {
      const resultado = await registrarAssinaturaPaga(env, {
        provedor: 'pagbank',
        referencia: evento.reference_id,
        provedorId: evento.id,
        plano: dados.plano,
        ciclo: dados.ciclo,
        valorCentavos: cobranca?.amount?.value ?? 0,
        // TODO: amarrar à família. Hoje o pedido é criado sem sessão do pai,
        // então a linha nasce com family_id nulo e a vinculação é manual.
        // Some quando o login do responsável (Supabase Auth) estiver ligado.
        familyId: null,
      });

      if (resultado.ok) {
        console.log(`[pagbank-webhook] assinatura registrada: ${dados.plano}/${dados.ciclo}`);
      } else {
        // 500 faz o PagBank reenviar — é o que queremos se o banco caiu.
        console.error(`[pagbank-webhook] falhou ao gravar: ${resultado.detalhe}`);
        return new Response('Falha ao registrar assinatura.', { status: 500 });
      }
    }
  }

  // 200 sempre que a assinatura confere: o PagBank reenvia o que não for 2xx.
  return new Response('ok', { status: 200 });
};
