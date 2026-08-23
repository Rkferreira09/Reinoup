import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { MascotOficial } from '../../components/mascot/MascotOficial';
import { useProgressStore } from '../../store/progressStore';

export function FinalCelebration() {
  const navigate = useNavigate();
  const streakDays = useProgressStore((s) => s.streakDays);
  const coins = useProgressStore((s) => s.coins);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-b from-navy-deep to-navy px-8 text-center text-white">
      <span className="text-5xl">👑</span>
      <MascotOficial size={130} />
      <h1 className="font-display text-3xl font-extrabold text-gold-light">Você é demais!</h1>
      <p className="max-w-xs text-white/85">Continue assim na sua jornada com Deus!</p>
      <div className="mt-2 flex gap-4">
        <div className="rounded-2xl bg-white/10 px-4 py-2">
          <p className="font-display text-lg font-extrabold">🔥 {streakDays}</p>
          <p className="text-xs text-white/70">dias seguidos</p>
        </div>
        <div className="rounded-2xl bg-white/10 px-4 py-2">
          <p className="font-display text-lg font-extrabold">🪙 {coins}</p>
          <p className="text-xs text-white/70">moedas</p>
        </div>
      </div>
      <span className="mt-2 text-3xl">❤️</span>
      <Button full size="lg" className="mt-6" onClick={() => navigate('/app')}>
        Voltar ao início
      </Button>
    </div>
  );
}
