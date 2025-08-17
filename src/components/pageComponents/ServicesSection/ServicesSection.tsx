'use client';

import { Button, RichText, type RichTextProps } from '@/components';
import { ServicesSectionItem } from '@/components/pageComponents/ServicesSection/components';
import { Service } from '@/payload-types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { type FC, useRef } from 'react';

export type ServicesSectionProps = {
  title?: RichTextProps['data'] | null;
  content?: RichTextProps['data'] | null;
  services: Service[];
};

export const ServicesSection: FC<ServicesSectionProps> = ({
  services,
  title,
  content,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.defaults({
        duration: 0.5,
      });

      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom',
        },
      });

      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full">
      <div
        className={clsx([
          'w-full',
          'max-w-5xl',
          'mx-auto',
          'flex',
          'flex-col',
          'items-center',
          'gap-5',
        ])}
      >
        <div
          className={clsx([
            'flex',
            'justify-end',
            'flex-1',
            'px-5',
            'max-w-2xl',
            'mx-auto',
          ])}
        >
          <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
            {!!title && (
              <h2
                ref={titleRef}
                className={clsx([
                  'text-4xl',
                  'text-primary-3',
                  'text-center',
                  'translate-y-1/12',
                  'opacity-0',
                ])}
              >
                <RichText data={title} />
              </h2>
            )}

            {!!content && (
              <div
                ref={contentRef}
                className={clsx(['w-full', 'opacity-0', 'translate-y-1/12'])}
              >
                <RichText
                  data={content}
                  className={clsx(['text-xl', 'text-center'])}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={clsx([
            'w-full',
            'grid',
            'grid-cols-1',
            'md:grid-cols-2',
            'justify-stretch',
          ])}
        >
          {services.map((service) => (
            <ServicesSectionItem key={service.id} service={service} />
          ))}
        </div>

        <Link href="/services" className="w-fit">
          <Button>
            LEARN MORE
            <br />
            ABOUT OUR SERVICES
          </Button>
        </Link>
      </div>
    </section>
  );
};
