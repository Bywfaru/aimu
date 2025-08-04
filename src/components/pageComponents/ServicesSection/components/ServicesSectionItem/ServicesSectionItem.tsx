import { BackgroundImage, Button } from '@/components';
import { useMedia } from '@/hooks';
import type { Service } from '@/payload-types';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

export type ServicesSectionItemProps = {
  service: Service;
};

export const ServicesSectionItem: FC<ServicesSectionItemProps> = ({
  service,
}) => {
  const media = service.media?.[0];
  const backgroundImageUrl = useMedia(media?.item);

  return (
    <Link href={`/services/${service.slug}`} className={clsx(['group'])}>
      <div
        className={clsx([
          'flex',
          'flex-col',
          'p-5',
          'justify-end',
          'relative',
          'h-75',
          'text-text-light',
          'text-2xl',
        ])}
      >
        <BackgroundImage
          src={backgroundImageUrl}
          imageClassName={clsx(['group-hover:scale-105', 'transition'])}
        />

        <div
          className={clsx([
            'absolute',
            'size-full',
            'top-0',
            'left-0',
            'bg-black/60',
            'z-[-1]',
            'md:bg-black/0',
            'md:group-hover:bg-black/60',
            'transition',
            'group-hover:backdrop-blur-xs',
          ])}
        ></div>

        <p className={clsx(['uppercase'])}>{service.title}</p>

        <div
          className={clsx([
            'overflow-hidden',
            'md:max-h-0',
            'md:group-hover:max-h-50',
            'transition-all',
          ])}
        >
          <Button className={clsx(['mt-5'])}>LEARN MORE</Button>
        </div>
      </div>
    </Link>
  );
};
