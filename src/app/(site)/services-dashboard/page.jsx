'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiZap,
  FiDatabase,
  FiActivity,
  FiTrendingUp,
  FiLayers,
  FiDownload,
  FiLock,
  FiKey,
  FiSmartphone,
  FiUsers,
  FiServer,
  FiChevronDown,
  FiBarChart2,
  FiGlobe,
  FiShoppingCart,
  FiClock,
  FiCheck,
} from 'react-icons/fi';
import { FaChartPie, FaTable } from 'react-icons/fa';

// ── Visual Icon/Color Configurations (language agnostic) ───────────────────────
const featureIcons = [
  {
    icon: <FiLock size={22} />,
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    accent: 'from-violet-500 to-indigo-600',
    borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
  },
  {
    icon: <FiBarChart2 size={22} />,
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    accent: 'from-cyan-500 to-teal-500',
    borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
  },
  {
    icon: <FiShoppingCart size={22} />,
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'from-amber-500 to-orange-500',
    borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
  },
  {
    icon: <FiLayers size={22} />,
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'from-emerald-500 to-teal-500',
    borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
  },
  {
    icon: <FiDownload size={22} />,
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    accent: 'from-pink-500 to-rose-500',
    borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
  },
  {
    icon: <FiUsers size={22} />,
    lightBg: 'bg-blue-50 dark:bg-blue-950/80',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'from-blue-500 to-cyan-500',
    borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
  },
  {
    icon: <FiShield size={22} />,
    lightBg: 'bg-red-50 dark:bg-red-950/80',
    iconColor: 'text-red-600 dark:text-red-400',
    accent: 'from-red-500 to-rose-600',
    borderGlow: 'hover:border-red-400 dark:hover:border-red-600 hover:shadow-red-500/15',
  },
  {
    icon: <FiKey size={22} />,
    lightBg: 'bg-teal-50 dark:bg-teal-950/80',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'from-teal-500 to-emerald-500',
    borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
  },
  {
    icon: <FiSmartphone size={22} />,
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'from-indigo-500 to-purple-600',
    borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
  },
];

const techStack = [
  { label: 'Next.js 15', category: 'Frontend' },
  { label: 'React 19', category: 'Frontend' },
  { label: 'Tailwind CSS', category: 'Frontend' },
  { label: 'Recharts', category: 'Charting' },
  { label: 'TanStack Table', category: 'Charting' },
  { label: 'Chart.js / Apex', category: 'Charting' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Prisma ORM', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'Redis Cache', category: 'Caching' },
  { label: 'WebSockets / SSE', category: 'Caching' },
  { label: 'Vercel Edge', category: 'Hosting' },
  { label: 'AWS Cloud', category: 'Hosting' },
];

const relatedMeta = [
  {
    icon: <FiShoppingCart size={20} />,
    href: '/services-ecommerce',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950',
  },
  {
    icon: <FiGlobe size={20} />,
    href: '/services-web-app',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-950',
  },
  {
    icon: <FiDatabase size={20} />,
    href: '/services-database',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
];

function arr(t, key, fallback = []) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) ? val : fallback;
}

export default function ServicesDashboardPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('analytics');
  const [openFaq, setOpenFaq] = useState(null);

  const stats = arr(t, 'dashboard.stats', [
    { value: '<100ms', label: 'Average Query Latency' },
    { value: '99.99%', label: 'Operational Availability' },
    { value: '100%', label: 'Role-Based Access Precision' },
    { value: '0%', label: 'Data Vulnerability / Leakage' },
  ]);

  const features = arr(t, 'dashboard.features.items', []);
  const processSteps = arr(t, 'dashboard.process.steps', []);
  const plans = arr(t, 'dashboard.pricing.plans', []);
  const faqs = arr(t, 'dashboard.faq.items', []);
  const related = arr(t, 'dashboard.related.items', [
    { label: 'E-Commerce Solutions' },
    { label: 'Custom Web Applications' },
    { label: 'Database Architecture' },
  ]);

  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[520px] rounded-full bg-gradient-to-br from-cyan-200/50 via-violet-200/40 to-teal-100/30 dark:from-cyan-950/60 dark:via-violet-950/40 dark:to-teal-950/30 opacity-60 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-exo-medium mb-5"
          >
            <Link href="/" className="hover:text-violet-500 transition-colors">
              {t('dashboard.breadcrumb.home', 'Home')}
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-violet-500 transition-colors">
              {t('dashboard.breadcrumb.services', 'Services')}
            </Link>
            <span>/</span>
            <span className="text-cyan-500">
              {t('dashboard.breadcrumb.current', 'Admin Dashboards')}
            </span>
          </nav>

          {/* Badge */}
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-4">
            {t('dashboard.badge', 'Admin & Analytics Portals')}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black uppercase font-exo-medium mb-6 leading-tight">
            {t('dashboard.heroTitleStart', 'High-Performance Admin Dashboards &')}{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
              {t('dashboard.heroTitleHighlight', 'Real-Time BI Portals')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            {t(
              'dashboard.heroDesc',
              'Take total command of your operations with custom-engineered admin panels, multi-role RBAC, real-time analytics, and automated reporting designed specifically for your business workflow.'
            )}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 text-white text-sm font-bold font-exo-extralight hover:opacity-95 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer"
            >
              {t('dashboard.ctaGetDemo', 'Request Custom Demo')} <FiArrowRight size={16} />
            </Link>
            <Link
              href="/our-projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-sm font-bold font-exo-extralight hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors"
            >
              {t('dashboard.ctaViewWork', 'Explore Solutions')}
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="flex items-center gap-2.5 p-2 rounded-lg">
              <FiZap className="text-cyan-500 shrink-0" size={17} />
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {t('dashboard.trust.telemetry', 'WebSocket & SSE Live Telemetry')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg">
              <FiLock className="text-violet-500 shrink-0" size={17} />
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {t('dashboard.trust.rbac', 'Granular Multi-Role RBAC')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg">
              <FiActivity className="text-teal-500 shrink-0" size={17} />
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {t('dashboard.trust.speed', 'Sub-100ms Query Latency')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-lg">
              <FiDownload className="text-amber-500 shrink-0" size={17} />
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {t('dashboard.trust.exports', '1-Click Excel & PDF Exports')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Staging Preview Section ── */}
      <section className="px-6 pb-20">
        <div className="max-w-[1240px] mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-violet-500/20 to-transparent shadow-2xl shadow-cyan-500/10">
            <div className="rounded-[22px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-5 sm:p-8 overflow-hidden">
              {/* Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                      {t('dashboard.preview.badge', 'Live System Staging')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-exo-medium text-zinc-900 dark:text-zinc-100">
                    {t('dashboard.preview.title', 'Unified Operations Command Center')}
                  </h3>
                </div>

                {/* Interactive View Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl">
                  {[
                    { id: 'analytics', label: t('dashboard.preview.tabAnalytics', 'Live Telemetry') },
                    { id: 'users', label: t('dashboard.preview.tabUsers', 'Role Permissions') },
                    { id: 'orders', label: t('dashboard.preview.tabOrders', 'Transactions') },
                    { id: 'health', label: t('dashboard.preview.tabHealth', 'Server Health') },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-white dark:bg-zinc-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Live Mock KPI Scorecards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span>{t('dashboard.preview.metricRevenue', 'Total Gross Volume')}</span>
                    <FiTrendingUp className="text-emerald-500" />
                  </div>
                  <p className="text-2xl font-black font-exo-medium text-zinc-900 dark:text-zinc-50">
                    ৳2,845,900
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    {t('dashboard.preview.metricRevenueChange', '+28.4% vs last month')}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span>{t('dashboard.preview.metricUsers', 'Active Organizations')}</span>
                    <FiUsers className="text-cyan-500" />
                  </div>
                  <p className="text-2xl font-black font-exo-medium text-zinc-900 dark:text-zinc-50">
                    1,428
                  </p>
                  <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                    {t('dashboard.preview.metricUsersChange', '+14.2% growth')}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span>{t('dashboard.preview.metricQueries', 'API Requests Handled')}</span>
                    <FiZap className="text-violet-500" />
                  </div>
                  <p className="text-2xl font-black font-exo-medium text-zinc-900 dark:text-zinc-50">
                    4.8M / Day
                  </p>
                  <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400">
                    {t('dashboard.preview.metricQueriesSpeed', '99.98% uptime')}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                    <span>{t('dashboard.preview.metricEfficiency', 'Automation Rate')}</span>
                    <FiActivity className="text-amber-500" />
                  </div>
                  <p className="text-2xl font-black font-exo-medium text-zinc-900 dark:text-zinc-50">
                    94.6%
                  </p>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    {t('dashboard.preview.metricEfficiencyGain', '4.8x faster tasks')}
                  </span>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/60 p-5">
                {activeTab === 'analytics' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Weekly Conversion & Traffic Telemetry
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-semibold">
                        Real-Time Stream
                      </span>
                    </div>
                    {/* Simulated SVG Wave Graph */}
                    <div className="h-44 w-full flex items-end gap-2 sm:gap-3 pt-6 pb-2">
                      {[38, 55, 42, 68, 74, 62, 85, 91, 78, 89, 96, 88].map((h, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <div
                            style={{ height: `${h}%` }}
                            className="w-full rounded-t-md bg-gradient-to-t from-cyan-500 via-teal-400 to-indigo-500 opacity-80 group-hover:opacity-100 transition-all duration-300"
                          />
                          <span className="text-[9px] text-zinc-400 font-mono">
                            {idx + 1}h
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 text-xs font-bold text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span>Role Name</span>
                      <span>Department</span>
                      <span>Scope</span>
                      <span>Status</span>
                    </div>
                    {[
                      { role: 'Super Admin', dept: 'Executive', scope: 'Global Read/Write/Delete', status: 'Active' },
                      { role: 'Finance Director', dept: 'Accounting', scope: 'Read/Export Ledgers', status: 'Active' },
                      { role: 'Ops Dispatcher', dept: 'Fulfillment', scope: 'Courier Sync & Orders', status: 'Active' },
                      { role: 'External Auditor', dept: 'Compliance', scope: 'Read-Only Audit Trail', status: 'Sandboxed' },
                    ].map((item, idx) => (
                      <div key={idx} className="grid grid-cols-4 items-center text-xs py-2 border-b border-zinc-100 dark:border-zinc-800/60 font-sans">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.role}</span>
                        <span className="text-zinc-500">{item.dept}</span>
                        <span className="text-zinc-400 font-mono text-[11px]">{item.scope}</span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <FiCheck size={12} /> {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 text-xs font-bold text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span>Transaction ID</span>
                      <span>Customer</span>
                      <span>Amount</span>
                      <span>Gateway</span>
                    </div>
                    {[
                      { id: '#TRX-94810', customer: 'Sabbir Ahmed (Dhaka)', amt: '৳14,500', gate: 'bKash Merchant' },
                      { id: '#TRX-94811', customer: 'Tanvir Hossain (Chittagong)', amt: '৳28,900', gate: 'SSLCommerz' },
                      { id: '#TRX-94812', customer: 'Nusrat Jahan (Sylhet)', amt: '৳6,250', gate: 'Nagad Direct' },
                      { id: '#TRX-94813', customer: 'Global Client LLC (USA)', amt: '$420.00', gate: 'Stripe Card' },
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-4 items-center text-xs py-2 border-b border-zinc-100 dark:border-zinc-800/60 font-sans">
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{row.id}</span>
                        <span className="text-zinc-700 dark:text-zinc-300">{row.customer}</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{row.amt}</span>
                        <span className="text-zinc-500 text-[11px]">{row.gate}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'health' && (
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                      <FiServer className="text-cyan-500 mx-auto mb-2" size={24} />
                      <p className="text-xs text-zinc-400">Database Pool</p>
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">12ms Latency</p>
                      <span className="text-[10px] text-emerald-500 font-semibold">PostgreSQL Healthy</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                      <FiZap className="text-amber-500 mx-auto mb-2" size={24} />
                      <p className="text-xs text-zinc-400">Redis Memory</p>
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">18.4% Load</p>
                      <span className="text-[10px] text-emerald-500 font-semibold">Sub-millisecond Read</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                      <FiShield className="text-violet-500 mx-auto mb-2" size={24} />
                      <p className="text-xs text-zinc-400">WAF & Firewall</p>
                      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Zero Breaches</p>
                      <span className="text-[10px] text-emerald-500 font-semibold">DDoS Shield Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Live Audit Trail Bar */}
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2 font-mono">
                <span className="flex items-center gap-2">
                  <FiClock className="text-cyan-500" />
                  {t('dashboard.preview.activity1', 'Admin updated role policy for Finance Team')}
                </span>
                <span className="text-[11px] text-zinc-400">Recorded 2 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Results & Stats ── */}
      <section className="px-6 pb-20" aria-label="Dashboard results">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-black font-exo-medium bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Capabilities ── */}
      <section className="px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('dashboard.features.badge', '✦ Engineered For Scale')}
            </span>
            <h2 id="features-heading" className="text-3xl md:text-4xl font-black font-exo-medium mb-3">
              {t('dashboard.features.title', 'Comprehensive Dashboard Capabilities')}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
              {t(
                'dashboard.features.subtitle',
                'Everything you need to visualize metrics, manage users, automate recurring reports, and control business logic effortlessly.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const meta = featureIcons[i] || featureIcons[0];
              return (
                <div
                  key={i}
                  className={`group flex flex-col gap-4 p-6 sm:p-7 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:shadow-xl transition-all duration-300 ${meta.borderGlow}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${meta.lightBg} flex items-center justify-center ${meta.iconColor} group-hover:bg-gradient-to-br group-hover:${meta.accent} group-hover:text-white transition-all duration-300 shadow-sm`}
                  >
                    {meta.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-exo-medium text-[#27003B] dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Section ── */}
      <section className="px-6 py-20 bg-zinc-50 dark:bg-zinc-900" aria-labelledby="tech-heading">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
            {t('dashboard.techStack.badge', '✦ Modern High-Performance Stack')}
          </span>
          <h2 id="tech-heading" className="text-3xl md:text-4xl font-black font-exo-medium mb-3">
            {t('dashboard.techStack.title', 'Built With Industrial-Grade Technologies')}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-10">
            {t(
              'dashboard.techStack.desc',
              'We build fast, secure dashboards that render instantaneously, handle massive datasets with ease, and never crash.'
            )}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech) => (
              <span
                key={tech.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:border-cyan-400 dark:hover:border-cyan-600 transition-colors shadow-xs"
              >
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  {t(`dashboard.techStack.categories.${tech.category}`, tech.category)}
                </span>
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Engineering Process ── */}
      <section className="px-6 py-24" aria-labelledby="process-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('dashboard.process.badge', '✦ Systematic Execution')}
            </span>
            <h2 id="process-heading" className="text-3xl md:text-4xl font-black font-exo-medium">
              {t('dashboard.process.title', 'How We Build Your Dashboard')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black font-exo-medium bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent mb-4 inline-block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-bold font-exo-medium text-lg text-[#27003B] dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparent Pricing & Plans ── */}
      <section className="px-6 py-20 bg-zinc-50/70 dark:bg-zinc-900/60" aria-labelledby="pricing-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('dashboard.pricing.badge', '✦ Tailored Investment')}
            </span>
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-black font-exo-medium">
              {t('dashboard.pricing.title', 'Transparent Dashboard Packages')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white dark:bg-zinc-900 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-100 lg:-translate-y-2'
                    : 'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {t('dashboard.pricing.mostRecommended', '★ Most Popular')}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold font-exo-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl font-black font-exo-medium text-zinc-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {t('dashboard.pricing.oneTime', '/ one-time investment')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                    {plan.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {plan.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                        <FiCheckCircle className="text-cyan-500 shrink-0 mt-0.5" size={15} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-3 rounded-xl text-center text-sm font-bold font-exo-extralight transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 shadow-md shadow-cyan-500/20'
                      : 'border border-zinc-200 dark:border-zinc-700 hover:border-cyan-400 dark:hover:border-cyan-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="px-6 py-24" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('dashboard.faq.badge', '✦ Frequently Asked Questions')}
            </span>
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-black font-exo-medium">
              {t('dashboard.faq.title', 'Everything You Need to Know')}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4"
                  >
                    <h3 className="font-bold font-exo-medium text-[#27003B] dark:text-white text-base">
                      {faq.q}
                    </h3>
                    <FiChevronDown
                      size={20}
                      className={`text-zinc-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-cyan-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans border-t border-zinc-100 dark:border-zinc-900">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="px-6 py-16 bg-zinc-50 dark:bg-zinc-900" aria-labelledby="related-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-amber-400 uppercase font-exo-extralight mb-3">
              {t('dashboard.related.badge', '✦ Related Services')}
            </span>
            <h2 id="related-heading" className="text-3xl font-black font-exo-medium">
              {t('dashboard.related.heading', 'Frequently Built Together')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {related.map((rel, i) => {
              const meta = relatedMeta[i] || relatedMeta[0];
              return (
                <Link
                  key={i}
                  href={meta.href}
                  className="group flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all shadow-xs"
                >
                  <span
                    className={`w-10 h-10 rounded-lg ${meta.bg} flex items-center justify-center ${meta.color} shrink-0`}
                  >
                    {meta.icon}
                  </span>
                  <span className="text-sm font-bold font-exo-extralight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {rel.label}
                  </span>
                  <FiArrowRight
                    size={14}
                    className="ml-auto text-zinc-300 dark:text-zinc-600 group-hover:text-cyan-500 transition-colors"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Call To Action ── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 p-px shadow-2xl shadow-cyan-500/20">
            <div className="rounded-[23px] bg-white dark:bg-zinc-950 px-8 py-14">
              <span className="inline-block text-[11px] font-bold tracking-[0.4em] text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-3">
                {t('dashboard.cta.badge', '✦ Take Control Today')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-exo-medium mb-4 text-[#27003B] dark:text-white">
                {t('dashboard.cta.heading', 'Ready to build your central operations dashboard?')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mb-8 max-w-xl mx-auto font-sans">
                {t(
                  'dashboard.cta.desc',
                  'Transform scattered spreadsheets and disjointed tools into a single, lightning-fast command center built for your team.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold font-exo-extralight hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
                >
                  {t('dashboard.cta.getQuote', 'Book a Free Consultation')} <FiArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold font-exo-extralight hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors"
                >
                  {t('dashboard.cta.allServices', 'Explore All Services')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
