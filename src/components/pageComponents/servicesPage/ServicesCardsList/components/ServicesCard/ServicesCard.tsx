import { BackgroundImage, Button } from '@/components';
import type { Service } from '@/payload-types';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

export type ServicesCardProps = {
  service: Service;
};

export const ServicesCard: FC<ServicesCardProps> = ({ service }) => {
  const media = service.media?.[0];

  return (
    <Link
      href={`/services/${service.slug}`}
      key={service.id}
      className={clsx([
        'w-full',
        'flex',
        'flex-col',
        'transition-all',
        'hover:scale-101',
        'hover:shadow-lg',
        'lg:flex-row-reverse',
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
