'use client';

import { useState, useEffect, useRef } from 'react';
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
    icon: <FiGlobe size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-web',
    bgColor: 'bg-[#FF6B6B]',
    shadowColor: 'shadow-[#FF6B6B]/30',
    glowColor: 'group-hover:shadow-[#FF6B6B]/50',
  },
  {
    title: 'E-Commerce',
    fullTitle: 'E-Commerce Solutions',
    icon: <FiShoppingCart size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-ecommerce',
    bgColor: 'bg-[#FFA06A]',
    shadowColor: 'shadow-[#FFA06A]/30',
    glowColor: 'group-hover:shadow-[#FFA06A]/50',
  },
  {
    title: 'Web App',
    fullTitle: 'Custom Web Applications',
    icon: <FiCode size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-web-app',
    bgColor: 'bg-[#5DE0E6]',
    shadowColor: 'shadow-[#5DE0E6]/30',
    glowColor: 'group-hover:shadow-[#5DE0E6]/50',
  },
  {
    title: 'UI/UX Design',
    fullTitle: 'UI/UX & Figma Design',
    icon: <FiLayout size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-design',
    bgColor: 'bg-[#84cc16]',
    shadowColor: 'shadow-[#84cc16]/30',
    glowColor: 'group-hover:shadow-[#84cc16]/50',
  },
  {
    title: 'SEO Growth',
    fullTitle: 'SEO & Organic Growth',
    icon: <FiTrendingUp size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-seo',
    bgColor: 'bg-[#9D4EDD]',
    shadowColor: 'shadow-[#9D4EDD]/30',
    glowColor: 'group-hover:shadow-[#9D4EDD]/50',
  },
  {
    title: 'API Integration',
    fullTitle: 'APIs & Webhooks',
    icon: <FiLink size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-api-integration',
    bgColor: 'bg-[#FFB703]',
    shadowColor: 'shadow-[#FFB703]/30',
    glowColor: 'group-hover:shadow-[#FFB703]/50',
  },
  {
    title: 'Security',
    fullTitle: 'Authentication & Security',
    icon: <FiShield size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-security',
    bgColor: 'bg-[#FB8500]',
    shadowColor: 'shadow-[#FB8500]/30',
    glowColor: 'group-hover:shadow-[#FB8500]/50',
  },
  {
    title: 'Payment Gateway',
    fullTitle: 'bKash, Nagad & Stripe',
    icon: <FiCreditCard size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-payment-gateway',
    bgColor: 'bg-[#B5838D]',
    shadowColor: 'shadow-[#B5838D]/30',
    glowColor: 'group-hover:shadow-[#B5838D]/50',
  },
  {
    title: 'Database',
    fullTitle: 'Database & Cloud Storage',
    icon: <FiDatabase size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-database',
    bgColor: 'bg-[#7209B7]',
    shadowColor: 'shadow-[#7209B7]/30',
    glowColor: 'group-hover:shadow-[#7209B7]/50',
  },
  {
    title: 'Maintenance',
    fullTitle: 'Maintenance & 24/7 SLA',
    icon: <FiTool size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-maintenance',
    bgColor: 'bg-[#4CC9F0]',
    shadowColor: 'shadow-[#4CC9F0]/30',
    glowColor: 'group-hover:shadow-[#4CC9F0]/50',
  },
  {
    title: 'Automation',
    fullTitle: 'Business Automation',
    icon: <FiCpu size={28} className="sm:w-8 sm:h-8" />,
    href: '/services-automation',
    bgColor: 'bg-[#F72585]',
    shadowColor: 'shadow-[#F72585]/30',
    glowColor: 'group-hover:shadow-[#F72585]/50',
  },
  {
    title: 'All Services',
    fullTitle: 'Explore All Solutions',
    icon: <FiGrid size={28} className="sm:w-8 sm:h-8" />,
    href: '/services',
    bgColor: 'bg-gradient-to-br from-lime-500 via-emerald-500 to-cyan-500',
    shadowColor: 'shadow-lime-500/30',
    glowColor: 'group-hover:shadow-lime-500/50',
  },
];

// 3 Mobile Slides (Each Slide = 4 items in Row 1 + 4 items in Row 2 = 8 items visible)
const mobileSlides = [
  {
    row1: serviceCategories.slice(0, 4), // 0..3: Web Dev, E-Commerce, Web App, UI/UX
    row2: serviceCategories.slice(4, 8), // 4..7: SEO Growth, API Integration, Security, Payment Gateway
  },
  {
    row1: serviceCategories.slice(4, 8), // 4..7: SEO Growth, API Integration, Security, Payment Gateway
    row2: serviceCategories.slice(8, 12), // 8..11: Database, Maintenance, Automation, All Services
  },
  {
    row1: serviceCategories.slice(8, 12), // 8..11: Database, Maintenance, Automation, All Services
    row2: serviceCategories.slice(0, 4), // 0..3: Web Dev, E-Commerce, Web App, UI/UX
  },
];

function ServiceCardItem({ item }) {
  return (
    <Link
      href={item.href}
      title={item.fullTitle}
      className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full select-none"
    >
      {/* Rounded Square App Icon Box */}
      <div
        className={`w-14 h-14 sm:w-18 sm:h-18 lg:w-19 lg:h-19 xl:w-20 xl:h-20 rounded-2xl sm:rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
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
      <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-[#a3e635] group-hover:font-bold transition-colors tracking-wide font-raleway truncate w-full px-0.5">
        {item.title}
      </span>
    </Link>
  );
}

export default function ServicesPreview() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-swipe every 3 seconds (3000ms) on mobile
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        // Swipe Left -> Next
        setCurrentSlide((prev) => (prev + 1) % mobileSlides.length);
      } else if (diff < -45) {
        // Swipe Right -> Prev
        setCurrentSlide((prev) => (prev - 1 + mobileSlides.length) % mobileSlides.length);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setIsPaused(false);
  };

  return (
    <section
      aria-label="Services and Categories"
      className="w-full max-w-full relative pt-5 sm:pt-8 pb-3 sm:pb-3 px-2 sm:px-3 overflow-hidden bg-transparent transition-colors duration-300"
    >
      {/* Background Soft Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* ─── Mobile View: 2 Rows of 4 (8 visible), Auto-Swiping Every 3 Seconds ─── */}
        <div
          className="sm:hidden w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {mobileSlides.map((slide, sIdx) => (
              <div key={sIdx} className="w-full shrink-0 px-1">
                {/* Row 1 (4 items) */}
                <div className="grid grid-cols-4 gap-x-2 gap-y-2 justify-items-center mb-3">
                  {slide.row1.map((item, i) => (
                    <ServiceCardItem key={`r1-${sIdx}-${i}`} item={item} />
                  ))}
                </div>

                {/* Row 2 (4 items) */}
                <div className="grid grid-cols-4 gap-x-2 gap-y-2 justify-items-center">
                  {slide.row2.map((item, i) => (
                    <ServiceCardItem key={`r2-${sIdx}-${i}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators for Mobile */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {mobileSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-5 bg-gradient-to-r from-lime-500 to-cyan-500'
                    : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ─── Tablet & Desktop View: Full-Width 6 / 12 Columns Grid ─── */}
        <div className="hidden sm:grid sm:grid-cols-6 lg:grid-cols-12 gap-x-3 gap-y-6 lg:gap-x-2.5 justify-items-center">
          {serviceCategories.map((item, i) => (
            <ServiceCardItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
