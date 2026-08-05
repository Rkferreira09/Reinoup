import { useCallback, useEffect, useRef, useState } from 'react';

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('pt-br')) ?? voices.find((v) => v.lang?.toLowerCase().startsWith('pt')) ?? null;
  return cachedVoice;
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!supported) return;
    const handler = () => {
      cachedVoice = undefined;
      pickVoice();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, rate = 0.95) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = rate;
      utterance.pitch = 1.05;
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      utteranceRef.current = utterance;
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  useEffect(() => stop, [stop]);

  return { speak, stop, speaking, supported };
}
