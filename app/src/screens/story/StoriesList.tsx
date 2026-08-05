import { Link } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Scene } from '../../components/illustrations/Scene';
import { STORIES } from '../../content/stories';
import { useProgressStore } from '../../store/progressStore';

export function StoriesList() {
  const stories = useProgressStore((s) => s.stories);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-6">
      <TopBar title="Histórias" backTo="/app" />
      <div className="flex flex-col gap-4 px-4">
        {STORIES.map((story) => {
          const progress = stories[story.id];
          const pct = (progress?.chaptersCompleted ?? 0) / story.chapters.length;
          return (
            <Link key={story.id} to={`/app/historia/${story.id}`}>
              <Card padded={false} className="overflow-hidden">
                <Scene scene={story.cover} height={120} className="rounded-none" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-navy">{story.title}</p>
                    {progress?.completed && <span className="text-lg">✅</span>}
                  </div>
                  <p className="text-xs font-semibold text-navy/50">{story.reference}</p>
                  <p className="mt-1 text-sm text-navy/70">{story.summary}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <ProgressBar value={pct} height={8} />
                    <span className="shrink-0 text-xs font-bold text-navy/60">{Math.round(pct * 100)}%</span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
