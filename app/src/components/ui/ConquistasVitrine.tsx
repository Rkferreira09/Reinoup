import { useState } from 'react';
import { BADGES } from '../../content/badges';
import type { Badge } from '../../content/types';

interface ConquistasVitrineProps {
  badgesUnlocked: string[];
}

/**
 * Vitrine de conquistas.
 *
 * A tela de referência (14_Perfil_da_Crianca) mostra só as medalhas
 * conquistadas, coloridas. Despejar as 13 em silhueta cinza vira uma parede de
 * cadeados — desanima em vez de puxar. Aqui: conquistadas em destaque, no
 * máximo 3 próximas como meta, e o resto atrás de "ver todas".
 */
export function ConquistasVitrine({ badgesUnlocked }: ConquistasVitrineProps) {
  const [verTodas, setVerTodas] = useState(false);

  const conquistadas = BADGES.filter((b) => badgesUnlocked.includes(b.id));
  const bloqueadas = BADGES.filter((b) => !badgesUnlocked.includes(b.id));
  const proximas = verTodas ? bloqueadas : bloqueadas.slice(0, 3);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-bold text-navy">Conquistas</h2>
        <span className="text-xs font-bold text-navy/50">
          {conquistadas.length} de {BADGES.length}
        </span>
      </div>

      {conquistadas.length === 0 ? (
        <p className="mb-3 rounded-2xl bg-white p-4 text-sm font-semibold text-navy/60 shadow-[var(--shadow-card)]">
          Sua primeira medalha aparece aqui quando você terminar uma história. 🌱
        </p>
      ) : (
        <div className="mb-4 grid grid-cols-4 gap-3">
          {conquistadas.map((b) => (
            <Medalha key={b.id} badge={b} conquistada />
          ))}
        </div>
      )}

      {proximas.length > 0 && (
        <>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-navy/40">
            {verTodas ? 'Ainda por conquistar' : 'Próximas'}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {proximas.map((b) => (
              <Medalha key={b.id} badge={b} conquistada={false} />
            ))}
          </div>
        </>
      )}

      {bloqueadas.length > 3 && (
        <button
          onClick={() => setVerTodas((v) => !v)}
          className="mt-3 w-full rounded-pill border-2 border-navy/10 bg-white py-2 text-sm font-bold text-navy"
        >
          {verTodas ? 'Mostrar menos' : `Ver todas (${bloqueadas.length - 3} a mais)`}
        </button>
      )}
    </div>
  );
}

function Medalha({ badge, conquistada }: { badge: Badge; conquistada: boolean }) {
  const secreta = badge.category === 'secreta' && !conquistada;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
          conquistada ? 'bg-gradient-to-br from-yellow to-gold shadow-[var(--shadow-card)]' : 'bg-navy/5 opacity-45 grayscale'
        }`}
      >
        {secreta ? '❓' : badge.icon}
      </div>
      <p
        className={`text-center text-[10px] font-bold leading-tight ${
          conquistada ? 'text-navy/80' : 'text-navy/40'
        }`}
      >
        {secreta ? 'Secreta' : badge.name}
      </p>
    </div>
  );
}
