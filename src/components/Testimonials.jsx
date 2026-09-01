'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaStar, FaQuoteLeft, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '@/components/i18n';

const clientReviews = [
  {
    name: 'Rakibul Islam',
    position: 'CEO & Founder',
    company: 'TechStart BD',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    tag: 'E-Commerce Platform',
    avatarBg: 'from-violet-600 to-indigo-600',
    review:
      'MerxoDev delivered our full-scale e-commerce platform 5 days ahead of schedule! The Next.js code quality was pristine, SEO was spot on, and the team was available 24/7. Highly recommended for any serious business.',
  },
  {
    name: 'Sarah Johnson',
    position: 'Product Director',
    company: 'GrowthLab Digital',
    location: 'London, UK',
    rating: 5,
    tag: 'SaaS Web Application',
    avatarBg: 'from-fuchsia-600 to-pink-600',
    review:
      'Working with the MerxoDev Solutions engineering team was an absolute delight. They grasped our complex dashboard requirements effortlessly and executed pixel-perfect responsive designs.',
  },
  {
    name: 'Tanvir Ahmed',
    position: 'CTO & Co-Founder',
    company: 'ShopEasy Online',
    location: 'Chittagong, BD',
    rating: 5,
    tag: 'Custom ERP & POS',
    avatarBg: 'from-cyan-500 to-blue-600',
    review:
      'Hands down the most talented developer team we have hired. Clean architecture, zero spaghetti code, high security, and prompt post-launch maintenance. We are already planning our next project with them!',
  },
  {
    name: 'David Miller',
    position: 'Head of Engineering',
    company: 'CloudCore Inc',
    location: 'California, USA',
    rating: 5,
    tag: 'API & Cloud Systems',
    avatarBg: 'from-amber-500 to-orange-600',
    review:
      'Superb communication and technical expertise. They integrated our microservices with PostgreSQL and Next.js seamlessly. The performance scores jumped to 98+ on Google Lighthouse!',
  },
  {
    name: 'Anisur Rahman',
    position: 'Managing Director',
    company: 'EduLearn Academy',
    location: 'Rajshahi, BD',
    rating: 5,
    tag: 'EdTech Portal',
    avatarBg: 'from-emerald-500 to-teal-600',
    review:
      'From custom payment gateway (bKash/Nagad/SSLCommerz) to student video portals, everything was delivered with top-notch craftsmanship. Their pricing is transparent with zero hidden fees.',
  },
  {
    name: 'Elena Rostova',
    position: 'Creative Director',
    company: 'NovaBrand Studio',
    location: 'Dubai, UAE',
    rating: 5,
    tag: 'UI/UX & Portfolio',
    avatarBg: 'from-purple-600 to-rose-600',
    review:
      'The GSAP animations and sleek dark mode theme they crafted blew our international clients away. Truly state-of-the-art web design that converts visitors into enterprise contracts!',
  },
  {
    name: 'Mahfuzur Rahman',
    position: 'Chief Operating Officer',
    company: 'RetailPro Distribution',
    location: 'Sylhet, BD',
    rating: 5,
    tag: 'Inventory Dashboard',
    avatarBg: 'from-blue-600 to-violet-600',
    review:
      'Fast, reliable, and exceptionally polite. They handled our real-time stock sync with database indexing effortlessly. 10/10 experience with MerxoDev Solutions.',
  },
  {
    name: 'Michael Chen',
    position: 'Tech Lead',
    company: 'Nexus Logistics Hub',
    location: 'Singapore',
    rating: 5,
    tag: 'Enterprise Tracking Web App',
    avatarBg: 'from-indigo-600 to-cyan-500',
    review:
      'Remarkable speed and responsiveness. The team respected our NDA, provided weekly sprint demo builds, and deployed flawlessly to Vercel without a single downtime.',
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-10 sm:py-14 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'MerxoDev Solutions Client Reviews',
            itemListElement: clientReviews.map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Review',
                author: { '@type': 'Person', name: item.name },
                reviewBody: item.review,
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: item.rating,
                  bestRating: 5,
                },
                itemReviewed: {
                  '@type': 'Organization',
                  name: 'MerxoDev Solutions',
                },
              },
            })),
          }),
        }}
      />

      {/* Ambient Pulsing Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse-glow"
        style={{
          // background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse-glow"
        style={{
          // background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          animationDelay: '3s',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Verified Client Feedback
          </span>

          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            What Clients Say{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent animated-gradient-text">
              About Our Work
            </span>
          </h2>

          <p className="max-w-xl text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-raleway">
            Read authentic reviews from founders, startups, and companies that
            scaled their digital presence with MerxoDev Solutions.
          </p>
        </div>

        {/* ── Carousel Container (Embla Auto-Swipe) ── */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6 touch-pan-y">
              {clientReviews.map((item, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-6"
                >
                  <article
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/Review"
                    className="h-full flex flex-col justify-between p-7 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl card-hover-lift hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 relative group"
                  >
                    {/* Top Row: Tag & Verified Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-100/70 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60 font-raleway">
                        {item.tag}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-raleway">
                        <FaCheckCircle size={12} />
                        <span>Verified</span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: item.rating }).map((_, starIdx) => (
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
                        className="relative z-10 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-raleway italic"
                        itemProp="reviewBody"
                      >
                        "{item.review}"
                      </p>
                    </div>

                    {/* Client Profile Footer */}
                    <div
                      className="flex items-center gap-3.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <div
                        aria-hidden
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.avatarBg} flex items-center justify-center text-white font-display text-base font-black shadow-md shadow-violet-500/20 shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p
                          className="text-sm font-bold text-zinc-900 dark:text-white font-raleway truncate"
                          itemProp="name"
                        >
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway truncate">
                          {item.position} • <span className="text-violet-600 dark:text-violet-400 font-medium">{item.company}</span>
                        </p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-raleway">
                          📍 {item.location}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (Desktop & Mobile) */}
          <div className="flex items-center justify-between sm:justify-end gap-3 mt-8">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous review"
                className="w-11 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-violet-600 hover:border-violet-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <FaArrowLeft size={14} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next review"
                className="w-11 h-11 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-violet-600 hover:border-violet-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              >
                <FaArrowRight size={14} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollTo(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === dotIdx
                      ? 'w-6 bg-gradient-to-r from-violet-600 to-cyan-500'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-violet-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
