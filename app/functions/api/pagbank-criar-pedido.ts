/**
 * Cria um pedido no PagBank com QR Code PIX para uma assinatura do ReinoUp.
 *
 * Roda como Cloudflare Pages Function, no mesmo padrão da integração Stripe.
 * Precisa de PAGBANK_TOKEN configurado como variável de ambiente.
 *
 * Por que PIX e não cartão recorrente: no Brasil o PIX é o meio que o pai usa,
 * cai na hora e não tem taxa de cartão. A contrapartida está documentada no
 * fim deste arquivo — a API de Pedidos é pagamento avulso, não assinatura.
 *
 * Docs: https://developer.pagbank.com.br/reference/criar-pedido
 */

interface Env {
  PAGBANK_TOKEN: string;
  /** 'sandbox' (padrão) ou 'production'. */
  PAGBANK_ENV?: string;
}

type PlanId = 'essencial' | 'completo' | 'familia';
type Cycle = 'mensal' | 'anual';

const PLAN_PRICES: Record<PlanId, { name: string; monthlyPrice: number }> = {
  essencial: { name: 'ReinoUp Essencial', monthlyPrice: 10.9 },
  completo: { name: 'ReinoUp Completo', monthlyPrice: 19.9 },
  familia: { name: 'ReinoUp Família', monthlyPrice: 29.9 },
};

const ANNUAL_DISCOUNT = 0.2;

/** O QR Code expira em 30 min — tempo de sobra sem deixar cobrança pendurada. */
const MINUTOS_ATE_EXPIRAR = 30;

const isPlanId = (v: unknown): v is PlanId => v === 'essencial' || v === 'completo' || v === 'familia';
const isCycle = (v: unknown): v is Cycle => v === 'mensal' || v === 'anual';

/** CPF sem máscara, 11 dígitos — o PagBank exige `tax_id` para emitir PIX. */
function limparCpf(valor: unknown): string | null {
  if (typeof valor !== 'string') return null;
  const digitos = valor.replace(/\D/g, '');
  return digitos.length === 11 ? digitos : null;
}

function baseUrl(env: Env): string {
  return env.PAGBANK_ENV === 'production'
    ? 'https://api.pagseguro.com'
    : 'https://sandbox.api.pagseguro.com';
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.PAGBANK_TOKEN) {
    return Response.json(
      { error: 'Pagamento via PagBank não configurado neste ambiente (falta PAGBANK_TOKEN).' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  const { planId, cycle, nome, email, cpf, familyId } = (body ?? {}) as Record<string, unknown>;

  if (!isPlanId(planId) || !isCycle(cycle)) {
    return Response.json({ error: 'planId ou cycle inválido.' }, { status: 400 });
  }
  if (typeof nome !== 'string' || nome.trim().length < 3) {
    return Response.json({ error: 'Informe o nome completo do responsável.' }, { status: 400 });
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return Response.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }
  const taxId = limparCpf(cpf);
  if (!taxId) {
    return Response.json({ error: 'Informe um CPF válido (11 dígitos).' }, { status: 400 });
  }

  const plan = PLAN_PRICES[planId];
  const origin = new URL(request.url).origin;

  // Valor em centavos. Anual = 12 meses com 20% de desconto.
  const centavos =
    cycle === 'anual'
      ? Math.round(plan.monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT) * 100)
      : Math.round(plan.monthlyPrice * 100);

  const expiraEm = new Date(Date.now() + MINUTOS_ATE_EXPIRAR * 60_000).toISOString();
  // O familyId viaja no reference_id para o webhook saber de quem é o pagamento.
  // Sem conta remota vai 'anon' e a vinculação fica manual.
  //
  // Ele fica por ÚLTIMO de propósito: é um UUID e tem hífen dentro, então quem
  // lê precisa juntar o resto — ver `lerReferencia` em _supabase.ts.
  const familia = typeof familyId === 'string' && familyId.length > 0 ? familyId : 'anon';
  const referenceId = `reinoup-${planId}-${cycle}-${Date.now()}-${familia}`;

  const pedido = {
    reference_id: referenceId,
    customer: { name: nome.trim(), email: email.trim(), tax_id: taxId },
    items: [
      {
        reference_id: `${planId}-${cycle}`,
        name: `${plan.name} (${cycle})`,
        quantity: 1,
        unit_amount: centavos,
      },
    ],
    qr_codes: [{ amount: { value: centavos }, expiration_date: expiraEm }],
    notification_urls: [`${origin}/api/pagbank-webhook`],
  };

  const resposta = await fetch(`${baseUrl(env)}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.PAGBANK_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });

  const dados = await resposta.json<{
    id?: string;
    qr_codes?: { id: string; text: string; links?: { rel: string; href: string; media?: string }[] }[];
    error_messages?: { description?: string; parameter_name?: string }[];
  }>();

  if (!resposta.ok || !dados.qr_codes?.length) {
    const detalhe = dados.error_messages?.[0];
    return Response.json(
      {
        error: detalhe?.description
          ? `PagBank recusou o pedido: ${detalhe.description}${detalhe.parameter_name ? ` (${detalhe.parameter_name})` : ''}`
          : 'Não foi possível gerar o PIX.',
      },
      { status: 502 }
    );
  }

  const qr = dados.qr_codes[0];
  const imagem = qr.links?.find((l) => l.media === 'image/png')?.href ?? null;

  return Response.json({
    orderId: dados.id,
    referenceId,
    // "Copia e cola" — é o que o pai realmente usa no app do banco.
    copiaECola: qr.text,
    imagemQrCode: imagem,
    expiraEm,
    valorCentavos: centavos,
  });
};

/**
 * ⚠️ LIMITE CONHECIDO — isto é pagamento avulso, não assinatura.
 *
 * A API de Pedidos gera uma cobrança única. O pai paga o mês (ou o ano) e
 * pronto: não há renovação automática. Para recorrência de verdade é preciso
 * a API de Assinaturas do PagBank (`/plans` + `/subscriptions`), que exige
 * cadastrar planos e tokenizar cartão.
 *
 * Para os primeiros pais pagantes, avulso resolve e é o caminho mais curto até
 * a primeira venda. Antes de escalar, migrar para Assinaturas:
 * https://developer.pagbank.com.br/reference/criar-assinatura
 */

