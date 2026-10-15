'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FiMapPin,
  FiCode,
  FiBookOpen,
  FiGithub,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiLayers,
  FiCompass,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  BangladeshGeoLangProvider,
  useBangladeshGeoLang,
} from '@/context/BangladeshGeoLangContext';

const NAV_TABS = [
  {
    nameEn: 'Overview',
    nameBn: 'ওভারভিউ',
    href: '/bangladesh-geojson',
    icon: FiCompass,
    badgeEn: 'Home',
    badgeBn: 'হোম',
  },
  {
    nameEn: 'Interactive Demo',
    nameBn: 'লাইভ ডেমো ও ম্যাপ',
    href: '/bangladesh-geojson/demo',
    icon: FiMapPin,
    badgeEn: 'Live Map',
    badgeBn: 'ম্যাপ ভিউ',
  },
  {
    nameEn: 'Documentation',
    nameBn: 'ডকুমেন্টেশন',
    href: '/bangladesh-geojson/docs',
    icon: FiBookOpen,
    badgeEn: 'API & Guide',
    badgeBn: 'API গাইড',
  },
];

function BangladeshGeoLayoutInner({ children }) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const { lang, toggleLang, t } = useBangladeshGeoLang();

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install bangladesh-geojson');
    setCopied(true);
    toast.success('Copied: npm install bangladesh-geojson');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 font-exo selection:bg-emerald-500 selection:text-white">
      {/* Top Banner / Hero Header */}
      <section className="relative pt-28 sm:pt-32 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden bg-gradient-to-b from-emerald-50/20 via-transparent to-transparent dark:from-emerald-950/20">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-500 mb-6"
          >
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t('Home', 'হোম')}
            </Link>
            <span>/</span>
            <Link
              href="/tools"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t('Tools', 'টুলস')}
            </Link>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {t('Bangladesh GeoJSON', 'বাংলাদেশ জিওজেসন')}
            </span>
          </nav>

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  npm v1.0.0
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  MIT License
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40 font-bangla">
                  🇧🇩 ওপেন সোর্স বাংলাদেশ
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-exo-medium text-zinc-900 dark:text-white leading-tight">
                Bangladesh{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  GeoJSON &amp; Data Suite
                </span>
              </h1>

              <p className="max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                {t(
                  'Open-source geographic data for Bangladesh — 8 divisions, 64 districts, 494+ upazilas, 1,349+ postcodes, and boundary GeoJSON. Free, accurate & developer-ready.',
                  'বাংলাদেশ প্রশাসনিক ভৌগোলিক ডাটাবেজ — ৮টি বিভাগ, ৬৪টি জেলা, ৪৯৪+ উপজেলা, ১,৩৪৯+ পোস্টকোড এবং হাই-এক্যুরেট জিওজেসন বাউন্ডারি। Free, open-source & developer-ready.'
                )}
              </p>
            </div>

            {/* Quick Action Buttons with EN / BN Switcher on the right */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* npm install copy button */}
              <button
                type="button"
                onClick={handleCopyInstall}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-mono font-medium transition-all shadow-md shadow-zinc-900/10 cursor-pointer border border-zinc-700"
                title="Click to copy npm install command"
              >
                <span className="text-emerald-400">$</span>
                <span>npm i bangladesh-geojson</span>
                {copied ? (
                  <FiCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <FiCopy className="w-4 h-4 text-zinc-400" />
                )}
              </button>

              {/* GitHub Repo Button */}
              <a
                href="https://github.com/alaminislam3203/bangladesh-geojson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25"
              >
                <FiGithub className="w-4 h-4" />
                <span>GitHub Repo</span>
                <FiExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* EN / BN Language Switcher Button (Directly to the right of GitHub Repo) */}
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold font-mono transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-pointer"
                title={lang === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
              >
                <span
                  className={
                    lang === 'en'
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : 'text-zinc-400'
                  }
                >
                  EN
                </span>
                <span className="text-zinc-300 dark:text-zinc-600">/</span>
                <span
                  className={
                    lang === 'bn'
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold font-bangla'
                      : 'text-zinc-400'
                  }
                >
                  বাংলা
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-transparent">
            {NAV_TABS.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-sm'
                      : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'
                    }`}
                  />
                  <span>{lang === 'bn' ? tab.nameBn : tab.nameEn}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {lang === 'bn' ? tab.badgeBn : tab.badgeEn}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}

export default function BangladeshGeoLayout({ children }) {
  return (
    <BangladeshGeoLangProvider>
      <BangladeshGeoLayoutInner>{children}</BangladeshGeoLayoutInner>
    </BangladeshGeoLangProvider>
  );
}
