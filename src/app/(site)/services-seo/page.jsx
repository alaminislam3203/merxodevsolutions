'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowRight,
  FiCheckCircle,
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiZap,
  FiGlobe,
  FiShield,
  FiTarget,
  FiActivity,
  FiLink,
  FiChevronDown,
  FiAward,
} from 'react-icons/fi';
import { FaGoogle, FaChartLine } from 'react-icons/fa';

export default function ServicesSeoPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: 'Top 3', label: 'Google Search Ranking Goals' },
    { value: '+350%', label: 'Avg. Organic Traffic Lift' },
    { value: '95+', label: 'Core Web Vitals Score' },
    { value: '100%', label: 'White-Hat SEO Techniques' },
  ];

  const featureMeta = [
    {
      icon: <FiZap size={24} />,
      title: 'Core Web Vitals & Speed Optimization',
      desc: 'Sub-second server response times, optimized LCP, INP, and CLS scores that Google algorithms prioritize for top rankings.',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
    },
    {
      icon: <FiSearch size={24} />,
      title: 'In-Depth Keyword & Intent Research',
      desc: 'Identifying high-volume, low-competition keywords, commercial buyer intent phrases, and long-tail query opportunities.',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
    },
    {
      icon: <FiGlobe size={24} />,
      title: 'Technical SEO Architecture & Sitemaps',
      desc: 'Clean XML sitemaps, robots.txt, canonical tag implementation, dynamic OpenGraph meta cards, and 404 error mitigation.',
      lightBg: 'bg-violet-50 dark:bg-violet-950/80',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
    },
    {
      icon: <FiActivity size={24} />,
      title: 'Schema.org JSON-LD Structured Data',
      desc: 'Rich snippets implementation for articles, FAQs, products, local businesses, and breadcrumbs to dominate Google SERP.',
      lightBg: 'bg-amber-50 dark:bg-amber-950/80',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
    },
    {
      icon: <FiTarget size={24} />,
      title: 'Local SEO & Google Business Profile',
      desc: 'Optimizing local search presence, Google Maps rankings, NAP consistency, and geo-targeted landing page authority.',
      lightBg: 'bg-blue-50 dark:bg-blue-950/80',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: 'On-Page Content & Heading Strategy',
      desc: 'Structuring semantic H1-H4 hierarchies, meta titles, descriptions, image alt tags, and internal link routing for topical authority.',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
    },
    {
      icon: <FiLink size={24} />,
      title: 'Authority Link Building & Outreach',
      desc: 'High-domain-authority contextual backlinks, digital PR outreach, guest publications, and toxic backlink disavowal.',
      lightBg: 'bg-pink-50 dark:bg-pink-950/80',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
    },
    {
      icon: <FiBarChart2 size={24} />,
      title: 'Google Search Console & GA4 Setup',
      desc: 'Complete tracking setup with real-time indexing monitoring, search query analytics, and custom conversion dashboards.',
      lightBg: 'bg-teal-50 dark:bg-teal-950/80',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
    },
    {
      icon: <FiShield size={24} />,
      title: 'Algorithmic Penalty Protection',
      desc: 'Strict adherence to Google Search Essentials and Helpful Content guidelines to ensure lifelong organic immunity and growth.',
      lightBg: 'bg-green-50 dark:bg-green-950/80',
      iconColor: 'text-green-600 dark:text-green-400',
      borderGlow: 'hover:border-green-400 dark:hover:border-green-600 hover:shadow-green-500/15',
    },
  ];

  const techStack = [
    { label: 'Google Search Console', category: 'Analytics' },
    { label: 'Google Analytics 4', category: 'Tracking' },
    { label: 'Ahrefs', category: 'Auditing' },
    { label: 'Semrush', category: 'Keywords' },
    { label: 'Schema.org JSON-LD', category: 'Rich Snippets' },
    { label: 'Next.js Dynamic Sitemap', category: 'Indexing' },
    { label: 'Lighthouse PageSpeed', category: 'Performance' },
    { label: 'OpenGraph Meta Engine', category: 'Social SEO' },
    { label: 'Google Tag Manager', category: 'Events' },
    { label: 'Local Citation Networks', category: 'Local SEO' },
  ];

  const plans = [
    {
      name: 'Technical SEO Audit & Fix',
      price: '৳১০,০০০',
      desc: 'Comprehensive technical audit and complete on-page code fixes for existing websites.',
      features: [
        'Full Technical Audit & Error Fixing',
        'PageSpeed & Core Web Vitals Optimization',
        'Schema.org Structured Data Setup',
        'XML Sitemap & Robots.txt Config',
        'Google Search Console & GA4 Integration',
        'Comprehensive Audit PDF Report',
      ],
      popular: false,
      cta: 'Get Technical Fix',
    },
    {
      name: 'Growth SEO & Organic Ranking',
      price: '৳২৫,০০০',
      desc: 'Our most popular monthly growth package for businesses wanting top Google rankings.',
      features: [
        'Targeted 15 High-Value Keyword Groups',
        'Full Technical & On-Page Optimization',
        'High-Authority Backlink Acquisition',
        'Content Optimization & Heading Strategy',
        'Google Business Profile & Local Maps SEO',
        'Bi-Weekly Ranking Progress Reports',
        'Continuous Indexing Monitoring',
      ],
      popular: true,
      cta: 'Start Growth Campaign',
    },
    {
      name: 'Market Dominance Enterprise',
      price: '৳৫০,০০০',
      desc: 'All-inclusive multi-channel SEO campaign for competitive industries and global reach.',
      features: [
        'Targeted 40+ National/Global Keywords',
        'Competitor SERP Interception Strategy',
        'Tier-1 PR & Editorial Link Building',
        'Programmatic SEO Page Generation',
        'Conversion Rate Optimization (CRO)',
        'Weekly Live Strategy & Ranking Reviews',
        'Dedicated Senior SEO Strategist',
      ],
      popular: false,
      cta: 'Dominate Search Rankings',
    },
  ];

  const faqs = [
    {
      q: 'How long does it take to see tangible ranking results on Google?',
      a: 'Technical SEO fixes and indexing improvements typically show effects within 2–4 weeks. Significant organic ranking jumps and consistent traffic growth usually manifest in 2–3 months of white-hat optimization.',
    },
    {
      q: 'Are your SEO practices strictly White-Hat?',
      a: 'Yes, 100%. We strictly abide by Google Search Essentials guidelines. We never use spammy link farms, hidden text, or keyword stuffing that could risk algorithmic penalties.',
    },
    {
      q: 'Do you optimize for Bangladesh local search as well as international markets?',
      a: 'Yes! We specialize in local SEO (Dhaka, Chittagong, Sylhet and all BD districts) with Google Business Profile optimization, as well as global technical SEO for international client acquisition.',
    },
    {
      q: 'How will I track my website ranking progress?',
      a: 'We set up Google Analytics 4 and Google Search Console, and deliver clear, transparent ranking progress reports showing exact keyword positions, click-through rates, and organic impressions.',
    },
  ];

  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, #10b981, #06b6d4, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-raleway mb-6"
          >
            <Link href="/" className="hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-emerald-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              SEO Optimization
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 uppercase tracking-widest font-raleway mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Rank #1 on Google & Drive Organic Revenue
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Search Engine{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              Optimization
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            Dominate Google search results with our data-backed technical SEO, Core Web Vitals speed tuning, high-authority backlink outreach, and schema rich snippets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=SEO%20Optimization"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Get Free SEO Audit</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-raleway text-zinc-800 dark:text-zinc-200 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
            >
              View Ranking Case Studies
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
            <div className="flex items-center justify-center gap-1.5">
              <FaGoogle className="text-emerald-500" />
              <span>Google 95+ PageSpeed</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-amber-500" />
              <span>Schema.org Rich Snippets</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-violet-500" />
              <span>100% White-Hat Only</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FaChartLine className="text-cyan-500" />
              <span>Measurable ROI & Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Metric Bar ── */}
      <section className="px-4 sm:px-6 pb-20" aria-label="SEO stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-emerald-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-display uppercase tracking-wide bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Capabilities (9 Interactive 3D Cards) ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-3">
              ✦ Engineered for Search Dominance
            </span>
            <h2
              id="features-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Comprehensive Search Engine{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Optimization
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

                  <h3 className="font-display text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-raleway group-hover:translate-x-1 transition-transform">
                  <span>Google Certified Process</span>
                  <FiCheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Toolchain Pills ── */}
      <section className="px-4 sm:px-6 pb-24" aria-label="SEO tools">
        <div className="max-w-6xl mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-emerald-50/50 via-white to-cyan-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-2 block">
              ✦ Enterprise Auditing Stack
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide">
              Data & SEO Toolchain
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-emerald-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <span className="text-sm font-bold text-zinc-900 dark:text-white font-raleway">
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

      {/* ── Transparent Pricing Plans ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-3">
              ✦ Transparent Search Growth
            </span>
            <h2
              id="pricing-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                SEO Package
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${
                  plan.popular
                    ? 'border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/80 via-white to-white dark:from-emerald-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-emerald-500/20 scale-105 z-10'
                    : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Top Value Growth
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-raleway">/ one-time</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300 font-raleway">
                        <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=SEO%20Optimization&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-raleway transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 text-white hover:opacity-95 shadow-lg shadow-emerald-500/25'
                      : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
                >
                  {plan.cta || 'Select SEO Tier'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="px-4 sm:px-6 pb-24" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-raleway mb-2 block">
              ✦ Organic Ranking FAQs
            </span>
            <h2
              id="faq-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide"
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
                    <span className="font-display text-lg uppercase tracking-wide text-zinc-900 dark:text-white">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-zinc-600 dark:text-zinc-400 font-raleway leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="relative max-w-6xl mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-[#012419] via-[#021f24] to-[#0a182e] border border-emerald-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-raleway mb-4">
              ✦ Ready to Rank on Page 1 of Google?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let's Unlock Your Maximum Organic Growth
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-raleway leading-relaxed mb-8">
              Claim your free in-depth website audit today and discover the exact technical and keyword bottlenecks holding your rankings back.
            </p>
            <Link
              href="/contact?service=SEO%20Optimization"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 text-white font-black text-sm uppercase tracking-wider font-raleway hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <span>Claim Free SEO Audit</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
