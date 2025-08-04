import { Blocks } from '@/components';
import { getGooglePlaceData } from '@/lib/utils';
import config from '@payload-config';
import { getPayload } from 'payload';
import type { FC } from 'react';

export const revalidate = 3600;

const HomePage: FC = async () => {
  const payload = await getPayload({ config });
  const [homepage, services, { reviews }] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }),
    payload.find({
      collection: 'services',
    }),
    getGooglePlaceData(),
  ]);

  if (!homepage?.blocks) return null;

  return (
    <main>
      <Blocks
        blocks={homepage.blocks}
        services={services.docs}
        googleReviews={reviews}
      />
    </main>
  );
};

export default HomePage;
