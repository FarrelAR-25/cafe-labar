'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/Menu', label: 'Menu' },
  { href: '/About', label: 'About' },
  { href: '/Contact', label: 'Contact' },
];

// Halaman yang headernya mau ditampilkan
const allowedPaths = ['/Home', '/Menu', '/About', '/Contact', '/'];

export default function Header() {
  const pathname = usePathname();

  // Jika path tidak termasuk, jangan render header
  if (!allowedPaths.includes(pathname)) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#7b4b2a] via-black to-[#ff9900] fixed w-full z-30 top-0 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-white font-extrabold text-lg select-none">CAFE LABAR</span>
      </div>

      {/* Navigation */}
      <ul className="hidden md:flex space-x-8 font-semibold text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 rounded transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#997950] font-bold shadow-md'
                    : 'text-white hover:underline hover:text-yellow-200'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Order Now Button */}
      <Link href="/Order" className="hidden md:flex">
        <button className="flex items-center gap-2 bg-yellow-300 text-[#997950] font-semibold text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-400 transition-all">
          <FaShoppingCart className="text-md" />
          Order Now
        </button>
      </Link>
    </nav>
  );
}
