import { BackgroundImage } from '@/components';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export type ParagraphOverImageProps = {
  title: string;
  content: ReactNode;
  image: string;
};

export const ParagraphOverImage: FC<ParagraphOverImageProps> = ({
  image,
  content,
  title,
}) => {
  return (
    <section className="w-full">
      <div
        className={clsx([
          'w-full',
          'max-w-5xl',
          'mx-auto',
          'p-5',
          'relative',
          'md:py-20',
        ])}
      >
        <BackgroundImage src={image} />

        <div
          className={clsx([
            'size-full',
            'flex',
            'flex-col',
            'gap-3',
            'max-w-lg',
            'mx-auto',
            'bg-accent-3/90',
            'backdrop-blur-sm',
            'px-5',
            'py-8',
          ])}
        >
          <h2 className={clsx(['text-4xl', 'text-primary-3'])}>{title}</h2>

          {content}
        </div>
      </div>
    </section>
  );
};
