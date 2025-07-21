'use client';

import { BackgroundImage, Button } from '@/components';
import { Service } from '@/payload-types';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export type ServicesSectionProps = {
  title: string;
  content: ReactNode;
  services: Service[];
};

export const ServicesSection: FC<ServicesSectionProps> = ({
  services,
  title,
  content,
}) => {
  return (
    <section className="w-full">
      <div
        className={clsx([
          'w-full',
          'max-w-5xl',
          'mx-auto',
          'flex',
          'flex-col',
          'items-center',
          'gap-5',
        ])}
      >
        <div
          className={clsx([
            'flex',
            'justify-end',
            'flex-1',
            'px-5',
            'max-w-2xl',
            'mx-auto',
          ])}
        >
          <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
            <h2 className={clsx(['text-4xl', 'text-primary-3', 'text-center'])}>
              {title}
            </h2>

            {content}
          </div>
        </div>

        <div
          className={clsx([
            'w-full',
            'grid',
            'grid-cols-1',
            'md:grid-cols-2',
            'justify-stretch',
          ])}
        >
          {services.map((service) => {
            const media = service.media?.[0];

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={clsx(['group'])}
              >
                <div
                  className={clsx([
                    'flex',
                    'flex-col',
                    'p-5',
                    'justify-end',
                    'relative',
                    'h-75',
                    'text-text-light',
                    'text-2xl',
                  ])}
                >
                  <BackgroundImage
                    src={
                      typeof media?.item === 'string'
                        ? media.item
                        : (media?.item.url ?? '')
                    }
                  />

                  <div
                    className={clsx([
                      'absolute',
                      'size-full',
                      'top-0',
                      'left-0',
                      'bg-black/60',
                      'z-[-1]',
                      'md:bg-black/0',
                      'md:group-hover:bg-black/60',
                      'transition',
                    ])}
                  ></div>

                  <p className={clsx(['uppercase'])}>{service.title}</p>

                  <div
                    className={clsx([
                      'overflow-hidden',
                      'md:max-h-0',
                      'md:group-hover:max-h-50',
                      'transition-all',
                    ])}
                  >
                    <Button className={clsx(['mt-5'])}>LEARN MORE</Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link href="/services" className="w-fit">
          <Button>
            LEARN MORE
            <br />
            ABOUT OUR SERVICES
          </Button>
        </Link>
      </div>
    </section>
  );
};
