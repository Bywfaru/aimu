import { Blocks, RefreshRouteOnSave } from '@/components';
import { getGooglePlaceData } from '@/lib/utils';
import config from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import type { FC } from 'react';

export const revalidate = 3600;

const HomePage: FC = async () => {
  const payload = await getPayload({ config });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const [homepage, services, { reviews }] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', draft: isDraftModeEnabled }),
    payload.find({
      collection: 'services',
    }),
    getGooglePlaceData(),
  ]);

  if (!homepage?.blocks) return null;

  return (
    <>
      <RefreshRouteOnSave />

      <main>
        <Blocks
          blocks={homepage.blocks}
          services={services.docs}
          googleReviews={reviews}
        />
      </main>
    </>
  );
};

export default HomePage;
