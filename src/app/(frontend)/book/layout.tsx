import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Book a Service',
};

const BookLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default BookLayout;
