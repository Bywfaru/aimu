import { BackgroundImage, RichText, type RichTextProps } from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import clsx from 'clsx';
import { type FC } from 'react';

export type ParagraphOverImageProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  image: string | Media;
  contentBackgroundColor?: string | null;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | null;
};

export const ParagraphOverImage: FC<ParagraphOverImageProps> = ({
  image,
  content,
  title,
  contentBackgroundColor,
  textAlign,
}) => {
  const backgroundImageUrl = useMedia(image);

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
        <BackgroundImage src={backgroundImageUrl} />

        <div
          className={clsx([
            'size-full',
            'flex',
            'flex-col',
            'gap-3',
            'max-w-lg',
            'mx-auto',
            'backdrop-blur-sm',
            'px-5',
            'py-8',
            { 'text-left': textAlign === 'left' },
            { 'text-center': textAlign === 'center' },
            { 'text-right': textAlign === 'right' },
            { 'text-justify': textAlign === 'justify' },
          ])}
          style={{ backgroundColor: contentBackgroundColor ?? undefined }}
        >
          {!!title && (
            <h2 className={clsx(['text-4xl', 'text-primary-3'])}>
              <RichText data={title} />
            </h2>
          )}

          {!!content && <RichText data={content} />}
        </div>
      </div>
    </section>
  );
};
