'use client';

import { BackgroundImage, Button } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export interface ServiceItem {
  name: string;
  url: string;
  image: string;
}

export interface ServicesSectionProps {
  title: string;
  content: ReactNode;
  services: ServiceItem[];
}

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
          {services.map((service, index) => (
            <Link
              key={`${service.url}_${index}`}
              href={service.url}
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
                <BackgroundImage src={service.image} />
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

                <p className={clsx(['uppercase'])}>{service.name}</p>
                <div
                  className={clsx([
                    'overflow-hidden',
                    'md:max-h-0',
                    'md:group-hover:max-h-50',
                    'transition-all',
                  ])}
                >
                  <Button className={clsx(['mt-5'])}>BOOK NOW</Button>
                </div>
              </div>
            </Link>
          ))}
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
