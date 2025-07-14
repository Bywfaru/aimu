import { BackgroundImage } from '@/components';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export interface ParagraphImageSectionProps {
  title: string;
  content: ReactNode;
  image: string;
  backgroundColor?: string;
  reverse?: boolean;
}

export const ParagraphImageSection: FC<ParagraphImageSectionProps> = ({
  backgroundColor,
  content,
  image,
  title,
  reverse = false,
}) => {
  return (
    <section
      className={clsx([
        'w-full',
        'flex',
        'flex-col',
        'gap-5',
        'md:gap-0',
        'md:items-stretch',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      ])}
      style={{ backgroundColor }}
    >
      <div
        className={clsx([
          'flex',
          'flex-1',
          reverse ? 'justify-start' : 'justify-end',
        ])}
      >
        <div
          className={clsx([
            'flex',
            'flex-col',
            'gap-3',
            'px-5',
            'pt-10',
            'flex-1',
            'md:max-w-lg',
            'md:py-20',
            'md:px-10',
          ])}
        >
          <h2 className={clsx(['text-4xl', 'text-primary-3'])}>{title}</h2>

          {content}
        </div>
      </div>

      <div
        className={clsx([
          'w-full',
          'h-80',
          'relative',
          'md:flex-1',
          'md:h-auto',
        ])}
      >
        <BackgroundImage src={image} zIndex={0} />
      </div>
    </section>
  );
};
