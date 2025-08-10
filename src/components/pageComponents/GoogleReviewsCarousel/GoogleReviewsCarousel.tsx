'use client';

import {
  CarouselNavigationButton,
  RichText,
  type RichTextProps,
} from '@/components';
import clsx from 'clsx';
import { type places_v1 } from 'googleapis';
import { type FC, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, type SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { GoogleReviewCard } from './components';
import 'swiper/css/pagination';

export type GoogleReviewsCarouselProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  reviews?: places_v1.Schema$GoogleMapsPlacesV1Review[];
};

export const GoogleReviewsCarousel: FC<GoogleReviewsCarouselProps> = ({
  title,
  content,
  reviews = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange: SwiperProps['onSlideChange'] = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

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
      ])}
    >
      <div
        className={clsx([
          'w-full',
          'max-w-3xl',
          'mx-auto',
          'px-5',
          'flex',
          'flex-col',
          'items-center',
          'gap-5',
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

        <Swiper
          onSlideChange={handleSlideChange}
          modules={[Navigation, Pagination]}
          pagination={{ dynamicBullets: true }}
          className={clsx([
            '[&_.swiper-wrapper]:flex',
            '[&_.swiper-wrapper]:items-stretch',
            '[&_.swiper-pagination]:!relative',
            '[&_.swiper-pagination-bullet]:!opacity-100',
            '[&_.swiper-pagination-bullet]:!bg-accent-1',
            '[&_.swiper-pagination-bullet]:!size-3',
            '[&_.swiper-pagination-bullet-active]:!bg-accent-2',
            '[&_.swiper-pagination-bullet-active]:!size-4',
            '!flex',
            'flex-col',
            'gap-5',
            'w-full',
          ])}
        >
          <CarouselNavigationButton
            direction="back"
            className={clsx([
              'absolute',
              'top-1/2',
              '-translate-y-1/2',
              'z-10',
            ])}
            disabled={currentIndex === 0}
          />

          {reviews.map((review, index) => (
            <SwiperSlide
              key={`${review.name}_${index}`}
              className={clsx([
                '!flex',
                'justify-center',
                'items-center',
                '!h-auto',
              ])}
            >
              <GoogleReviewCard review={review} />
            </SwiperSlide>
          ))}

          <CarouselNavigationButton
            direction="next"
            className={clsx([
              'absolute',
              'top-1/2',
              '-translate-y-1/2',
              'right-0',
              'z-10',
            ])}
            disabled={currentIndex === reviews.length - 1}
          />
        </Swiper>
      </div>
    </div>
  );
};
