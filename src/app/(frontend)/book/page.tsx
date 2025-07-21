import { BookingWidget, PageTitleSection } from '@/components/pageComponents';
import type { Metadata } from 'next';
import { type FC } from 'react';

export const metadata: Metadata = {
  title: 'Book a Service',
  description: 'Book a service with us online',
};

const BookPage: FC = () => {
  return (
    <main>
      <PageTitleSection
        title="Book a Service"
        backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
      />

      <BookingWidget />
    </main>
  );
};

export default BookPage;
