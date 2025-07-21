'use client';

import { Service } from '@/payload-types';
import clsx from 'clsx';
import type { FC } from 'react';
import { ServicesCard } from './components';

export type ServicesCardsListProps = {
  services: Service[];
};

export const ServicesCardsList: FC<ServicesCardsListProps> = ({ services }) => {
  return (
    <div className={clsx(['w-full'])}>
      <div
        className={clsx([
          'w-full',
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'gap-10',
          'max-w-5xl',
          'mx-auto',
          'px-5',
          'lg:px-0',
          'lg:grid-cols-1',
        ])}
      >
        {services.map((service) => (
          <ServicesCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
