import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { useSettingsStore } from '../store/settingsStore';
import { useAuthStore } from '../store/authStore';

/**
 * Quem tem plano ativo — e quem não tem.
 *
 * A fonte da verdade é o banco. O `settingsStore.plan` fica como espelho para
 * a UI não piscar, mas ele mora no localStorage: sozinho, qualquer um "assina"
 * editando o navegador. Por isso, quando há sessão, o servidor manda.
 *
 * O RLS já filtra por família — a consulta não precisa (nem deve) passar
 * `family_id`: o pai só enxerga as próprias assinaturas.
 */

export type Plano = 'essencial' | 'completo' | 'familia';

export interface EstadoAssinatura {
  plano: Plano | null;
  /** 'servidor' quando veio do banco; 'local' quando é só o espelho. */
  origem: 'servidor' | 'local';
  carregando: boolean;
}

export async function buscarPlanoAtivo(): Promise<Plano | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('plano, vigente_ate')
    .eq('status', 'ativa')
    .order('vigente_ate', { ascending: false, nullsFirst: true })
    .limit(1);

  if (error || !data?.length) return null;

  const assinatura = data[0] as { plano: Plano; vigente_ate: string | null };

  // `vigente_ate` nulo = sem prazo. No PIX avulso ele sempre vem preenchido,
  // e é o que corta o acesso quando o mês acaba.
  if (assinatura.vigente_ate && new Date(assinatura.vigente_ate) < new Date()) return null;

  return assinatura.plano;
}

export function useAssinatura(): EstadoAssinatura {
  const planoLocal = useSettingsStore((s) => s.plan);
  const subscribe = useSettingsStore((s) => s.subscribe);
  const billingCycle = useSettingsStore((s) => s.billingCycle);
  const familyId = useAuthStore((s) => s.familyId);

  const [estado, setEstado] = useState<EstadoAssinatura>({
    plano: planoLocal,
    origem: 'local',
    carregando: isSupabaseConfigured && Boolean(familyId),
  });

  useEffect(() => {
    if (!isSupabaseConfigured || !familyId) {
      setEstado({ plano: planoLocal, origem: 'local', carregando: false });
      return;
    }

    let ativo = true;
    void buscarPlanoAtivo().then((planoServidor) => {
      if (!ativo) return;
      setEstado({ plano: planoServidor, origem: 'servidor', carregando: false });
      // Espelha para a UI abrir rápido na próxima vez.
      if (planoServidor && planoServidor !== planoLocal) {
        subscribe(planoServidor, billingCycle ?? 'mensal');
      }
    });

    return () => {
      ativo = false;
    };
  }, [familyId, planoLocal, subscribe, billingCycle]);

  return estado;
}

/** Recursos que exigem plano pago acima do Essencial. */
export function planoCobre(plano: Plano | null, recurso: 'relatorios' | 'jogos' | 'missoes'): boolean {
  if (!plano) return false;
  if (recurso === 'relatorios' || recurso === 'missoes' || recurso === 'jogos') {
    return plano === 'completo' || plano === 'familia';
  }
  return true;
}
