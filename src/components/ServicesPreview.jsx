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

const allServiceCategories = [
  {
    title: 'Web Dev',
    fullTitle: 'Website Development',
    icon: <FiGlobe size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-web',
    bgColor: 'bg-[#FF6B6B]',
    shadowColor: 'shadow-[#FF6B6B]/30',
    glowColor: 'group-hover:shadow-[#FF6B6B]/50',
    borderGradient: 'from-[#FF6B6B] via-[#FFA06A] to-[#FF6B6B]',
  },
  {
    title: 'E-Commerce',
    fullTitle: 'E-Commerce Solutions',
    icon: <FiShoppingCart size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-ecommerce',
    bgColor: 'bg-[#FFA06A]',
    shadowColor: 'shadow-[#FFA06A]/30',
    glowColor: 'group-hover:shadow-[#FFA06A]/50',
    borderGradient: 'from-[#FFA06A] via-[#FFB703] to-[#FFA06A]',
  },
  {
    title: 'Web App',
    fullTitle: 'Custom Web Applications',
    icon: <FiCode size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-web-app',
    bgColor: 'bg-[#5DE0E6]',
    shadowColor: 'shadow-[#5DE0E6]/30',
    glowColor: 'group-hover:shadow-[#5DE0E6]/50',
    borderGradient: 'from-[#5DE0E6] via-[#4CC9F0] to-[#5DE0E6]',
  },
  {
    title: 'UI/UX Design',
    fullTitle: 'UI/UX & Figma Design',
    icon: <FiLayout size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-design',
    bgColor: 'bg-[#84cc16]',
    shadowColor: 'shadow-[#84cc16]/30',
    glowColor: 'group-hover:shadow-[#84cc16]/50',
    borderGradient: 'from-[#84cc16] via-emerald-400 to-[#84cc16]',
  },
  {
    title: 'SEO Growth',
    fullTitle: 'SEO & Organic Growth',
    icon: <FiTrendingUp size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-seo',
    bgColor: 'bg-[#9D4EDD]',
    shadowColor: 'shadow-[#9D4EDD]/30',
    glowColor: 'group-hover:shadow-[#9D4EDD]/50',
    borderGradient: 'from-[#9D4EDD] via-[#7209B7] to-[#9D4EDD]',
  },
  {
    title: 'API Integration',
    fullTitle: 'APIs & Webhooks',
    icon: <FiLink size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-api-integration',
    bgColor: 'bg-[#FFB703]',
    shadowColor: 'shadow-[#FFB703]/30',
    glowColor: 'group-hover:shadow-[#FFB703]/50',
    borderGradient: 'from-[#FFB703] via-[#FB8500] to-[#FFB703]',
  },
  {
    title: 'Security',
    fullTitle: 'Authentication & Security',
    icon: <FiShield size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-security',
    bgColor: 'bg-[#FB8500]',
    shadowColor: 'shadow-[#FB8500]/30',
    glowColor: 'group-hover:shadow-[#FB8500]/50',
    borderGradient: 'from-[#FB8500] via-[#FF6B6B] to-[#FB8500]',
  },
  {
    title: 'Payment Gateway',
    fullTitle: 'bKash, Nagad & Stripe',
    icon: <FiCreditCard size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-payment-gateway',
    bgColor: 'bg-[#B5838D]',
    shadowColor: 'shadow-[#B5838D]/30',
    glowColor: 'group-hover:shadow-[#B5838D]/50',
    borderGradient: 'from-[#B5838D] via-[#F72585] to-[#B5838D]',
  },
  {
    title: 'Database',
    fullTitle: 'Database & Cloud Storage',
    icon: <FiDatabase size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-database',
    bgColor: 'bg-[#7209B7]',
    shadowColor: 'shadow-[#7209B7]/30',
    glowColor: 'group-hover:shadow-[#7209B7]/50',
    borderGradient: 'from-[#7209B7] via-[#9D4EDD] to-[#7209B7]',
  },
  {
    title: 'Maintenance',
    fullTitle: 'Maintenance & 24/7 SLA',
    icon: <FiTool size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-maintenance',
    bgColor: 'bg-[#4CC9F0]',
    shadowColor: 'shadow-[#4CC9F0]/30',
    glowColor: 'group-hover:shadow-[#4CC9F0]/50',
    borderGradient: 'from-[#4CC9F0] via-[#5DE0E6] to-[#4CC9F0]',
  },
  {
    title: 'Automation',
    fullTitle: 'Business Automation',
    icon: <FiCpu size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-automation',
    bgColor: 'bg-[#F72585]',
    shadowColor: 'shadow-[#F72585]/30',
    glowColor: 'group-hover:shadow-[#F72585]/50',
    borderGradient: 'from-[#F72585] via-[#B5838D] to-[#F72585]',
  },
  {
    title: 'All Services',
    fullTitle: 'Explore All Solutions',
    icon: <FiGrid size={28} className="sm:w-8 sm:h-8" />,
    href: '/services',
    bgColor: 'bg-gradient-to-br from-lime-500 via-emerald-500 to-cyan-500',
    shadowColor: 'shadow-lime-500/30',
    glowColor: 'group-hover:shadow-lime-500/50',
    borderGradient: 'from-lime-400 via-cyan-400 to-lime-400',
  },
];

// Mobile displays exactly 8 items (4 per line x 2 lines)
const mobileServiceCategories = [
  allServiceCategories[0], // Web Dev
  allServiceCategories[1], // E-Commerce
  allServiceCategories[2], // Web App
  allServiceCategories[3], // UI/UX Design
  allServiceCategories[4], // SEO Growth
  allServiceCategories[5], // API Integration
  allServiceCategories[7], // Payment Gateway
  allServiceCategories[11], // All Services
];

export default function ServicesPreview() {
  return (
    <section
      aria-label="Services and Categories"
      className="w-full max-w-full relative pt-4 sm:pt-8 pb-2 sm:pb-3 px-2.5 sm:px-3 overflow-hidden bg-transparent transition-colors duration-300"
    >
      {/* Background Soft Ambient Glows matching site theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* ─── MOBILE VIEW: Exactly 8 items in 2 rows of 4 with 4-sided rotating gradient glow ─── */}
        <div className="grid sm:hidden grid-cols-4 gap-x-2 gap-y-3 justify-items-center">
          {mobileServiceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full"
            >
              {/* Card Container with 4-sided continuous rotating gradient border */}
              <div className="relative p-[1.8px] rounded-[20px] overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                {/* 4-sided rotating conic gradient beam */}
                <div
                  aria-hidden
                  className="absolute inset-[-120%] bg-[conic-gradient(from_0deg,#FF6B6B,#5DE0E6,#84cc16,#FFB703,#F72585,#FF6B6B)] animate-[spin_4s_linear_infinite] opacity-90"
                />

                {/* Rounded Square App Icon Box */}
                <div
                  className={`relative z-10 w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 rounded-[18px] ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor}`}
                >
                  {/* Glossy Top Glass Shimmer */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/35 to-transparent pointer-events-none opacity-80"
                  />
                  <div className="relative z-10 drop-shadow-md">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Title below square */}
              <span className="mt-1.5 text-[10.5px] min-[380px]:text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-[#a3e635] transition-colors tracking-tight font-raleway truncate w-full px-0.5">
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* ─── DESKTOP & TABLET VIEW: Full 12 Items across 6 / 12 Columns ─── */}
        <div className="hidden sm:grid sm:grid-cols-6 lg:grid-cols-12 gap-x-3 gap-y-6 lg:gap-x-2.5 justify-items-center">
          {allServiceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full"
            >
              {/* Rounded Square App Icon Box */}
              <div
                className={`w-18 h-18 lg:w-19 lg:h-19 xl:w-20 xl:h-20 rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
              >
                {/* Glossy Top Glass Shimmer */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-200">
                  {item.icon}
                </div>
              </div>

              {/* Title below square with Neon / Lime Green hover text */}
              <span className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-[#a3e635] group-hover:font-bold transition-colors tracking-wide font-raleway truncate w-full px-0.5">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
