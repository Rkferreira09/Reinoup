import { motion, AnimatePresence } from 'framer-motion';

export function CoinBadge({ coins }: { coins: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[var(--shadow-card)]">
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="9" fill="var(--color-gold)" stroke="var(--color-orange-dark)" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="800" fill="#8a5300">
          $
        </text>
      </svg>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={coins}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display font-bold text-navy tabular-nums"
        >
          {coins}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
