'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiTool,
  FiShield,
  FiZap,
  FiActivity,
  FiRefreshCw,
  FiClock,
  FiAlertCircle,
  FiServer,
  FiChevronDown,
} from 'react-icons/fi';
import { FaHeadset, FaTools } from 'react-icons/fa';

export default function ServicesMaintenancePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: '99.9%', label: 'Guaranteed Uptime' },
    { value: '<1hr', label: 'Critical Emergency Response' },
    { value: '24/7/365', label: 'Continuous Health Monitoring' },
    { value: 'Daily', label: 'Automated Cloud Backups' },
  ];

  const featureMeta = [
    {
      icon: <FiActivity size={24} />,
      title: '24/7 Real-Time Uptime & Health Monitoring',
      desc: 'Automated global ping monitors that detect server hiccups, 502 bad gateways, and SSL expirations within 60 seconds.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: 'Next.js & Dependency Security Upgrades',
      desc: 'Regular updates for React, Next.js, Node.js packages, and Prisma schemas with regression testing to avoid breaking changes.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiTool size={24} />,
      title: 'Bug Fixes & UI Layout Adjustments',
      desc: 'Rapid resolution of front-end layout bugs, responsive glitches, broken links, and form submission errors.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
    {
      icon: <FiShield size={24} />,
      title: 'Security Vulnerability Patching',
      desc: 'Proactive scanning and patching of zero-day exploits, CVE vulnerabilities, SQL injections, and outdated dependencies.',
      lightBg: 'bg-rose-50 dark:bg-rose-950/80',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderGlow: 'hover:border-rose-400 dark:hover:border-rose-600 hover:shadow-rose-500/15',
    },
    {
      icon: <FiServer size={24} />,
      title: 'Database & Cloud Resource Tuning',
      desc: 'Cleaning orphaned records, clearing log files, vacuuming Postgres tables, and managing Vercel / AWS serverless limits.',
      lightBg: 'bg-purple-50 dark:bg-purple-950/80',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderGlow: 'hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-purple-500/15',
    },
    {
      icon: <FiZap size={24} />,
      title: 'Speed & Page Performance Auditing',
      desc: 'Continuous Core Web Vitals checks, image optimization, edge cache invalidation, and lighthouse score maintenance.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Automated Off-Site Backups',
      desc: 'Scheduled daily database snapshots and code asset archiving with 1-click instant point-in-time recovery.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiAlertCircle size={24} />,
      title: 'Content & Banner Updates',
      desc: 'Uploading new projects, changing pricing tables, updating seasonal banners, and tweaking copy on demand.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FaHeadset size={24} />,
      title: 'Dedicated WhatsApp / Phone SLA Support',
      desc: 'Direct priority communications line to our engineering team with guaranteed emergency SLA response times.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
  ];

  const techStack = [
    { label: 'Uptime Kuma / BetterStack', category: 'Monitoring' },
    { label: 'Sentry Error Tracker', category: 'Debugging' },
    { label: 'Vercel Analytics', category: 'Performance' },
    { label: 'Cloudflare Edge CDN', category: 'Caching' },
    { label: 'PostgreSQL Auto-Backups', category: 'Backups' },
    { label: 'GitHub Dependabot', category: 'Security' },
    { label: 'SSL Auto-Renewals', category: 'Certificates' },
    { label: 'Dedicated SLA Channel', category: 'Support' },
  ];

  const plans = [
    {
      name: 'Essential Maintenance',
      price: 'BDT 1200',
      desc: 'Basic website upkeep, security patches, uptime monitoring, and weekly cloud backups.',
      features: [
        '24/7 Global Uptime Monitoring',
        'Weekly Automated Database Backups',
        'Monthly Security & Dependency Updates',
        'Up to 2 Minor Bug Fixes / mo',
        'SSL & Domain Expiry Alerts',
        'Email Support (24hr SLA)',
      ],
      popular: false,
      cta: 'Choose Essential',
    },
    {
      name: 'Business Growth SLA',
      price: 'BDT 2500',
      desc: 'Our most popular monthly maintenance plan for active e-commerce and high-traffic portals.',
      features: [
        'Continuous Real-Time Error Tracking',
        'Daily Encrypted Database Backups',
        'Priority Bug Fixes & Code Tweaks',
        'Monthly PageSpeed & Core Web Vitals Audit',
        'Content & Banner Updates (4 requests/mo)',
        'Direct WhatsApp Engineer Access',
        'Guaranteed <2hr Response SLA',
      ],
      popular: true,
      cta: 'Get Business SLA',
    },
    {
      name: 'Enterprise Dedicated Support',
      price: 'BDT 3900',
      desc: 'Complete DevOps, proactive security management, staging environments, and 24/7 on-call engineers.',
      features: [
        'Dedicated On-Call Senior Engineer',
        'Continuous Security & Penetration Scans',
        'Unlimited Bug Fixes & Routine Tweaks',
        'Database Optimization & Vacuuming',
        'Custom Staging Deployment Pipeline',
        'Guaranteed <30min Critical SLA',
        'Weekly Strategy & Performance Review',
      ],
      popular: false,
      cta: 'Request Enterprise SLA',
    },
  ];

  const faqs = [
    {
      q: 'Why does a website need monthly maintenance?',
      a: 'Web software, browsers, third-party APIs, and security vulnerabilities evolve continuously. Routine maintenance ensures your site never breaks, gets hacked, or suffers speed degradation.',
    },
    {
      q: 'How fast do you respond if my website goes down?',
      a: 'Our automated monitors notify us instantly. For Business and Enterprise SLA clients, an engineer begins emergency mitigation within 30 to 60 minutes.',
    },
    {
      q: 'Can maintenance hours be used for adding new features?',
      a: 'Maintenance plans cover bug fixes, tweaks, updates, and minor adjustments. For major new feature builds, we provide discounted hourly or project-based add-ons.',
    },
  ];

  return (
    <main className="text-[#27003B] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            // background: 'radial-gradient(circle, #06b6d4, #6366f1, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-exo-extralight mb-6"
          >
            <Link href="/" className="hover:text-cyan-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-cyan-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              Website Maintenance & Support
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/90 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 uppercase tracking-widest font-exo-extralight mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            24/7 SLA, Security Patches & Health Checks
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Website Maintenance &{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent animated-gradient-text">
              24/7 Support
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-exo-extralight">
            Keep your website updated, secure, lightning-fast, and bug-free with our dedicated engineering maintenance, daily backups, and emergency SLA response.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Website%20Maintenance%20%26%20Support"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-600 to-indigo-600 text-white text-sm font-black uppercase tracking-wider font-exo-extralight hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Get Maintenance Plan</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-exo-extralight text-zinc-800 dark:text-zinc-200 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300"
            >
              SLA Guarantees
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-exo-extralight">
            <div className="flex items-center justify-center gap-1.5">
              <FiActivity className="text-cyan-500" />
              <span>24/7 Uptime Alerts</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>Security Patches</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiRefreshCw className="text-teal-500" />
              <span>Daily Cloud Backups</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FaHeadset className="text-indigo-500" />
              <span>Under 1hr Emergency SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Maintenance stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-cyan-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-exo-medium uppercase tracking-wide bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent mb-1">
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
            <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-3">
              ✦ Engineered for Total Peace of Mind
            </span>
            <h2
              id="features-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Proactive Maintenance{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
                Capabilities
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

                  <h3 className="font-exo-medium text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 font-exo-extralight group-hover:translate-x-1 transition-transform">
                  <span>99.9% Uptime Commitment</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Pills */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Maintenance stack">
        <div className="max-w-[1440px] mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-cyan-50/50 via-white to-indigo-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-2 block">
              ✦ Monitoring Infrastructure
            </span>
            <h3 className="font-exo-medium text-2xl sm:text-4xl uppercase tracking-wide">
              Monitoring & Support Toolchain
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-cyan-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600" />
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
            <span className="inline-block text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-3">
              ✦ Transparent SLA Plans
            </span>
            <h2
              id="pricing-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
                SLA Tier
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                  ? 'border-2 border-cyan-500 bg-gradient-to-b from-cyan-50/80 via-white to-white dark:from-cyan-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-cyan-500/20 scale-105 z-10'
                  : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Popular SLA
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
                    <span className="font-exo-medium text-4xl sm:text-5xl uppercase tracking-tight text-cyan-600 dark:text-cyan-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-exo-extralight">/ month</span>
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
                  href={`/contact?service=Website%20Maintenance%20%26%20Support&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-exo-extralight transition-all duration-200 ${plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 via-teal-600 to-indigo-600 text-white hover:opacity-95 shadow-lg shadow-cyan-500/25'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-cyan-500 hover:text-cyan-600'
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
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-exo-extralight mb-2 block">
              ✦ Support FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-exo-medium text-3xl sm:text-5xl uppercase tracking-wide"
            >
              Frequently Asked Questions
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
                      className={`text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
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
        <div className="relative max-w-[1440px] mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#011e2b] via-[#041d26] to-[#12082b] border border-cyan-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 font-exo-extralight mb-4">
              ✦ Always Online, Always Protected
            </span>
            <h2 className="font-exo-medium text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let Us Handle Your Tech Maintenance
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-exo-extralight leading-relaxed mb-8">
              Never worry about website crashes, outdated packages, or server issues again. Partner with our dedicated engineering team today.
            </p>
            <Link
              href="/contact?service=Website%20Maintenance%20%26%20Support"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider font-exo-extralight hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <span>Subscribe to SLA Protection</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
