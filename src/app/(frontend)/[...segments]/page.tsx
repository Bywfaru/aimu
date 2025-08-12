import { Blocks, RefreshRouteOnSave } from '@/components';
import { getGooglePlaceData } from '@/lib/utils';
import config from '@payload-config';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import type { FC } from 'react';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{
    segments: string[];
  }>;
};

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: 'pages',
    select: {
      slug: true,
      title: true,
      description: true,
    },
  });

  return pages.docs.map((doc) => {
    const slug = doc.slug.startsWith('/') ? doc.slug.slice(1) : doc.slug;

    return {
      segments: slug.split('/'),
    };
  });
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { segments } = await params;
  const payload = await getPayload({ config });
  const slug = segments.length === 1 ? segments[0] : `/${segments.join('/')}`;
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
    },
    limit: 10,
    select: {
      title: true,
      description: true,
    },
  });
  const [page] = pages.docs;

  return {
    title: page.title,
    description: page.description,
  };
};

const DynamicPage: FC<PageProps> = async ({ params }) => {
  const { segments } = await params;
  const slug = segments.length === 1 ? segments[0] : `/${segments.join('/')}`;
  const payload = await getPayload({ config });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const [pages, servicesCatalog, { reviews }] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
      },
      limit: 1,
      select: {
        title: true,
        description: true,
        blocks: true,
        _status: true,
      },
      draft: isDraftModeEnabled,
    }),
    payload.findGlobal({
      slug: 'servicesCatalog',
      draft: isDraftModeEnabled,
    }),
    getGooglePlaceData(),
  ]);
  const services = await Promise.all(
    servicesCatalog?.services?.map(async (service) => {
      if (typeof service === 'string') {
        return await payload.findByID({
          collection: 'services',
          id: service,
          draft: isDraftModeEnabled,
        });
      }

      return service;
    }) ?? [],
  );
  const [page] = pages.docs;

  if (page._status !== 'published' && !isDraftModeEnabled) notFound();

  if (!page?.blocks) return null;

  return (
    <>
      <RefreshRouteOnSave />

      <main>
        <Blocks
          blocks={page.blocks}
          services={services}
          googleReviews={reviews}
        />
      </main>
    </>
  );
};

export default DynamicPage;
