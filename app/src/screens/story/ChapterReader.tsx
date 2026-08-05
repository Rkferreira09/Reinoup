import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from '../../components/ui/TopBar';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ChoiceCard } from '../../components/ui/ChoiceCard';
import { SpeechBubble } from '../../components/mascot/SpeechBubble';
import { Scene } from '../../components/illustrations/Scene';
import { getStory } from '../../content/stories';
import { useProgressStore } from '../../store/progressStore';
import { useSpeech } from '../../hooks/useSpeech';

export function ChapterReader() {
  const { storyId, chapterIndex: chapterIndexParam } = useParams<{ storyId: string; chapterIndex: string }>();
  const navigate = useNavigate();
  const completeChapter = useProgressStore((s) => s.completeChapter);
  const recordChoice = useProgressStore((s) => s.recordChoice);
  const { speak, stop, speaking } = useSpeech();

  const story = storyId ? getStory(storyId) : undefined;
  const chapterIndex = Number(chapterIndexParam ?? 0);
  const chapter = story?.chapters[chapterIndex];

  const [pageIndex, setPageIndex] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const totalSteps = useMemo(() => (chapter ? chapter.pages.length + (chapter.choice ? 1 : 0) : 1), [chapter]);
  const atChoiceStep = chapter ? pageIndex === chapter.pages.length : false;

  if (!story || !chapter) return <Navigate to="/app/historias" replace />;

  const overallProgress = (chapterIndex + (pageIndex + 1) / totalSteps) / story.chapters.length;

  function goToNextChapterOrQuiz() {
    if (!story) return;
    completeChapter(story.id, chapterIndex, story.chapters.length);
    if (chapter?.choice && choiceIndex !== null) recordChoice(story.id, choiceIndex);
    stop();
    if (chapterIndex + 1 < story.chapters.length) {
      navigate(`/app/historia/${story.id}/capitulo/${chapterIndex + 1}`, { replace: true });
    } else {
      navigate(`/app/historia/${story.id}/quiz`, { replace: true });
    }
  }

  function handleNext() {
    stop();
    if (pageIndex + 1 < totalSteps) {
      setPageIndex((p) => p + 1);
    } else {
      goToNextChapterOrQuiz();
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title={story.title} backTo={`/app/historia/${story.id}`} right={<span className="text-lg">Aa</span>} />
      <div className="px-4">
        <ProgressBar value={overallProgress} color="var(--color-green)" />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-4">
        <AnimatePresence mode="wait">
          {!atChoiceStep ? (
            <motion.div key={`page-${pageIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
              <Scene scene={chapter.scene} height={220} />
              <h2 className="font-display text-center text-lg font-bold text-navy">{chapter.title}</h2>
              <p className="text-center text-lg leading-relaxed text-navy-deep">{chapter.pages[pageIndex]}</p>
            </motion.div>
          ) : (
            <motion.div key="choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
              <h2 className="font-display text-center text-lg font-bold text-navy">{chapter.choice!.question}</h2>
              <div className="flex flex-col gap-3">
                {chapter.choice!.options.map((opt, i) => (
                  <ChoiceCard
                    key={i}
                    selected={choiceIndex === i}
                    correct={opt.correct}
                    revealed={revealed && choiceIndex === i}
                    disabled={revealed}
                    onClick={() => {
                      setChoiceIndex(i);
                      setRevealed(true);
                    }}
                  >
                    {opt.text}
                  </ChoiceCard>
                ))}
              </div>
              {revealed && choiceIndex !== null && (
                <SpeechBubble pose={chapter.choice!.options[choiceIndex].correct ? 'comemorando' : 'pensando'} tone={chapter.choice!.options[choiceIndex].correct ? 'success' : 'neutral'}>
                  {chapter.choice!.options[choiceIndex].feedback}
                </SpeechBubble>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-navy/10 px-4 pt-4">
        {!atChoiceStep && (
          <button
            onClick={() => (speaking ? stop() : speak(chapter.pages[pageIndex]))}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange text-white shadow-[0_6px_0_0_var(--color-orange-dark)]"
            aria-label="Narrar"
          >
            {speaking ? '⏸️' : '▶️'}
          </button>
        )}
        {!atChoiceStep && <p className="flex-1 text-sm font-semibold text-navy/50">{speaking ? 'Narrando...' : 'Toque para ouvir'}</p>}
        <Button
          onClick={handleNext}
          disabled={atChoiceStep && (choiceIndex === null || !revealed)}
          className={atChoiceStep ? 'flex-1' : ''}
          icon={atChoiceStep ? undefined : undefined}
        >
          {atChoiceStep ? 'Continuar' : pageIndex + 1 >= totalSteps ? 'Concluir' : '→'}
        </Button>
      </div>
    </div>
  );
}
