import { PageTitleSection, Spacer } from '@/components/pageComponents';
import { GoogleReviewsCarousel } from '@/components/pageComponents/testimonialsPage';
import clsx from 'clsx';
import { google } from 'googleapis';
import type { Metadata } from 'next';
import { type FC, type ReactNode } from 'react';

export type Testimonial = {
  content: ReactNode;
};

// const TESTIMONIALS: Testimonial[] = [];

export const metadata: Metadata = {
  title: 'Testimonials & Reviews',
  description:
    'Read our testimonials and Google reviews from satisfied clients.',
};

const TestimonialsPage: FC = async () => {
  const places = google.places({
    version: 'v1',
    auth: process.env.GOOGLE_PLACES_API_KEY,
  });
  const place = await places.places.get({
    name: `places/${process.env.GOOGLE_PLACE_ID}`,
    fields: 'reviews,rating',
  });
  const { reviews } = place.data;

  return (
    <main>
      <PageTitleSection
        title="Testimonials & Reviews"
        backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
      />

      <Spacer className="h-10" />

      <div
        className={clsx([
          'w-full',
          'flex',
          'flex-col',
          'items-center',
          'max-w-5xl',
          'gap-5',
          'mx-auto',
        ])}
      >
        <h2
          className={clsx([
            'text-4xl',
            'text-primary-3',
            'text-center',
            'px-5',
          ])}
        >
          Read Our Google Reviews
        </h2>

        <GoogleReviewsCarousel reviews={reviews} />
      </div>

      <Spacer className="h-10" />
    </main>
  );
};

export default TestimonialsPage;
