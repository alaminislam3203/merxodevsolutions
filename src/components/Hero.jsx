'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

function Logo() {
  return (
    <div
      className="flex flex-col items-center leading-none select-none"
      aria-label="MerxoDev Solutions"
    >
      <div className="flex items-center gap-0">
        <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-[#27003B] dark:text-white uppercase">
          MER
        </span>
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-thin text-amber-400"
          aria-hidden
        >
          &#10097;
        </span>
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-thin text-[#27003B] dark:text-white -ml-0.5"
          aria-hidden
        >
          &#10096;
        </span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-[#27003B] dark:text-white uppercase">
          ODEV
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1" aria-hidden>
        <span className="block h-px w-8 bg-amber-400" />
        <span className="text-[9px] font-bold tracking-[0.85em] text-amber-400 uppercase">
          Solutions
        </span>
        <span className="block h-px w-8 bg-amber-400" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MerxoDev Solutions',
            url: 'https://merxodevsolutions.com',
            logo: 'https://merxodevsolutions.com/logo.png',
            description:
              'Custom websites, web apps & digital solutions crafted for startups and growing businesses.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Rangpur',
              addressCountry: 'BD',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+8801313334279',
              contactType: 'customer service',
            },
            sameAs: [
              'https://www.facebook.com/merxodevsolutions',
              'https://twitter.com/merxodevsolutions',
              'https://linkedin.com/company/merxodevsolutions',
            ],
          }),
        }}
      />

      {/* Background Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-3xl">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
          <span
            className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"
            aria-hidden
          />
          {t('hero.badge')}
        </span>

        {/* Logo */}
        <Logo />

        {/* H1 Heading — Primary SEO keyword */}
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#27003B] dark:text-white leading-tight uppercase tracking-widest">
          {t('hero.headingStart')}{' '}
          <span className="text-[#CCFF00]">{t('hero.headingHighlight')}</span>{' '}
          {t('hero.headingMiddle')}{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            {t('hero.headingEnd')}
          </span>
        </h1>

        {/* Subtext — Secondary SEO keywords */}
        <p className="max-w-lg text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-raleway">
          {t('hero.subtext')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/contact"
            aria-label="Start a project with MerxoDev Solutions"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 font-raleway uppercase tracking-widest"
          >
            {t('hero.ctaPrimary')}
          </Link>
          <Link
            href="/our-projects"
            aria-label="View MerxoDev Solutions projects"
            className="px-7 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors font-raleway uppercase tracking-widest"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>

        {/* Social Proof */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 font-raleway">
          {t('hero.socialProof')}
        </p>
      </div>
    </section>
  );
}
