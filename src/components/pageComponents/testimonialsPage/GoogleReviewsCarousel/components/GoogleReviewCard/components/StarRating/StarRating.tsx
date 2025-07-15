import clsx from 'clsx';
import { Star, StarHalf } from 'lucide-react';
import type { FC } from 'react';

export interface StarRatingProps {
  rating?: number;
  maxRating: number;
}

export const StarRating: FC<StarRatingProps> = ({ maxRating, rating = 0 }) => {
  const numFullStars = Math.floor(rating);
  const hasHalfStar = rating - numFullStars >= 0.5;

  return (
    <div className={clsx(['flex', 'relative', 'gap-1', 'text-google-star'])}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star key={index} size={16} />
      ))}

      <div
        className={clsx([
          'flex',
          'absolute',
          'gap-1',
          'text-google-star',
          'top-0',
          'left-0',
        ])}
      >
        {Array.from({ length: numFullStars }).map((_, index) => (
          <Star key={index} size={16} className="fill-google-star" />
        ))}

        {hasHalfStar && <StarHalf size={16} className="fill-google-star" />}
      </div>
    </div>
  );
};
