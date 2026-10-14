'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiCode,
  FiKey,
  FiFileText,
  FiLink,
  FiHash,
  FiShield,
  FiBox,
  FiSliders,
  FiCheckCircle,
  FiSearch,
  FiX,
  FiArrowRight,
  FiExternalLink,
  FiLayers,
  FiGlobe,
  FiMapPin,
  FiLock,
  FiCpu,
  FiZap,
} from 'react-icons/fi';

const TOOLS_DATA = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description:
      'Clean, beautify, and validate complex JSON payloads with instant error detection and minification.',
    category: 'Formatters',
    badge: 'Popular',
    badgeColor: 'violet',
    icon: FiCode,
    href: '/tools/json-formatter',
    tags: ['Beautify', 'Minify', 'Validate'],
    clientSide: true,
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Debugger & Decoder',
    description:
      'Inspect JSON Web Tokens in real time. Decode header, payload claims, and verify token expiration securely.',
    category: 'Security',
    badge: 'Essential',
    badgeColor: 'emerald',
    icon: FiKey,
    href: '/tools/jwt-decoder',
    tags: ['JWT', 'Bearer', 'Auth'],
    clientSide: true,
  },
  {
    id: 'base64',
    title: 'Base64 Encoder & Decoder',
    description:
      'Instantly convert plain text, binary strings, and image assets to and from clean Base64 strings.',
    category: 'Formatters',
    badge: 'Fast',
    badgeColor: 'cyan',
    icon: FiFileText,
    href: '/tools/base64',
    tags: ['Encode', 'Decode', 'Data URI'],
    clientSide: true,
  },
  {
    id: 'url-encoder',
    title: 'URL & Query Encoder',
    description:
      'Safely encode and decode URL query parameters, escaped characters, and UTF-8 strings.',
    category: 'Formatters',
    icon: FiLink,
    href: '/tools/url-encoder',
    tags: ['RFC3986', 'URI Component'],
    clientSide: true,
  },
  {
    id: 'uuid-generator',
    title: 'UUID & NanoID Generator',
    description:
      'Generate cryptographically safe UUID v4, v1, and customizable NanoIDs in single or bulk quantities.',
    category: 'Generators',
    badge: 'Fast',
    badgeColor: 'amber',
    icon: FiHash,
    href: '/tools/uuid-generator',
    tags: ['UUID v4', 'NanoID', 'Bulk'],
    clientSide: true,
  },
  {
    id: 'hash-generator',
    title: 'Hash & Password Generator',
    description:
      'Generate secure MD5, SHA-1, SHA-256, SHA-512, and salted password hashes directly inside your browser.',
    category: 'Security',
    icon: FiShield,
    href: '/tools/hash-generator',
    tags: ['SHA-256', 'MD5', 'Crypto'],
    clientSide: true,
  },
  {
    id: 'css-shadow',
    title: 'CSS Shadow & Glass Builder',
    description:
      'Visual drop-shadow and glassmorphism designer with real-time preview and one-click CSS code export.',
    category: 'CSS & UI',
    badge: 'Creative',
    badgeColor: 'rose',
    icon: FiBox,
    href: '/tools/css-shadow',
    tags: ['Box Shadow', 'Glassmorphism', 'Tailwind'],
    clientSide: true,
  },
  {
    id: 'gradient-generator',
    title: 'CSS Gradient Maker',
    description:
      'Create high-contrast linear, radial, and mesh CSS gradients with color stop controls and CSS/Tailwind export.',
    category: 'CSS & UI',
    icon: FiSliders,
    href: '/tools/gradient-generator',
    tags: ['Linear', 'Radial', 'CSS Gradients'],
    clientSide: true,
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester & Visualizer',
    description:
      'Test and debug regular expressions with real-time match highlighting, capture groups, and flag toggles.',
    category: 'Utilities',
    badge: 'Popular',
    badgeColor: 'violet',
    icon: FiLayers,
    href: '/tools/regex-tester',
    tags: ['Regex', 'Match', 'Flags'],
    clientSide: true,
  },
  {
    id: 'meta-previewer',
    title: 'Meta Tags & OG Previewer',
    description:
      'Preview social share cards for Facebook, Twitter/X, and LinkedIn, plus copy ready-to-use HTML meta tags.',
    category: 'Web & SEO',
    badge: 'SEO',
    badgeColor: 'cyan',
    icon: FiGlobe,
    href: '/tools/meta-previewer',
    tags: ['Open Graph', 'Twitter Cards', 'SEO'],
    clientSide: true,
  },
  {
    id: 'http-status',
    title: 'HTTP Status Codes Reference',
    description:
      'Fast, searchable cheat sheet of all HTTP response codes (1xx - 5xx) with troubleshooting advice.',
    category: 'Utilities',
    icon: FiZap,
    href: '/tools/http-status',
    tags: ['REST API', 'HTTP Codes', 'Cheatsheet'],
    clientSide: true,
  },
  {
    id: 'bd-lookup',
    title: 'Bangladesh Postcode & Geo Data',
    description:
      'Instant lookup for Bangladesh divisions, districts, upazilas, and post codes with copyable JSON dataset.',
    category: 'BD Devs',
    badge: 'Local Special',
    badgeColor: 'emerald',
    icon: FiMapPin,
    href: '/tools/bd-lookup',
    tags: ['Districts', 'Postcodes', 'JSON Data'],
    clientSide: true,
  },
];

const CATEGORIES = [
  'All',
  'Formatters',
  'Security',
  'CSS & UI',
  'Generators',
  'Web & SEO',
  'Utilities',
  'BD Devs',
];

const BADGE_STYLES = {
  violet:
    'bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  emerald:
    'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  cyan:
    'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  amber:
    'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  rose:
    'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
};

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchCategory =
        activeCategory === 'All' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[520px] h-[520px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="pt-4 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600"
        >
          <Link
            href="/"
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Home
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">
            Developer Tools
          </span>
        </nav>

        {/* Hero Header */}
        <div className="flex flex-col gap-4 mt-8 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden
              />
              100% Free & Client-Side
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              <FiLock className="w-3.5 h-3.5 text-emerald-500" />
              Zero Data Sent to Server
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight leading-tight">
            Developer{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Tools & Utilities
            </span>
          </h1>

          <p className="max-w-2xl text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-raleway">
            A curated suite of fast, lightweight, and privacy-focused online
            utilities engineered for developers, designers, and engineering
            teams. All calculations happen locally inside your browser.
          </p>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
              <FiZap className="text-amber-500 w-4 h-4" />
              <span>Instant Local Processing</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
              <FiShield className="text-emerald-500 w-4 h-4" />
              <span>No Cookies / No Logs</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">
              <FiCheckCircle className="text-violet-500 w-4 h-4" />
              <span>Unlimited Free Usage</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, keyword, or tag..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
                aria-label="Clear search"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-xs font-raleway font-semibold text-zinc-500 dark:text-zinc-400">
            Showing{' '}
            <span className="text-violet-600 dark:text-violet-400 font-bold">
              {filteredTools.length}
            </span>{' '}
            of {TOOLS_DATA.length} Tools
          </div>
        </div>

        {/* Category Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
          role="tablist"
        >
          {CATEGORIES.map((category) => {
            const count =
              category === 'All'
                ? TOOLS_DATA.length
                : TOOLS_DATA.filter((t) => t.category === category).length;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider font-raleway transition-all duration-200 border cursor-pointer ${isActive
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent shadow-md shadow-violet-500/25'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-violet-400 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
              >
                {category}
                <span
                  className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${isActive
                    ? 'bg-white/20 text-white'