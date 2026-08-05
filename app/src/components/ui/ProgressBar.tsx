import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-1
  color?: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({ value, color = 'var(--color-orange)', trackColor = 'rgba(27,58,107,0.12)', height = 10 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: trackColor }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${clamped * 100}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
