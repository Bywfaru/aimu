'use client';

import { BackgroundImage, RichText, type RichTextProps } from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import type { FC } from 'react';
import { useRef } from 'react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const imageUrl = useMedia(image);

  useGSAP(
    () => {
      gsap.defaults({
        duration: 0.5,
      });

      gsap.to(titleRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom',
        },
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
        },
      });

      gsap.to(backgroundRef.current, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
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
            <h2
              ref={titleRef}
              className={clsx([
                'text-4xl',
                'text-primary-3',
                'translate-y-1/12',
                'opacity-0',
                'md:translate-y-0',
                'md:-translate-x-1/12',
                'transition-all',
              ])}
            >
              <RichText data={title} />
            </h2>
          )}

          {!!content && (
            <div
              ref={contentRef}
              className={clsx([
                'text-justify',
                'translate-y-1/12',
                'opacity-0',
                'md:translate-y-0',
                'md:-translate-x-1/12',
                'transition-all',
              ])}
            >
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
        <BackgroundImage
          ref={backgroundRef}
          src={imageUrl}
          zIndex={0}
          containerClassName={clsx([
            'opacity-0',
            reverse ? 'md:-translate-x-1/12' : 'md:translate-x-1/12',
          ])}
        />
      </div>
    </section>
  );
};
