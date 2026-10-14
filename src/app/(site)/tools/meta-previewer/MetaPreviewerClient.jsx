'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiGlobe,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiEye,
  FiShare2,
  FiCode,
  FiRefreshCw,
} from 'react-icons/fi';

export default function MetaPreviewerClient() {
  const [title, setTitle] = useState('MerxoDev Solutions — Full Stack Web Engineering & Software');
  const [description, setDescription] = useState('We build high-performance Next.js websites, SaaS platforms, and enterprise solutions for businesses in Bangladesh and worldwide.');
  const [url, setUrl] = useState('https://merxodevsolutions.pro.bd');
  const [image, setImage] = useState('https://merxodevsolutions.pro.bd/logo-light.png');
  const [siteName, setSiteName] = useState('MerxoDev Solutions');
  const [twitterUser, setTwitterUser] = useState('@merxodev');
  const [activePreview, setActivePreview] = useState('google'); // 'google' | 'facebook' | 'twitter'
  const [copied, setCopied] = useState(false);

  // Generate HTML tags
  const generatedHtml = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:site_name" content="${siteName}">

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">
<meta property="twitter:site" content="${twitterUser}">`;
  }, [title, description, url, image, siteName, twitterUser]);

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedHtml).then(() => {
        setCopied(true);
        toast.success('Copied HTML meta tags!');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const domain = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'merxodevsolutions.pro.bd';
    }
  }, [url]);

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">Meta Tags & OG Previewer</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-raleway uppercase tracking-widest">
                <FiGlobe className="w-3.5 h-3.5" />
                SEO & Open Graph
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiShare2 className="w-3 h-3 text-cyan-500" />
                Social Card Previews
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              Meta Tags &{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                OG Previewer
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Simulate Google, Facebook, Twitter/X, and LinkedIn social share cards in real time and copy ready-to-paste HTML meta tags.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* 2-Column Interface: Inputs (5 cols) & Live Previews (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Card */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-zinc-800 dark:text-white uppercase tracking-wider">
              Page Metadata
            </h2>

            {/* Title */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1">
                <span>Page Title</span>
                <span className={`text-[11px] font-mono ${title.length > 60 ? 'text-amber-500' : 'text-zinc-400'}`}>
                  {title.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1">
                <span>Description</span>
                <span className={`text-[11px] font-mono ${description.length > 160 ? 'text-amber-500' : 'text-zinc-400'}`}>
                  {description.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-raleway font-semibold mb-1">Canonical URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-raleway font-semibold mb-1">OG Banner Image URL (1200x630)</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-raleway font-semibold mb-1">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-raleway font-semibold mb-1">Twitter Handle</label>
                <input
                  type="text"
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Preview Selector Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {[
                { id: 'google', name: 'Google Search' },
                { id: 'facebook', name: 'Facebook / LinkedIn' },
                { id: 'twitter', name: 'Twitter / X' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreview(tab.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-raleway transition-all ${
                    activePreview === tab.id
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Google Search Preview */}
            {activePreview === 'google' && (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-4">
                  Google Search Result Preview
                </span>
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                      G
                    </div>
                    <div>
                      <div className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{siteName}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{url}</div>
                    </div>
                  </div>
                  <h3 className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer font-medium line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">