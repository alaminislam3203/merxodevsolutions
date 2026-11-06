'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Calculator,
} from 'lucide-react';

export default function BlogListingPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = activeCategory === 'All' || post.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [posts, activeCategory, search]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Ambient decorative glows matching other pages */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.12] blur-[130px] z-0"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-[0.10] blur-[110px] z-0"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-12 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-500 transition-colors">
            {t('blogPage.breadcrumbHome', { defaultValue: 'Home' })}
          </Link>
          <ChevronRight size={12} />
          <span className="text-zinc-600 dark:text-zinc-400">
            {t('blogPage.breadcrumbCurrent', { defaultValue: 'Engineering Blog' })}
          </span>
        </div>

        {/* Hero Header */}
        <div className="pt-8 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-exo-extralight tracking-widest uppercase border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-5">
            <BookOpen size={13} />
            {t('blogPage.badge')}
          </div>

          <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white mb-4 uppercase tracking-tight leading-tight">
            {t('blogPage.titlePrefix')}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {t('blogPage.titleHighlight')}
            </span>
          </h1>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base font-exo-extralight leading-relaxed">
            {t('blogPage.subtitle')}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-sm'
                      : 'bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-violet-400'
                  }`}
                >
                  {cat === 'All' ? t('blogPage.allCategories') : cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('blogPage.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-500 dark:text-zinc-400 text-sm">
            {t('blogPage.noPostsFound')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id || post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-violet-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Dynamic Branded Cover Banner */}
                  <div className="h-44 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/15 to-cyan-500/20 border-b border-zinc-200/60 dark:border-zinc-800/60 p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-zinc-900/90 text-violet-600 dark:text-violet-400 self-start shadow-sm">
                      <Sparkles size={11} />
                      {post.category}
                    </div>
                    <div className="font-exo-medium text-sm font-extrabold text-[#27003B] dark:text-white line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {post.title}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.publishedAt || Date.now()).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime || '5'} {t('blogPage.readTimeUnit')}
                      </span>
                    </div>

                    <h2 className="font-exo-medium text-base sm:text-lg font-bold text-[#27003B] dark:text-white mb-2.5 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-exo-extralight line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-violet-600 dark:text-violet-400">
                  <span>{t('blogPage.readArticleBtn')}</span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-white/85 dark:bg-zinc-900/75 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-exo-medium text-lg sm:text-xl font-extrabold text-[#27003B] dark:text-white">
              {t('blogPage.ctaBoxTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-exo-extralight mt-1 max-w-xl">
              {t('blogPage.ctaBoxDesc')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/cost-calculator"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Calculator size={15} />
              {t('blogPage.ctaCalculatorBtn')}
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300 font-bold text-xs sm:text-sm hover:bg-violet-500/20 transition-all"
            >
              {t('blogPage.ctaContactBtn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
