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
import { FaFigma } from 'react-icons/fa';

const serviceCategories = [
  {
    title: 'Web Dev',
    fullTitle: 'Website Development',
    icon: <FiGlobe size={34} />,
    href: '/services-web',
    bgColor: 'bg-[#FF6B6B]',
    shadowColor: 'shadow-[#FF6B6B]/30',
    glowColor: 'group-hover:shadow-[#FF6B6B]/50',
  },
  {
    title: 'E-Commerce',
    fullTitle: 'E-Commerce Solutions',
    icon: <FiShoppingCart size={34} />,
    href: '/services-ecommerce',
    bgColor: 'bg-[#FFA06A]',
    shadowColor: 'shadow-[#FFA06A]/30',
    glowColor: 'group-hover:shadow-[#FFA06A]/50',
  },
  {
    title: 'Web App',
    fullTitle: 'Custom Web Applications',
    icon: <FiCode size={34} />,
    href: '/services-web-app',
    bgColor: 'bg-[#5DE0E6]',
    shadowColor: 'shadow-[#5DE0E6]/30',
    glowColor: 'group-hover:shadow-[#5DE0E6]/50',
  },
  {
    title: 'UI/UX',
    fullTitle: 'UI/UX & Figma Design',
    icon: <FiLayout size={34} />,
    href: '/services-design',
    bgColor: 'bg-[#70E000]',
    shadowColor: 'shadow-[#70E000]/30',
    glowColor: 'group-hover:shadow-[#70E000]/50',
  },
  {
    title: 'SEO',
    fullTitle: 'SEO & Organic Growth',
    icon: <FiTrendingUp size={34} />,
    href: '/services-seo',
    bgColor: 'bg-[#9D4EDD]',
    shadowColor: 'shadow-[#9D4EDD]/30',
    glowColor: 'group-hover:shadow-[#9D4EDD]/50',
  },
  {
    title: 'API Integration',
    fullTitle: 'APIs & Webhooks',
    icon: <FiLink size={34} />,
    href: '/services',
    bgColor: 'bg-[#FFB703]',
    shadowColor: 'shadow-[#FFB703]/30',
    glowColor: 'group-hover:shadow-[#FFB703]/50',
  },
  {
    title: 'Security',
    fullTitle: 'Authentication & Security',
    icon: <FiShield size={34} />,
    href: '/services',
    bgColor: 'bg-[#FB8500]',
    shadowColor: 'shadow-[#FB8500]/30',
    glowColor: 'group-hover:shadow-[#FB8500]/50',
  },
  {
    title: 'Payment Gateway',
    fullTitle: 'bKash, Nagad & Stripe',
    icon: <FiCreditCard size={34} />,
    href: '/services',
    bgColor: 'bg-[#B5838D]',
    shadowColor: 'shadow-[#B5838D]/30',
    glowColor: 'group-hover:shadow-[#B5838D]/50',
  },
  {
    title: 'Database',
    fullTitle: 'Database & Cloud Storage',
    icon: <FiDatabase size={34} />,
    href: '/services',
    bgColor: 'bg-[#7209B7]',
    shadowColor: 'shadow-[#7209B7]/30',
    glowColor: 'group-hover:shadow-[#7209B7]/50',
  },
  {
    title: 'Maintenance',
    fullTitle: 'Maintenance & 24/7 SLA',
    icon: <FiTool size={34} />,
    href: '/services',
    bgColor: 'bg-[#4CC9F0]',
    shadowColor: 'shadow-[#4CC9F0]/30',
    glowColor: 'group-hover:shadow-[#4CC9F0]/50',
  },
  {
    title: 'Automation',
    fullTitle: 'Business Automation',
    icon: <FiCpu size={34} />,
    href: '/services',
    bgColor: 'bg-[#F72585]',
    shadowColor: 'shadow-[#F72585]/30',
    glowColor: 'group-hover:shadow-[#F72585]/50',
  },
  {
    title: 'All Services',
    fullTitle: 'Explore All Solutions',
    icon: <FiGrid size={34} />,
    href: '/services',
    bgColor: 'bg-gradient-to-br from-violet-600 to-cyan-500',
    shadowColor: 'shadow-violet-600/30',
    glowColor: 'group-hover:shadow-violet-600/50',
  },
];

export default function ServicesPreview() {
  return (
    <section
      aria-labelledby="services-categories-heading"
      className="relative py-14 sm:py-16 px-4 sm:px-6 overflow-hidden bg-[#0a0614]/80 dark:bg-black/90 border-y border-white/10"
    >
      {/* Background Soft Laptop Glow effect like the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, #3b82f6 0%, #8b5cf6 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Title & Subtext matching image styling */}
        <h2
          id="services-categories-heading"
          className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide mb-2"
          style={{ fontFamily: "'Playfair Display', serif, Georgia" }}
        >
          Services & Categories
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 dark:text-zinc-400 font-raleway tracking-wide mb-10 max-w-xl mx-auto">
          Explore tailored digital solutions engineered for your business growth
        </p>

        {/* ── App Icon Square Grid ── */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 justify-items-center">
          {serviceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full max-w-[100px] sm:max-w-[110px]"
            >
              {/* Rounded Square App Icon Box */}
              <div
                className={`w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl sm:rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-lg ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
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

              {/* Title below square */}
              <span className="mt-2.5 text-xs sm:text-sm font-medium text-zinc-200 dark:text-zinc-300 group-hover:text-white group-hover:font-bold transition-all tracking-wide font-raleway truncate w-full px-1">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
