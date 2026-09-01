'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiZap,
  FiShield,
  FiStar,
  FiCheckCircle,
} from 'react-icons/fi';

function Logo() {
  return (
    <div
      className="flex items-center justify-center select-none p-3 px-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-violet-950/10 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-lime-500/50 dark:hover:border-lime-500/50 hover:scale-105 transition-all duration-300 group"
      aria-label="MerxoDev Solutions"
    >
      <Image
        src="/logo.png"
        alt="MerxoDev Solutions"
        width={170}
        height={45}
        className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-md dark:drop-shadow-none"
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
      className="relative py-16 sm:py-24 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MerxoDev Solutions',
            url: 'https://merxodevsolutions.pro.bd',
            logo: 'https://merxodevsolutions.pro.bd/logo.png',
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

      {/* Ambient Pulsing Glow Orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #84cc16, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #06b6d4, #6366f1, transparent 70%)',
          animationDelay: '3s',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center gap-7 px-4 sm:px-6 max-w-6xl w-full">
        {/* Glowing Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-lime-500/10 dark:bg-lime-950/40 text-lime-600 dark:text-[#a3e635] border border-lime-500/30 font-raleway uppercase tracking-widest shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
          <span>{t('hero.badge')}</span>
        </div>

        {/* Brand Logo Presentation */}
        <div className="animate-fade-in-up">
          <Logo />
        </div>

        {/* Primary H1 Heading */}
        <h1 className="font-hind text-4xl sm:text-6xl lg:text-7xl font-bold text-[#27003B] dark:text-white leading-[1.15] uppercase tracking-wide max-w-5xl">
          {t('hero.headingStart')}{' '}
          <span className="text-[#84cc16] dark:text-[#CCFF00] drop-shadow-[0_0_12px_rgba(132,204,22,0.4)]">
            {t('hero.headingHighlight')}
          </span>{' '}
          {t('hero.headingMiddle')}{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent animated-gradient-text">
            {t('hero.headingEnd')}
          </span>
        </h1>

        {/* Secondary Subtitle */}
        <p className="max-w-3xl text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-raleway font-normal">
          {t('hero.subtext')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
          <Link
            href="/contact"
            aria-label="Start a project with MerxoDev Solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
          >
            <span>{t('hero.ctaPrimary')}</span>
            <FiArrowRight size={18} />
          </Link>

          <Link
            href="/our-projects"
            aria-label="View MerxoDev Solutions projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:border-lime-500 hover:text-lime-600 dark:hover:text-[#a3e635] hover:scale-105 transition-all duration-300 font-raleway uppercase tracking-wider shadow-sm"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>

        {/* Trust Highlights Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 text-xs font-semibold text-zinc-500 dark:text-zinc-400 font-raleway">
          <div className="flex items-center gap-1.5">
            <FiZap className="text-amber-500" />
            <span>Fast Sub-Second Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiShield className="text-emerald-500" />
            <span>Clean Scalable Code</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiStar className="text-yellow-400 fill-yellow-400" />
            <span>100% Client Satisfaction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCheckCircle className="text-cyan-500" />
            <span>24/7 Dedicated SLA</span>
          </div>
        </div>

        {/* Social Proof Text */}
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-raleway mt-1">
          {t('hero.socialProof')}
        </p>
      </div>
    </section>
  );
}
