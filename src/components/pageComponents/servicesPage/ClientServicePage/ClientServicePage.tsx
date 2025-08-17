'use client';

import { BackgroundImage, RichText } from '@/components';
import { Spacer } from '@/components/pageComponents';
import { useMedia } from '@/hooks';
import { Service } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { type FC, useRef } from 'react';

export type ServicesPageProps = {
  service: Pick<Service, 'media' | 'title' | 'summary' | 'description'>;
};

export const ClientServicePage: FC<ServicesPageProps> = ({ service }) => {
  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  const media = service.media?.[0];
  const backgroundImage = useMedia(media?.item);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          duration: 0.5,
          delay: -0.25,
        },
      });

      timeline
        .to(breadcrumbRef.current, { opacity: 1, x: 0 })
        .to(titleRef.current, { opacity: 1, x: 0 })
        .to(summaryRef.current, { opacity: 1, x: 0 })
        .to(imageRef.current, { opacity: 1, scale: 1, duration: 1 })
        .to(descriptionRef.current, { opacity: 1, x: 0, delay: -0.75 });
    },
    { scope: mainRef },
  );

  return (
    <main ref={mainRef}>
      <Spacer mobileHeight={20} />

      <div
        ref={breadcrumbRef}
        className={clsx([
          'gap-2',
          'text-primary-3',
          'max-w-5xl',
          'mx-auto',
          'px-5',
          'lg:px-0',
          'opacity-0',
          '-translate-x-1/12',
        ])}
      >
        <p>
          <Link
            href="/services"
            className={clsx(['hover:underline', 'gap-1', 'lg:pl-0'])}
          >
            <ChevronLeft size={16} className={clsx(['inline-block', 'mb-1'])} />{' '}
            Services
          </Link>{' '}
          / {service.title}
        </p>
      </div>

      <Spacer mobileHeight={20} desktopHeight={40} />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <h1
          ref={titleRef}
          className={clsx([
            'px-5',
            'text-5xl',
            'text-primary-3',
            'w-fit',
            'md:text-7xl',
            'lg:px-0',
            'opacity-0',
            '-translate-x-1/12',
          ])}
        >
          {service.title}
        </h1>

        <p
          ref={summaryRef}
          className={clsx([
            'w-full',
            'px-5',
            'lg:px-0',
            'max-w-5xl',
            'mx-auto',
            'opacity-0',
            '-translate-x-1/12',
          ])}
        >
          {service.summary}
        </p>
      </div>

      <Spacer mobileHeight={20} />

      <div
        className={clsx([
          'w-full',
          'max-w-5xl',
          'mx-auto',
          'relative',
          'h-75',
          'lg:h-100',
          'overflow-hidden',
        ])}
      >
        <BackgroundImage
          ref={imageRef}
          src={backgroundImage}
          containerClassName={clsx(['opacity-0', 'scale-125'])}
          loading="eager"
        />
      </div>

      <Spacer mobileHeight={20} />

      {!!service.description && (
        <div
          ref={descriptionRef}
          className={clsx(['w-full', 'opacity-0', '-translate-x-1/12'])}
        >
          <RichText
            data={service.description}
            className={clsx(['px-5', 'lg:px-0'])}
          />

          <Spacer mobileHeight={40} tabletHeight={80} />
        </div>
      )}
    </main>
  );
};
