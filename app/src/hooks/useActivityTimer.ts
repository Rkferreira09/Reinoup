import { useEffect, useRef } from 'react';
import { useProgressStore } from '../store/progressStore';

const FLUSH_INTERVAL_MS = 30_000;

/** Accumulates real foreground time and periodically flushes minutes into progressStore for the parent report. */
export function useActivityTimer() {
  const addActivityMinutes = useProgressStore((s) => s.addActivityMinutes);
  const secondsRef = useRef(0);

  useEffect(() => {
    let lastTick = Date.now();

    const tick = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        secondsRef.current += (now - lastTick) / 1000;
        lastTick = now;
      } else {
        lastTick = Date.now();
      }
    };

    const flush = () => {
      const minutes = Math.floor(secondsRef.current / 60);
      if (minutes > 0) {
        addActivityMinutes(minutes);
        secondsRef.current -= minutes * 60;
      }
    };

    const interval = setInterval(() => {
      tick();
      flush();
    }, FLUSH_INTERVAL_MS);

    const onVisibility = () => {
      lastTick = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(interval);
      flush();
      document.removeEventListener('visibilitychange', onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
