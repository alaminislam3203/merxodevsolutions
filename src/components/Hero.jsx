'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

function Logo() {
  return (
    <div
      className="flex items-center justify-center select-none p-2.5 px-6 rounded-2xl bg-violet-900/95 dark:bg-transparent shadow-xl shadow-violet-950/25 border border-violet-700/40 dark:border-transparent transition-all"
      aria-label="MerxoDev Solutions"
    >
      <Image
        src="/logo.png"
        alt="MerxoDev Solutions"
        width={160}
        height={40}
        className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform hover:scale-105 duration-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] dark:drop-shadow-none"
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
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

      {/* Background Glows with pulse animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          animationDelay: '3s',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-7xl w-full">
        {/* Badge */}
        <span className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 mt-2 sm:mt-4 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest shadow-sm">
          <span
            className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"
            aria-hidden
          />
          {t('hero.badge')}
        </span>

        {/* Logo */}
        <div className="animate-fade-in-up">
          <Logo />
        </div>

        {/* H1 Heading — Primary SEO keyword */}
        <h1 className="animate-fade-in-up font-hind text-5xl sm:text-7xl lg:text-8xl font-semibold text-[#27003B] dark:text-white leading-tight uppercase tracking-widest">
          {t('hero.headingStart')}{' '}
          <span className="text-[#CCFF00] drop-shadow-sm">{t('hero.headingHighlight')}</span>{' '}
          {t('hero.headingMiddle')}{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
            {t('hero.headingEnd')}
          </span>
        </h1>

        {/* Subtext — Secondary SEO keywords */}
        <p className="animate-fade-in-up max-w-4xl text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-raleway">
          {t('hero.subtext')}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/contact"
            aria-label="Start a project with MerxoDev Solutions"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-95 hover:scale-105 transition-all shadow-lg shadow-violet-500/25 font-raleway uppercase tracking-widest"
          >
            {t('hero.ctaPrimary')}
          </Link>
          <Link
            href="/our-projects"
            aria-label="View MerxoDev Solutions projects"
            className="px-8 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:scale-105 transition-all font-raleway uppercase tracking-widest"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>

        {/* Social Proof */}
        <p className="animate-fade-in-up text-xs text-zinc-400 dark:text-zinc-600 mt-2 font-raleway">
          {t('hero.socialProof')}
        </p>
      </div>
    </section>
  );
}
