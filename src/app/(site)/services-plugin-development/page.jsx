'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiPackage,
  FiZap,
  FiShield,
  FiCode,
  FiRefreshCw,
  FiChevronDown,
} from 'react-icons/fi';
import { FaWordpress, FaShopify } from 'react-icons/fa';

const featureIcons = [
  {
    icon: <FaWordpress size={24} />,
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
  },
  {
    icon: <FaShopify size={24} />,
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
  },
  {
    icon: <FiCode size={24} />,
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
  },
  {
    icon: <FiShield size={24} />,
    lightBg: 'bg-rose-50 dark:bg-rose-950/80',
    iconColor: 'text-rose-600 dark:text-rose-400',
    borderGlow: 'hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-rose-500/15',
  },
  {
    icon: <FiZap size={24} />,
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
  },
  {
    icon: <FiRefreshCw size={24} />,
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
  },
];

const fallbackStats = [
  { value: '100%', label: 'Conflict-Free Code' },
  { value: '<50ms', label: 'Average Execution Overhead' },
  { value: 'WordPress & Shopify', label: 'Ecosystem Standards' },
  { value: 'Lifetime', label: 'Version Upgrade Compatibility' },
];

const fallbackPoints = [
  'Zero bloat — only the code your site actually needs',
  'Native hook integration with WordPress & WooCommerce',
  'Custom admin settings panel with live previews',
  'Comprehensive automated sanitization and nonce security',
  'Scheduled cron handlers for off-peak processing',
  'Detailed developer documentation and REST API endpoints',
];

const fallbackFeatures = [
  {
    title: 'Custom WordPress & WooCommerce Plugins',
    desc: 'Bespoke payment gateways, advanced product options, multi-vendor commission splits, dynamic shipping calculators, and custom post type workflows.',
  },
  {
    title: 'Shopify Apps & Theme Extensions',
    desc: 'Custom private & public Shopify apps using Remix, Node.js, and Shopify Polaris. Seamless checkout customizations, inventory sync, and webhook automations.',
  },
  {
    title: 'API Hook & Webhook Bridges',
    desc: 'Connect your CMS or custom web app to third-party ERPs, courier services (Steadfast, Pathao, RedX), CRM leads, and automated accounting systems.',
  },
  {
    title: 'Plugin Security Audit & Hardening',
    desc: 'Comprehensive code audits, nonce verification, SQL sanitization, XSS/CSRF prevention, and permission checking to protect against zero-day exploits.',
  },
  {
    title: 'Speed & Database Query Optimization',
    desc: 'High-speed object caching with Redis, optimized transients, lazy database queries, and minimal memory footprint ensuring zero site slowdown.',
  },
  {
    title: 'Legacy Plugin Refactoring & Upgrades',
    desc: 'Modernize outdated PHP 7 plugins to PHP 8.3 standards, fix deprecated function calls, resolve fatal conflicts, and prepare for future CMS updates.',
  },
];

const fallbackFaqs = [
  {
    q: 'Can you develop a plugin that connects WooCommerce to local Bangladesh couriers or payment gateways?',
    a: 'Yes! We specialize in custom WooCommerce integrations for bKash, Nagad, Rocket, Upay, SSLCommerz, and automated consignment generation with Steadfast, Pathao, and RedX couriers.',
  },
  {
    q: 'Will your custom plugin slow down my website?',
    a: 'Never. We write lean, object-oriented code following official WordPress & Shopify engineering guidelines. Assets are conditionally loaded only on pages where needed, queries are indexed, and execution overhead remains under 50ms.',
  },
  {
    q: 'Will my custom plugin continue working when WordPress or WooCommerce updates?',
    a: 'Yes. We strictly utilize official Action Hooks and Filter Hooks rather than modifying core files. This guarantees full compatibility through future CMS and theme version updates.',
  },
  {
    q: 'Can you convert an existing manual business workflow into a private plugin?',
    a: 'Absolutely. Whether you need custom invoice generation, customer loyalty points, subscription billing, or automated inventory sync with Google Sheets, we engineer bespoke solutions tailored to your operational needs.',
  },
];

function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) && val.length > 0 ? val : null;
}

export default function ServicesPluginDevelopmentPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const stats = arr(t, 'pluginDev.stats') || fallbackStats;
  const points = arr(t, 'pluginDev.capability.points') || fallbackPoints;
  const featureItems = arr(t, 'pluginDev.features.items') || fallbackFeatures;
  const faqs = arr(t, 'pluginDev.faq.items') || fallbackFaqs;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/15 to-purple-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
            <FiPackage size={14} />
            <span>{t('pluginDev.hero.badge', 'Plugin & Extension Engineering')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#27003B] dark:text-white mb-6">
            {t('pluginDev.hero.titleStart', 'Custom Plugins Built For ')}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t('pluginDev.hero.titleHighlight', 'Speed & Extensibility.')}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {t(
              'pluginDev.hero.subtitle',
              'From bespoke WooCommerce features and Shopify apps to modular web hooks — we engineer clean, secure, and update-proof plugins tailored to your exact business logic.'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-sm font-bold uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-indigo-500/25"
            >
              <span>{t('pluginDev.hero.ctaPrimary', 'Request Plugin Scope')}</span>
              <FiArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              <span>{t('pluginDev.hero.ctaSecondary', 'Explore All Services')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="relative px-6 py-12 border-y border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#27003B] dark:text-white">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Illustration & Capability Showcase ── */}
      <section className="relative px-6 py-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 bg-gradient-to-b from-indigo-50/50 via-white to-purple-50/50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl flex items-center justify-center">
              <Image
                src="/services/plugin.png"
                alt={t('pluginDev.hero.badge', 'Plugin Development')}
                width={500}
                height={500}
                className="w-full h-full object-contain filter drop-shadow-md"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {t('pluginDev.capability.badge', 'Modular Architecture')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#27003B] dark:text-white">
              {t('pluginDev.capability.title', 'Why Off-The-Shelf Plugins Fail & Custom Wins')}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t(
                'pluginDev.capability.desc',
                'Standard commercial plugins often pack bloated code, unnecessary database tables, and tracking scripts that hurt your Core Web Vitals and leave security vulnerabilities. We build dedicated plugins designed exclusively for your workflow:'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((text, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={16} />
                  <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards Grid ── */}
      <section className="relative px-6 py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 inline-block">
              {t('pluginDev.features.badge', 'Core Capabilities')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#27003B] dark:text-white">
              {t('pluginDev.features.title', 'Full-Spectrum Plugin Engineering')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((feat, idx) => {
              const meta = featureIcons[idx % featureIcons.length];
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all duration-300 ${meta.borderGlow}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${meta.lightBg} ${meta.iconColor} flex items-center justify-center mb-5 shadow-sm`}>
                    {meta.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="relative px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 inline-block">
              {t('pluginDev.faq.badge', 'Questions & Answers')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#27003B] dark:text-white">
              {t('pluginDev.faq.title', 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-100"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown
                      className={`shrink-0 transition-transform duration-200 text-indigo-600 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      size={18}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative px-6 py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block">
            {t('pluginDev.cta.badge', 'Start Your Custom Plugin')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide mb-4 text-[#27003B] dark:text-white">
            {t('pluginDev.cta.title', 'Have a custom feature or integration in mind?')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            {t(
              'pluginDev.cta.desc',
              'Share your requirements, wireframe, or idea. We will architect a clean, robust plugin proposal within 24 hours.'
            )}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold uppercase tracking-wider hover:opacity-95 hover:scale-105 transition-all shadow-xl shadow-indigo-500/25"
          >
            <span>{t('pluginDev.cta.btn', 'Talk to a Plugin Engineer')}</span>
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
