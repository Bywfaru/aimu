'use client';

import { Button, RichText, type RichTextProps } from '@/components';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { type FC, useRef } from 'react';

export type ParagraphSectionProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  backgroundColor?: string | null;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | null;
  button?: {
    visible?: boolean | null;
    text?: string | null;
    link?: string | null;
    color?: string | null;
    textColor?: string | null;
  } | null;
  contentColor?: string | null;
};

export const ParagraphSection: FC<ParagraphSectionProps> = ({
  backgroundColor,
  content,
  title,
  textAlign,
  button,
  contentColor,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom',
          once: true,
        },
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="px-5"
      style={{ backgroundColor: backgroundColor ?? undefined }}
    >
      <div
        className={clsx([
          'max-w-2xl',
          'mx-auto',
          'flex',
          'flex-col',
          'items-center',
          'gap-3',
          { 'text-left': textAlign === 'left' },
          { 'text-center': textAlign === 'center' },
          { 'text-right': textAlign === 'right' },
          { 'text-justify': textAlign === 'justify' },
        ])}
      >
        {!!title && (
          <h2
            ref={titleRef}
            className={clsx([
              'text-4xl',
              'text-primary-3',
              'text-center',
              'opacity-0',
            ])}
          >
            <RichText data={title} />
          </h2>
        )}

        <div
          ref={contentRef}
          className={clsx([
            'flex',
            'flex-col',
            'items-center',
            'gap-5',
            'opacity-0',
            'translate-y-1/12',
          ])}
          style={{ color: contentColor ?? undefined }}
        >
          {!!content && (
            <RichText
              data={content}
              className="md:items-center"
              style={{ color: contentColor ?? undefined }}
            />
          )}

          {!!button?.visible && (
            <Link href={button.link ?? '#'} className="w-fit">
              <Button variant="primary">{button.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
