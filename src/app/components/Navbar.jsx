'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Journey', href: '/our-journey' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Projects', href: '/our-projects' },
];

function Logo() {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <div className="flex items-center">
        <span className="text-xl font-black tracking-widest text-zinc-900 dark:text-white uppercase">
          MER
        </span>

        {/* X shape: ❯ + ❮ */}
        <span className="text-xl font-black text-amber-400">&#10097;</span>
        <span className="text-xl font-black text-white dark:text-white ml-0">
          &#10096;
        </span>

        <span className="text-xl font-black tracking-widest text-zinc-900 dark:text-white uppercase">
          ODEV
        </span>
      </div>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="block h-px w-5 bg-amber-400" />
        <span className="text-[7px] font-bold tracking-[0.7em] text-amber-400 uppercase">
          Solutions
        </span>
        <span className="block h-px w-5 bg-amber-400" />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="hidden md:inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Get In Touch
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-zinc-700 dark:bg-zinc-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="inline-block text-center px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
