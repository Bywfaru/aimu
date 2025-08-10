import { BackgroundImage } from '@/components';
import clsx from 'clsx';
import type { places_v1 } from 'googleapis';
import { type FC, useEffect, useRef, useState } from 'react';
import { StarRating } from './components';

export type GoogleReviewCardProps = {
  review: places_v1.Schema$GoogleMapsPlacesV1Review;
};

export const GoogleReviewCard: FC<GoogleReviewCardProps> = ({ review }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isClamped, setIsClamped] = useState(false);

  const reviewTextRef = useRef<HTMLParagraphElement | null>(null);

  const toggleIsCollapsed = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    setIsClamped(
      !!reviewTextRef.current &&
        reviewTextRef.current.scrollHeight > reviewTextRef.current.clientHeight,
    );
  }, []);

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
        'h-full',
        'md:flex-row',
        'md:items-start',
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
          'md:text-left',
          'md:items-start',
          'md:w-1/3',
          'md:justify-start',
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

        <div
          className={clsx([
            'flex',
            'gap-1',
            'w-full',
            'justify-center',
            'md:w-fit',
          ])}
        >
          <StarRating rating={review.rating ?? 0} maxRating={5} />
        </div>
      </div>

      {!!review.originalText && (
        <div className={clsx(['flex', 'flex-col', 'gap-3', 'flex-1'])}>
          <p
            ref={reviewTextRef}
            className={clsx([
              'text-justify',
              'w-full',
              { 'line-clamp-7': isCollapsed },
            ])}
          >
            {review.originalText.text}
          </p>

          {isClamped && (
            <button
              className={clsx(['underline', 'hover:no-underline', 'w-fit'])}
              onClick={toggleIsCollapsed}
            >
              {isCollapsed ? 'Show more' : 'Show less'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
