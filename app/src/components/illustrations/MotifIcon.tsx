import type { Motif } from '../../content/types';

interface MotifIconProps {
  motif: Motif;
  size?: number;
  className?: string;
}

/**
 * One flat-vector icon per story motif. Reused both inside scene illustrations
 * (story reading screens) and as the card faces for the Memória Bíblica game.
 */
export function MotifIcon({ motif, size = 64, className = '' }: MotifIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className}>
      {RENDERERS[motif]()}
    </svg>
  );
}

const gold = '#F0A300';
const brown = '#8a6b4a';
const cream = '#FBF3E4';

const RENDERERS: Record<Motif, () => React.ReactNode> = {
  sheep: () => (
    <>
      <ellipse cx="40" cy="46" rx="22" ry="16" fill={cream} stroke="#E7D8B8" strokeWidth="2" />
      <circle cx="20" cy="40" r="9" fill={cream} />
      <circle cx="60" cy="40" r="9" fill={cream} />
      <circle cx="22" cy="52" r="9" fill="#3a2a1c" />
      <ellipse cx="22" cy="52" rx="7" ry="6" fill="#3a2a1c" />
      <circle cx="19" cy="50" r="1.6" fill="#fff" />
      <rect x="14" y="64" width="6" height="12" rx="2" fill="#3a2a1c" />
      <rect x="30" y="64" width="6" height="12" rx="2" fill="#3a2a1c" />
    </>
  ),
  'shepherd-boy': () => (
    <>
      <circle cx="40" cy="26" r="12" fill="#F3B98F" />
      <path d="M28 22q12-14 24 0" fill="none" stroke="#5a3a22" strokeWidth="6" strokeLinecap="round" />
      <path d="M24 74 L28 44 Q40 36 52 44 L56 74 Z" fill="#D9A441" />
      <rect x="18" y="46" width="8" height="26" rx="4" fill="#F3B98F" />
      <rect x="12" y="30" width="6" height="34" rx="3" fill={brown} transform="rotate(20 12 30)" />
    </>
  ),
  sling: () => (
    <>
      <path d="M20 60 Q40 20 60 60" fill="none" stroke={brown} strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="60" r="8" fill="#8a8a8a" />
      <path d="M20 60 L14 68 M60 60 L66 68" stroke={brown} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  giant: () => (
    <>
      <circle cx="40" cy="20" r="11" fill="#D19A73" />
      <rect x="24" y="30" width="32" height="34" rx="8" fill="#9B3B2B" />
      <rect x="14" y="34" width="10" height="26" rx="5" fill="#D19A73" />
      <rect x="56" y="34" width="10" height="26" rx="5" fill="#D19A73" />
      <rect x="26" y="64" width="12" height="14" rx="4" fill="#5a3a22" />
      <rect x="42" y="64" width="12" height="14" rx="4" fill="#5a3a22" />
    </>
  ),
  sword: () => (
    <>
      <rect x="37" y="10" width="6" height="42" rx="2" fill="#C9CDD3" />
      <rect x="26" y="50" width="28" height="7" rx="3" fill={gold} />
      <rect x="35" y="55" width="10" height="18" rx="2" fill="#5a3a22" />
    </>
  ),
  ark: () => (
    <>
      <path d="M14 50 Q40 66 66 50 L60 62 Q40 72 20 62 Z" fill="#8a5a2b" />
      <rect x="22" y="34" width="36" height="18" rx="4" fill="#B07C42" />
      <rect x="30" y="24" width="20" height="12" rx="3" fill="#C79256" />
      <rect x="36" y="27" width="8" height="6" fill="#5a3a22" />
    </>
  ),
  rain: () => (
    <>
      <ellipse cx="40" cy="26" rx="22" ry="12" fill="#9FB6D6" />
      <ellipse cx="24" cy="30" rx="14" ry="10" fill="#9FB6D6" />
      <ellipse cx="56" cy="30" rx="14" ry="10" fill="#9FB6D6" />
      {[20, 34, 48, 60].map((x, i) => (
        <path key={x} d={`M${x} 44 L${x - 6} 62`} stroke="#4A90D9" strokeWidth="4" strokeLinecap="round" opacity={0.5 + i * 0.1} />
      ))}
    </>
  ),
  rainbow: () => (
    <>
      <path d="M8 66 A32 32 0 0 1 72 66" fill="none" stroke="#E0654C" strokeWidth="5" />
      <path d="M14 66 A26 26 0 0 1 66 66" fill="none" stroke={gold} strokeWidth="5" />
      <path d="M20 66 A20 20 0 0 1 60 66" fill="none" stroke="#4CAF50" strokeWidth="5" />
      <path d="M26 66 A14 14 0 0 1 54 66" fill="none" stroke="#4A90D9" strokeWidth="5" />
    </>
  ),
  dove: () => (
    <>
      <ellipse cx="42" cy="42" rx="18" ry="12" fill="#FBF3E4" stroke="#E7D8B8" strokeWidth="1.5" />
      <circle cx="60" cy="36" r="7" fill="#FBF3E4" stroke="#E7D8B8" strokeWidth="1.5" />
      <path d="M66 36 L72 34 L66 39Z" fill={gold} />
      <path d="M28 44 Q16 46 22 56 Q30 52 30 46Z" fill="#EAD9B8" />
      <path d="M50 50 L44 62" stroke="#7a5a2a" strokeWidth="2" />
      <path d="M56 50 L60 62" stroke="#7a5a2a" strokeWidth="2" />
    </>
  ),
  tent: () => (
    <>
      <path d="M40 18 L66 62 H14 Z" fill="#C79256" />
      <path d="M40 18 L40 62" stroke="#8a5a2b" strokeWidth="2" />
      <path d="M30 62 L40 40 L50 62 Z" fill="#5a3a22" />
    </>
  ),
  'coat-colorful': () => (
    <>
      <path d="M26 20 L54 20 L60 66 H20 Z" fill="#FBF3E4" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20 + i * 10} y="20" width="9" height="46" fill={['#E0654C', gold, '#4CAF50', '#4A90D9'][i]} opacity="0.85" />
      ))}
      <circle cx="40" cy="14" r="8" fill="#F3B98F" />
    </>
  ),
  well: () => (
    <>
      <ellipse cx="40" cy="56" rx="22" ry="8" fill="#3a2a1c" />
      <path d="M18 56 L22 30 H58 L62 56" fill="#B7B2A6" />
      <ellipse cx="40" cy="30" rx="20" ry="6" fill="#8a8578" />
      <rect x="14" y="16" width="4" height="20" fill={brown} />
      <rect x="62" y="16" width="4" height="20" fill={brown} />
      <rect x="12" y="12" width="56" height="5" rx="2" fill={brown} />
    </>
  ),
  grain: () => (
    <>
      {[24, 40, 56].map((x) => (
        <g key={x}>
          <path d={`M${x} 66 L${x} 26`} stroke="#B07C42" strokeWidth="3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={x + (i % 2 === 0 ? -6 : 6)} cy={30 + i * 8} rx="6" ry="4" fill={gold} />
          ))}
        </g>
      ))}
    </>
  ),
  crown: () => (
    <>
      <path d="M14 56 L14 32 L28 46 L40 26 L52 46 L66 32 L66 56 Z" fill={gold} stroke="#C97A00" strokeWidth="2" />
      <rect x="14" y="56" width="52" height="8" fill={gold} stroke="#C97A00" strokeWidth="2" />
      <circle cx="40" cy="26" r="4" fill="#E0654C" />
    </>
  ),
  staff: () => (
    <>
      <path d="M40 10 Q26 10 26 24 Q26 32 36 30" fill="none" stroke={brown} strokeWidth="5" strokeLinecap="round" />
      <rect x="36" y="24" width="6" height="48" rx="3" fill={brown} />
    </>
  ),
  'sea-split': () => (
    <>
      <rect x="6" y="20" width="18" height="50" fill="#4A90D9" />
      <rect x="56" y="20" width="18" height="50" fill="#4A90D9" />
      <path d="M24 20 Q40 30 24 40 Q40 50 24 60 L24 70 L56 70 L56 20Z" fill="#D9C48C" opacity="0" />
      <path d="M24 70 L28 30 L24 20" fill="none" stroke="#2E6FB0" strokeWidth="2" />
      <path d="M56 70 L52 30 L56 20" fill="none" stroke="#2E6FB0" strokeWidth="2" />
    </>
  ),
  chariot: () => (
    <>
      <circle cx="30" cy="60" r="10" fill="none" stroke="#5a3a22" strokeWidth="4" />
      <circle cx="54" cy="60" r="10" fill="none" stroke="#5a3a22" strokeWidth="4" />
      <path d="M20 50 L58 50 L64 34 H30Z" fill="#9B3B2B" />
      <path d="M64 34 L74 20" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'fire-column': () => (
    <>
      <path d="M40 70 C24 60 30 46 22 40 C34 42 30 30 40 20 C34 34 46 34 44 46 C54 42 52 58 40 70Z" fill="#E0654C" />
      <path d="M40 66 C30 58 34 48 30 44 C38 46 36 36 40 30 C38 40 46 40 44 48 C50 46 48 58 40 66Z" fill={gold} />
    </>
  ),
  boat: () => (
    <>
      <path d="M14 52 Q40 66 66 52 L60 60 Q40 68 20 60Z" fill="#8a5a2b" />
      <rect x="38" y="14" width="4" height="38" fill="#5a3a22" />
      <path d="M42 16 L60 40 L42 40Z" fill="#FBF3E4" stroke="#E7D8B8" />
    </>
  ),
  'big-fish': () => (
    <>
      <ellipse cx="38" cy="42" rx="26" ry="16" fill="#3E6FA8" />
      <path d="M62 42 L76 30 L76 54Z" fill="#2E5686" />
      <circle cx="22" cy="38" r="3" fill="#fff" />
      <path d="M18 46 Q30 52 42 46" stroke="#254a72" strokeWidth="2" fill="none" />
    </>
  ),
  'storm-waves': () => (
    <>
      <path d="M6 50 Q18 40 30 50 T54 50 T78 50" fill="none" stroke="#2E6FB0" strokeWidth="5" strokeLinecap="round" />
      <path d="M6 62 Q18 52 30 62 T54 62 T78 62" fill="none" stroke="#4A90D9" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 12 L58 26 L44 26 Z" fill="#8a8578" opacity="0.6" />
    </>
  ),
  plant: () => (
    <>
      <path d="M40 72 L40 34" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 44 Q20 40 18 24" fill="none" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 54 Q60 50 62 34" fill="none" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="16" cy="20" rx="9" ry="6" fill="#4CAF50" transform="rotate(-20 16 20)" />
      <ellipse cx="64" cy="30" rx="9" ry="6" fill="#4CAF50" transform="rotate(20 64 30)" />
    </>
  ),
  lion: () => (
    <>
      <circle cx="40" cy="40" r="15" fill="#D9A441" stroke="#B07C2E" strokeWidth="6" />
      <circle cx="40" cy="40" r="12" fill="#F0C878" />
      <circle cx="34" cy="38" r="2" fill="#3a2a1c" />
      <circle cx="46" cy="38" r="2" fill="#3a2a1c" />
      <path d="M36 46 Q40 50 44 46" stroke="#3a2a1c" strokeWidth="2" fill="none" />
    </>
  ),
  den: () => (
    <>
      <path d="M10 68 Q10 24 40 24 Q70 24 70 68Z" fill="#6b6b6b" />
      <path d="M20 68 Q20 36 40 36 Q60 36 60 68Z" fill="#2b2b2b" />
    </>
  ),
  star: () => (
    <path
      d="M40 12 L47 32 L68 32 L51 45 L58 66 L40 53 L22 66 L29 45 L12 32 L33 32Z"
      fill={gold}
      stroke="#C97A00"
      strokeWidth="1.5"
    />
  ),
  angel: () => (
    <>
      <path d="M20 40 Q10 30 20 18 Q26 30 34 30" fill="#FBF3E4" stroke="#E7D8B8" />
      <path d="M60 40 Q70 30 60 18 Q54 30 46 30" fill="#FBF3E4" stroke="#E7D8B8" />
      <circle cx="40" cy="28" r="10" fill="#F3B98F" />
      <path d="M28 66 Q40 44 52 66Z" fill="#FBF3E4" stroke="#E7D8B8" />
      <circle cx="40" cy="16" r="4" fill={gold} />
    </>
  ),
  scroll: () => (
    <>
      <rect x="16" y="24" width="48" height="32" rx="4" fill={cream} stroke="#C79256" strokeWidth="3" />
      <circle cx="16" cy="40" r="7" fill="#C79256" />
      <circle cx="64" cy="40" r="7" fill="#C79256" />
      <path d="M26 34 H54 M26 42 H54 M26 50 H46" stroke="#8a6b4a" strokeWidth="2" />
    </>
  ),
  mountain: () => (
    <>
      <path d="M6 62 L28 26 L42 46 L54 22 L74 62Z" fill="#7C8DA6" />
      <path d="M28 26 L34 38 L22 38Z" fill="#fff" />
      <path d="M54 22 L60 34 L48 34Z" fill="#fff" />
    </>
  ),
  palace: () => (
    <>
      <rect x="16" y="36" width="48" height="32" fill="#D9C48C" />
      <path d="M16 36 L40 16 L64 36Z" fill="#B07C42" />
      <rect x="34" y="50" width="12" height="18" fill="#5a3a22" />
      <rect x="20" y="42" width="8" height="8" fill="#5a3a22" />
      <rect x="52" y="42" width="8" height="8" fill="#5a3a22" />
    </>
  ),
  basket: () => (
    <>
      <path d="M18 40 Q40 24 62 40 L56 62 Q40 70 24 62Z" fill="#C79256" />
      <path d="M22 42 H58 M20 50 H60 M24 58 H56" stroke="#8a5a2b" strokeWidth="2" />
      <ellipse cx="40" cy="40" rx="22" ry="6" fill="#D9A96A" />
    </>
  ),
};
