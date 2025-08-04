import { BackgroundImage, RichText, type RichTextProps } from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import clsx from 'clsx';
import type { FC } from 'react';

export type ParagraphImageSectionProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  image: string | Media;
  backgroundColor?: string | null;
  reverse?: boolean;
};

export const ParagraphImageSection: FC<ParagraphImageSectionProps> = ({
  backgroundColor,
  content,
  image,
  title,
  reverse = false,
}) => {
  const imageUrl = useMedia(image);

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
      style={{ backgroundColor: backgroundColor ?? undefined }}
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
            reverse
              ? ['md:pl-10', 'md:pr-5', 'lg:pr-0']
              : ['md:pr-10', 'md:pl-5', 'lg:pl-0'],
            'md:py-20',
          ])}
        >
          {!!title && (
            <h2 className={clsx(['text-4xl', 'text-primary-3'])}>
              <RichText data={title} />
            </h2>
          )}

          {!!content && (
            <div className="text-justify">
              <RichText data={content} />
            </div>
          )}
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
        <BackgroundImage src={imageUrl} zIndex={0} />
      </div>
    </section>
  );
};
