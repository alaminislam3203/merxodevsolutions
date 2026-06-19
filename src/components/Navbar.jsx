'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Journey', href: '/our-journey' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Projects', href: '/our-projects' },
];

const bottomNavLinks = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '/our-projects',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Journey',
    href: '/our-journey',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

function Logo() {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <div className="flex items-center">
        <span className="text-base sm:text-lg md:text-xl font-black tracking-widest text-[#27003B] dark:text-white uppercase">
          MER
        </span>
        <span className="text-base sm:text-lg md:text-xl font-thin text-amber-400">
          &#10097;
        </span>
        <span className="text-base sm:text-lg md:text-xl font-thin text-[#27003B] dark:text-white -ml-0.5">
          &#10096;
        </span>
        <span className="text-base sm:text-lg md:text-xl font-black tracking-widest text-[#27003B] dark:text-white uppercase">
          ODEV
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
        <span className="block h-px w-3 sm:w-4 md:w-5 bg-amber-400" />
        <span className="text-[6px] sm:text-[7px] font-bold tracking-[0.3em] sm:tracking-[0.5em] text-amber-400 uppercase">
          Solutions
        </span>
        <span className="block h-px w-3 sm:w-4 md:w-5 bg-amber-400" />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <nav className="hidden md:block fixed top-0 inset-x-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 font-raleway font-semibold uppercase">
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

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle iconOnly />
            <Link
              href="/contact"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity font-raleway uppercase"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Top Bar ─── */}
      <nav className="md:hidden fixed top-0 inset-x-0 z-50 ">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            {/* Call icon */}

            <a
              href="tel:+8801313334279"
              className="flex flex-row items-center justify-center gap-1 px-3 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity"
              aria-label="Hire us"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.22 6.22l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-white text-xs font-bold font-raleway whitespace-nowrap uppercase">
                Hire Us
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-end justify-around px-2 h-16">
          {/* Left 2 icons */}
          {bottomNavLinks.slice(0, 2).map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium font-raleway transition-colors ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-violet-500'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Center CTA — floating */}
          <div className="flex flex-col items-center -mt-6">
            <Link
              href="/contact"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900 hover:opacity-90 transition-opacity"
              aria-label="Get In Touch"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
            <span className="text-[10px] font-medium text-violet-600 dark:text-violet-400 mt-0.5 font-raleway">
              Contact
            </span>
          </div>

          {/* Right icon */}
          {bottomNavLinks.slice(2, 4).map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium font-raleway transition-colors ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-violet-500'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Menu icon */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 hover:text-violet-500 transition-colors font-raleway"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* ─── Mobile Sidebar Backdrop ─── */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Mobile Sidebar Panel ─── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 bg-white dark:bg-zinc-950 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
          <Logo />
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col px-4 py-6 gap-1 uppercase">
          <p className="text-[10px] font-bold tracking-widest text-amber-400 uppercase font-raleway px-3 mb-2">
            Navigation
          </p>
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium font-raleway transition-colors ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-violet-600 dark:hover:text-violet-400'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 shrink-0" />
                )}
                {link.label}
              </Link>
            );
          })}
          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
          {/*   Language Switcher */}
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Sidebar CTA */}
        <div className="absolute bottom-24 left-0 right-0 px-6">
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity font-raleway uppercase"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </>
  );
}
