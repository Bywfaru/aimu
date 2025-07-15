import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Testimonials & Reviews',
};

const TestimonialsLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default TestimonialsLayout;
