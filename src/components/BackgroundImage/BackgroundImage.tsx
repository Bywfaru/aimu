'use client';

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export interface BackgroundImageProps {
  src: ImageProps['src'];
  alt?: ImageProps['alt'];
  loading?: ImageProps['loading'];
  objectFit?: Required<ImageProps>['style']['objectFit'];
  objectPosition?: Required<ImageProps>['style']['objectPosition'];
  quality?: ImageProps['quality'];
  placeholder?: ImageProps['placeholder'];
  zIndex?: number;
}

export const BackgroundImage: FC<BackgroundImageProps> = ({
  placeholder,
  src,
  alt = '',
  loading = 'lazy',
  objectFit = 'cover',
  objectPosition = 'center',
  quality = 100,
  zIndex = -1,
}) => {
  return (
    <div
      className={clsx(['size-full', 'absolute', 'top-0', 'left-0'])}
      style={{ zIndex }}
    >
      <Image
        src={src}
        alt={alt}
        quality={quality}
        placeholder={placeholder}
        style={{
          objectFit,
          objectPosition,
        }}
        loading={loading}
        fill
      />
    </div>
  );
};
