'use client';

import { Button } from '@/components';
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiX,
} from '@icons-pack/react-simple-icons';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

export interface FooterLinkItem {
  href: string;
  label: string;
}

export interface FooterProps {
  links?: FooterLinkItem[];
  contact?: {
    email?: string;
    phone?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export const Footer: FC<FooterProps> = ({
  links = [],
  socialMedia,
  contact,
}) => {
  return (
    <footer
      className={clsx([
        'w-full',
        'bg-primary-3',
        'px-5',
        'py-10',
        'text-text-light',
      ])}
    >
      <div
        className={clsx([
          'w-full',
          'max-w-5xl',
          'mx-auto',
          'flex',
          'flex-col',
          'items-center',
          'gap-20',
        ])}
      >
        <div
          className={clsx(
            'w-full',
            'flex',
            'flex-col',
            'items-center',
            'gap-10',
            'md:flex-row',
            'md:items-start',
          )}
        >
          <Link href="/" className="w-fit">
            <Image
              src="/images/aimu_wordmark_dark_bg.png"
              alt="Aimu logo"
              height={76}
              width={180}
              className="md:hidden"
            />
            <Image
              src="/images/aimu_wordmark_dark_bg.png"
              alt="Aimu logo"
              height={102}
              width={240}
              className={clsx(['hidden', 'md:block'])}
            />
          </Link>

          <div
            className={clsx(['w-full', 'flex', 'justify-between', 'gap-10'])}
          >
            <div className={clsx(['flex', 'flex-col', 'gap-5'])}>
              <ul className={clsx(['flex', 'flex-col', 'list-none', 'gap-3'])}>
                {links.map((link, index) => (
                  <Link
                    key={`${link.href}_${index}`}
                    href={link.href}
                    className={clsx([
                      'underline',
                      'hover:text-accent-2',
                      'w-fit',
                    ])}
                  >
                    <li className="w-fit">{link.label}</li>
                  </Link>
                ))}
              </ul>

              <Link href="/book" className="w-fit">
                <Button variant="secondary">BOOK NOW</Button>
              </Link>
            </div>

            <div className={clsx(['flex', 'flex-col', 'text-right', 'gap-10'])}>
              {!!contact && (
                <div
                  className={clsx([
                    '[&_a]:hover:underline',
                    '[&_a]:hover:text-accent-2',
                  ])}
                >
                  <p className={clsx(['font-brolian', 'text-2xl'])}>
                    Contact Us
                  </p>

                  {!!contact.email && (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  )}
                  {!!contact.phone && (
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  )}
                </div>
              )}

              {!!socialMedia && (
                <div
                  className={clsx([
                    'flex',
                    'flex-col',
                    'items-end',
                    '[&_a]:hover:text-accent-2',
                  ])}
                >
                  <p className={clsx(['font-brolian', 'text-2xl'])}>Socials</p>

                  {!!socialMedia.instagram && (
                    <a href={socialMedia.instagram}>
                      <SiInstagram size={24} />
                    </a>
                  )}
                  {!!socialMedia.facebook && (
                    <a href={socialMedia.facebook}>
                      <SiFacebook size={24} />
                    </a>
                  )}
                  {!!socialMedia.twitter && (
                    <a href={socialMedia.twitter}>
                      <SiX size={24} />
                    </a>
                  )}
                  {!!socialMedia.whatsapp && (
                    <a href={socialMedia.whatsapp}>
                      <SiWhatsapp size={24} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p>
          Designed and developed by{' '}
          <a
            className={clsx(['underline', 'hover:text-accent-2'])}
            href="https://williamhe.dev"
          >
            William He
          </a>{' '}
          @ 2025
        </p>
      </div>
    </footer>
  );
};
