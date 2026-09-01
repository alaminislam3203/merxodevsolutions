'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiLayout,
  FiZap,
  FiGlobe,
  FiLock,
  FiRefreshCw,
  FiSmartphone,
  FiBarChart2,
  FiDatabase,
  FiTrendingUp,
  FiCreditCard,
  FiPackage,
  FiChevronDown,
  FiAward,
  FiShield,
  FiCpu,
  FiStar,
} from 'react-icons/fi';

const featureMeta = [
  {
    icon: <FiZap size={24} />,
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    accent: 'from-amber-500 to-orange-500',
    borderGlow: 'hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/15',
  },
  {
    icon: <FiLayout size={24} />,
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    accent: 'from-violet-500 to-indigo-500',
    borderGlow: 'hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-violet-500/15',
  },
  {
    icon: <FiSmartphone size={24} />,
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    accent: 'from-cyan-500 to-teal-500',
    borderGlow: 'hover:border-cyan-400 dark:hover:border-cyan-600 hover:shadow-cyan-500/15',
  },
  {
    icon: <FiLock size={24} />,
    lightBg: 'bg-green-50 dark:bg-green-950/80',
    iconColor: 'text-green-600 dark:text-green-400',
    accent: 'from-green-500 to-emerald-500',
    borderGlow: 'hover:border-green-400 dark:hover:border-green-600 hover:shadow-green-500/15',
  },
  {
    icon: <FiTrendingUp size={24} />,
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    accent: 'from-emerald-500 to-teal-500',
    borderGlow: 'hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/15',
  },
  {
    icon: <FiCode size={24} />,
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    accent: 'from-indigo-500 to-violet-500',
    borderGlow: 'hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/15',
  },
  {
    icon: <FiRefreshCw size={24} />,
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    accent: 'from-pink-500 to-rose-500',
    borderGlow: 'hover:border-pink-400 dark:hover:border-pink-600 hover:shadow-pink-500/15',
  },
  {
    icon: <FiBarChart2 size={24} />,
    lightBg: 'bg-blue-50 dark:bg-blue-950/80',
    iconColor: 'text-blue-600 dark:text-blue-400',
    accent: 'from-blue-500 to-cyan-500',
    borderGlow: 'hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/15',
  },
  {
    icon: <FiGlobe size={24} />,
    lightBg: 'bg-teal-50 dark:bg-teal-950/80',
    iconColor: 'text-teal-600 dark:text-teal-400',
    accent: 'from-teal-500 to-cyan-500',
    borderGlow: 'hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/15',
  },
];

const fallbackFeatures = [
  {
    title: 'High-Performance Next.js Architecture',
    desc: 'SSR, SSG, and ISR powered web applications that load in under 1 second with 98+ Google Lighthouse scores.',
  },
  {
    title: 'Custom UI/UX & Figma-to-Code',
    desc: 'Pixel-perfect translation of designs into sleek Tailwind CSS with smooth micro-interactions and dark mode.',
  },
  {
    title: '100% Mobile Responsive',
    desc: 'Flawlessly optimized for smartphones, tablets, laptops, and ultra-wide desktop monitors.',
  },
  {
    title: 'Enterprise-Grade Security',
    desc: 'SSL/TLS encryption, CSRF protection, strict CSP headers, sanitized inputs, and secure authentication.',
  },
  {
    title: 'Advanced SEO & Social Sharing',
    desc: 'Schema.org JSON-LD structured data, dynamic OpenGraph preview cards, sitemaps, and meta optimization.',
  },
  {
    title: 'Clean, Scalable Codebase',
    desc: 'Modular React component architecture with strict TypeScript typing and thorough documentation.',
  },
  {
    title: 'Headless CMS Integration',
    desc: 'Effortlessly manage content with Sanity, Strapi, WordPress REST API, or custom PostgreSQL admin portals.',
  },
  {
    title: 'Analytics & Conversion Tracking',
    desc: 'Google Analytics 4, Meta Pixel, and Google Tag Manager integration for actionable visitor insights.',
  },
  {
    title: 'Global CDN & High Availability',
    desc: 'Automated CI/CD deployments on Vercel or AWS Edge network with 99.99% uptime guarantee.',
  },
];

const techStack = [
  { label: 'Next.js 16', category: 'Frontend' },
  { label: 'React 19', category: 'Frontend' },
  { label: 'Tailwind CSS v4', category: 'Styling' },
  { label: 'TypeScript', category: 'Language' },
  { label: 'GSAP Animations', category: 'Animation' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'Neon DB', category: 'Database' },
  { label: 'Prisma ORM', category: 'Database' },
  { label: 'Cloudinary', category: 'Media CDN' },
  { label: 'Vercel Edge', category: 'Cloud' },
  { label: 'Docker', category: 'DevOps' },
];

const defaultPlans = [
  {
    name: 'Starter Website',
    price: 'BDT 1500',
    desc: 'Perfect for startups and local businesses looking for a fast, modern digital footprint.',
    features: [
      'Up to 5 Custom Pages',
      '100% Responsive Mobile Design',
      'Basic SEO & Meta Tags',
      'Contact Form with Email Alerts',
      'Social Media Integration',
      '15 Days Post-Launch Support',
    ],
    popular: false,
    cta: 'Choose Starter',
  },
  {
    name: 'Growth Business Pro',
    price: 'BDT 3500',
    desc: 'Our most popular package for growing companies that demand high conversion and speed.',
    features: [
      'Up to 12 Premium Pages',
      'Custom UI/UX & GSAP Micro-Animations',
      'Dynamic Blog / News CMS Portal',
      'Google Analytics 4 & Meta Pixel',
      'Schema.org SEO Structured Data',
      'Multilingual (Bangla & English)',
      '30 Days Priority Support',
    ],
    popular: true,
    cta: 'Get Growth Pro',
  },
  {
    name: 'Enterprise Custom',
    price: 'Custom Quote',
    desc: 'Tailored enterprise architecture for heavy traffic, custom APIs, and advanced integrations.',
    features: [
      'Unlimited Pages & Custom Routes',
      'Full-Stack Node/Next.js Backend',
      'PostgreSQL / Prisma Database',
      'Role-Based Admin Dashboard',
      'Payment Gateway (bKash/Nagad/Cards)',
      'Custom REST/GraphQL APIs',
      '60 Days Dedicated Support & SLA',
    ],
    popular: false,
    cta: 'Request Quote',
  },
];

const defaultFaqs = [
  {
    q: 'How long does it take to develop a custom website?',
    a: 'A standard business website typically takes 7–14 days. Complex web applications or enterprise portals usually take 3–5 weeks depending on exact requirements.',
  },
  {
    q: 'Will my website be mobile-friendly and fast?',
    a: 'Absolutely. We build all web projects mobile-first with Next.js and Tailwind CSS, guaranteeing sub-second load times and 95+ Google PageSpeed scores.',
  },
  {
    q: 'Can I update content on my own after launch?',
    a: 'Yes! We provide an intuitive admin dashboard where you can easily update banners, text, images, blogs, and project portfolios without touching code.',
  },
  {
    q: 'Do you offer domain, hosting, and SSL support?',
    a: 'Yes, we assist with domain setup (.com / .pro.bd / .bd), SSL certification, and cloud deployment on Vercel or AWS with global CDN.',
  },
  {
    q: 'What happens after the website is launched?',
    a: 'Every project includes 15 to 60 days of free dedicated technical support, bug fixing, and training to ensure smooth operations.',
  },
];

function arr(t, key) {
  const val = t(key, { returnObjects: true });
  return Array.isArray(val) && val.length > 0 ? val : null;
}

export default function WebDevContent() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const stats = arr(t, 'webDev.stats') || [
    { value: '99.9%', label: 'Uptime Reliability' },
    { value: '<1s', label: 'Page Load Speed' },
    { value: '50+', label: 'Delivered Projects' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  const features = arr(t, 'webDev.features.items') || fallbackFeatures;
  const plans = arr(t, 'webDev.pricing.plans') || defaultPlans;
  const faqs = arr(t, 'webDev.faq.items') || defaultFaqs;

  return (
    <main className="bg-white dark:bg-zinc-950 text-[#27003B] dark:text-white transition-colors duration-300">
      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Glowing Background Auras */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 blur-3xl animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, #7c3aed, #06b6d4, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-raleway mb-6"
          >
            <Link href="/" className="hover:text-violet-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-violet-500 transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-violet-600 dark:text-violet-400 font-semibold">
              Web Development
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950/90 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 uppercase tracking-widest font-raleway mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Next.js & React Engineering
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-tight mb-6 text-[#27003B] dark:text-white">
            Modern Web Development{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              Built for Scale
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-10 font-raleway">
            We craft ultra-fast, responsive, and SEO-optimized business websites and web platforms using Next.js 16, React, and cloud-native architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact?service=Website%20Development"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white text-sm font-black uppercase tracking-wider font-raleway hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300"
            >
              <span>Get Free Consultation</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              href="/our-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-bold font-raleway text-zinc-800 dark:text-zinc-200 hover:border-violet-500 hover:text-violet-600 transition-all duration-300"
            >
              View Live Portfolio
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-raleway">
            <div className="flex items-center justify-center gap-1.5">
              <FiShield className="text-emerald-500" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiZap className="text-amber-500" />
              <span>95+ PageSpeed</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiAward className="text-violet-500" />
              <span>100% Mobile Ready</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FiCheckCircle className="text-cyan-500" />
              <span>Free 30-Day Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Metric Bar ── */}
      <section className="px-4 sm:px-6 pb-20" aria-label="Web dev stats">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xl shadow-xl shadow-violet-950/5 card-hover-lift"
            >
              <p className="text-3xl sm:text-4xl font-display uppercase tracking-wide bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent mb-1">
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
            <span className="inline-block text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase font-raleway mb-3">
              ✦ Engineered for Performance
            </span>
            <h2
              id="features-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Everything Your Website{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                Needs to Dominate
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const meta = featureMeta[i] || featureMeta[0];
              return (
                <div
                  key={i}
                  className={`group relative flex flex-col justify-between p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift transition-all duration-300 ${meta.borderGlow}`}
                >
                  <div>
                    {/* Floating Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${meta.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${meta.iconColor} shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {meta.icon}
                    </div>

                    <h3 className="font-display text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 font-raleway group-hover:translate-x-1 transition-transform">
                    <span>Enterprise Standard</span>
                    <FiCheckCircle size={14} className="text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modern Tech Stack Pills ── */}
      <section className="px-4 sm:px-6 pb-24" aria-label="Technology stack">
        <div className="max-w-6xl mx-auto p-10 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-violet-50/50 via-white to-cyan-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-950 backdrop-blur-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase font-raleway mb-2 block">
              ✦ Modern Development Ecosystem
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide">
              Cutting-Edge Tech Stack
            </h3>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm hover:border-violet-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500" />
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
            <span className="inline-block text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase font-raleway mb-3">
              ✦ Clear & Transparent Investment
            </span>
            <h2
              id="pricing-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Choose Your{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                Web Package
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 card-hover-lift ${plan.popular
                  ? 'border-2 border-violet-500 bg-gradient-to-b from-violet-50/80 via-white to-white dark:from-violet-950/50 dark:via-zinc-900 dark:to-zinc-900 shadow-2xl shadow-violet-500/20 scale-105 z-10'
                  : 'border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-lg'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-black uppercase tracking-widest shadow-md">
                    ★ Most Recommended
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
                    <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-violet-600 dark:text-violet-400">
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
                  href={`/contact?service=Website%20Development&package=${encodeURIComponent(plan.name)}`}
                  className={`w-full py-4 rounded-2xl text-center text-sm font-black uppercase tracking-wider font-raleway transition-all duration-200 ${plan.popular
                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white hover:opacity-95 shadow-lg shadow-violet-500/25'
                    : 'border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 hover:border-violet-500 hover:text-violet-600'
                    }`}
                >
                  {plan.cta || 'Get Started Now'}
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
            <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase font-raleway mb-2 block">
              ✦ Have Questions?
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
                      className={`text-violet-600 dark:text-violet-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
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
        <div className="relative max-w-6xl mx-auto p-10 sm:p-16 rounded-3xl overflow-hidden bg-gradient-to-r from-violet-950 via-[#1a0030] to-cyan-950 border border-violet-500/30 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 font-raleway mb-4">
              ✦ Ready to Elevate Your Online Presence?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              Let's Build Your Dream Website Together
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-raleway leading-relaxed mb-8">
              Book a free discovery session with our lead architects today and get a tailored strategy for your business.
            </p>
            <Link
              href="/contact?service=Website%20Development"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black text-sm uppercase tracking-wider font-raleway hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300"
            >
              <span>Schedule Free Strategy Call</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
