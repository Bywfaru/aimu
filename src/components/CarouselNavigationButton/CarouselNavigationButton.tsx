'use client';

import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import type { FC } from 'react';
import { useSwiper } from 'swiper/react';

export type NavigationButtonProps = {
  direction: 'back' | 'next';
  className?: string;
  disabled?: boolean;
};

export const CarouselNavigationButton: FC<NavigationButtonProps> = ({
  className,
  direction,
  disabled = false,
}) => {
  const swiper = useSwiper();

  const handleButtonClick = () => {
    if (!swiper || disabled) return;

    if (direction === 'next') {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={className}
      disabled={disabled}
    >
      <ChevronLeft
        className={clsx([
          disabled ? 'text-primary-3/20' : 'text-primary-3',
          'size-6',
          'md:size-12',
          'transition-colors',
          { 'rotate-180': direction === 'next' },
        ])}
      />
    </button>
  );
};
