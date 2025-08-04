'use client';

import {
  BackgroundImage,
  Button,
  RichText,
  type RichTextProps,
} from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import clsx from 'clsx';
import Link from 'next/link';
import { type FC } from 'react';

export type HeroSectionProps = {
  backgroundImage: string | Media;
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  contentBackgroundColor?: string | null;
  showButton?: boolean;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export const HeroSection: FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  content,
  buttonText,
  showButton,
  contentBackgroundColor,
  buttonLink,
}) => {
  const backgroundImageUrl = useMedia(backgroundImage);

  return (
    <section
      className={clsx([
        'w-full',
        'min-h-[calc(100vh-100px)]',
        'relative',
        'px-5',
        'py-10',
        'flex',
        'items-center',
        'md:min-h-[calc(80vh-150px)]',
      ])}
    >
      <BackgroundImage src={backgroundImageUrl} loading="eager" />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <div
          className={clsx([
            'px-5',
            'py-10',
            'flex',
            'flex-col',
            'backdrop-blur-sm',
            'max-w-2/3',
            'gap-5',
            'md:max-w-xl',
          ])}
          style={{ backgroundColor: contentBackgroundColor ?? undefined }}
        >
          <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
            {!!title && (
              <h2 className={clsx(['text-5xl', 'text-primary-3', 'max-w-2/3'])}>
                <RichText data={title} />
              </h2>
            )}

            {!!content && <RichText data={content} className="text-xl" />}
          </div>

          {!!showButton && (
            <Link href={buttonLink ?? '#'} className="w-fit">
              <Button>{buttonText}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
