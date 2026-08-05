import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ChoiceCardProps {
  children: ReactNode;
  selected?: boolean;
  correct?: boolean; // only meaningful once revealed
  revealed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function ChoiceCard({ children, selected, correct, revealed, onClick, disabled }: ChoiceCardProps) {
  let stateClasses = 'border-navy/10 bg-white';
  if (revealed && selected && correct) stateClasses = 'border-green bg-green-light';
  else if (revealed && selected && !correct) stateClasses = 'border-red-soft bg-red-soft/10';
  else if (selected) stateClasses = 'border-orange bg-orange-light/20';

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full rounded-2xl border-2 p-4 text-left font-semibold text-navy-deep transition-colors ${stateClasses}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{children}</span>
        {revealed && selected && (
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${correct ? 'bg-green' : 'bg-red-soft'}`}>
            {correct ? '✓' : '✕'}
          </span>
        )}
      </div>
    </motion.button>
  );
}
