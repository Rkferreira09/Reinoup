import { useState } from 'react';
import { Mascot, type MascotPose } from './Mascot';
import { ImageAsset } from '../illustrations/ImageAsset';

/**
 * Arte oficial da marca — o cordeirinho 3D de boné esportivo e o logo.
 *
 * Gerados por `bun scripts/build-brand-assets.mjs` a partir dos originais em
 * `02. Reino UP/01. Identidade Visual/`. WebP é o formato servido; se o
 * navegador não aceitar, o `<picture>` cai no PNG. Se o arquivo não existir,
 * o componente cai no vetor antigo — assim a tela nunca quebra.
 */

type Recorte = 'inteiro' | 'busto';

interface MascotOficialProps {
  size?: number;
  /** Pose do fallback vetorial, usada só se a arte não carregar. */
  pose?: MascotPose;
  /** 'busto' corta na altura do peito — melhor em tamanho pequeno, como nos balões. */
  recorte?: Recorte;
  className?: string;
}

export function MascotOficial({ size = 120, pose = 'feliz', recorte, className = '' }: MascotOficialProps) {
  const [falhou, setFalhou] = useState(false);

  // Abaixo de ~96px o corpo inteiro vira um borrão: usa o busto por padrão.
  const usarBusto = recorte ? recorte === 'busto' : size < 96;

  if (falhou) return <Mascot pose={pose} size={size} className={className} />;

  return (
    <ImageAsset
      asset={usarBusto ? 'mascotBust' : 'mascot'}
      onError={() => setFalhou(true)}
      className={`object-contain ${className}`}
      style={{ width: size, height: 'auto' }}
      loading="eager"
    />
  );
}

interface LogoOficialProps {
  height?: number;
  className?: string;
}

export function LogoOficial({ height = 48, className = '' }: LogoOficialProps) {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <span className={`font-display font-extrabold ${className}`} style={{ fontSize: height * 0.8 }}>
        ReinoUp
      </span>
    );
  }

  return (
    <ImageAsset
      asset="logo"
      onError={() => setFalhou(true)}
      className={`object-contain ${className}`}
      style={{ height, width: 'auto' }}
      loading="eager"
    />
  );
}
