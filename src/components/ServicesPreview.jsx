'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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
  // Chunk into 8 items per slide for mobile (2 rows x 4 columns)
  const CHUNK_SIZE = 8;
  const mobilePages = [];
  for (let i = 0; i < serviceCategories.length; i += CHUNK_SIZE) {
    mobilePages.push(serviceCategories.slice(i, i + CHUNK_SIZE));
  }

  // Embla Carousel setup for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section
      aria-label="Services and Categories"
      className="w-full max-w-full relative pt-5 sm:pt-8 pb-3 sm:pb-3 px-2 sm:px-3 overflow-hidden bg-transparent transition-colors duration-300"
    >
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* ── Mobile Swiper: 8 items per slide (2 lines x 4 items) ── */}
        <div className="block sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {mobilePages.map((pageItems, pageIdx) => (
                <div key={pageIdx} className="flex-[0_0_100%] min-w-0 px-1">
                  <div className="grid grid-cols-4 gap-x-2 gap-y-3.5 justify-items-center">
                    {pageItems.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        title={item.fullTitle}
                        className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full"
                      >
                        {/* Rounded App Icon Box */}
                        <div
                          className={`w-14 h-14 rounded-2xl ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor} active:scale-95 transition-all duration-200 relative border border-white/20`}
                        >
                          <div
                            aria-hidden
                            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-80"
                          />
                          <div className="relative z-10 drop-shadow-md">
                            {item.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <span className="mt-1.5 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide font-raleway truncate w-full px-0.5">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots Pagination Indicator for Mobile */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {mobilePages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === idx
                    ? 'w-6 bg-gradient-to-r from-violet-600 to-cyan-500'
                    : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop & Tablet Grid: Full Row ── */}
        <div className="hidden sm:grid sm:grid-cols-6 lg:grid-cols-12 gap-x-3 sm:gap-y-6 lg:gap-x-2.5 justify-items-center">
          {serviceCategories.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              title={item.fullTitle}
              className="group flex flex-col items-center text-center cursor-pointer transition-all duration-300 w-full"
            >
              {/* Rounded Square App Icon Box */}
              <div
                className={`w-18 h-18 lg:w-19 lg:h-19 xl:w-20 xl:h-20 rounded-2xl sm:rounded-3xl ${item.bgColor} text-white flex items-center justify-center shadow-md ${item.shadowColor} group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${item.glowColor} transition-all duration-300 relative border border-white/20`}
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
