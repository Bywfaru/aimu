'use client';

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import { forwardRef } from 'react';

export type BackgroundImageProps = {
  src: ImageProps['src'];
  alt?: ImageProps['alt'];
  loading?: ImageProps['loading'];
  priority?: ImageProps['priority'];
  sizes?: ImageProps['sizes'];
  objectFit?: Required<ImageProps>['style']['objectFit'];
  objectPosition?: Required<ImageProps>['style']['objectPosition'];
  quality?: ImageProps['quality'];
  placeholder?: ImageProps['placeholder'];
  zIndex?: number;
  imageClassName?: string;
  containerClassName?: string;
};

export const BackgroundImage = forwardRef<HTMLDivElement, BackgroundImageProps>(
  (
    {
      containerClassName,
      imageClassName,
      placeholder,
      src,
      alt = '',
      loading = 'lazy',
      priority = false,
      sizes = '100vw',
      objectFit = 'cover',
      objectPosition = 'center',
      quality = 75,
      zIndex = -1,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx([
          'size-full',
          'absolute',
          'top-0',
          'left-0',
          'overflow-hidden',
          containerClassName,
        ])}
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
          priority={priority}
          sizes={sizes}
          className={imageClassName}
          fill
        />
      </div>
    );
  },
);

BackgroundImage.displayName = 'BackgroundImage';
