'use client';

import { useState } from 'react';
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
  FiCode,
  FiCpu,
  FiLayers,
  FiTerminal,
  FiActivity,
  FiTrendingUp,
  FiClock,
} from 'react-icons/fi';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

function Logo() {
  return (
    <div
      className="flex items-center justify-center select-none py-2 px-6 rounded-2xl hover:border-violet-500/40 dark:hover:border-cyan-500/40 hover:scale-105 transition-all duration-300 group"
      aria-label="MerxoDev Solutions"
    >
      {/* Light Mode Logo */}
      <Image
        src="/logo-light.png"
        alt="MerxoDev Solutions"
        width={160}
        height={42}
        className="block dark:hidden h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-300 drop-shadow-sm"
        style={{ width: 'auto', height: 'auto' }}
        priority
      />

      {/* Dark Mode Logo */}
      <Image
        src="/logo.png"
        alt="MerxoDev Solutions"
        width={160}
        height={42}
        className="hidden dark:block h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('performance');

  const capabilities = [
    {
      id: 'performance',
      label: 'Ultra-Fast Performance',
      icon: <FiZap className="w-4 h-4 text-amber-400" />,
      metric: '< 0.45s',
      metricLabel: 'Page Load Speed',
      title: 'Built with Next.js 15 & Cloud Native Edge',
      description:
        'We engineer blazing fast web platforms with sub-second page loads, automated edge caching, and 99+ Google Core Web Vitals scores to maximize your conversions.',
      techTag: 'Edge SSR • Turbo Cache',
    },
    {
      id: 'scalability',
      label: 'Enterprise Scalability',
      icon: <FiCpu className="w-4 h-4 text-cyan-400" />,
      metric: '99.9%',
      metricLabel: 'Guaranteed SLA Uptime',
      title: 'Neon Postgres, Prisma & Distributed Cloud',
      description:
        'Resilient architecture designed to scale seamlessly from your first 1,000 users to millions of transactions without downtime or performance degradation.',
      techTag: 'Serverless DB • Microservices',
    },
    {
      id: 'uiux',
      label: 'High-Converting UI/UX',
      icon: <FiLayers className="w-4 h-4 text-violet-400" />,
      metric: '4.8×',
      metricLabel: 'Higher User Engagement',
      title: 'Pixel-Perfect Modern Interfaces',
      description:
        'Custom glassmorphism aesthetics, responsive micro-animations, and intuitive user journeys tailored to transform everyday visitors into loyal paying customers.',
      techTag: 'Modern CSS • Dynamic Motion',
    },
  ];

  const currentCap =
    capabilities.find((c) => c.id === activeTab) || capabilities[0];

  return (
    <section
      aria-label="Hero"
      className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'MerxoDev Solutions',
            url: 'https://merxodevsolutions.pro.bd',
            logo: 'https://merxodevsolutions.pro.bd/logo.png',
            description:
              'Custom websites, web apps & digital solutions crafted for startups and growing businesses in Bangladesh and worldwide.',
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



      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 px-4 sm:px-6 max-w-6xl w-full">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Glowing Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-lime-500/10 dark:bg-lime-950/40 text-lime-600 dark:text-[#a3e635] border border-lime-500/30 font-raleway uppercase tracking-widest shadow-sm hover:border-lime-500/60 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
            </span>
            <span>{t('hero.badge')}</span>
          </div>

          {/* Quick SLA Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 border border-violet-500/20 font-raleway">
            <FiZap className="w-3.5 h-3.5 text-amber-500" />
            <span>Next-Gen Full-Stack Agency</span>
          </div>
        </div>

        {/* Brand Logo Presentation with Glow Accent */}
        <div className="animate-fade-in-up">
          <Logo />
        </div>

        {/* Primary H1 Heading */}
        <h1 className="font-hind text-4xl sm:text-6xl lg:text-7xl font-bold text-[#27003B] dark:text-white leading-[1.12] sm:leading-[1.14] uppercase tracking-wide max-w-5xl">
          {t('hero.headingStart')}{' '}
          <span className="relative inline-block text-[#84cc16] dark:text-[#CCFF00] drop-shadow-[0_0_20px_rgba(132,204,22,0.45)]">
            {t('hero.headingHighlight')}
          </span>{' '}
          {t('hero.headingMiddle')}{' '}
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent animated-gradient-text drop-shadow-sm">
            {t('hero.headingEnd')}
          </span>
        </h1>

        {/* Secondary Subtitle */}
        <p className="max-w-3xl text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-raleway font-normal">
          {t('hero.subtext')}
        </p>

        {/* Action Buttons with High-Impact Hover States */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
          <Link
            href="/contact"
            aria-label="Start a project with MerxoDev Solutions"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white text-sm font-black uppercase tracking-wider font-raleway shadow-lg shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/45 hover:scale-[1.03] transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <span className="relative z-10">{t('hero.ctaPrimary')}</span>
            <FiArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-200"
            />
          </Link>

          <Link
            href="/our-projects"
            aria-label="View MerxoDev Solutions projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl text-sm font-bold text-zinc-800 dark:text-zinc-100 hover:border-lime-500/80 hover:text-lime-600 dark:hover:text-[#a3e635] hover:shadow-md hover:scale-[1.03] transition-all duration-300 font-raleway uppercase tracking-wider shadow-sm"
          >
            <span>{t('hero.ctaSecondary')}</span>
          </Link>
        </div>

        {/* Social Proof Avatar & Rating Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 font-raleway">
          {/* Overlapping client avatars mockup */}
          <div className="flex items-center -space-x-2">
            <span className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-violet-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
              MD
            </span>
            <span className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-cyan-500 to-teal-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
              BD
            </span>
            <span className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
              GL
            </span>
            <span className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-800 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
              +47
            </span>
          </div>

          {/* Rating & Trust Text */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-semibold">
            <div className="flex items-center text-amber-400">
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
              <FiStar className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-[#27003B] dark:text-white">4.9/5</span>
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>{t('hero.socialProof')}</span>
          </div>
        </div>

        {/* ── Interactive Tech Console & Product Showcase Card ── */}
        <div className="w-full mt-4 max-w-5xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-violet-950/10 dark:shadow-blue-950/20 overflow-hidden text-left transition-all duration-300">
          {/* Top Console Window Bar */}
          <div className="px-5 py-3.5 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-100/70 dark:bg-zinc-950/50 flex flex-wrap items-center justify-between gap-3">
            {/* macOS traffic light dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                merxodev-core-v2.6.prod.ts
              </span>
            </div>

            {/* Interactive Capability Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 text-xs font-semibold font-raleway">
              {capabilities.map((cap) => (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveTab(cap.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${activeTab === cap.id
                    ? 'bg-white dark:bg-zinc-900 text-violet-600 dark:text-cyan-400 shadow-sm font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  {cap.icon}
                  <span className="hidden md:inline">{cap.label}</span>
                </button>
              ))}
            </div>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE • READY</span>
            </div>
          </div>

          {/* Console Body: Details & Live Metrics Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Capability Highlight */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-violet-600 dark:text-cyan-400 uppercase tracking-wider">
                <FiTerminal className="w-4 h-4" />
                <span>{currentCap.techTag}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-raleway text-[#27003B] dark:text-white tracking-tight">
                {currentCap.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                {currentCap.description}
              </p>
            </div>

            {/* Right: Key Performance Metric Card */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-violet-600/10 via-cyan-500/10 to-transparent border border-violet-500/20 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-raleway">
                  Live Benchmark
                </span>
                <span className="p-1.5 rounded-lg bg-white/60 dark:bg-zinc-800/60 text-violet-500">
                  <FiActivity className="w-4 h-4" />
                </span>
              </div>

              <div>
                <span className="text-4xl sm:text-5xl font-black font-raleway bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  {currentCap.metric}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300 mt-1 font-raleway">
                  {currentCap.metricLabel}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-raleway">
                <span>Verified in Production</span>
                <span className="flex items-center gap-1 text-emerald-500 font-bold">
                  <FiCheckCircle size={13} /> 100% Passed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Modern Tech Stack Badges Strip ── */}
        <div className="w-full pt-4 flex flex-col items-center gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 font-raleway">
            Engineered With State-Of-The-Art Technologies
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold font-raleway text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-violet-500/50 transition-colors">
              <SiNextdotjs className="text-zinc-900 dark:text-white" />
              <span>Next.js 15</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-cyan-500/50 transition-colors">
              <SiReact className="text-cyan-500" />
              <span>React 19</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-blue-500/50 transition-colors">
              <SiTypescript className="text-blue-500" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-emerald-500/50 transition-colors">
              <SiNodedotjs className="text-emerald-500" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-sky-500/50 transition-colors">
              <SiPostgresql className="text-sky-500" />
              <span>PostgreSQL</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-teal-500/50 transition-colors">
              <SiTailwindcss className="text-teal-400" />
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-amber-500/50 transition-colors">
              <FaAws className="text-amber-500" />
              <span>AWS Cloud</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 hover:border-blue-400/50 transition-colors">
              <SiDocker className="text-blue-400" />
              <span>Docker</span>
            </div>
          </div>
        </div>

        {/* ── Trust Highlights Strip ── */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
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
      </div>
    </section>
  );
}
