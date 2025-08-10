import { revalidatePath } from 'next/cache';
import { GlobalAfterChangeHook } from 'payload';

export const afterChange: GlobalAfterChangeHook = async ({ doc }) => {
  if (doc._status === 'published') revalidatePath('/(frontend)', 'layout');

  return doc;
};
