'use client';

import { RichText, type RichTextProps } from '@/components';
import clsx from 'clsx';
import { type places_v1 } from 'googleapis';
import { type FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { GoogleReviewCard } from './components';
import 'swiper/css/pagination';

export type GoogleReviewsCardsProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  reviews?: places_v1.Schema$GoogleMapsPlacesV1Review[];
};

export const GoogleReviewsCards: FC<GoogleReviewsCardsProps> = ({
  title,
  content,
  reviews = [],
}) => {
  if (!reviews.length) return <p>No reviews to show.</p>;

  return (
    <div
      className={clsx([
        'w-full',
        'max-w-5xl',
        'mx-auto',
        'flex',
        'flex-col',
        'gap-5',
        'px-5',
      ])}
    >
      <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
        {!!title && (
          <h2 className={clsx(['text-4xl', 'text-primary-3', 'text-center'])}>
            <RichText data={title} />
          </h2>
        )}

        {!!content && (
          <RichText
            data={content}
            className={clsx(['flex', 'flex-col', 'gap-3'])}
          />
        )}
      </div>

      <div
        className={clsx([
          'w-full',
          'flex',
          'flex-col',
          'gap-5',
          'px-5',
          'md:grid',
          'md:grid-cols-2',
          'md:gap-y-10',
        ])}
      >
        {reviews.map((review, index) => (
          <GoogleReviewCard key={`${review.name}_${index}`} review={review} />
        ))}
      </div>
    </div>
  );
};
