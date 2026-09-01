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
    href: '/services-api-integration',
    bgColor: 'bg-[#FFB703]',
    shadowColor: 'shadow-[#FFB703]/30',
    glowColor: 'group-hover:shadow-[#FFB703]/50',
  },
  {
    title: 'Security',
    fullTitle: 'Authentication & Security',
    icon: <FiShield size={32} />,
    href: '/services-security',
    bgColor: 'bg-[#FB8500]',
    shadowColor: 'shadow-[#FB8500]/30',
    glowColor: 'group-hover:shadow-[#FB8500]/50',
  },
  {
    title: 'Payment Gateway',
    fullTitle: 'bKash, Nagad & Stripe',
    icon: <FiCreditCard size={32} />,
    href: '/services-payment-gateway',
    bgColor: 'bg-[#B5838D]',
    shadowColor: 'shadow-[#B5838D]/30',
    glowColor: 'group-hover:shadow-[#B5838D]/50',
  },
  {
    title: 'Database',
    fullTitle: 'Database & Cloud Storage',
    icon: <FiDatabase size={32} />,
    href: '/services-database',
    bgColor: 'bg-[#7209B7]',
    shadowColor: 'shadow-[#7209B7]/30',
    glowColor: 'group-hover:shadow-[#7209B7]/50',
  },
  {
    title: 'Maintenance',
    fullTitle: 'Maintenance & 24/7 SLA',
    icon: <FiTool size={32} />,
    href: '/services-maintenance',
    bgColor: 'bg-[#4CC9F0]',
    shadowColor: 'shadow-[#4CC9F0]/30',
    glowColor: 'group-hover:shadow-[#4CC9F0]/50',
  },
  {
    title: 'Automation',
    fullTitle: 'Business Automation',
    icon: <FiCpu size={32} />,
    href: '/services-automation',
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
      aria-label="Services and Categories"
      className="w-full max-w-full relative pt-6 sm:pt-8 pb-2 sm:pb-3 px-2 sm:px-3 overflow-hidden bg-transparent transition-colors duration-300"
    >
      {/* Background Soft Ambient Glows matching site theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          // background: 'radial-gradient(circle, #84cc16, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
        style={{
          // background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          animationDelay: '2s',
        }}
      />

      {/* Exact 1400px container matching hero-dual-grid */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* ── App Icon Square Grid: Full-Width 12 Columns on Desktop, 6 on Tablet, 4 on Mobile ── */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-6 lg:gap-x-2.5 justify-items-center">
          {serviceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full"
            >
              {/* Rounded Square App Icon Box */}
              <div
                className={`w-15 h-15 sm:w-18 sm:h-18 lg:w-19 lg:h-19 xl:w-20 xl:h-20 rounded-2xl sm:rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
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
              <span className="mt-2 text-[11px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-[#a3e635] group-hover:font-bold transition-colors tracking-wide font-raleway truncate w-full px-0.5">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
