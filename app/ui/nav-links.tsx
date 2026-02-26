import {
  ExclamationTriangleIcon,
  MapIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', 
    href: 'https://experience.arcgis.com/experience/31d4fa136a544c32bcaf4d45c2c268e5/page/Home-Page', 
    icon: HomeIcon },
  {
    name: 'High Injury Network',
    href: 'https://experience.arcgis.com/experience/31d4fa136a544c32bcaf4d45c2c268e5/page/High-Injury-Network',
    icon: ExclamationTriangleIcon,
  },
  { name: 'Interactive Map', 
    href: 'https://experience.arcgis.com/experience/31d4fa136a544c32bcaf4d45c2c268e5/page/Interactive-Map', 
    icon: MapIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="navlink flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}