import { motion } from 'framer-motion';
import { MascotOficial } from '../mascot/MascotOficial';
import type { AppLockState } from '../../hooks/useAppLock';

const MESSAGES: Record<NonNullable<AppLockState['reason']>, { title: string; body: string }> = {
  paused: { title: 'O app está pausado', body: 'Seu pai ou mãe pausou o ReinoUp por agora. Volte mais tarde!' },
  'outside-hours': { title: 'Está na hora de uma pausa!', body: 'O ReinoUp só pode ser usado no horário combinado com seus pais.' },
  'time-limit': { title: 'Tempo de hoje concluído!', body: 'Você já usou todo o tempo permitido por hoje. Até amanhã!' },
};

export function AppLockOverlay({ reason }: { reason: NonNullable<AppLockState['reason']> }) {
  const msg = MESSAGES[reason];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-navy-deep/95 px-8 text-center text-white"
    >
      <MascotOficial size={120} />
      <h1 className="font-display text-2xl font-extrabold">{msg.title}</h1>
      <p className="max-w-xs text-white/80">{msg.body}</p>
      <span className="mt-2 text-4xl">⏰</span>
    </motion.div>
  );
}
