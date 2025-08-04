import type { Media } from '@/payload-types';
import { useMemo } from 'react';

export const useMedia = (media?: string | Media | null) => {
  return useMemo(
    () => (typeof media === 'string' ? media : (media?.url ?? '')),
    [media],
  );
};
