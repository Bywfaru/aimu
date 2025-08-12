import config from '@payload-config';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const collection = searchParams.get('collection');
  const global = searchParams.get('global');
  const slug = searchParams.get('slug');

  if (secret !== process.env.PAYLOAD_SECRET)
    return new Response('Invalid token', { status: 401 });

  const payload = await getPayload({ config });

  let pathname = '/';

  if (collection) {
    if (!slug)
      return new Response('Slug is required for collections', { status: 400 });

    switch (collection) {
      case 'pages':
        const pages = await payload.find({
          collection: 'pages',
          where: {
            slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
          },
          limit: 1,
        });
        const [page] = pages.docs;

        if (!pages) return new Response('Invalid slug', { status: 401 });

        pathname = page.slug;

        break;
      case 'services':
        const services = await payload.find({
          collection: 'services',
          where: {
            slug: { equals: slug.startsWith('/') ? slug : `/${slug}` },
          },
          limit: 1,
        });
        const [service] = services.docs;

        if (!service) return new Response('Invalid slug', { status: 401 });

        pathname = `/services/${service.slug}`;

        break;
      default:
        return new Response('Invalid collection', { status: 401 });
    }
  } else if (global) {
    switch (global) {
      case 'servicesCatalog':
        pathname = '/services';
        break;
      default:
        pathname = '/';
    }
  }

  const draft = await draftMode();

  draft.enable();

  redirect(pathname);
};
