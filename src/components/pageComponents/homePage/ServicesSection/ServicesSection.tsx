'use client';

import { BackgroundImage, Button } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

export interface ServiceItem {
  name: string;
  href: string;
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
    <section className={clsx(['w-full', 'py-10'])}>
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
          <div className={clsx(['flex', 'flex-col', 'gap-2.5'])}>
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
            'lg:grid-cols-2',
            'justify-stretch',
          ])}
        >
          {services.map((service, index) => (
            <Link
              key={`${service.href}_${index}`}
              href={service.href}
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
                    'lg:bg-black/0',
                    'lg:group-hover:bg-black/60',
                    'transition',
                  ])}
                ></div>

                <p className={clsx(['uppercase'])}>{service.name}</p>
                <div
                  className={clsx([
                    'overflow-hidden',
                    'lg:max-h-0',
                    'lg:group-hover:max-h-50',
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
