'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiZap,
  FiActivity,
  FiRefreshCw,
  FiClock,
  FiTrendingUp,
  FiShare2,
  FiMail,
  FiChevronDown,
} from 'react-icons/fi';
import { FaRobot, FaCogs } from 'react-icons/fa';

function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) && val.length > 0 ? val : null;
}

export default function ServicesAutomationPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const fallbackStats = [
    { value: '80%', label: 'Manual Workload Reduced' },
    { value: 'Zero', label: 'Human Data Entry Errors' },
    { value: '24/7', label: 'Autonomous Task Execution' },
    { value: '5x-10x', label: 'Operational Speed Multiplier' },
  ];
  const stats = arr(t, 'automationService.stats') || fallbackStats;

  const featureStyling = [
    {
      icon: <FaRobot size={24} />,
      title: 'AI-Powered Business Workflow Automation',
      desc: 'Integrating OpenAI LLMs, intelligent document parsing, auto-reply classification, and contextual CRM routing.',
      lightBg: 'bg-orange-50 dark:bg-orange-950/80',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderGlow: 'hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-orange-500/15',
    },
    {
      icon: <FiMail size={24} />,
      title: 'Automated Email & SMS Notification Triggers',
      desc: 'Instant event-triggered customer alerts (order confirmations, delivery tracking, OTPs, appointment reminders, and lead follow-ups).',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Scheduled Cron Jobs & Background Tasks',
      desc: 'Automated midnight database backups, daily financial reports, abandoned cart reminders, and inventory synchronization.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiShare2 size={24} />,
      title: 'Google Sheets, Airtable & CRM Auto-Sync',
      desc: 'Real-time two-way synchronization between your web app, Google Sheets, Airtable, Notion, HubSpot, and Slack.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: 'Automated PDF Invoices & Report Generators',
      desc: 'Dynamic serverless PDF rendering for branded invoices, certificates, monthly executive dashboards, and receipts.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: 'E-Commerce Order & Inventory Automation',
      desc: 'Auto-assigning delivery courier tracking (Pathao, Steadfast, RedX), stock deductions, and auto-printing shipping labels.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'Web Scraping & Competitive Intelligence',
      desc: 'Automated headless browsers (Playwright/Puppeteer) extracting competitor price movements, stock changes, and market trends.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FaCogs size={24} />,
      title: 'Zapier, Make & n8n Enterprise Pipelines',
      desc: 'Connecting disparate legacy systems with modern self-hosted n8n workflows for zero monthly subscription overhead.',
      lightBg: 'bg-purple-50 dark:bg-purple-950/80',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderGlow: 'hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/15',
    },
    {
      icon: <FiZap size={24} />,
      title: 'Error Interception & Auto-Healing',
      desc: 'Self-monitoring scripts that detect payment or data sync failures, retry automatically with exponential backoff, and notify admins.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
  ];
  const translatedFeatures = arr(t, 'automationService.capabilities.items');
  const featureMeta = featureStyling.map((f, i) => ({
    ...f,
    title: translatedFeatures?.[i]?.title || f.title,
    desc: translatedFeatures?.[i]?.desc || f.desc,
  }));

  const fallbackTechStack = [
    { label: 'n8n & Zapier', category: 'Workflows' },
    { label: 'OpenAI API', category: 'AI Models' },
    { label: 'Node.js & BullMQ', category: 'Job Queues' },
    { label: 'Google Sheets API', category: 'Sync' },
    { label: 'Playwright & Puppeteer', category: 'Scraping' },
    { label: 'Resend & Twilio', category: 'Messaging' },
    { label: 'Courier APIs (Pathao/Steadfast)', category: 'Logistics' },
    { label: 'Puppeteer PDF Engine', category: 'Reports' },
  ];
  const techStack = arr(t, 'automationService.techStack.items') || fallbackTechStack;

  const fallbackPlans = [
    {
      name: 'Single Workflow Automation',
      price: 'BDT 1200',
      desc: 'Automate any single repetitive process (Auto-email triggers, Google Sheets sync, or Courier booking API).',
      features: [
        'End-to-End Workflow Trigger Setup',
        'Payload Validation & Error Handling',
        'Google Sheets / CRM Integration',
        'Instant Email/SMS Alerting',
        'Live Workflow Testing & Handover',
        '15 Days Warranty',
      ],
      popular: false,
      cta: 'Automate Single Flow',
    },
    {
      name: 'Business Automation Suite',
      price: 'BDT 2600',
      desc: 'Our most popular package for e-commerce and scaling agencies wanting autonomous operations.',
      features: [
        'Up to 4 Interconnected Workflows',
        'Courier Booking & Tracking Sync (Steadfast/Pathao)',
        'Automated PDF Invoice Generation',
        'Scheduled Cron Reporting Pipelines',
        'AI Text Parsing / Auto-Reply Engine',
        '30 Days Dedicated Support',
      ],
      popular: true,
      cta: 'Build Automation Suite',
    },
    {
      name: 'Enterprise Autonomous System',
      price: 'BDT 3800',
      desc: 'Full-scale custom n8n / BullMQ queue architecture, competitive scraping, and end-to-end operational automation.',
      features: [
        'Self-Hosted n8n Workflow Server',
        'Distributed BullMQ Task Processing',
        'Automated Competitor Scraping Engine',
        'Custom OpenAI Agent Embeddings',
        'Multi-System CRM/ERP Synchronization',
        '60 Days Priority Support',
      ],
      popular: false,
      cta: 'Consult Automation Architect',
    },
  ];
  const translatedPlans = arr(t, 'automationService.pricing.plans');
  const plans = fallbackPlans.map((plan, i) => ({
    ...plan,
    name: translatedPlans?.[i]?.name || plan.name,
    price: translatedPlans?.[i]?.price || plan.price,
    desc: translatedPlans?.[i]?.desc || plan.desc,
    features:
      Array.isArray(translatedPlans?.[i]?.features) && translatedPlans[i].features.length > 0
        ? translatedPlans[i].features
        : plan.features,
    cta: translatedPlans?.[i]?.cta || plan.cta,
  }));

  const fallbackFaqs = [
    {
      q: 'How does automated courier booking work for Bangladeshi e-commerce?',
      a: 'When an order is confirmed, our automation script pushes customer details to Pathao or Steadfast API, retrieves the consignment tracking number, and SMSes the customer automatically.',
    },
    {
      q: 'Do I have to pay high recurring fees for Zapier?',
      a: 'We can build your automations using self-hosted open-source tools like n8n or direct Node.js microservices, eliminating recurring Zapier monthly subscription costs entirely.',
    },
    {
      q: 'Can automation notify my team on Slack or WhatsApp when high-priority leads arrive?',
      a: 'Yes! Instant webhooks format customer inquiries and ping your designated WhatsApp group or Slack channel within seconds.',
    },
  ];
  const faqs = arr(t, 'automationService.faq.items') || fallbackFaqs;

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-exo-extralight mb-6"
          >
            <Link href="/" className="hover:text-orange-500 transition-colors">
              {t('automationService.breadcrumb.home', 'Home')}
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-orange-500 transition-colors">
              {t('automationService.breadcrumb.services', 'Services')}
            </Link>
            <span>/</span>
            <span className="text-orange-600 dark:text-orange-400 font-semibold">
              {t('automationService.breadcrumb.current', 'Business Automation')}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/90 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 uppercase tracking-widest font-exo-extralight mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            {t('automationService.badge', 'Zero Manual Work, 100% Efficiency')}
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            {t('automationService.hero.titleStart', 'Business ')}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animated-gradient-text">
              {t('automationService.hero.titleHighlight', 'Automation')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-exo-extralight">
            {t(
              'automationService.hero.desc',
              'Automate repetitive tasks, notifications, courier bookings, reports, and AI workflows so your team can focus purely on business growth and revenue.'
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Business%20Automation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white text-sm font-black uppercase tracking-wider font-exo-extralight hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>{t('automationService.hero.ctaPrimary', 'Automate Your Business')}</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-exo-extralight text-zinc-800 dark:text-zinc-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300"
            >
              {t('automationService.hero.ctaSecondary', 'Automation Demos')}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-exo-extralight">
            <div className="flex items-center justify-center gap-1.5">
              <FaRobot className="text-orange-500" />
              <span>{t('automationService.trust.ai', 'AI Process Agents')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-pink-500" />
              <span>{t('automationService.trust.webhooks', 'Event-Driven Webhooks')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShare2 className="text-emerald-500" />
              <span>{t('automationService.trust.sync', 'Google Sheets & CRM Sync')}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiClock className="text-purple-500" />
              <span>{t('automationService.trust.cron', 'Scheduled Cron Jobs')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Automation stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-orange-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-exo-medium uppercase tracking-wide bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-exo-extralight mb-3">
              {t('automationService.capabilities.badge', '✦ Engineered for Autonomous Operations')}
            </span>
            <h2
              id="features-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              {t('automationService.capabilities.titleStart', 'Business Automation ')}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t('automationService.capabilities.titleHighlight', 'Capabilities')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureMeta.map((feature, i) => (
              <div
                key={i}
                className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift transition-all duration-300 ${feature.borderGlow}`}
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${feature.iconColor} shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 font-exo-extralight group-hover:translate-x-1 transition-transform">
                  <span>{t('automationService.capabilities.cardFooter', 'Autonomous Execution')}</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Automation stack">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-exo-extralight mb-2 block">
              {t('automationService.techStack.badge', '✦ Enterprise Automation Engines')}
            </span>
            <h3 className="font-exo-medium text-2xl sm:text-4xl uppercase tracking-wide">
              {t('automationService.techStack.title', 'Automation Toolchain & Protocols')}
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-orange-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-exo-extralight">
                  {tech.label}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="pricing-heading">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-exo-extralight mb-3">
              {t('automationService.pricing.badge', '✦ Transparent Automation Setup')}
            </span>
            <h2
              id="pricing-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              {t('automationService.pricing.titleStart', 'Choose Your ')}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t('automationService.pricing.titleHighlight', 'Automation Tier')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                    ? 'border-2 border-orange-500 bg-gradient-to-b from-orange-50/80 via-white to-white dark:from-orange-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-orange-500/20 scale-105 z-10'
                    : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    {t('automationService.pricing.bestValue', '★ Best Value')}
                  </div>
                )}

                <div>
                  <h3 className="font-exo-medium text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-exo-extralight mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-exo-medium text-4xl sm:text-5xl uppercase tracking-tight text-orange-600 dark:text-orange-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-exo-extralight">
                      {t('automationService.pricing.oneTime', '/ one-time')}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-exo-extralight">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=Business%20Automation&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-exo-extralight transition-all duration-200 ${plan.popular
                      ? 'bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white hover:opacity-95 shadow-lg shadow-orange-500/25'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-orange-500 hover:text-orange-600'
                    }`}
                >
                  {plan.cta || 'Get Started Now'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 uppercase font-exo-extralight mb-2 block">
              {t('automationService.faq.badge', '✦ Automation FAQs')}
            </span>
            <h2
              id="faq-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide"
            >
              {t('automationService.faq.title', 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer gap-4"
                  >
                    <span className="font-exo-medium text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-orange-600 dark:text-orange-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#291301] via-[#240317] to-[#12052b] border border-orange-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-exo-extralight mb-4">
              {t('automationService.cta.badge', '✦ Put Your Business on Autopilot')}
            </span>
            <h2 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              {t('automationService.cta.title', 'Stop Wasting Hours on Manual Tasks')}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-exo-extralight leading-relaxed mb-8">
              {t(
                'automationService.cta.desc',
                'Let us engineer custom business automation pipelines that save you hundreds of hours every month.'
              )}
            </p>
            <Link
              href="/contact?service=Business%20Automation"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 text-white font-black text-sm uppercase tracking-wider font-exo-extralight hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
            >
              <span>{t('automationService.cta.btn', 'Build Automation Pipeline')}</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
