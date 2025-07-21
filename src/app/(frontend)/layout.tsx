import {
  Footer,
  type FooterLinkItem,
  Navbar,
  type NavbarLinkItem,
} from '@/components';
import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
  title: {
    default: 'Aimu',
    template: '%s | Aimu',
  },
  description:
    'Aimu is a wellness spa in Richmond, BC, Canada, offering a range of services including massage therapy, acupuncture, and more to promote postpartum recovery and overall wellness.',
  openGraph: {
    type: 'website',
    title: 'Aimu',
    images: [
      {
        url: 'https://cdn.williamhe.xyz/aimu_og.jpg',
      },
    ],
  },
};

const navLinks: NavbarLinkItem[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/about-us',
    label: 'About Us',
  },
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/testimonials',
    label: 'Testimonials',
  },
];

const footerLinks: FooterLinkItem[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/book',
    label: 'Booking',
  },
  {
    href: '/testimonials',
    label: 'Testimonials & Reviews',
  },
  {
    href: '/about-us',
    label: 'About Us',
  },
];

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
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
            email: 'info@aimuyvr.com',
          }}
          socialMedia={{
            instagram: 'https://www.instagram.com/aimuyvr',
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
