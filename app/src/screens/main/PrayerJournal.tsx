import { useEffect, useRef, useState } from 'react';
import { TopBar } from '../../components/ui/TopBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SpeechBubble } from '../../components/mascot/SpeechBubble';
import { useRecorder } from '../../hooks/useRecorder';
import { usePrayerStore, getPrayerAudio, prayerAudioKey, type PrayerEntry } from '../../store/prayerStore';

export function PrayerJournal() {
  const entries = usePrayerStore((s) => s.entries);
  const addPrayer = usePrayerStore((s) => s.addPrayer);
  const markAnswered = usePrayerStore((s) => s.markAnswered);

  const [label, setLabel] = useState('');
  const [saving, setSaving] = useState(false);
  const { status, audioUrl, start, stop, reset, supported } = useRecorder();

  async function handleSave() {
    if (!label.trim() && status !== 'recorded') return;
    setSaving(true);
    try {
      let blob: Blob | undefined;
      if (status === 'recorded' && audioUrl) {
        blob = await fetch(audioUrl).then((r) => r.blob());
      }
      await addPrayer(label.trim() || 'Meu pedido', blob);
      setLabel('');
      reset();
    } finally {
      setSaving(false);
    }
  }

  const pending = entries.filter((e) => !e.answered);
  const answered = entries.filter((e) => e.answered);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Diário de Orações" backTo="/app/perfil" />
      <div className="flex flex-col gap-4 px-4">
        <SpeechBubble pose="feliz" tone="info">
          O que você quer pedir para Deus hoje?
        </SpeechBubble>

        <Card className="flex flex-col gap-3">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Escreva seu pedido (ou grave sua voz)"
            className="rounded-xl border-2 border-navy/10 px-4 py-3 text-navy outline-none focus:border-orange"
          />
          {supported && (
            <div className="flex items-center gap-3">
              {status === 'recording' ? (
                <Button size="sm" variant="danger" onClick={stop}>
                  ■ Parar
                </Button>
              ) : (
                <Button size="sm" variant="secondary" onClick={start}>
                  🎙️ {status === 'recorded' ? 'Regravar' : 'Gravar meu pedido'}
                </Button>
              )}
              {status === 'recorded' && <span className="text-sm font-semibold text-green-dark">Gravado ✓</span>}
            </div>
          )}
          <Button full onClick={handleSave} disabled={saving || (!label.trim() && status !== 'recorded')}>
            {saving ? 'Salvando...' : 'Guardar pedido'}
          </Button>
        </Card>

        {pending.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-display font-bold text-navy">Meus pedidos</p>
            {pending.map((entry) => (
              <PrayerCard key={entry.id} entry={entry} onMarkAnswered={() => markAnswered(entry.id)} />
            ))}
          </div>
        )}

        {answered.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-display font-bold text-navy">Deus respondeu! 🙌</p>
            {answered.map((entry) => (
              <PrayerCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        {entries.length === 0 && <p className="text-center text-sm text-navy/50">Você ainda não guardou nenhum pedido de oração.</p>}
      </div>
    </div>
  );
}

function PrayerCard({ entry, onMarkAnswered }: { entry: PrayerEntry; onMarkAnswered?: () => void }) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!entry.hasAudio) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    getPrayerAudio(prayerAudioKey(entry.id)).then((blob) => {
      if (cancelled || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setAudioSrc(objectUrl);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [entry.hasAudio, entry.id]);

  return (
    <Card className={`flex items-center gap-3 ${entry.answered ? 'bg-green-light/30' : ''}`}>
      <span className="text-2xl">{entry.answered ? '🙏✨' : '🙏'}</span>
      <div className="flex-1">
        <p className="font-semibold text-navy">{entry.label}</p>
        {audioSrc && <audio ref={audioRef} controls src={audioSrc} className="mt-1 h-8 w-full" />}
      </div>
      {onMarkAnswered && (
        <button onClick={onMarkAnswered} className="shrink-0 rounded-full bg-green px-3 py-1.5 text-xs font-bold text-white">
          Deus respondeu!
        </button>
      )}
    </Card>
  );
}
