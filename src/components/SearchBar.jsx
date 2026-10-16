'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

export default function SearchBar({ mobile = false }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbResults, setDbResults] = useState({ projects: [], results: [] });
  const [pageMatches, setPageMatches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!mounted) return;
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  // Search logic on query change
  useEffect(() => {
    if (!mounted) return;
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setDbResults({ projects: [], results: [] });
      setPageMatches([]);
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setLoading(true);

    // 1. Scan current DOM body for text matches
    const matches = [];
    try {
      const candidates = document.querySelectorAll(
        'h1, h2, h3, h4, h5, p, span, a, button, section, li'
      );
      const seenTexts = new Set();

      candidates.forEach((el) => {
        // Skip elements inside navbar itself
        if (el.closest('nav') || el.closest('.search-dropdown')) return;
        const text = (el.innerText || el.textContent || '').trim();
        if (text && text.length > 2 && text.length < 120 && text.toLowerCase().includes(trimmed)) {
          if (!seenTexts.has(text.toLowerCase())) {
            seenTexts.add(text.toLowerCase());
            matches.push({
              text,
              element: el,
              tag: el.tagName.toLowerCase(),
            });
          }
        }
      });
    } catch {
      // ignore
    }
    setPageMatches(matches.slice(0, 5));

    // 2. Fetch from Search API
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          setDbResults(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Scroll to and highlight in-page element
  const handleScrollToElement = (el) => {
    if (!el) return;
    setIsOpen(false);
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Flash highlight pulse
    const origTransition = el.style.transition;
    const origOutline = el.style.outline;
    const origBg = el.style.backgroundColor;

    el.style.transition = 'all 0.4s ease';
    el.style.outline = '3px solid #CCFF00';
    el.style.borderRadius = '6px';

    setTimeout(() => {
      el.style.transition = origTransition;
      el.style.outline = origOutline;
      el.style.backgroundColor = origBg;
    }, 2200);
  };

  const hasResults =
    pageMatches.length > 0 ||
    (dbResults.projects && dbResults.projects.length > 0) ||
    (dbResults.results && dbResults.results.length > 0);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${mobile
        ? 'flex-1 mx-1.5 sm:mx-3 w-full min-w-0'
        : 'w-full max-w-2xl mx-auto'
        }`}
    >
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              setIsOpen(true);
            }
          }}
          placeholder={
            mobile
              ? t('search.placeholderMobile', 'Search anything...')
              : t('search.placeholder', 'Search projects, services, technologies, solutions...')
          }
          className={`w-full rounded-sm transition-all duration-200 outline-none font-exo-extralight ${mobile
            ? 'py-2.5 pl-3 pr-16 text-xs font-medium bg-white dark:bg-[#0a1022] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 border border-violet-200/70 dark:border-blue-900/60 focus:border-violet-500 dark:focus:border-cyan-400 shadow-sm'
            : 'py-3 pl-3.5 pr-20 text-xs sm:text-sm font-medium bg-white dark:bg-[#0a1022] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 border border-violet-200/70 dark:border-blue-900/60 focus:border-violet-500 dark:focus:border-cyan-400 shadow-sm'
            }`}
        />

        {/* Clear Button (When Query Exists) */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-12 sm:right-14 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label={t('search.clear', 'Clear search')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Right Search Button (Full-Height Tinted Box with Theme Accent) */}
        <button
          type="button"
          onClick={() => {
            if (query.trim()) {
              setIsOpen(true);
            } else {
              inputRef.current?.focus();
            }
          }}
          className={`absolute inset-y-0 right-0 flex items-center justify-center rounded-r-sm bg-violet-50 hover:bg-violet-100/90 dark:bg-violet-950/60 dark:hover:bg-violet-900/70 text-violet-600 dark:text-cyan-400 border-l border-violet-200/70 dark:border-blue-900/60 transition-colors cursor-pointer select-none ${mobile ? 'w-10' : 'w-11 sm:w-12'
            }`}
          aria-label={t('search.title', 'Search')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={mobile ? '16' : '18'}
            height={mobile ? '16' : '18'}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() && (
        <div className="search-dropdown absolute top-full left-0 right-0 mt-2 z-[100] max-h-[75vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-violet-200 dark:border-zinc-800 shadow-2xl shadow-violet-950/20 p-2 min-w-[260px] sm:min-w-[320px]">
          {loading && !hasResults && (
            <div className="flex items-center justify-center gap-2 py-6 text-xs text-zinc-500 font-exo-extralight font-semibold">
              <span className="w-3 h-3 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
              {t('search.searching', 'Searching...')}
            </div>
          )}

          {!loading && !hasResults && (
            <div className="py-6 px-4 text-center text-xs text-zinc-500 font-exo-extralight">
              {t('search.noMatchesStart', 'No matches found for')} &ldquo;<span className="text-violet-600 font-semibold">{query}</span>&rdquo;
            </div>
          )}

          {/* 1. In-Page Content Matches (Body search) */}
          {pageMatches.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 font-exo-extralight">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                {t('search.foundOnPage', 'Found on this page (Jump to):')}
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {pageMatches.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleScrollToElement(m.element)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-800 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium truncate pr-2 line-clamp-1">
                      {m.text}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-100 dark:bg-zinc-700 text-violet-700 dark:text-violet-300 uppercase tracking-wider font-semibold shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                      {t('search.jump', 'Jump →')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Projects Matches */}
          {dbResults.projects && dbResults.projects.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-exo-extralight">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {t('search.projects', 'Projects')}
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {dbResults.projects.map((p) => (
                  <Link
                    key={p.id || p.slug}
                    href={`/our-projects/${p.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs hover:bg-amber-50 dark:hover:bg-zinc-800 transition-colors flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 dark:text-white uppercase font-exo-medium">
                        {p.title}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold uppercase">
                        {p.tag}
                      </span>
                    </div>
                    {p.description && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-exo-extralight">
                        {p.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 3. Site Sections & Services */}
          {dbResults.results && dbResults.results.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-exo-extralight">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                {t('search.pagesServices', 'Pages & Services')}
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {dbResults.results.map((r, idx) => (
                  <Link
                    key={idx}
                    href={r.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs hover:bg-cyan-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                        {r.title}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                        {r.description}
                      </span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase font-semibold shrink-0">
                      {r.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
