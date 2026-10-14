'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiHash,
  FiCopy,
  FiCheck,
  FiDownload,
  FiRefreshCw,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiSliders,
  FiZap,
} from 'react-icons/fi';

// Custom lightweight NanoID generator using crypto.getRandomValues
function generateNanoId(size = 21, alphabet = 'use-standard') {
  const chars =
    alphabet === 'numbers'
      ? '0123456789'
      : alphabet === 'lowercase'
      ? 'abcdefghijklmnopqrstuvwxyz0123456789'
      : 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_kqer';
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < size; i++) {
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

export default function UuidGeneratorClient() {
  const [type, setType] = useState('uuidv4'); // 'uuidv4' | 'nanoid'
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [wrapQuotes, setWrapQuotes] = useState(false);
  const [wrapBraces, setWrapBraces] = useState(false);
  const [nanoLength, setNanoLength] = useState(21);
  const [generatedList, setGeneratedList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Generate IDs
  const generateIds = useCallback(() => {
    const list = [];
    const limit = Math.min(Math.max(1, count), 500);

    for (let i = 0; i < limit; i++) {
      let val = '';
      if (type === 'uuidv4') {
        val = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });

        if (!hyphens) val = val.replace(/-/g, '');
        if (uppercase) val = val.toUpperCase();
        else val = val.toLowerCase();
      } else {
        val = generateNanoId(nanoLength);
        if (uppercase) val = val.toUpperCase();
      }

      if (wrapBraces) val = `{${val}}`;
      if (wrapQuotes) val = `"${val}"`;

      list.push(val);
    }
    setGeneratedList(list);
  }, [type, count, uppercase, hyphens, wrapQuotes, wrapBraces, nanoLength]);

  useEffect(() => {
    generateIds();
  }, [generateIds]);

  const handleCopySingle = (text, index) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index);
        toast.success('Copied ID!');
        setTimeout(() => setCopiedIndex(null), 1500);
      });
    }
  };

  const handleCopyAll = () => {
    if (!generatedList.length) return;
    const text = generatedList.join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedAll(true);
        toast.success(`Copied all ${generatedList.length} IDs!`);
        setTimeout(() => setCopiedAll(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (!generatedList.length) return;
    const text = generatedList.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_list.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded text list!');
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ef4444, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">UUID & NanoID Generator</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-raleway uppercase tracking-widest">
                <FiHash className="w-3.5 h-3.5" />
                Generators & Identifiers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                Crypto API CSPRNG
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              UUID & NanoID{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Generate cryptographically secure UUID v4 (RFC 4122) and URL-friendly NanoIDs in bulk with custom casing and quotes.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />