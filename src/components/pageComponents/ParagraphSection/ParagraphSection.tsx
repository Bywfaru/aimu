'use client';

import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

export type ParagraphSectionProps = {
  title?: ReactNode;
  content: ReactNode;
  backgroundColor?: string;
};

export const ParagraphSection: FC<ParagraphSectionProps> = ({
  backgroundColor,
  content,
  title,
}) => {
  return (
    <section className="px-5" style={{ backgroundColor }}>
      <div
        className={clsx(['max-w-5xl', 'mx-auto', 'flex', 'flex-col', 'gap-3'])}
      >
        {!!title && (
          <h2 className={clsx(['text-4xl', 'text-primary-3'])}>{title}</h2>
        )}

        {content}
      </div>
    </section>
  );
};
