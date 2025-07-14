'use client';

import { BackgroundImage, Button } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

export const HeroSection: FC = () => {
  return (
    <section
      className={clsx([
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
        src="/images/pexels-yankrukov-7155632.jpg"
        loading="eager"
      />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <div
          className={clsx([
            'px-5',
            'py-10',
            'flex',
            'flex-col',
            'bg-accent-3/90',
            'backdrop-blur-sm',
            'max-w-2/3',
            'gap-5',
            'md:max-w-xl',
          ])}
        >
          <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
            <h2 className={clsx(['text-5xl', 'text-primary-3', 'max-w-2/3'])}>
              Post&shy;partum wellness redefined
            </h2>

            <p className={clsx(['text-xl'])}>
              Give us a visit and discover how we can take your recovery to the
              next level.
            </p>
          </div>

          <Link href="/book" className="w-fit">
            <Button>BOOK NOW</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
