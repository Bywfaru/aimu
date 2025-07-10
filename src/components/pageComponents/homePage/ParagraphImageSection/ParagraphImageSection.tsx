import { BackgroundImage } from '@/components';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export interface ParagraphImageSectionProps {
  title: string;
  content: ReactNode;
  image: string;
}

export const ParagraphImageSection: FC<ParagraphImageSectionProps> = ({
  image,
  content,
  title,
}) => {
  return (
    <section
      className={clsx([
        'w-full',
        'flex',
        'flex-col',
        'gap-5',
        'bg-accent-1',
        'lg:flex-row',
        'lg:gap-0',
        'lg:items-stretch',
      ])}
    >
      <div className={clsx(['flex', 'justify-end', 'flex-1'])}>
        <div
          className={clsx([
            'flex',
            'flex-col',
            'gap-2.5',
            'px-5',
            'pt-10',
            'flex-1',
            'lg:max-w-lg',
            'lg:py-20',
            'lg:pr-10',
            'lg:pl-0',
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
          'lg:flex-1',
          'lg:h-auto',
        ])}
      >
        <BackgroundImage src={image} zIndex={0} />
      </div>
    </section>
  );
};
