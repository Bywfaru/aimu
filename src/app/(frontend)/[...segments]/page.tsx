import { Blocks } from '@/components';
import { getGooglePlaceData } from '@/lib/utils';
import config from '@payload-config';
import type { Metadata } from 'next';
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

  return pages.docs.map((doc) => ({
    segments: doc.slug.split('/'),
  }));
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
      slug: { equals: slug },
    },
    limit: 1,
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

  const [pages, services, { reviews }] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      select: {
        title: true,
        description: true,
        blocks: true,
      },
    }),
    payload.find({
      collection: 'services',
    }),
    getGooglePlaceData(),
  ]);
  const [page] = pages.docs;

  if (!page?.blocks) return null;

  return (
    <main>
      <Blocks
        blocks={page.blocks}
        services={services.docs}
        googleReviews={reviews}
      />
    </main>
  );
};

export default DynamicPage;
