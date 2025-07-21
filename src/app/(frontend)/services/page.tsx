import { PageTitleSection, Spacer } from '@/components/pageComponents';
import { ServicesCardsList } from '@/components/pageComponents/servicesPage/ServicesCardsList';
import config from '@payload-config';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import { type FC } from 'react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services & Treatments',
};

const ServicesPage: FC = async () => {
  const payload = await getPayload({ config });
  const services = await payload
    .find({
      collection: 'services',
    })
    .then((result) => result.docs);

  return (
    <main>
      <PageTitleSection
        title="Services & Treatments"
        backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
      />
      <Spacer className={clsx(['h-10', 'md:h-20'])} />

      <ServicesCardsList services={services} />

      <Spacer className={clsx(['h-10', 'md:h-20'])} />
    </main>
  );
};

export default ServicesPage;
