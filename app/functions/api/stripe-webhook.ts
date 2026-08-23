/**
 * Recebe eventos do Stripe (assinatura criada, cancelada, pagamento falhou...).
 *
 * Configure no Dashboard do Stripe: Developers → Webhooks → Add endpoint
 *   URL: https://<seu-dominio>/api/stripe-webhook
 *   Eventos: checkout.session.completed, customer.subscription.updated,
 *            customer.subscription.deleted, invoice.payment_failed
 *
 * Precisa de STRIPE_WEBHOOK_SECRET (o "signing secret" que o Stripe mostra ao
 * criar o endpoint) como variável de ambiente no Cloudflare Pages.
 *
 * ⚠️ Estado atual: valida a assinatura e responde 200, mas ainda NÃO persiste
 * o status da assinatura em banco — o Supabase ainda não está conectado ao
 * app (ver ROADMAP.md). Quando as credenciais chegarem, gravar aqui o evento
 * numa tabela `subscriptions` (family_id, plan, cycle, status, stripe_customer_id)
 * para o app parar de confiar só no localStorage para liberar conteúdo pago.
 */

interface Env {
  STRIPE_WEBHOOK_SECRET: string;
}

async function verifyStripeSignature(payload: string, header: string | null, secret: string): Promise<boolean> {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(',').map((pair) => {
      const [key, value] = pair.split('=');
      return [key, value];
    })
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  const signedPayload = `${timestamp}.${payload}`;
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return expected === signature;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Webhook não configurado (falta STRIPE_WEBHOOK_SECRET).', { status: 503 });
  }

  const payload = await request.text();
  const signatureHeader = request.headers.get('stripe-signature');
  const valid = await verifyStripeSignature(payload, signatureHeader, env.STRIPE_WEBHOOK_SECRET);

  if (!valid) {
    return new Response('Assinatura inválida.', { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: unknown } };

  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.payment_failed':
      // TODO: gravar no Supabase assim que estiver conectado (ver comentário acima).
      console.log(`[stripe-webhook] evento recebido: ${event.type}`);
      break;
    default:
      break;
  }

  return Response.json({ received: true });
};
