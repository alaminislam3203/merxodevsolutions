'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/MerxoDev-Solutions',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/merxodevsolutions',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.722-8.829L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/merxodevsolutions',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
];

function Logo() {
  return (
    <div
      className="inline-flex items-center select-none transition-transform hover:scale-105 duration-200 group"
      aria-label="MerxoDev Solutions"
    >
      {/* Light Mode Logo */}
      <Image
        src="/logo-light.png"
        alt="MerxoDev Solutions"
        width={135}
        height={32}
        className="block dark:hidden h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-sm"
        style={{ width: 'auto', height: 'auto' }}
      />

      {/* Dark Mode Logo */}
      <Image
        src="/logo.png"
        alt="MerxoDev Solutions"
        width={135}
        height={32}
        className="hidden dark:block h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
}

function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) ? val : [];
}

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = arr(t, 'footer.navLinks');
  const services = arr(t, 'footer.services.items');

  return (
    <footer className="relative bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
      {/* Top Animated Accent Border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animated-gradient-text" />

      {/* Ambient Pulsing Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
        style={{
          // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />

      {/* ── Main Body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block transition-transform hover:scale-105 duration-200">
            <Logo />
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs font-raleway">
            {t('footer.brand.desc')}
          </p>
          <div className="flex items-center gap-3 mt-1">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-white hover:bg-gradient-to-br hover:from-violet-600 hover:to-cyan-500 hover:border-transparent hover:scale-110 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase font-raleway flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {t('footer.quickLinks.heading')}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all font-raleway"
                >
                  <span className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                    ›
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase font-raleway flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {t('footer.services.heading')}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {services.map((service, i) => (
              <li key={i}>
                <Link
                  href={service.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all font-raleway"
                >
                  <span className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                    ›
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {service.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase font-raleway flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {t('footer.contact.heading')}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-raleway">
            {/* Address */}
            <li className="flex items-start gap-2.5 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5 text-violet-500 group-hover:scale-110 transition-transform"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                {t('footer.contact.address')}
              </span>
            </li>
            {/* Phone */}
            <li className="flex items-center gap-2.5 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-violet-500 group-hover:scale-110 transition-transform"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.22 6.22l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div className="flex items-center gap-1.5 flex-wrap">
                <a
                  href="tel:+8801313334279"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors whitespace-nowrap"
                >
                  {t('footer.contact.phone1')}
                </a>
                <span className="text-zinc-300 dark:text-zinc-600">|</span>
                <a
                  href="tel:+8809697634279"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors whitespace-nowrap"
                >
                  {t('footer.contact.phone2')}
                </a>
              </div>
            </li>
            {/* Email */}
            <li className="flex items-center gap-2.5 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-violet-500 group-hover:scale-110 transition-transform"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:merxodevsolutions@gmail.com"
                className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors break-all"
              >
                {t('footer.contact.email')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-zinc-100 dark:border-zinc-800/80 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-500 font-raleway">
          <span>{t('footer.bottom.copy', { year: currentYear })}</span>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {t('footer.bottom.privacy')}
            </Link>
            <Link
              href="/terms"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {t('footer.bottom.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
