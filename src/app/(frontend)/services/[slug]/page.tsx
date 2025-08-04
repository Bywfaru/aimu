import { BackgroundImage, RichText } from '@/components';
import { Spacer } from '@/components/pageComponents';
import config from '@payload-config';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPayload } from 'payload';
import { type FC } from 'react';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    select: {
      title: true,
    },
  });
  const [service] = services.docs;

  return {
    title: service.title,
  } satisfies Metadata;
};

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const payload = await getPayload({ config });
  const services = await payload
    .find({
      collection: 'services',
      select: {
        slug: true,
      },
    })
    .then((result) => result.docs);

  return services.map((service) => ({
    slug: service.slug,
  }));
};

const ServicesPage: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });
  const [service] = services.docs;
  const media = service.media?.[0];
  const backgroundImage = media
    ? typeof media.item === 'string'
      ? media.item
      : (media.item.url ?? '')
    : '';

  return (
    <main>
      <Spacer mobileHeight={20} />

      <div
        className={clsx([
          'gap-2',
          'text-primary-3',
          'max-w-5xl',
          'mx-auto',
          'px-5',
          'lg:px-0',
          '',
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
          className={clsx([
            'px-5',
            'text-5xl',
            'text-primary-3',
            'w-fit',
            'md:text-7xl',
            'lg:px-0',
          ])}
        >
          {service.title}
        </h1>

        <p
          className={clsx([
            'w-full',
            'px-5',
            'lg:px-0',
            'max-w-5xl',
            'mx-auto',
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
        ])}
      >
        <BackgroundImage src={backgroundImage} />
      </div>

      <Spacer mobileHeight={20} />

      {!!service.description && (
        <>
          <RichText
            data={service.description}
            className={clsx([
              'flex',
              'flex-col',
              'gap-5',
              'w-full',
              'max-w-5xl',
              'mx-auto',
              'px-5',
              'lg:px-0',
              '[&_h2]:text-3xl',
              '[&_h2]:md:text-5xl',
              '[&_h2]:text-primary-3',
              '[&_h3]:text-xl',
              '[&_h3]:md:text-3xl',
              '[&_h3]:text-primary-3',
              '[&_ul]:list-disc',
              '[&_ul]:pl-5',
              '[&_ol]:list-decimal',
              '[&_ol]:pl-5',
            ])}
          />

          <Spacer mobileHeight={40} tabletHeight={80} />
        </>
      )}
    </main>
  );
};

export default ServicesPage;
