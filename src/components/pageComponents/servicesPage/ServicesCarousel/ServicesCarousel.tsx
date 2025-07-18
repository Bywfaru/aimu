'use client';

import type { Service } from '@/app/(app)/services/page';
import { BackgroundImage, Button } from '@/components';
import { NavigationButton } from '@/components/pageComponents/servicesPage/ServicesCarousel/components';
import clsx from 'clsx';
import Link from 'next/link';
import { type FC, useState } from 'react';
import { Controller, Navigation, Pagination } from 'swiper/modules';
import {
  Swiper,
  SwiperClass,
  type SwiperProps,
  SwiperSlide,
} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface ServicesCarouselProps {
  services: Service[];
}

export const ServicesCarousel: FC<ServicesCarouselProps> = ({ services }) => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange: SwiperProps['onSlideChange'] = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

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
      <div className={clsx(['w-full', 'max-w-3xl', 'mx-auto', 'px-5'])}>
        <Swiper
          onSlideChange={handleSlideChange}
          modules={[Controller, Navigation, Pagination]}
          pagination={{ dynamicBullets: true }}
          controller={{ control: secondSwiper }}
          onSwiper={setFirstSwiper}
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
          ])}
        >
          <NavigationButton
            direction="back"
            className={clsx([
              'absolute',
              'top-1/2',
              '-translate-y-[calc(50%+20px)]',
              'z-10',
            ])}
            disabled={currentIndex === 0}
          />

          {services.map((service, index) => (
            <SwiperSlide
              key={`${service.url}_${index}`}
              className={clsx([
                '!flex',
                'justify-center',
                'items-center',
                '!h-auto',
              ])}
            >
              <h2
                className={clsx([
                  'text-center',
                  'text-primary-3',
                  'text-2xl',
                  'md:text-4xl',
                  'uppercase',
                ])}
              >
                {service.name}
              </h2>
            </SwiperSlide>
          ))}

          <NavigationButton
            direction="next"
            className={clsx([
              'absolute',
              'top-1/2',
              '-translate-y-[calc(50%+20px)]',
              'right-0',
              'z-10',
            ])}
            disabled={currentIndex === services.length - 1}
          />
        </Swiper>
      </div>

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <Swiper
          modules={[Controller, Navigation]}
          controller={{ control: firstSwiper }}
          onSwiper={setSecondSwiper}
          className={clsx([
            '[&_.swiper-wrapper]:flex',
            '[&_.swiper-wrapper]:items-stretch',
            '!flex',
            'flex-col',
            'gap-5',
          ])}
        >
          {services.map((service, index) => (
            <SwiperSlide key={`${service.url}_${index}`}>
              <div className={clsx(['w-full', 'flex', 'flex-col', 'gap-10'])}>
                <div
                  className={clsx([
                    'w-full',
                    'flex',
                    'flex-col',
                    'items-center',
                    'gap-5',
                    'max-w-3xl',
                    'mx-auto',
                    'px-5',
                  ])}
                >
                  <div className="text-justify">{service.description}</div>

                  <Link href={service.url}>
                    <Button variant="primary">BOOK NOW</Button>
                  </Link>
                </div>

                <div
                  className={clsx(['w-full', 'relative', 'h-100', 'md:h-150'])}
                >
                  <BackgroundImage src={service.image} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
