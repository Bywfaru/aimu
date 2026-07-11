'use client';

import { BackgroundImage, RichText, type RichTextProps } from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { type FC, useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const backgroundImageUrl = useMedia(image);

  useGSAP(
    () => {
      gsap.to(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          once: true,
        },
      });

      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={clsx(['w-full', 'overflow-hidden'])}>
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
        <BackgroundImage
          ref={backgroundRef}
          src={backgroundImageUrl}
          containerClassName={clsx(['scale-125', 'opacity-0'])}
          sizes="(min-width: 1024px) 1024px, 100vw"
        />

        <div
          ref={contentRef}
          className={clsx([
            'opacity-0',
            'translate-y-1/12',
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
