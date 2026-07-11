'use client';

import { BackgroundImage, Button } from '@/components';
import type { Service } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { type FC, useRef } from 'react';

export type ServicesCardProps = {
  service: Service;
};

export const ServicesCard: FC<ServicesCardProps> = ({ service }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const media = service.media?.[0];

  useGSAP(
    () => {
      gsap.to(linkRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: linkRef.current,
          start: 'top bottom',
          once: true,
        },
      });
    },
    { scope: linkRef },
  );

  return (
    <Link
      ref={linkRef}
      href={`/services${service.slug}`}
      key={service.id}
      className={clsx([
        'w-full',
        'flex',
        'flex-col',
        'transition-all',
        'hover:scale-101',
        'hover:shadow-lg',
        'lg:flex-row-reverse',
        'opacity-0',
        'translate-y-1/12',
      ])}
    >
      <div
        className={clsx([
          'w-full',
          'h-40',
          'relative',
          { 'bg-accent-3': !media },
          'lg:h-full',
        ])}
      >
        {!!media && (
          <BackgroundImage
            src={
              typeof media.item === 'string'
                ? media.item
                : (media.item.url ?? '')
            }
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        )}
      </div>

      <div
        className={clsx([
          'w-full',
          'flex',
          'flex-col',
          'p-5',
          'gap-3',
          'min-h-85',
          'border-r',
          'border-l',
          'border-b',
          'border-accent-2',
          'lg:border-r-0',
          'lg:border-t',
          'lg:pr-10',
        ])}
      >
        <h2 className={clsx(['text-4xl', 'text-primary-3', 'line-clamp-2'])}>
          {service.title}
        </h2>

        <p className={clsx(['line-clamp-6', 'text-justify'])}>
          {service.summary}
        </p>

        <Button className="mt-auto">LEARN MORE</Button>
      </div>
    </Link>
  );
};
