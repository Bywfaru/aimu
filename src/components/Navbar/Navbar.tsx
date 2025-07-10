'use client';

import { Button } from '@/components';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

export interface NavbarLinkItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  links?: NavbarLinkItem[];
}

export const Navbar: FC<NavbarProps> = ({ links = [] }) => {
  const pathname = usePathname();

  return (
    <nav
      className={clsx([
        'sticky',
        'top-0',
        'left-0',
        'w-full',
        'bg-primary-3',
        'border-b-2',
        'border-primary-1',
        'text-text-light',
        'z-50',
      ])}
    >
      <div
        className={clsx([
          'grid',
          'grid-cols-3',
          'px-5',
          'py-2.5',
          'gap-5',
          'items-center',
        ])}
      >
        <Link href="/" className="w-fit">
          <Image
            src="/images/aimu_logo_dark_bg.png"
            alt="Aimu logo"
            height={80}
            width={89}
            loading="eager"
          />
        </Link>

        <Link href="/" className={clsx(['justify-self-center', 'w-fit'])}>
          <Image
            src="/images/aimu_wordmark_dark_bg.png"
            alt="Aimu logo"
            height={80}
            width={131}
            loading="eager"
          />
        </Link>

        <button className={clsx(['w-fit', 'lg:hidden', 'justify-self-end'])}>
          <Menu size={30} className={clsx(['text-text-light'])} />
        </button>

        <Link
          href="/booking"
          className={clsx(['hidden', 'lg:flex', 'justify-self-end'])}
        >
          <Button variant="secondary">BOOK NOW</Button>
        </Link>
      </div>

      {links.length > 0 && (
        <ul className={clsx(['hidden', 'list-none', 'lg:flex', 'px-5'])}>
          {links.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <Link key={`${link.href}_${index}`} href={link.href}>
                <li
                  className={clsx([
                    'px-5',
                    'py-2.5',
                    'border-primary-1',
                    isActive && ['border-b-4', 'text-primary-1'],
                    !isActive && ['hover:text-accent-2'],
                  ])}
                >
                  {link.label}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </nav>
  );
};
