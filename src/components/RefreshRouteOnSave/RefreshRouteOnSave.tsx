'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useIsClient } from 'usehooks-ts';

export const RefreshRouteOnSave: FC = () => {
  const router = useRouter();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={
        process.env.NODE_ENV === 'production'
          ? `https://${window.location.hostname}`
          : window.location.origin
      }
    />
  );
};
