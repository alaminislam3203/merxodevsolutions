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