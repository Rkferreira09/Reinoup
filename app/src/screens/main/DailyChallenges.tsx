import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useProgressStore } from '../../store/progressStore';
import { SHIELD_COST_COINS } from '../../lib/economy';

const TASK_ICONS: Record<string, string> = {
  'ouvir-historia': '📖',
  'acertar-quiz': '❤️',
  'decorar-versiculo': '📜',
};

export function DailyChallenges() {
  const navigate = useNavigate();
  const dailyChallenge = useProgressStore((s) => s.dailyChallenge);
  const streakDays = useProgressStore((s) => s.streakDays);
  const shieldsAvailable = useProgressStore((s) => s.shieldsAvailable);
  const coins = useProgressStore((s) => s.coins);
  const buyShield = useProgressStore((s) => s.buyShield);

  const allDone = dailyChallenge.tasks.every((t) => t.done);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Desafios diários" backTo="/app" />
      <div className="flex flex-col gap-4 px-4">
        <p className="text-center text-navy/70">Complete os desafios e ganhe moedas e XP!</p>

        {dailyChallenge.tasks.map((task) => (
          <Card key={task.id} className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${
                task.done ? 'bg-green-light' : 'bg-cream-dark'
              }`}
            >
              {task.done ? '✓' : TASK_ICONS[task.id]}
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-navy">{task.label}</p>
              <div className="mt-1 flex items-center gap-2">
                <ProgressBar value={task.progress / task.target} height={8} color={task.done ? 'var(--color-green)' : 'var(--color-orange)'} />
                <span className="shrink-0 text-xs font-bold text-navy/50">
                  {task.progress}/{task.target}
                </span>
              </div>
            </div>
          </Card>
        ))}

        <Card>
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="font-display text-xs font-bold uppercase text-navy/50">Sua ofensiva</p>
              <p className="mt-1 text-xl font-extrabold text-orange-dark">🔥 {streakDays} dias</p>
            </div>
            <div className="h-10 w-px bg-navy/10" />
            <div>
              <p className="font-display text-xs font-bold uppercase text-navy/50">Escudo</p>
              <p className="mt-1 text-xl font-extrabold text-navy">🛡️ {shieldsAvailable} disponível</p>
            </div>
          </div>
          {shieldsAvailable < 2 && (
            <button
              disabled={coins < SHIELD_COST_COINS}
              onClick={buyShield}
              className="mt-3 w-full rounded-xl bg-navy/5 py-2 text-sm font-bold text-navy disabled:opacity-40"
            >
              Comprar escudo extra ({SHIELD_COST_COINS} moedas)
            </button>
          )}
        </Card>

        <Button full size="lg" disabled={!allDone || dailyChallenge.chestOpened} onClick={() => navigate('/app/bau')}>
          {dailyChallenge.chestOpened ? 'Baú de hoje já aberto' : allDone ? 'Ver baú' : 'Complete os desafios para abrir o baú'}
        </Button>
      </div>
    </div>
  );
}
