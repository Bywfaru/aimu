import { BackgroundImage } from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import clsx from 'clsx';
import { type FC } from 'react';

export type PageTitleSectionProps = {
  title?: string | null;
  backgroundImage: string | Media;
};

export const PageTitleSection: FC<PageTitleSectionProps> = ({
  backgroundImage,
  title,
}) => {
  const backgroundImageUrl = useMedia(backgroundImage);

  return (
    <section
      className={clsx([
        'h-60',
        'flex',
        'items-end',
        'px-5',
        'py-3',
        'relative',
        'md:h-100',
        'lg:px-0',
      ])}
    >
      <BackgroundImage src={backgroundImageUrl} />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <h1
          className={clsx([
            'px-5',
            'py-3',
            'bg-accent-3/90',
            'backdrop-blur-sm',
            'text-2xl',
            'text-primary-3',
            'w-fit',
            'md:text-5xl',
            'md:px-10',
            'py-5',
          ])}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};
