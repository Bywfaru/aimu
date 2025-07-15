'use client';

import { Button } from '@/components';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useEffect, useState } from 'react';

export interface NavbarLinkItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  links?: NavbarLinkItem[];
}

export const Navbar: FC<NavbarProps> = ({ links = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleIsMenuOpen = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
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
            'py-3',
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

          <button
            className={clsx(['w-fit', 'md:hidden', 'justify-self-end'])}
            onClick={toggleIsMenuOpen}
          >
            <Menu size={30} className={clsx(['text-text-light'])} />
          </button>

          <Link
            href="/book"
            className={clsx(['hidden', 'md:flex', 'justify-self-end'])}
          >
            <Button variant="secondary">BOOK NOW</Button>
          </Link>
        </div>

        {links.length > 0 && (
          <ul className={clsx(['hidden', 'list-none', 'md:flex', 'px-5'])}>
            {links.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link key={`${link.href}_${index}`} href={link.href}>
                  <li
                    className={clsx([
                      'px-5',
                      'py-3',
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

      <div
        className={clsx([
          'top-0',
          'h-screen',
          'w-screen',
          'fixed',
          'md:hidden',
          'z-50',
          { 'pointer-events-none': !isMenuOpen },
        ])}
      >
        <div
          className={clsx([
            'size-full',
            'backdrop-blur-lg',
            'bg-white/50',
            'absolute',
            'transition',
            isMenuOpen ? 'opacity-100' : 'opacity-0',
            { 'pointer-events-none': !isMenuOpen },
          ])}
        ></div>

        <aside
          className={clsx([
            'h-full',
            'absolute',
            'overflow-y-auto',
            'transition-all',
            'w-4/5',
            'bg-primary-3',
            'border-l-2',
            'border-primary-1',
            'flex',
            'flex-col',
            'py-3',
            'px-5',
            'text-text-light',
            'gap-10',
            isMenuOpen ? 'right-0' : '-right-full',
          ])}
        >
          <div
            className={clsx([
              'w-full',
              'flex',
              'items-center',
              'text-text-light',
              'justify-between',
            ])}
          >
            <Link href="/" className="w-fit">
              <Image
                src="/images/aimu_wordmark_dark_bg.png"
                alt="Aimu logo"
                height={80}
                width={131}
                loading="eager"
              />
            </Link>

            <button className="size-fit" onClick={toggleIsMenuOpen}>
              <X size={32} />
            </button>
          </div>

          <ul
            className={clsx([
              'flex',
              'flex-col',
              'gap-5',
              'text-4xl',
              'text-right',
              'w-full',
              'pb-10',
              'border-b',
              'border-text-light',
            ])}
          >
            {links.map((link, index) => (
              <li key={`${link.href}_${index}`}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <Link href="/book" className={clsx(['w-fit', 'self-end'])}>
            <Button variant="secondary">BOOK NOW</Button>
          </Link>
        </aside>
      </div>
    </>
  );
};
