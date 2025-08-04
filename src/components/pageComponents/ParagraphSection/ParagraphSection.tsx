'use client';

import { Button, RichText, type RichTextProps } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

export type ParagraphSectionProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  backgroundColor?: string | null;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | null;
  showButton?: boolean;
  buttonText?: string | null;
  buttonLink?: string | null;
};

export const ParagraphSection: FC<ParagraphSectionProps> = ({
  backgroundColor,
  content,
  title,
  textAlign,
  showButton,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
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
          <h2 className={clsx(['text-4xl', 'text-primary-3', 'text-center'])}>
            <RichText data={title} />
          </h2>
        )}

        <div className={clsx(['flex', 'flex-col', 'items-center', 'gap-5'])}>
          {!!content && (
            <RichText
              data={content}
              className={clsx(['flex', 'flex-col', 'gap-5', 'md:items-center'])}
            />
          )}

          {!!showButton && (
            <Link href={buttonLink ?? '#'} className="w-fit">
              <Button variant="primary">{buttonText}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
