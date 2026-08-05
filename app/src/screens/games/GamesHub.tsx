import { Link } from 'react-router-dom';
import { TopBar } from '../../components/ui/TopBar';
import { CoinBadge } from '../../components/ui/CoinBadge';
import { useProgressStore } from '../../store/progressStore';

const GAMES = [
  { to: '/app/jogos/memoria', title: 'Memória Bíblica', subtitle: 'Encontre os pares!', color: 'bg-gold-light/40', icon: '🃏' },
  { to: '/app/jogos/quebra-cabeca', title: 'Quebra-Cabeça', subtitle: 'Monte a cena!', color: 'bg-orange-light/30', icon: '🧩' },
  { to: '/app/jogos/ordem', title: 'Ordem Correta', subtitle: 'Coloque em ordem!', color: 'bg-blue-sky/25', icon: '🔢' },
  { to: '/app/jogos/caca-palavras', title: 'Caça-Palavras', subtitle: 'Encontre as palavras!', color: 'bg-green-light', icon: '🔎' },
];

export function GamesHub() {
  const coins = useProgressStore((s) => s.coins);

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-8">
      <TopBar title="Jogos" backTo="/app" right={<CoinBadge coins={coins} />} />
      <div className="flex flex-col gap-4 px-4">
        {GAMES.map((g) => (
          <Link key={g.to} to={g.to} className={`flex items-center gap-4 rounded-[var(--radius-card)] p-5 ${g.color}`}>
            <span className="text-4xl">{g.icon}</span>
            <div>
              <p className="font-display text-lg font-bold text-navy">{g.title}</p>
              <p className="text-sm text-navy/70">{g.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
