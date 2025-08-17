'use client';

import {
  BackgroundImage,
  Button,
  RichText,
  type RichTextProps,
} from '@/components';
import { useMedia } from '@/hooks';
import type { Media } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { type FC, useRef } from 'react';

export type HeroSectionProps = {
  backgroundImage: string | Media;
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  contentBackgroundColor?: string | null;
  button?: {
    visible?: boolean | null;
    text?: string | null;
    link?: string | null;
    color?: string | null;
    textColor?: string | null;
  } | null;
};

export const HeroSection: FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  content,
  contentBackgroundColor,
  button,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const backgroundImageUrl = useMedia(backgroundImage);

  useGSAP(
    () => {
      gsap.defaults({
        duration: 0.5,
      });

      gsap.to(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
        },
      });

      gsap.to(contentRef.current, {
        translateY: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={clsx([
        'overflow-hidden',
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
      <BackgroundImage
        ref={backgroundRef}
        src={backgroundImageUrl}
        containerClassName={clsx(['scale-125', 'opacity-0'])}
        loading="eager"
      />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <div
          ref={contentRef}
          className={clsx([
            'opacity-0',
            'translate-y-1/12',
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

          {!!button?.visible && (
            <Link href={button.link ?? '#'} className="w-fit">
              <Button>{button.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
