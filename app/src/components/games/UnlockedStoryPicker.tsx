import { Card } from '../ui/Card';
import { Scene } from '../illustrations/Scene';
import { STORIES } from '../../content/stories';
import { useProgressStore } from '../../store/progressStore';

interface UnlockedStoryPickerProps {
  onPick: (storyId: string) => void;
}

export function UnlockedStoryPicker({ onPick }: UnlockedStoryPickerProps) {
  const stories = useProgressStore((s) => s.stories);
  const unlocked = STORIES.filter((s) => stories[s.id]?.completed);

  if (unlocked.length === 0) {
    return (
      <div className="px-4">
        <Card className="text-center text-navy/60">
          Conclua uma história para desbloquear este jogo! Ele é a recompensa depois de aprender. 📖
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4">
      <p className="text-center text-sm font-semibold text-navy/60">Escolha uma história para jogar</p>
      {unlocked.map((story) => (
        <button key={story.id} onClick={() => onPick(story.id)} className="text-left">
          <Card padded={false} className="flex items-center gap-3 overflow-hidden">
            <Scene scene={story.cover} height={64} width={80} className="shrink-0 rounded-none rounded-l-[var(--radius-card)]" />
            <p className="font-display font-bold text-navy">{story.title}</p>
          </Card>
        </button>
      ))}
    </div>
  );
}
