import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Services & Treatments',
};

const ServicesLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default ServicesLayout;
