/**
 * Cria uma sessão do Stripe Checkout para uma assinatura do ReinoUp.
 *
 * Roda como Cloudflare Pages Function (mesma infra que já publica o app —
 * nenhum servidor novo). Precisa de STRIPE_SECRET_KEY configurada como
 * variável de ambiente no painel do Cloudflare Pages (Settings → Environment
 * variables), nunca commitada no repo.
 *
 * Usa `price_data` inline (preço criado na hora da sessão) em vez de Price IDs
 * pré-cadastrados no Stripe — assim não é preciso configurar produtos no
 * Dashboard do Stripe antes de vender. Se algum dia quiserem relatórios nativos
 * do Stripe por produto, é só migrar para Price IDs fixos aqui.
 *
 * Espelha os planos de app/src/content/plans.ts — mantenha os dois em sync.
 */

interface Env {
  STRIPE_SECRET_KEY: string;
}

type PlanId = 'essencial' | 'completo' | 'familia';
type Cycle = 'mensal' | 'anual';

const PLAN_PRICES: Record<PlanId, { name: string; monthlyPrice: number }> = {
  essencial: { name: 'ReinoUp Essencial', monthlyPrice: 10.9 },
  completo: { name: 'ReinoUp Completo', monthlyPrice: 19.9 },
  familia: { name: 'ReinoUp Família', monthlyPrice: 29.9 },
};

const ANNUAL_DISCOUNT = 0.2;

function isPlanId(value: unknown): value is PlanId {
  return value === 'essencial' || value === 'completo' || value === 'familia';
}

function isCycle(value: unknown): value is Cycle {
  return value === 'mensal' || value === 'anual';
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: 'Pagamento ainda não configurado neste ambiente (falta STRIPE_SECRET_KEY).' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  const { planId, cycle, familyId } = (body ?? {}) as { planId?: unknown; cycle?: unknown; familyId?: unknown };
  if (!isPlanId(planId) || !isCycle(cycle)) {
    return Response.json({ error: 'planId ou cycle inválido.' }, { status: 400 });
  }

  const plan = PLAN_PRICES[planId];
  const origin = new URL(request.url).origin;

  const unitAmountCents =
    cycle === 'anual'
      ? Math.round(plan.monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT) * 100)
      : Math.round(plan.monthlyPrice * 100);
  const interval = cycle === 'anual' ? 'year' : 'month';

  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('success_url', `${origin}/app/planos?status=success&plan=${planId}&cycle=${cycle}`);
  params.set('cancel_url', `${origin}/app/planos?status=cancelled`);
  params.set('line_items[0][quantity]', '1');
  params.set('line_items[0][price_data][currency]', 'brl');
  params.set('line_items[0][price_data][unit_amount]', String(unitAmountCents));
  params.set('line_items[0][price_data][recurring][interval]', interval);
  params.set('line_items[0][price_data][product_data][name]', `${plan.name} (${cycle})`);
  params.set('metadata[planId]', planId);
  params.set('metadata[cycle]', cycle);
  // O webhook le isso para saber de qual familia e a assinatura.
  if (typeof familyId === 'string' && familyId.length > 0) {
    params.set('metadata[familyId]', familyId);
  }

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await stripeResponse.json<{ url?: string; error?: { message: string } }>();

  if (!stripeResponse.ok || !data.url) {
    return Response.json(
      { error: data.error?.message ?? 'Não foi possível criar a sessão de pagamento.' },
      { status: 502 }
    );
  }

  return Response.json({ url: data.url });
};

