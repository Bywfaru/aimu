import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'About Us',
};

const AboutUsLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default AboutUsLayout;
