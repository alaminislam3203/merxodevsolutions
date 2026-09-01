'use client';

import Link from 'next/link';
import {
  FiGlobe,
  FiShoppingCart,
  FiCode,
  FiLayout,
  FiTrendingUp,
  FiLink,
  FiShield,
  FiCreditCard,
  FiDatabase,
  FiTool,
  FiCpu,
  FiGrid,
} from 'react-icons/fi';

const serviceCategories = [
  {
    title: 'Web Dev',
    fullTitle: 'Website Development',
    icon: <FiGlobe size={32} />,
    href: '/services-web',
    bgColor: 'bg-[#FF6B6B]',
    shadowColor: 'shadow-[#FF6B6B]/30',
    glowColor: 'group-hover:shadow-[#FF6B6B]/50',
  },
  {
    title: 'E-Commerce',
    fullTitle: 'E-Commerce Solutions',
    icon: <FiShoppingCart size={32} />,
    href: '/services-ecommerce',
    bgColor: 'bg-[#FFA06A]',
    shadowColor: 'shadow-[#FFA06A]/30',
    glowColor: 'group-hover:shadow-[#FFA06A]/50',
  },
  {
    title: 'Web App',
    fullTitle: 'Custom Web Applications',
    icon: <FiCode size={32} />,
    href: '/services-web-app',
    bgColor: 'bg-[#5DE0E6]',
    shadowColor: 'shadow-[#5DE0E6]/30',
    glowColor: 'group-hover:shadow-[#5DE0E6]/50',
  },
  {
    title: 'UI/UX Design',
    fullTitle: 'UI/UX & Figma Design',
    icon: <FiLayout size={32} />,
    href: '/services-design',
    bgColor: 'bg-[#84cc16]',
    shadowColor: 'shadow-[#84cc16]/30',
    glowColor: 'group-hover:shadow-[#84cc16]/50',
  },
  {
    title: 'SEO Growth',
    fullTitle: 'SEO & Organic Growth',
    icon: <FiTrendingUp size={32} />,
    href: '/services-seo',
    bgColor: 'bg-[#9D4EDD]',
    shadowColor: 'shadow-[#9D4EDD]/30',
    glowColor: 'group-hover:shadow-[#9D4EDD]/50',
  },
  {
    title: 'API Integration',
    fullTitle: 'APIs & Webhooks',
    icon: <FiLink size={32} />,
    href: '/services',
    bgColor: 'bg-[#FFB703]',
    shadowColor: 'shadow-[#FFB703]/30',
    glowColor: 'group-hover:shadow-[#FFB703]/50',
  },
  {
    title: 'Security',
    fullTitle: 'Authentication & Security',
    icon: <FiShield size={32} />,
    href: '/services',
    bgColor: 'bg-[#FB8500]',
    shadowColor: 'shadow-[#FB8500]/30',
    glowColor: 'group-hover:shadow-[#FB8500]/50',
  },
  {
    title: 'Payment Gateway',
    fullTitle: 'bKash, Nagad & Stripe',
    icon: <FiCreditCard size={32} />,
    href: '/services',
    bgColor: 'bg-[#B5838D]',
    shadowColor: 'shadow-[#B5838D]/30',
    glowColor: 'group-hover:shadow-[#B5838D]/50',
  },
  {
    title: 'Database',
    fullTitle: 'Database & Cloud Storage',
    icon: <FiDatabase size={32} />,
    href: '/services',
    bgColor: 'bg-[#7209B7]',
    shadowColor: 'shadow-[#7209B7]/30',
    glowColor: 'group-hover:shadow-[#7209B7]/50',
  },
  {
    title: 'Maintenance',
    fullTitle: 'Maintenance & 24/7 SLA',
    icon: <FiTool size={32} />,
    href: '/services',
    bgColor: 'bg-[#4CC9F0]',
    shadowColor: 'shadow-[#4CC9F0]/30',
    glowColor: 'group-hover:shadow-[#4CC9F0]/50',
  },
  {
    title: 'Automation',
    fullTitle: 'Business Automation',
    icon: <FiCpu size={32} />,
    href: '/services',
    bgColor: 'bg-[#F72585]',
    shadowColor: 'shadow-[#F72585]/30',
    glowColor: 'group-hover:shadow-[#F72585]/50',
  },
  {
    title: 'All Services',
    fullTitle: 'Explore All Solutions',
    icon: <FiGrid size={32} />,
    href: '/services',
    bgColor: 'bg-gradient-to-br from-lime-500 via-emerald-500 to-cyan-500',
    shadowColor: 'shadow-lime-500/30',
    glowColor: 'group-hover:shadow-lime-500/50',
  },
];

export default function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-categories-heading"
      className="relative py-20 px-4 sm:px-6 overflow-hidden bg-white dark:bg-zinc-950 border-y border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
    >
      {/* Background Soft Ambient Glows matching site theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #84cc16, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Section Header matching site component theme */}
        <div className="flex flex-col items-center text-center gap-3.5 mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-lime-500/10 dark:bg-lime-950/40 text-lime-600 dark:text-[#a3e635] border border-lime-500/30 font-raleway uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse" />
            Our Core Categories
          </span>

          <h2
            id="services-categories-heading"
            className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            Digital Services &{' '}
            <span className="bg-gradient-to-r from-lime-500 via-[#84cc16] to-cyan-400 bg-clip-text text-transparent animated-gradient-text">
              Solutions
            </span>
          </h2>

          <p className="max-w-xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-raleway">
            Select any category below to discover custom digital solutions engineered for your business growth.
          </p>
        </div>

        {/* ── App Icon Square Grid ── */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 justify-items-center">
          {serviceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full max-w-[100px] sm:max-w-[110px]"
            >
              {/* Rounded Square App Icon Box */}
              <div
                className={`w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl sm:rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-lg ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
              >
                {/* Glossy Top Glass Shimmer */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-200">
                  {item.icon}
                </div>
              </div>

              {/* Title below square with Neon / Lime Green hover text */}
              <span className="mt-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-[#a3e635] group-hover:font-bold transition-colors tracking-wide font-raleway truncate w-full px-1">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
