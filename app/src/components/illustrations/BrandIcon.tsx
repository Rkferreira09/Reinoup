/**
 * Iconografia da marca — bloco 07 do brandbook.
 *
 * Nove ícones oficiais, um por conceito. Substituem emoji: emoji renderiza
 * diferente em cada aparelho, ignora a paleta e entrega cara de protótipo.
 */
export type BrandIconName =
  | 'licoes'
  | 'fe'
  | 'desafios'
  | 'recompensas'
  | 'amor'
  | 'protecao'
  | 'ranking'
  | 'perfil'
  | 'progresso';

interface BrandIconProps {
  name: BrandIconName;
  size?: number;
  className?: string;
}

const navy = 'var(--color-navy)';
const navyDeep = 'var(--color-navy-deep)';
const gold = 'var(--color-gold)';
const yellow = 'var(--color-yellow)';
const orange = 'var(--color-orange)';

export function BrandIcon({ name, size = 24, className = '' }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden>
      {RENDERERS[name]()}
    </svg>
  );
}

const RENDERERS: Record<BrandIconName, () => React.ReactNode> = {
  licoes: () => (
    <>
      <path d="M4 7c0-1 .8-1.8 1.8-1.8H15v21H5.8C4.8 26.2 4 25.4 4 24.4z" fill={navy} />
      <path d="M28 7c0-1-.8-1.8-1.8-1.8H17v21h9.2c1 0 1.8-.8 1.8-1.8z" fill={navyDeep} />
      <path d="M15 5.2h2v21h-2z" fill={gold} />
    </>
  ),
  fe: () => (
    <>
      <rect x="13" y="4" width="6" height="24" rx="1.5" fill={gold} />
      <rect x="5" y="11" width="22" height="6" rx="1.5" fill={gold} />
      <rect x="14.5" y="6" width="3" height="20" rx="1" fill={yellow} />
    </>
  ),
  desafios: () => (
    <>
      <path d="M9 5h14v7a7 7 0 0 1-14 0z" fill={gold} />
      <path d="M9 7H5v2a5 5 0 0 0 4 4.9zM23 7h4v2a5 5 0 0 1-4 4.9z" fill={yellow} />
      <rect x="14" y="19" width="4" height="5" fill={navy} />
      <rect x="10" y="24" width="12" height="4" rx="1.5" fill={navyDeep} />
    </>
  ),
  recompensas: () => (
    <>
      <path d="M5 13a11 11 0 0 1 22 0v11H5z" fill="#8a5a2b" />
      <rect x="5" y="13" width="22" height="4" fill={gold} />
      <rect x="14" y="13" width="4" height="11" fill={gold} />
      <circle cx="16" cy="18" r="2.2" fill={navyDeep} />
      <rect x="4" y="23" width="24" height="4" rx="1.5" fill={gold} />
    </>
  ),
  amor: () => (
    <path
      d="M16 27S4 20 4 12.5A6.5 6.5 0 0 1 16 9a6.5 6.5 0 0 1 12 3.5C28 20 16 27 16 27z"
      fill={orange}
    />
  ),
  protecao: () => (
    <>
      <path d="M16 3l11 4v9c0 6.6-4.5 11-11 13C9.5 27 5 22.6 5 16V7z" fill={navy} />
      <rect x="14.5" y="9" width="3" height="12" rx="1" fill={gold} />
      <rect x="10.5" y="13" width="11" height="3" rx="1" fill={gold} />
    </>
  ),
  ranking: () => (
    <>
      <path d="M4 10l6 5 6-9 6 9 6-5v13H4z" fill={gold} />
      <rect x="4" y="23" width="24" height="4" rx="1.5" fill={yellow} />
      <circle cx="4" cy="9" r="2" fill={yellow} />
      <circle cx="28" cy="9" r="2" fill={yellow} />
      <circle cx="16" cy="4" r="2.4" fill={yellow} />
    </>
  ),
  perfil: () => (
    <>
      <circle cx="16" cy="11" r="6" fill={navy} />
      <path d="M4 28c1.8-6 6.6-9 12-9s10.2 3 12 9z" fill={navyDeep} />
    </>
  ),
  progresso: () => <path d="M18 3L7 18h7l-2 11 11-15h-7z" fill={orange} />,
};
