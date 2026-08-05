import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Mascot } from '../../components/mascot/Mascot';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import type { AgeBand } from '../../content/types';

export function ChildOnboarding() {
  const navigate = useNavigate();
  const completeChildOnboarding = useAuthStore((s) => s.completeChildOnboarding);
  const setAgeBand = useSettingsStore((s) => s.setAgeBand);
  const [name, setName] = useState('');
  const [age, setAge] = useState(9);

  const ageBand: AgeBand = age <= 7 ? '5-7' : '8-10';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    completeChildOnboarding({ name: name.trim(), age, ageBand, avatarSeed: name.trim().toLowerCase() });
    setAgeBand(ageBand);
    navigate('/app', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-cream px-6 pb-8 pt-10 text-center safe-top">
      <Mascot pose="feliz" size={110} />
      <h1 className="font-display mt-4 text-2xl font-extrabold text-navy">Vamos conhecer a criança!</h1>
      <p className="mt-1 text-navy/70">Isso ajuda a personalizar a jornada.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-6 text-left">
        <label className="text-sm font-bold text-navy">
          Nome da criança
          <input
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Miguel"
            className="mt-1 w-full rounded-2xl border border-navy/15 bg-white px-4 py-3.5 text-navy-deep outline-none focus:border-orange"
          />
        </label>

        <div>
          <p className="text-sm font-bold text-navy">Idade: {age} anos</p>
          <input
            type="range"
            min={5}
            max={10}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-2 w-full accent-orange"
          />
          <div className="flex justify-between text-xs text-navy/50">
            <span>5</span>
            <span>10</span>
          </div>
          <p className="mt-2 rounded-xl bg-orange-light/20 px-3 py-2 text-sm font-semibold text-navy">
            Conteúdo ajustado para a faixa {ageBand} anos
          </p>
        </div>

        <Button type="submit" full size="lg">
          Começar jornada
        </Button>
      </form>
    </div>
  );
}
