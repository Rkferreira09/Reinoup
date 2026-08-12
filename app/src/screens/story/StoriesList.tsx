import { Link } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Scene } from '../../components/illustrations/Scene';
import { STORIES_POR_TEMPORADA, isStoryUnlocked } from '../../content/stories';
import { SEASONS, SEASON_ORDER } from '../../content/seasons';
import { VALORES } from '../../content/valores';
import { useProgressStore } from '../../store/progressStore';

export function StoriesList() {
  const stories = useProgressStore((s) => s.stories);
  const completedIds = new Set(Object.keys(stories).filter((id) => stories[id]?.completed));

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-6">
      <TopBar title="Histórias" backTo="/app" />

      <div className="flex flex-col gap-8 px-4">
        {SEASON_ORDER.map((seasonId) => {
          const season = SEASONS[seasonId];
          const daTemporada = STORIES_POR_TEMPORADA[seasonId];
          if (daTemporada.length === 0) return null;

          return (
            <section key={seasonId} className="flex flex-col gap-4">
              <header>
                <h2 className="font-display text-xl font-bold text-navy">{season.title}</h2>
                <p className="text-sm font-semibold text-orange">{season.subtitle}</p>
              </header>

              {season.blocos.map((bloco) => {
                const doBloco = daTemporada.filter((s) => s.blocoId === bloco.id);
                if (doBloco.length === 0) return null;

                return (
                  <div key={bloco.id} className="flex flex-col gap-3">
                    {season.sequencial && (
                      <p className="font-display text-sm font-bold text-navy/60">
                        {bloco.title}
                        <span className="ml-2 font-sans text-xs font-semibold text-navy/40">
                          {doBloco.filter((s) => completedIds.has(s.id)).length}/{doBloco.length}
                        </span>
                      </p>
                    )}

                    {doBloco.map((story) => {
                      const progress = stories[story.id];
                      const pct = (progress?.chaptersCompleted ?? 0) / story.chapters.length;
                      const unlocked = isStoryUnlocked(story, completedIds);
                      const valor = VALORES[story.valor];

                      const card = (
                        <Card padded={false} className="overflow-hidden">
                          <div className="relative">
                            <Scene scene={story.cover} height={120} className="rounded-none" />
                            {!unlocked && (
                              <div className="absolute inset-0 flex items-center justify-center bg-navy/60">
                                <span className="text-3xl" aria-hidden>
                                  🔒
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <p className="font-display font-bold text-navy">
                                {season.sequencial && (
                                  <span className="mr-1 text-navy/40">{story.order}.</span>
                                )}
                                {story.title}
                              </p>
                              {progress?.completed && <span className="text-lg">✅</span>}
                            </div>
                            <p className="text-xs font-semibold text-navy/50">{story.reference}</p>
                            <p className="mt-1 text-sm text-navy/70">
                              {unlocked ? story.summary : 'Conclua a história anterior para abrir esta.'}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                                style={{ backgroundColor: valor.cor }}
                              >
                                {valor.icone} {valor.label}
                              </span>
                              {unlocked && (
                                <>
                                  <ProgressBar value={pct} height={8} />
                                  <span className="shrink-0 text-xs font-bold text-navy/60">
                                    {Math.round(pct * 100)}%
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Card>
                      );

                      return unlocked ? (
                        <Link key={story.id} to={`/app/historia/${story.id}`}>
                          {card}
                        </Link>
                      ) : (
                        <div key={story.id} aria-disabled className="opacity-70">
                          {card}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
