export function StreakBadge({ days, size = 'md' }: { days: number; size?: 'sm' | 'md' }) {
  const text = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className={`flex items-center gap-1 font-display font-bold text-orange-dark ${text}`}>
      <span>🔥</span>
      <span>{days} dias</span>
    </div>
  );
}
