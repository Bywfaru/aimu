import { Blocks } from '@/components';
import config from '@payload-config';
import { getPayload } from 'payload';
import type { FC } from 'react';

export const revalidate = 3600;

const HomePage: FC = async () => {
  const payload = await getPayload({ config });
  const [homepage, services] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }),
    payload.find({
      collection: 'services',
    }),
  ]);

  if (!homepage?.blocks) return;

  return (
    <main>
      <Blocks blocks={homepage.blocks} />
    </main>
  );
};

export default HomePage;
