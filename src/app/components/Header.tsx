'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/Menu', label: 'Menu' },
  { href: '/About', label: 'About' },
  { href: '/Contact', label: 'Contact' },
];

const allowedPaths = ['/', '/Home', '/Menu', '/About', '/Contact'];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!allowedPaths.includes(pathname)) return null;

  return (
    <nav className="fixed w-full z-30 top-0 bg-gradient-to-r from-[#7b4b2a] via-black to-[#ff9900] shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <span className="text-white font-extrabold text-lg">CAFE LABAR</span>

        {/* Desktop Navigation */}
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/Order">
            <button className="flex items-center gap-2 bg-yellow-300 text-[#997950] font-semibold text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-400 transition-all">
              <FaShoppingCart className="text-md" />
              Order Now
            </button>
          </Link>
          <Link href="/Admin/dashboard">
            <button className="flex items-center gap-2 bg-white text-[#7b4b2a] font-semibold text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-300 transition-all">
              <FaUserShield />
              Admin
            </button>
          </Link>
        </div>

        {/* Burger Button (Mobile) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 text-white flex flex-col gap-4 p-6 mt-2 rounded-md shadow-md"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2 rounded ${
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'hover:bg-white hover:text-black transition-all'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/Order"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-yellow-300 text-[#997950] font-semibold px-4 py-2 rounded shadow-md hover:bg-yellow-400 transition-all"
              >
                <FaShoppingCart className="text-md" />
                Order Now
              </Link>
            </li>
            <li>
              <Link
                href="/Admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded shadow-md hover:bg-yellow-300 transition-all"
              >
                <FaUserShield />
                Admin
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
