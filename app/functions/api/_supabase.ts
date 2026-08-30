/**
 * Gravação de assinaturas a partir dos webhooks de pagamento.
 *
 * Usa PostgREST direto, sem o supabase-js: a Function precisa de uma única
 * chamada HTTP e a biblioteca inteira não se paga no bundle da Edge.
 *
 * Escreve com a `service_role`, que passa por cima do RLS — é o único jeito,
 * porque o webhook não tem sessão de usuário. Por isso essa chave **nunca**
 * pode ir para o cliente: ela lê e escreve qualquer linha de qualquer família.
 */

export interface SupabaseEnv {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
}

export type Provedor = 'stripe' | 'pagbank';
export type PlanoId = 'essencial' | 'completo' | 'familia';
export type Ciclo = 'mensal' | 'anual';

export interface AssinaturaPaga {
  provedor: Provedor;
  /** reference_id (PagBank) ou session id (Stripe) — chave da idempotência. */
  referencia: string;
  provedorId?: string;
  plano: PlanoId;
  ciclo: Ciclo;
  valorCentavos: number;
  /** Null quando ainda não sabemos de qual família é o pagamento. */
  familyId?: string | null;
}

export function supabaseConfigurado(env: SupabaseEnv): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Fim do acesso: 1 mês ou 1 ano a partir do pagamento. */
function vigenteAte(ciclo: Ciclo, desde: Date): string {
  const fim = new Date(desde);
  if (ciclo === 'anual') fim.setFullYear(fim.getFullYear() + 1);
  else fim.setMonth(fim.getMonth() + 1);
  return fim.toISOString();
}

/**
 * Registra a assinatura como ativa.
 *
 * Faz upsert em (provedor, referencia) — o índice único existe justamente
 * para isso: PagBank e Stripe reenviam a notificação até receber 2xx, e o
 * mesmo pagamento não pode virar duas assinaturas.
 */
export async function registrarAssinaturaPaga(
  env: SupabaseEnv,
  dados: AssinaturaPaga
): Promise<{ ok: boolean; detalhe?: string }> {
  if (!supabaseConfigurado(env)) {
    return { ok: false, detalhe: 'Supabase não configurado (falta SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY).' };
  }

  const agora = new Date();
  const linha = {
    family_id: dados.familyId ?? null,
    plano: dados.plano,
    ciclo: dados.ciclo,
    status: 'ativa',
    provedor: dados.provedor,
    referencia: dados.referencia,
    provedor_id: dados.provedorId ?? null,
    valor_centavos: dados.valorCentavos,
    pago_em: agora.toISOString(),
    vigente_ate: vigenteAte(dados.ciclo, agora),
  };

  const resposta = await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions?on_conflict=provedor,referencia`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(linha),
  });

  if (!resposta.ok) {
    return { ok: false, detalhe: `PostgREST ${resposta.status}: ${await resposta.text()}` };
  }
  return { ok: true };
}

/**
 * Lê plano e ciclo de um reference_id no formato que criamos em
 * pagbank-criar-pedido.ts: `reinoup-<plano>-<ciclo>-<timestamp>`.
 */
export function lerReferencia(referencia: string): { plano: PlanoId; ciclo: Ciclo } | null {
  const partes = referencia.split('-');
  const plano = partes[1];
  const ciclo = partes[2];
  const planoValido = plano === 'essencial' || plano === 'completo' || plano === 'familia';
  const cicloValido = ciclo === 'mensal' || ciclo === 'anual';
  return planoValido && cicloValido ? { plano, ciclo } : null;
}
