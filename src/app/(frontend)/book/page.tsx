import { BookingWidget, PageTitleSection } from '@/components/pageComponents';
import { type FC } from 'react';

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
