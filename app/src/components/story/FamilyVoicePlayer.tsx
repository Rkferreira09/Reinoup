import { useEffect, useRef, useState } from 'react';
import { chapterRecordingKey, getRecording } from '../../lib/family-voice-db';

interface FamilyVoicePlayerProps {
  storyId: string;
  chapterId: string;
  /** Chamado quando a criança termina de ouvir a narração gravada pela família — usado para desbloquear a medalha. */
  onFinished?: () => void;
}

/**
 * Botão de reprodução da narração gravada pelos pais para este capítulo.
 * O áudio é buscado do IndexedDB local (nunca de um servidor).
 */
export function FamilyVoicePlayer({ storyId, chapterId, onFinished }: FamilyVoicePlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    getRecording(chapterRecordingKey(storyId, chapterId)).then((blob) => {
      if (cancelled || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setAudioUrl(objectUrl);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [storyId, chapterId]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  if (!audioUrl) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-orange-light/25 p-3">
      <button
        onClick={toggle}
        aria-label={playing ? 'Pausar voz da família' : 'Ouvir com a voz da família'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white shadow-[0_5px_0_0_var(--color-orange-dark)]"
      >
        {playing ? '⏸️' : '▶️'}
      </button>
      <p className="flex-1 text-sm font-bold text-navy">🎙️ Ouvir com a voz de casa</p>
      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          onFinished?.();
        }}
        className="hidden"
      />
    </div>
  );
}
