import { RefreshRouteOnSave } from '@/components';
import { PageTitleSection, Spacer } from '@/components/pageComponents';
import { ServicesCardsList } from '@/components/pageComponents/servicesPage/ServicesCardsList';
import config from '@payload-config';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { type FC } from 'react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services & Treatments',
};

const ServicesPage: FC = async () => {
  const payload = await getPayload({ config });
  const { isEnabled: isDraftModeEnabled } = await draftMode();
  const servicesCatalog = await payload.findGlobal({
    slug: 'servicesCatalog',
    draft: isDraftModeEnabled,
  });
  const services = await Promise.all(
    servicesCatalog?.services?.map(async (service) => {
      if (typeof service === 'string') {
        return await payload.findByID({
          collection: 'services',
          id: service,
          draft: isDraftModeEnabled,
        });
      }

      return service;
    }) ?? [],
  );

  return (
    <>
      <RefreshRouteOnSave />

      <main>
        <PageTitleSection
          title="Services & Treatments"
          backgroundImage="/images/pexels-kpaukshtite-3242264.jpg"
        />
        <Spacer mobileHeight={40} tabletHeight={80} />

        <ServicesCardsList services={services} />

        <Spacer mobileHeight={40} tabletHeight={80} />
      </main>
    </>
  );
};

export default ServicesPage;
