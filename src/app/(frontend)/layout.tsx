import {
  Footer,
  type FooterLinkItem,
  Navbar,
  type NavbarLinkItem,
} from '@/components';
import config from '@payload-config';
import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { getPayload } from 'payload';
import type { FC, PropsWithChildren } from 'react';

const brolian = localFont({
  src: [
    {
      path: '/fonts/Brolian_Light.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-brolian',
});

const amandine = localFont({
  src: [
    {
      path: '/fonts/Amandine_Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '/fonts/Amandine_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/Amandine_Medium.otf',
      weight: '500',
    },
  ],
  variable: '--font-amandine',
});

const dinPro = localFont({
  src: [
    {
      path: '/fonts/DINPro_Light.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-dinPro',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({ slug: 'settings' });

  return {
    title: {
      default: settings.siteTitle,
      template: `%s | ${settings.siteTitle}`,
    },
    description: settings.siteDescription,
    openGraph: {
      type: 'website',
      title: settings.siteTitle,
      images: [
        {
          url: 'https://cdn.williamhe.xyz/aimu_og.jpg',
        },
      ],
    },
  };
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const payload = await getPayload({ config });
  const [nav, footer, settings] = await Promise.all([
    payload.findGlobal({ slug: 'nav' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.findGlobal({ slug: 'settings' }),
  ]);
  const navLinks: NavbarLinkItem[] =
    nav?.items?.map((item) => ({
      label: item.label,
      href: item.url,
    })) ?? [];
  const footerLinks: FooterLinkItem[] =
    footer?.items?.map((item) => ({
      label: item.label,
      href: item.url,
    })) ?? [];

  return (
    <html lang="en">
      <body
        className={clsx([dinPro.variable, brolian.variable, amandine.variable])}
      >
        <Navbar links={navLinks} />

        {children}

        <Footer
          links={footerLinks}
          contact={{
            email: settings?.contactEmail,
          }}
          socialMedia={{
            instagram: settings?.socialMedia?.instagram ?? '',
            facebook: settings?.socialMedia?.facebook ?? '',
            twitter: settings?.socialMedia?.x ?? '',
            whatsapp: settings?.socialMedia?.whatsapp ?? '',
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
