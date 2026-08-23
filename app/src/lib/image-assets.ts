export type ImageAssetId = 'logo' | 'mascot' | 'mascotBust' | 'appIcon';

export interface ImageAsset {
  alt: string;
  fallback: string;
  src: string;
  type: 'image/png' | 'image/webp';
}

const base = import.meta.env.BASE_URL;

export const IMAGE_ASSETS: Record<ImageAssetId, ImageAsset> = {
  logo: {
    alt: 'ReinoUp',
    src: `${base}brand/logo.webp`,
    fallback: `${base}brand/logo.png`,
    type: 'image/webp',
  },
  mascot: {
    alt: 'Cordeirinho do ReinoUp',
    src: `${base}brand/mascote.webp`,
    fallback: `${base}brand/mascote.png`,
    type: 'image/webp',
  },
  mascotBust: {
    alt: 'Cordeirinho do ReinoUp',
    src: `${base}brand/mascote-busto.webp`,
    fallback: `${base}brand/mascote-busto.png`,
    type: 'image/webp',
  },
  appIcon: {
    alt: 'Ícone do ReinoUp',
    src: `${base}icons/icon-512.png`,
    fallback: `${base}icons/icon-192.png`,
    type: 'image/png',
  },
};

export function getImageAsset(id: ImageAssetId): ImageAsset {
  return IMAGE_ASSETS[id];
}
