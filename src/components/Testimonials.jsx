'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '@/components/i18n';

function StarRating({ rating }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#f59e0b' : 'none'}
          stroke="#f59e0b"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const fallbackTestimonials = [
  {
    name: 'Rakibul Islam',
    position: 'CEO, TechStart BD',
    rating: 5,
    review:
      'MerxoDev delivered our platform ahead of schedule. The code quality was exceptional and the team was always responsive. Highly recommended!',
  },
  {
    name: 'Sarah Johnson',
    position: 'Founder, GrowthLab',
    rating: 5,
    review:
      'Working with MerxoDev was a pleasure. They understood our vision perfectly and built exactly what we needed. Professional and reliable.',
  },
  {
    name: 'Tanvir Ahmed',
    position: 'CTO, ShopEasy',
    rating: 5,
    review:
      'The best dev team we have worked with. Clean code, on-time delivery, and excellent post-launch support. Will definitely work again.',
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const rawTestimonials = t('testimonials.items', { returnObjects: true });
  const testimonials = Array.isArray(rawTestimonials)
    ? rawTestimonials
    : fallbackTestimonials;

  return (
    <section
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative py-24  overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'MerxoDev Solutions Client Reviews',
            itemListElement: fallbackTestimonials.map((item, i) => ({
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

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[500px] h-[400px] opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
            {t('testimonials.badge')}
          </span>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-5xl uppercase tracking-wide text-[#27003B] dark:text-white"
          >
            {t('testimonials.headingStart')}{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('testimonials.headingEnd')}
            </span>
          </h2>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed font-raleway">
            {t('testimonials.subtext')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <article
              key={i}
              onClick={() => setActive(i)}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/Review"
              className={`relative flex flex-col gap-5 p-6 rounded-2xl border cursor-pointer card-hover-lift transition-all duration-300 ${
                active === i
                  ? 'border-violet-400/40 bg-violet-400/10 shadow-lg shadow-violet-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-violet-200 dark:text-violet-900 shrink-0"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p
                className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-raleway italic flex-1"
                itemProp="reviewBody"
              >
                {item.review}
              </p>

              <div
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                <meta itemProp="ratingValue" content={String(item.rating)} />
                <meta itemProp="bestRating" content="5" />
                <StarRating rating={item.rating} />
              </div>

              <div
                className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div
                  aria-hidden
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-display text-sm font-black shrink-0"
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-zinc-900 dark:text-white font-raleway"
                    itemProp="name"
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-raleway">
                    {item.position}
                  </p>
                </div>
              </div>

              {active === i && (
                <span
                  aria-hidden
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-violet-500 animate-pulse"
                />
              )}
            </article>
          ))}
        </div>

        {/* Dot indicators */}
        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-6 bg-violet-500'
                  : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
