import type { Page } from '@/payload-types';
import { revalidatePath } from 'next/cache';
import { CollectionAfterChangeHook } from 'payload';

export const afterChange: CollectionAfterChangeHook<Page> = async ({ doc }) => {
  const slug = doc.slug.startsWith('/') ? doc.slug.slice(1) : doc.slug;

  if (doc._status === 'published') revalidatePath(`/${slug}`);

  return doc;
};
