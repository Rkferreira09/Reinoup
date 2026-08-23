import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { SpeechBubble } from '../../components/mascot/SpeechBubble';
import { MISSIONS } from '../../content/missions';
import { useProgressStore } from '../../store/progressStore';
import { getDerivedMissionProgress } from '../../lib/missions-engine';

const MISSION_ICON: Record<string, string> = { trilha: '🚪', tematica: '🛡️', colecao: '🧩' };
const MISSION_ROUTE: Record<string, string> = {
  'trilha-discipulos': '/app/missoes/discipulos',
  'tematica-coragem': '/app/historias',
  'colecao-amor': '/app/estante-versiculos',
};

export function Missions() {
  const navigate = useNavigate();
  const progress = useProgressStore((s) => s);
  const startVidaRealMission = useProgressStore((s) => s.startVidaRealMission);

  const bigMissions = MISSIONS.filter((m) => m.kind !== 'vida-real');
  const vidaReal = MISSIONS.filter((m) => m.kind === 'vida-real');

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Missões" backTo="/app" />
      <div className="flex flex-col gap-4 px-4">
        <SpeechBubble pose="pensando" tone="info">
          Qual missão vamos descobrir primeiro?
        </SpeechBubble>
        {bigMissions.map((m) => {
          const current = getDerivedMissionProgress(m.id, progress);
          return (
            <button key={m.id} onClick={() => navigate(MISSION_ROUTE[m.id] ?? '/app')} className="text-left">
              <Card className="bg-gradient-to-br from-navy-light to-navy-deep text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                      {m.kind === 'trilha' ? 'Missão da Trilha' : m.kind === 'tematica' ? 'Missão Temática' : 'Missão de Coleção'}
                    </p>
                    <p className="font-display text-lg font-bold">{m.title}</p>
                    <p className="text-sm text-white/70">{m.subtitle}</p>
                  </div>
                  <span className="text-2xl">{MISSION_ICON[m.kind]}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <ProgressBar value={current / m.target} color="var(--color-orange)" trackColor="rgba(255,255,255,0.15)" />
                  <span className="shrink-0 text-xs font-bold">
                    {Math.min(current, m.target)}/{m.target}
                  </span>
                </div>
              </Card>
            </button>
          );
        })}

        <h2 className="font-display mt-2 text-lg font-bold text-navy">Missões da vida real</h2>
        {vidaReal.map((m) => {
          const state = progress.missions[m.id];
          return (
            <Card key={m.id} className="flex items-center gap-3">
              <span className="text-2xl">💛</span>
              <div className="flex-1">
                <p className="font-display font-bold text-navy">{m.title}</p>
                <p className="text-sm text-navy/60">{m.subtitle}</p>
              </div>
              {state?.completed ? (
                <span className="shrink-0 rounded-full bg-green-light px-3 py-1 text-xs font-bold text-green-dark">Concluída</span>
              ) : state?.pendingParentConfirm ? (
                <span className="shrink-0 rounded-full bg-orange-light/40 px-3 py-1 text-xs font-bold text-orange-dark">Aguardando pais</span>
              ) : (
                <Button size="sm" onClick={() => startVidaRealMission(m.id)}>
                  Marquei!
                </Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
