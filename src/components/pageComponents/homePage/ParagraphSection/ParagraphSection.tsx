'use client';

import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export interface ParagraphSectionProps {
  title?: ReactNode;
  content: ReactNode;
  sectionClassName?: string;
}

export const ParagraphSection: FC<ParagraphSectionProps> = ({
  content,
  sectionClassName,
  title,
}) => {
  return (
    <section className={clsx(['px-5', 'py-10', 'lg:py-20', sectionClassName])}>
      <div
        className={clsx([
          'max-w-5xl',
          'mx-auto',
          'flex',
          'flex-col',
          'gap-2.5',
        ])}
      >
        {!!title && (
          <h2 className={clsx(['text-4xl', 'text-primary-3'])}>{title}</h2>
        )}

        {content}
      </div>
    </section>
  );
};
