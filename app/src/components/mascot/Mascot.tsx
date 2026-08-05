import { motion } from 'framer-motion';

export type MascotPose = 'feliz' | 'comemorando' | 'pensando' | 'acenando' | 'surpreso';

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  outfitColor?: string;
  accessory?: string | null;
  background?: string | null;
  className?: string;
  animated?: boolean;
}

const ACCESSORY_LAYER: Record<string, (props: { outfitColor: string }) => React.ReactNode> = {
  capa: () => (
    <path d="M40 60 Q60 110 40 112 L34 108 Q28 84 34 62Z M80 60 Q60 110 80 112 L86 108 Q92 84 86 62Z" fill="#B3432B" opacity={0.9} />
  ),
  mochila: () => <rect x="86" y="66" width="14" height="22" rx="5" fill="#6b4a2b" transform="rotate(8 93 77)" />,
  cajado: () => (
    <g>
      <rect x="98" y="30" width="5" height="60" rx="2.5" fill="#8a6b4a" />
      <path d="M100 30 Q90 30 90 40 Q90 46 98 44" fill="none" stroke="#8a6b4a" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  funda: () => <path d="M16 70 Q26 50 36 70" fill="none" stroke="#8a6b4a" strokeWidth="3.5" strokeLinecap="round" />,
  coroa: () => (
    <g transform="translate(40 6)">
      <path d="M0 16 L0 4 L6 10 L12 0 L18 10 L24 4 L24 16Z" fill="#F0A300" stroke="#C97A00" strokeWidth="1.5" />
    </g>
  ),
};

/**
 * The ReinoUp lamb-knight mascot — one reusable flat-vector SVG, several arm/expression poses.
 * Deliberately an original flat-vector style (not a photoreal recreation of the mockup renders).
 */
export function Mascot({ pose = 'feliz', size = 96, outfitColor = '#1B3A6B', accessory, background, className = '', animated = true }: MascotProps) {
  const armsUp = pose === 'comemorando';
  const waving = pose === 'acenando';
  const thinking = pose === 'pensando';
  const surprised = pose === 'surpreso';

  const Wrapper = animated ? motion.svg : 'svg';
  const wrapperMotionProps = animated
    ? {
        initial: { y: 0 },
        animate: { y: [0, -4, 0] },
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
      }
    : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      {...(wrapperMotionProps as any)}
    >
      {background && <circle cx="60" cy="60" r="58" fill={background} />}
      {accessory && accessory !== 'none' && ACCESSORY_LAYER[accessory]?.({ outfitColor })}
      {/* wool tufts behind head */}
      <g fill="#FBF3E4" stroke="#E7D8B8" strokeWidth="1.5">
        <circle cx="38" cy="24" r="12" />
        <circle cx="52" cy="16" r="13" />
        <circle cx="68" cy="16" r="13" />
        <circle cx="82" cy="24" r="12" />
        <circle cx="60" cy="12" r="12" />
      </g>

      {/* left arm */}
      <motion.g
        animate={waving ? { rotate: [0, -25, 0, -25, 0] } : armsUp ? { rotate: -50 } : { rotate: 0 }}
        transition={waving ? { duration: 1.1, repeat: Infinity } : { type: 'spring', stiffness: 150 }}
        style={{ transformOrigin: '32px 68px' }}
      >
        <rect x="22" y="64" width="14" height="30" rx="7" fill={outfitColor} />
        <circle cx="29" cy="96" r="9" fill="#8a6b4a" />
      </motion.g>

      {/* right arm */}
      <motion.g
        animate={armsUp ? { rotate: 50 } : { rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150 }}
        style={{ transformOrigin: '88px 68px' }}
      >
        <rect x="84" y="64" width="14" height="30" rx="7" fill={outfitColor} />
        <circle cx="91" cy="96" r="9" fill="#8a6b4a" />
      </motion.g>

      {/* body / hoodie */}
      <path d="M40 62 Q60 50 80 62 L86 108 Q60 118 34 108 Z" fill={outfitColor} />
      <path d="M40 62 Q60 50 80 62 L86 108 Q60 118 34 108 Z" fill="none" stroke="var(--color-gold, #F0A300)" strokeWidth="2.5" opacity="0.6" />

      {/* shield emblem */}
      <path d="M60 68 L72 72 V86 C72 96 66 101 60 104 C54 101 48 96 48 86 V72 Z" fill="#FBF3E4" stroke="var(--color-gold,#F0A300)" strokeWidth="2" />
      <rect x="57" y="75" width="6" height="18" rx="2" fill="var(--color-gold,#F0A300)" />
      <rect x="51" y="80" width="18" height="6" rx="2" fill="var(--color-gold,#F0A300)" />

      {/* head */}
      <circle cx="60" cy="46" r="26" fill="#FBF3E4" stroke="#EAD9B8" strokeWidth="1.5" />
      {/* ears */}
      <ellipse cx="34" cy="46" rx="8" ry="12" fill="#F6E4C6" transform="rotate(-20 34 46)" />
      <ellipse cx="86" cy="46" rx="8" ry="12" fill="#F6E4C6" transform="rotate(20 86 46)" />
      <ellipse cx="34" cy="46" rx="4" ry="7" fill="#F3C9A8" transform="rotate(-20 34 46)" />
      <ellipse cx="86" cy="46" rx="4" ry="7" fill="#F3C9A8" transform="rotate(20 86 46)" />

      {/* face */}
      {thinking ? (
        <>
          <path d="M46 42 q6 -6 12 0" stroke="#3a2a1c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="72" cy="42" r="3.2" fill="#3a2a1c" />
          <path d="M50 58 q10 3 18 -1" stroke="#c0755a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : surprised ? (
        <>
          <circle cx="50" cy="42" r="4" fill="#3a2a1c" />
          <circle cx="70" cy="42" r="4" fill="#3a2a1c" />
          <ellipse cx="60" cy="57" rx="6" ry="7" fill="#7a3b2a" />
        </>
      ) : (
        <>
          <circle cx="50" cy="42" r="3.6" fill="#3a2a1c" />
          <circle cx="70" cy="42" r="3.6" fill="#3a2a1c" />
          <path d="M48 40 q2 -4 6 -3" stroke="#3a2a1c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M66 37 q4 -1 6 3" stroke="#3a2a1c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="60" cy="50" rx="6" ry="4" fill="#F3B98F" />
      {!thinking && !surprised && (
        <path d="M52 56 Q60 64 68 56" stroke="#7a3b2a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}
    </Wrapper>
  );
}
