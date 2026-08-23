import type { ImgHTMLAttributes } from 'react';
import { getImageAsset, type ImageAssetId } from '../../lib/image-assets';

interface ImageAssetProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  asset: ImageAssetId;
  alt?: string;
}

export function ImageAsset({ asset, alt, ...props }: ImageAssetProps) {
  const image = getImageAsset(asset);

  return (
    <picture>
      <source srcSet={image.src} type={image.type} />
      <img {...props} src={image.fallback} alt={alt ?? image.alt} />
    </picture>
  );
}
