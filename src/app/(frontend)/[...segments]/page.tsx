import { Blocks, RefreshRouteOnSave, RegisterGSAP } from '@/components';
import { getGooglePlaceData } from '@/lib/utils';
import config from '@payload-config';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import { cache, type FC } from 'react';

export const revalidate = 86400; // 24 hours;

type PageProps = {
  params: Promise<{
    segments: string[];
  }>;
};

const getPageBySlug = cache(async (slug: string, draft: boolean) => {
  const payload = await getPayload({ config });

  return payload.find({
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
    draft,
  });
});

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
    draft: false,
  });

  return pages.docs.reduce(
    (prev, page) => {
      if (!page?.slug) return prev;

      const slug = page.slug.startsWith('/') ? page.slug.slice(1) : page.slug;

      return [...prev, { segments: slug.split('/') }];
    },
    [] as { segments: string[] }[],
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { segments } = await params;
  const slug = segments.length === 1 ? segments[0] : `/${segments.join('/')}`;
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const pages = await getPageBySlug(slug, isDraftModeEnabled);
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
    getPageBySlug(slug, isDraftModeEnabled),
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
      <RegisterGSAP />

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
