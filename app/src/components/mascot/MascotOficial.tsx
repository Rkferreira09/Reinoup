import { useState } from 'react';
import { Mascot, type MascotPose } from './Mascot';

interface MascotOficialProps {
  size?: number;
  /** Pose do fallback vetorial, usada só enquanto o PNG não existir. */
  pose?: MascotPose;
  className?: string;
}

/**
 * O cordeirinho oficial — render 3D de boné esportivo, versão confirmada do
 * brandbook (a de capuz das 21 telas de mockup foi aposentada).
 *
 * Enquanto `public/brand/mascote.png` não existir, cai no `Mascot` vetorial.
 * Assim a tela nunca quebra e a troca acontece só soltando o arquivo na pasta.
 */
export function MascotOficial({ size = 120, pose = 'feliz', className = '' }: MascotOficialProps) {
  const [semImagem, setSemImagem] = useState(false);

  if (semImagem) return <Mascot pose={pose} size={size} className={className} />;

  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/mascote.png`}
      alt="Cordeirinho do ReinoUp"
      width={size}
      height={size}
      onError={() => setSemImagem(true)}
      className={`object-contain ${className}`}
      style={{ width: size, height: 'auto' }}
    />
  );
}

interface LogoOficialProps {
  height?: number;
  className?: string;
}

/**
 * Logo do ReinoUp — Bíblia aberta com cruz dourada e o wordmark.
 * Sem o PNG, mostra o wordmark em Baloo 2, que já é a fonte da marca.
 */
export function LogoOficial({ height = 48, className = '' }: LogoOficialProps) {
  const [semImagem, setSemImagem] = useState(false);

  if (semImagem) {
    return (
      <span className={`font-display font-extrabold ${className}`} style={{ fontSize: height * 0.8 }}>
        ReinoUp
      </span>
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/logo.png`}
      alt="ReinoUp"
      onError={() => setSemImagem(true)}
      className={`object-contain ${className}`}
      style={{ height, width: 'auto' }}
    />
  );
}
