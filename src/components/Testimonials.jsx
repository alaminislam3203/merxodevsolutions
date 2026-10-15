'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useContext } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { SessionContext } from 'next-auth/react';
import {
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaPenNib,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { DEFAULT_REVIEWS } from '@/lib/defaultReviews';
import '@/components/i18n';

const AVATAR_GRADIENTS = [
  'from-violet-600 to-indigo-600',
  'from-fuchsia-600 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-600 to-rose-600',
  'from-blue-600 to-violet-600',
  'from-indigo-600 to-cyan-500',
];

export default function Testimonials() {
  const { t } = useTranslation();
  const sessionContext = useContext(SessionContext);
  const session = sessionContext?.data;

  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);



  // Fetch approved reviews from API
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) return;
      const data = await res.json();
      if (data?.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviews(data.reviews);
      }
    } catch {
      // Gracefully fall back to DEFAULT_REVIEWS without triggering runtime error overlays
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Smooth scroll to testimonials section when arriving via ?scroll=testimonials or #testimonials
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScrollTarget = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      if (hash === '#testimonials' || params.get('scroll') === 'testimonials') {
        setTimeout(() => {
          const el = document.getElementById('testimonials');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Clean up hash/query param so address bar displays clean URL
            if (window.history.replaceState) {
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }
          }
        }, 250);
      }
    };

    handleScrollTarget();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 1 },
        '(min-width: 1024px)': { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect, reviews]);



  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 relative overflow-hidden"
      aria-label="Client testimonials"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content="MerxoDev Solutions Custom Software & Web Development" />
      <div
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
        className="hidden"
      >
        <meta itemProp="ratingValue" content="5.0" />
        <meta itemProp="reviewCount" content={String(reviews.length || 8)} />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="worstRating" content="1" />
      </div>

      {/* Background Ambience & Grid Patterns */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-violet-600/10 rounded-xl blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-xl blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-4 tracking-wide">
              <BsStars className="text-violet-600 dark:text-cyan-400" />
              <span>{t('testimonials.badge') || 'Client Testimonials'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {t('testimonials.titlePrefix') || 'Trusted by '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500">
                {t('testimonials.titleHighlight') || 'Innovative Brands'}
              </span>
              <br className="hidden sm:inline" />
              {t('testimonials.titleSuffix') || ' Worldwide'}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              {t('testimonials.subtitle') ||
                'Hear directly from founders, CTOs, and product leaders who scaled their digital presence with MerxoDev Solutions.'}
            </p>
          </div>

          {/* Action Header: Rating Summary + Write Review Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-md">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} size={15} />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {t('testimonials.ratingSummary') || '5.0 / 5.0 (100% Satisfaction)'}
              </span>
            </div>

            <Link
              id="write-review-btn"
              href={session?.user ? '/write-review' : '/account/login?redirect=/write-review'}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <FaPenNib size={13} />
              <span>{t('testimonials.writeReview') || 'Write a Review'}</span>
            </Link>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-4" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6">
              {reviews.map((item, idx) => {
                const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
                return (
                  <div
                    key={item.id || idx}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 sm:pl-6"
                  >
                    <article
                      itemProp="review"
                      itemScope
                      itemType="https://schema.org/Review"
                      className="h-full flex flex-col justify-between p-7 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 relative group"
                    >
                      {/* Top Row: Tag & Verified Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-100/70 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60">
                          {item.tag || t('testimonials.clientFeedback') || 'Client Feedback'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <FaCheckCircle size={12} />
                          <span>{t('testimonials.verified') || 'Verified'}</span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: item.rating || 5 }).map((_, starIdx) => (
                          <FaStar key={starIdx} size={14} className="text-amber-400 drop-shadow-sm" />
                        ))}
                      </div>

                      {/* Quote Icon & Review Text */}
                      <div className="relative flex-1 mb-6">
                        <FaQuoteLeft
                          size={28}
                          className="text-violet-200 dark:text-violet-900/60 absolute -top-2 -left-1 opacity-40 pointer-events-none"
                        />
                        <p
                          className="relative z-10 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic"
                          itemProp="reviewBody"
                        >
                          "{item.comment}"
                        </p>
                      </div>

                      {/* Client Profile Footer */}
                      <div
                        className="flex items-center gap-3.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80"
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                      >
                        {item.userImage ? (
                          <img
                            src={item.userImage}
                            alt={item.userName || 'Client'}
                            className="w-11 h-11 rounded-2xl object-cover shadow-md shadow-violet-500/20 shrink-0 group-hover:scale-105 transition-transform border border-violet-200/40 dark:border-violet-800/40"
                          />
                        ) : (
                          <div
                            aria-hidden
                            className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-exo-medium text-base font-black shadow-md shadow-violet-500/20 shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            {(item.userName || 'C').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <p
                            className="text-sm font-bold text-zinc-900 dark:text-white truncate"
                            itemProp="name"
                          >
                            {item.userName}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {item.userRole || 'Client'} {item.company ? `• ${item.company}` : ''}
                          </p>
                          {item.location && (
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                              <FaMapMarkerAlt className="w-2.5 h-2.5 shrink-0 text-violet-500 dark:text-cyan-400" />
                              <span>{item.location}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Pagination Dots (No arrow buttons) */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollTo(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === dotIdx
                    ? 'w-7 bg-gradient-to-r from-violet-600 to-cyan-500 shadow-sm shadow-violet-500/25'
                    : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-violet-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
