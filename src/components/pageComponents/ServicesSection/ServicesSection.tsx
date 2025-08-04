'use client';

import { Button, RichText, type RichTextProps } from '@/components';
import { ServicesSectionItem } from '@/components/pageComponents/ServicesSection/components';
import { Service } from '@/payload-types';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

export type ServicesSectionProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
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
            {!!title && (
              <h2
                className={clsx(['text-4xl', 'text-primary-3', 'text-center'])}
              >
                <RichText data={title} />
              </h2>
            )}

            {!!content && <RichText data={content} />}
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
          {services.map((service) => (
            <ServicesSectionItem key={service.id} service={service} />
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
