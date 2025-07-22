import { BackgroundImage } from '@/components';
import { Spacer } from '@/components/pageComponents';
import config from '@payload-config';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical';
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
    : '/images/pexels-kpaukshtite-3242264.jpg';

  return (
    <main>
      <Spacer className="h-5" />

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

      <Spacer className={clsx(['h-5', 'lg:h-10'])} />

      <div className={clsx(['w-full', 'max-w-5xl', 'mx-auto'])}>
        <h1
          className={clsx([
            'px-5',
            'text-3xl',
            'text-primary-3',
            'w-fit',
            'md:text-5xl',
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

      <Spacer className="h-5" />

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

      <Spacer className={clsx(['h-10', 'md:h-20'])} />

      {!!service.description && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: await convertLexicalToHTML({
                data: service.description,
                converters: [],
              }),
            }}
          />

          <Spacer className={clsx(['h-10', 'md:h-20'])} />
        </>
      )}
    </main>
  );
};

export default ServicesPage;
