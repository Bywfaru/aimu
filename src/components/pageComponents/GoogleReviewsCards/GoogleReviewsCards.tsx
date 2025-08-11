'use client';

import { RichText, type RichTextProps } from '@/components';
import clsx from 'clsx';
import { type places_v1 } from 'googleapis';
import { type FC, useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GoogleReviewCard } from './components';

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
  const [reviewsColumn1, reviewsColumn2] = useMemo(() => {
    if (reviews.length < 2) return [reviews, []];

    return reviews.reduce(
      (prev, curr, index) => {
        if (index % 2 === 0) return [[...prev[0], curr], prev[1]];

        return [prev[0], [...prev[1], curr]];
      },
      [[], []] as [
        places_v1.Schema$GoogleMapsPlacesV1Review[],
        places_v1.Schema$GoogleMapsPlacesV1Review[],
      ],
    );
  }, [reviews]);

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
          'md:flex-row',
        ])}
      >
        {!!reviewsColumn1.length && (
          <div className={clsx(['flex', 'flex-col', 'gap-5', 'md:flex-1'])}>
            {reviewsColumn1.map((review, index) => (
              <GoogleReviewCard
                key={`${review.name}_${index}`}
                review={review}
              />
            ))}
          </div>
        )}

        {!!reviewsColumn2.length && (
          <div className={clsx(['flex', 'flex-col', 'gap-5', 'md:flex-1'])}>
            {reviewsColumn2.map((review, index) => (
              <GoogleReviewCard
                key={`${review.name}_${index}`}
                review={review}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
