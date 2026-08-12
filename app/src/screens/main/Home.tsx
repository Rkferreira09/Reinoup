import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { CoinBadge } from '../../components/ui/CoinBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { Mascot } from '../../components/mascot/Mascot';
import { Scene } from '../../components/illustrations/Scene';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useSettingsStore } from '../../store/settingsStore';
import { proximaHistoria } from '../../content/stories';
import { getVerseOfDay } from '../../content/verses';
import { getLevelProgress, levelTitle } from '../../content/levels';

export function Home() {
  const childProfile = useAuthStore((s) => s.childProfile);
  const coins = useProgressStore((s) => s.coins);
  const xp = useProgressStore((s) => s.xp);
  const stories = useProgressStore((s) => s.stories);
  const dailyChallenge = useProgressStore((s) => s.dailyChallenge);
  const contentToggles = useSettingsStore((s) => s.contentToggles);

  const level = getLevelProgress(xp);
  const verse = getVerseOfDay();

  const currentStory = proximaHistoria(new Set(Object.keys(stories).filter((id) => stories[id]?.completed)));
  const currentStoryProgress = stories[currentStory.id];
  const chaptersDone = currentStoryProgress?.chaptersCompleted ?? 0;
  const storyPct = chaptersDone / currentStory.chapters.length;

  const tasksDone = dailyChallenge.tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-4 safe-top">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mascot pose="feliz" size={52} animated={false} />
          <div>
            <p className="font-display text-lg font-extrabold text-navy">Olá, {childProfile?.name}!</p>
            <p className="text-xs font-semibold text-navy/60">
              Nível {level.level} · {levelTitle(level.level)}
            </p>
          </div>
        </div>
        <CoinBadge coins={coins} />
      </div>

      <div>
        <ProgressBar value={level.xpForNextLevel ? level.xpIntoLevel / level.xpForNextLevel : 0} />
        <p className="mt-1 text-right text-xs font-semibold text-navy/50">
          {level.xpIntoLevel}/{level.xpForNextLevel} XP
        </p>
      </div>

      {contentToggles.versiculoDoDia && (
        <Card className="relative overflow-hidden">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-orange-dark">Versículo do dia</p>
          <p className="font-display mt-2 text-xl font-bold leading-snug text-navy">"{verse.text['8-10']}"</p>
          <p className="mt-1 text-sm font-semibold text-navy/60">{verse.reference}</p>
          <Link to="/app/versiculo">
            <Button className="mt-4">Ver desafio</Button>
          </Link>
          <span className="pointer-events-none absolute -right-2 -top-2 text-6xl opacity-90">🦋</span>
        </Card>
      )}

      <div>
        <h2 className="font-display mb-2 text-lg font-bold text-navy">Continue sua jornada</h2>
        <div className="flex flex-col gap-3">
          {contentToggles.historias && (
            <Link to={`/app/historia/${currentStory.id}`}>
              <Card padded={false} className="flex items-center gap-3 overflow-hidden p-3">
                <Scene scene={currentStory.cover} height={56} width={56} className="shrink-0 rounded-xl" />
                <div className="flex-1">
                  <p className="font-display font-bold text-navy">História: {currentStory.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <ProgressBar value={storyPct} height={8} />
                    <span className="shrink-0 text-xs font-bold text-navy/60">{Math.round(storyPct * 100)}%</span>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {contentToggles.desafiosDiarios && (
            <Link to="/app/desafios">
              <Card className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-light/25 text-2xl">🔥</div>
                <div className="flex-1">
                  <p className="font-display font-bold text-navy">Desafios diários</p>
                  <div className="mt-1 flex items-center gap-2">
                    <ProgressBar value={tasksDone / dailyChallenge.tasks.length} height={8} color="var(--color-blue-sky)" />
                    <span className="shrink-0 text-xs font-bold text-navy/60">
                      {tasksDone}/{dailyChallenge.tasks.length}
                    </span>
                  </div>
                </div>
                <span className="text-xl">👑</span>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
