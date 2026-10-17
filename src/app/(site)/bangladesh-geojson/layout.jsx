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
    nameAr: 'نظرة عامة',
    nameZh: '概览',
    href: '/bangladesh-geojson',
    icon: FiCompass,
    badgeEn: 'Home',
    badgeBn: 'হোম',
    badgeAr: 'الرئيسية',
    badgeZh: '首页',
  },
  {
    nameEn: 'Interactive Demo',
    nameBn: 'লাইভ ডেমো ও ম্যাপ',
    nameAr: 'عرض تفاعلي وخريطة',
    nameZh: '交互式演示与地图',
    href: '/bangladesh-geojson/demo',
    icon: FiMapPin,
    badgeEn: 'Live Map',
    badgeBn: 'ম্যাপ ভিউ',
    badgeAr: 'خريطة حية',
    badgeZh: '实时地图',
  },
  {
    nameEn: 'Documentation',
    nameBn: 'ডকুমেন্টেশন',
    nameAr: 'التوثيق',
    nameZh: '文档指南',
    href: '/bangladesh-geojson/docs',
    icon: FiBookOpen,
    badgeEn: 'API & Guide',
    badgeBn: 'API গাইড',
    badgeAr: 'API ودليل',
    badgeZh: 'API 与指南',
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
    <div
      className={`min-h-screen bg-white dark:bg-[#060b19] text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500 selection:text-white relative transition-all duration-150 ${
        lang === 'bn' ? 'font-bangla lang-bn' : lang === 'ar' ? 'font-arabic' : 'font-exo'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      data-lang={lang}
      lang={lang}
    >
      {/* Background ambient decorative glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Main Container: Sidebar starts directly under the main navbar */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar Column - starts right under navbar, horizontal row on mobile */}
          <aside className="w-full lg:w-52 shrink-0 lg:sticky lg:top-24 space-y-3 lg:space-y-4">
            <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-2.5 sm:space-y-3">
              {/* Header with Title and active lang indicator */}
              <div className="flex items-center justify-between px-1 pt-0.5">
                {/* <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  {lang === 'bn' ? 'নেভিগেশন মেনু' : 'Navigation Menu'}
                </span> */}
                {/* <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                  {lang === 'bn' ? 'বাংলা' : 'EN'}
                </span> */}
              </div>

              {/* Navigation Menu: Horizontal ROW on mobile, Column on desktop */}
              <nav
                className="flex flex-row lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-1 lg:pb-0"
                aria-label="Bangladesh GeoJSON Navigation"
              >
                {NAV_TABS.map((tab) => {
                  const isActive = pathname === tab.href;
                  const Icon = tab.icon;

                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`group flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-200 border shrink-0 lg:shrink flex-1 lg:flex-initial whitespace-nowrap ${isActive
                        ? 'bg-emerald-600 text-white border-transparent shadow-md shadow-emerald-600/20'
                        : 'bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-800/80 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-800 hover:text-emerald-700 dark:hover:text-emerald-300'
                        }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${isActive
                          ? 'text-white'
                          : 'text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                          }`}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
                          {lang === 'bn' ? tab.nameBn : lang === 'ar' ? tab.nameAr : lang === 'zh' ? tab.nameZh : tab.nameEn}
                        </span>
                        <span
                          className={`text-[10px] font-mono leading-tight mt-0.5 ${isActive
                            ? 'text-emerald-100 opacity-90'
                            : 'text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                            }`}
                        >
                          {lang === 'bn' ? tab.badgeBn : lang === 'ar' ? tab.badgeAr : lang === 'zh' ? tab.badgeZh : tab.badgeEn}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Breadcrumb + (Overview Header ONLY on /bangladesh-geojson) + Children */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-500"
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
              <Link
                href="/bangladesh-geojson"
                className={`transition-colors ${pathname === '/bangladesh-geojson'
                  ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                  : 'hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
              >
                {t('Bangladesh GeoJSON', 'বাংলাদেশ জিওজেসন')}
              </Link>
              {pathname === '/bangladesh-geojson/demo' && (
                <>
                  <span>/</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('Interactive Demo', 'লাইভ ডেমো')}
                  </span>
                </>
              )}
              {pathname === '/bangladesh-geojson/docs' && (
                <>
                  <span>/</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('Documentation', 'ডকুমেন্টেশন')}
                  </span>
                </>
              )}
            </nav>

            {/* Header row (Titles, badges, description, npm copy, GitHub Repo) - ONLY on Overview page! */}
            {pathname === '/bangladesh-geojson' && (
              <div className="pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
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
                        {t('Bangladesh Open Source', 'বাংলাদেশ ওপেন সোর্স')} 🇧🇩
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-exo-medium text-zinc-900 dark:text-white leading-tight">
                      {t('Bangladesh GeoJSON & Data Suite', 'বাংলাদেশ জিওজেসন ও ডেটা স্যুট')}
                    </h1>

                    <p className="max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed">
                      {t(
                        'Open-source geographic data for Bangladesh — 8 divisions, 64 districts, 494+ upazilas, 1,349+ postcodes, and boundary GeoJSON. Free, accurate & developer-ready.',
                        'বাংলাদেশ প্রশাসনিক ভৌগোলিক ডাটাবেজ — ৮টি বিভাগ, ৬৪টি জেলা, ৪৯৪+ উপজেলা, ১,৩৪৯+ পোস্টকোড এবং হাই-এক্যুরেট জিওজেসন বাউন্ডারি। বিনামূল্যে, ওপেন-সোর্স এবং ডেভেলপারদের জন্য প্রস্তুত।'
                      )}
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
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
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <main className="w-full">
              {children}
            </main>
          </div>
        </div>
      </div>
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
