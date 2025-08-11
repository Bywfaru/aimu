import { BackgroundImage } from '@/components';
import clsx from 'clsx';
import type { places_v1 } from 'googleapis';
import { type FC } from 'react';
import { StarRating } from './components';

export type GoogleReviewCardProps = {
  review: places_v1.Schema$GoogleMapsPlacesV1Review;
};

export const GoogleReviewCard: FC<GoogleReviewCardProps> = ({ review }) => {
  return (
    <div
      className={clsx([
        'flex',
        'flex-col',
        'gap-3',
        'items-center',
        'p-5',
        'border',
        'border-accent-2',
        'h-fit',
      ])}
    >
      <div
        className={clsx([
          'w-full',
          'flex',
          'flex-col',
          'items-center',
          'gap-3',
          'text-2xl',
          'text-center',
        ])}
      >
        <div className={clsx(['relative', 'size-10'])}>
          <BackgroundImage src={review.authorAttribution?.photoUri ?? ''} />
        </div>

        <div>
          <p className="font-brolian">
            {review.authorAttribution?.displayName ?? 'Anonymous'}
          </p>

          <p className="text-lg">{review.relativePublishTimeDescription}</p>
        </div>
      </div>

      <div className={clsx(['flex', 'gap-1', 'w-full', 'justify-center'])}>
        <StarRating rating={review.rating ?? 0} maxRating={5} />
      </div>

      {!!review.originalText && (
        <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
          <p className={clsx(['text-justify', 'w-full'])}>
            {review.originalText.text}
          </p>
        </div>
      )}
    </div>
  );
};
