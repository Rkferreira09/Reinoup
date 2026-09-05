import { useEffect, useRef, useState } from 'react';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { STORIES } from '../../content/stories';
import { useRecorder } from '../../hooks/useRecorder';
import { useFamilyVoiceStore } from '../../store/familyVoiceStore';
import { getRecording } from '../../lib/family-voice-db';

/**
 * "Voz da Família" — o pai ou a mãe grava, uma vez, a própria voz lendo cada
 * capítulo. Depois, quando a criança abrir a história sozinha, pode ouvir a
 * narração com a voz de alguém de casa em vez do robô (TTS).
 *
 * O áudio nunca sai do aparelho onde foi gravado — fica só no IndexedDB
 * local, seguindo a mesma regra do `useRecorder` que a criança já usa para
 * gravar "Decorei!" no Versículo do Dia.
 */
export function VoiceRecordings() {
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(STORIES[0]?.id ?? null);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Voz da Família" backTo="/pais" />
      <div className="flex flex-col gap-4 px-4">
        <Card className="bg-orange-light/20">
          <p className="font-display font-bold text-navy">🎙️ Sua voz, a favorita dele</p>
          <p className="mt-1 text-sm text-navy/70">
            Grave a narração de um capítulo com a sua própria voz. Na próxima vez, seu filho pode ouvir você contando a
            história — mesmo sem você por perto.
          </p>
        </Card>

        <div className="flex flex-col gap-3">
          {STORIES.map((story) => (
            <Card key={story.id} padded={false} className="overflow-hidden">
              <button
                onClick={() => setExpandedStoryId((id) => (id === story.id ? null : story.id))}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="flex-1">
                  <span className="font-display block font-bold text-navy">{story.title}</span>
                  <span className="text-xs text-navy/50">{story.chapters.length} capítulos</span>
                </span>
                <span className="text-navy/40">{expandedStoryId === story.id ? '▾' : '▸'}</span>
              </button>
              {expandedStoryId === story.id && (
                <div className="flex flex-col gap-2 border-t border-navy/10 p-4 pt-3">
                  {story.chapters.map((chapter, i) => (
                    <ChapterRecorderRow key={chapter.id} storyId={story.id} chapterId={chapter.id} chapterTitle={chapter.title} chapterNumber={i + 1} />
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterRecorderRow({
  storyId,
  chapterId,
  chapterTitle,
  chapterNumber,
}: {
  storyId: string;
  chapterId: string;
  chapterTitle: string;
  chapterNumber: number;
}) {
  const { status, audioUrl, start, stop, reset, supported } = useRecorder();
  const hasRecording = useFamilyVoiceStore((s) => s.hasRecording(storyId, chapterId));
  const saveChapterRecording = useFamilyVoiceStore((s) => s.saveChapterRecording);
  const removeChapterRecording = useFamilyVoiceStore((s) => s.removeChapterRecording);
  const [savedAudioUrl, setSavedAudioUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (status !== 'recorded' || !audioUrl) return;
    let cancelled = false;
    setSaving(true);
    fetch(audioUrl)
      .then((r) => r.blob())
      .then((blob) => saveChapterRecording(storyId, chapterId, blob))
      .finally(() => {
        if (!cancelled) setSaving(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, audioUrl]);

  useEffect(() => {
    if (!hasRecording) {
      setSavedAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return;
    }
    let cancelled = false;
    getRecording(`${storyId}::${chapterId}`).then((blob) => {
      if (cancelled || !blob) return;
      setSavedAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRecording, storyId, chapterId, status]);

  useEffect(
    () => () => {
      if (savedAudioUrl) URL.revokeObjectURL(savedAudioUrl);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function handleDelete() {
    await removeChapterRecording(storyId, chapterId);
    reset();
  }

  if (!supported) {
    return (
      <div className="rounded-xl bg-navy/5 p-3 text-sm text-navy/60">
        Este aparelho não permite gravar áudio pelo navegador.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-navy/5 p-3">
      <div className="flex-1">
        <p className="text-sm font-bold text-navy">
          Cap. {chapterNumber} · {chapterTitle}
        </p>
        <p className="text-xs text-navy/50">
          {saving ? 'Salvando...' : hasRecording ? 'Narrado pela família ✓' : 'Ainda sem gravação'}
        </p>
        {hasRecording && savedAudioUrl && <audio ref={audioRef} controls src={savedAudioUrl} className="mt-2 h-8 w-full" />}
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        {status === 'recording' ? (
          <Button size="sm" variant="danger" onClick={stop}>
            ■ Parar
          </Button>
        ) : (
          <Button size="sm" variant={hasRecording ? 'secondary' : 'primary'} onClick={start}>
            🎙️ {hasRecording ? 'Regravar' : 'Gravar'}
          </Button>
        )}
        {hasRecording && status !== 'recording' && (
          <button onClick={handleDelete} className="text-xs font-semibold text-red-soft">
            Apagar
          </button>
        )}
      </div>
    </div>
  );
}
