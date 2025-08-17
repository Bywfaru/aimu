import { RefreshRouteOnSave, RegisterGSAP } from '@/components';
import { ClientServicePage } from '@/components/pageComponents/servicesPage/ClientServicePage/ClientServicePage';
import config from '@payload-config';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import { type FC } from 'react';

export const revalidate = 86400; // 24 hours;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const services = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
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

  return services.map((service) => {
    const slug = service.slug.startsWith('/')
      ? service.slug.slice(1)
      : service.slug;

    return {
      slug,
    };
  });
};

const ServicePage: FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const services = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
    },
    select: {
      media: true,
      title: true,
      description: true,
      summary: true,
      _status: true,
    },
    limit: 1,
    draft: isDraftModeEnabled,
  });
  const [service] = services.docs;

  if (!service || (service._status !== 'published' && !isDraftModeEnabled))
    notFound();

  return (
    <>
      <RefreshRouteOnSave />
      <RegisterGSAP />

      <ClientServicePage service={service} />
    </>
  );
};

export default ServicePage;
