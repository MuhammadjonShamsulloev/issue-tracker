'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';

const NavBar = () => {
  const currentLinkPath = usePathname();

  let links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              'text-zinc-900': link.href === currentLinkPath,
              'text-zinc-500': link.href !== currentLinkPath,
              'hover:text-zinc-900 transition-color': true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
