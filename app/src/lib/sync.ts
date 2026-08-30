import { supabase, isSupabaseConfigured } from './supabase';
import { useAuthStore, type ChildProfile } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import type { ProgressState } from './progress-types';

/**
 * Sincronização local-first do progresso da criança.
 *
 * O app continua jogando offline: o zustand/persist é a fonte durante o uso, e
 * o servidor é o espelho. Sem isso, um pai que limpa o navegador perde tudo o
 * que o filho construiu — ofensiva, medalhas, trilha.
 *
 * Conflito resolve por `client_updated_at` (last-write-wins). É suficiente
 * porque uma criança raramente usa dois aparelhos ao mesmo tempo, e o custo de
 * errar é baixo: o pior caso é perder minutos de progresso, não a conta.
 */

/** Campos do estado que valem sincronizar — o resto é efêmero de UI. */
type EstadoSincronizado = Omit<ProgressState, 'toasts'>;

function estadoParaEnviar(): { estado: EstadoSincronizado; resumo: ResumoProgresso } {
  // A store carrega estado e ações juntos; só o estado interessa aqui. Os
  // `toasts` ficam de fora por serem efêmeros de UI.
  const { toasts: _toasts, ...estado } = useProgressStore.getState() as unknown as ProgressState;
  const limpo = estado as unknown as EstadoSincronizado;
  return {
    estado: limpo,
    resumo: {
      moedas: limpo.coins,
      xp: limpo.xp,
      ofensiva: limpo.streakDays,
      escudos: limpo.shieldsAvailable,
      ultima_atividade: limpo.lastActiveDate,
    },
  };
}

interface ResumoProgresso {
  moedas: number;
  xp: number;
  ofensiva: number;
  escudos: number;
  ultima_atividade: string | null;
}

/**
 * Garante que a criança tenha uma linha em `child_profiles` e devolve o id.
 *
 * Hoje o app tem um perfil por conta. Quando houver vários irmãos, este é o
 * ponto que muda: passa a receber qual perfil está ativo.
 */
export async function garantirPerfilDaCrianca(
  familyId: string,
  perfil: ChildProfile
): Promise<string | null> {
  if (!supabase) return null;

  const { data: existentes } = await supabase
    .from('child_profiles')
    .select('id')
    .eq('family_id', familyId)
    .limit(1);

  if (existentes?.length) return (existentes[0] as { id: string }).id;

  const { data, error } = await supabase
    .from('child_profiles')
    .insert({ family_id: familyId, apelido: perfil.name, faixa_etaria: perfil.ageBand })
    .select('id')
    .single();

  if (error) {
    console.error('[sync] não consegui criar o perfil da criança:', error.message);
    return null;
  }
  return (data as { id: string }).id;
}

/** Envia o estado local para o servidor. */
export async function enviarProgresso(childId: string): Promise<boolean> {
  if (!supabase) return false;

  const { estado, resumo } = estadoParaEnviar();

  const { error } = await supabase.from('child_progress').upsert(
    {
      child_id: childId,
      ...resumo,
      estado,
      client_updated_at: new Date().toISOString(),
    },
    { onConflict: 'child_id' }
  );

  if (error) {
    console.error('[sync] falha ao enviar progresso:', error.message);
    return false;
  }
  return true;
}

/**
 * Traz o progresso do servidor **se ele for mais novo** que o local.
 *
 * O `lastActiveDate` local é a referência: se o servidor tem algo mais
 * recente, é porque a criança jogou em outro aparelho. Empate fica com o
 * local, que é onde ela está agora.
 */
export async function baixarProgresso(childId: string): Promise<boolean> {
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('child_progress')
    .select('estado, client_updated_at')
    .eq('child_id', childId)
    .maybeSingle();

  if (error || !data) return false;

  const remoto = data as { estado: EstadoSincronizado | null; client_updated_at: string };
  if (!remoto.estado || Object.keys(remoto.estado).length === 0) return false;

  const localAtualizadoEm = localStorage.getItem('reinoup-sync-em');
  if (localAtualizadoEm && new Date(localAtualizadoEm) >= new Date(remoto.client_updated_at)) {
    return false;
  }

  useProgressStore.setState({ ...remoto.estado, toasts: [] });
  return true;
}

/**
 * Liga o sync: puxa o que houver e passa a empurrar quando o estado muda.
 *
 * O envio é debounced — a criança ganha moeda a cada toque, e uma escrita por
 * toque seria desperdício de rede e de cota do Supabase.
 */
export function iniciarSync(): () => void {
  const { familyId, childProfile } = useAuthStore.getState();

  if (!isSupabaseConfigured || !familyId || !childProfile) return () => {};

  let childId: string | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let vivo = true;

  const agendarEnvio = () => {
    if (!childId || !vivo) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (!childId) return;
      void enviarProgresso(childId).then((ok) => {
        if (ok) localStorage.setItem('reinoup-sync-em', new Date().toISOString());
      });
    }, 4000);
  };

  void garantirPerfilDaCrianca(familyId, childProfile).then(async (id) => {
    if (!vivo || !id) return;
    childId = id;
    await baixarProgresso(id);
    agendarEnvio();
  });

  const cancelarInscricao = useProgressStore.subscribe(agendarEnvio);

  // Fechar o app não pode perder os últimos toques.
  const aoSair = () => {
    if (childId) void enviarProgresso(childId);
  };
  window.addEventListener('pagehide', aoSair);

  return () => {
    vivo = false;
    if (timer) clearTimeout(timer);
    cancelarInscricao();
    window.removeEventListener('pagehide', aoSair);
  };
}
