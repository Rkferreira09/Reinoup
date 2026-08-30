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

interface Env {
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

  if (status === 'PAID') {
    // TODO(assinatura): liberar o plano para a família.
    //
    // Depende da tabela `subscriptions` no Supabase, que ainda não existe.
    // O `reference_id` foi montado como `reinoup-<plano>-<ciclo>-<timestamp>`
    // em pagbank-criar-pedido.ts, então dá para extrair plano e ciclo daqui.
    //
    // Enquanto isso, um PIX pago NÃO libera nada no app automaticamente —
    // a liberação é manual. Não anuncie cobrança automática antes disso.
    console.log(`[pagbank-webhook] PAGAMENTO CONFIRMADO — liberar plano de ${evento.reference_id}`);
  }

  // 200 sempre que a assinatura confere: o PagBank reenvia o que não for 2xx.
  return new Response('ok', { status: 200 });
};
