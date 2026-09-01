'use client';

import Link from 'next/link';
import {
  FiGlobe,
  FiShoppingCart,
  FiCode,
  FiLayout,
  FiTrendingUp,
  FiGrid,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';

const featuredServices = [
  {
    icon: <FiGlobe size={26} />,
    title: 'Website Development',
    subtitle: 'Next.js & React High Performance',
    desc: 'Blazing fast, responsive, and SEO-ready business websites built for maximum brand conversion.',
    highlights: ['Next.js 16', 'Sub-second Speed', 'SEO Structured', '100% Mobile Ready'],
    href: '/services-web',
    accent: 'from-violet-600 to-indigo-600',
    lightBg: 'bg-violet-50 dark:bg-violet-950/80',
    iconColor: 'text-violet-600 dark:text-violet-400',
    glowColor: 'hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-violet-500/15',
    badge: 'Popular',
  },
  {
    icon: <FiShoppingCart size={26} />,
    title: 'E-Commerce Solutions',
    subtitle: 'High-Converting Online Stores',
    desc: 'Complete e-commerce systems with bKash/Nagad/Stripe, product catalog, cart, and automated order tracking.',
    highlights: ['Payment Gateways', 'Inventory Sync', 'One-Page Checkout', 'Sales Analytics'],
    href: '/services-ecommerce',
    accent: 'from-cyan-500 to-teal-500',
    lightBg: 'bg-cyan-50 dark:bg-cyan-950/80',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-cyan-500/15',
    badge: 'High Demand',
  },
  {
    icon: <FiCode size={26} />,
    title: 'Web Application & SaaS',
    subtitle: 'Custom Cloud Platforms',
    desc: 'Scalable web apps, admin dashboards, multi-tenant portals, and bespoke business automation tools.',
    highlights: ['Multi-Role RBAC', 'Real-Time Data', 'API & Cloud DB', 'Automated Jobs'],
    href: '/services-web-app',
    accent: 'from-indigo-500 to-violet-600',
    lightBg: 'bg-indigo-50 dark:bg-indigo-950/80',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    glowColor: 'hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-indigo-500/15',
    badge: 'Enterprise',
  },
  {
    icon: <FiLayout size={26} />,
    title: 'UI/UX & Figma Design',
    subtitle: 'Human-Centered Interfaces',
    desc: 'Pixel-perfect, clickable interactive prototypes and scalable design systems created in Figma.',
    highlights: ['Interactive Prototypes', 'Design Systems', 'Micro-Animations', 'User Journeys'],
    href: '/services-design',
    accent: 'from-pink-500 to-purple-600',
    lightBg: 'bg-pink-50 dark:bg-pink-950/80',
    iconColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-pink-500/15',
    badge: 'Creative',
  },
  {
    icon: <FiTrendingUp size={26} />,
    title: 'SEO & Growth Strategy',
    subtitle: 'Rank #1 on Google',
    desc: 'Technical SEO, Core Web Vitals optimization, Schema rich snippets, and high-authority link building.',
    highlights: ['Page 1 Ranking', 'Core Web Vitals', 'Schema.org JSON-LD', 'Local Maps SEO'],
    href: '/services-seo',
    accent: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/80',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-emerald-500/15',
    badge: 'Organic ROI',
  },
  {
    icon: <FiGrid size={26} />,
    title: 'All Digital Services',
    subtitle: 'Explore 12+ Core Solutions',
    desc: 'API integrations, database architecture, payment gateways, maintenance, and custom business automation.',
    highlights: ['Payment APIs', 'Security & Auth', 'Database Tuning', '24/7 SLA Support'],
    href: '/services',
    accent: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950/80',
    iconColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-amber-500/15',
    badge: 'Full Suite',
  },
];

export default function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-preview-heading"
      className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/60 dark:border-zinc-800/60"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #7c3aed, #06b6d4, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
              Our Core Expertise
            </span>
            <h2
              id="services-preview-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
            >
              Tailored Digital Solutions{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
                For Your Growth
              </span>
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-raleway group self-start sm:self-auto shrink-0 pb-1"
          >
            <span>View All Services</span>
            <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* ── Services Grid (2 Columns on Mobile, 3 Columns on Tablet/Desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredServices.map((service, i) => (
            <Link
              key={i}
              href={service.href}
              className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl card-hover-lift hover:shadow-xl transition-all duration-300 ${service.glowColor}`}
            >
              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${service.lightBg} border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center ${service.iconColor} shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700 font-raleway">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-zinc-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 font-raleway mb-3">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-raleway mb-5 line-clamp-2 sm:line-clamp-3">
                  {service.desc}
                </p>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-raleway"
                    >
                      <FiCheckCircle size={10} className="text-emerald-500" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Indicator */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400 font-raleway">
                <span className="group-hover:underline">Explore Details</span>
                <span className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors duration-200">
                  <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
