import type { Service } from '@/payload-types';
import { revalidatePath } from 'next/cache';
import { CollectionAfterChangeHook } from 'payload';

export const afterChange: CollectionAfterChangeHook<Service> = async ({
  doc,
}) => {
  if (doc._status === 'published') revalidatePath('/services');

  return doc;
};
