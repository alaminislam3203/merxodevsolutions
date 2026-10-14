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
            All Tools
          </Link>
        </div>

        {/* Configuration Controls Card */}
        <div className="p-5 mb-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Format toggle: UUID v4 vs NanoID */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setType('uuidv4')}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                  type === 'uuidv4'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                UUID v4 (RFC 4122)
              </button>
              <button
                onClick={() => setType('nanoid')}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                  type === 'nanoid'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                NanoID
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 text-xs font-raleway font-semibold">
              <span className="text-zinc-500 dark:text-zinc-400">Generate Quantity:</span>
              {[1, 5, 10, 25, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    count === n
                      ? 'bg-amber-500 text-white border-transparent'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Regenerate Action */}
            <button
              onClick={generateIds}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
          </div>

          {/* Additional Options */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-4 text-xs font-raleway text-zinc-700 dark:text-zinc-300">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Uppercase (A-F)</span>
            </label>

            {type === 'uuidv4' && (
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hyphens}
                  onChange={(e) => setHyphens(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span>Include Hyphens (-)</span>
              </label>
            )}

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wrapQuotes}
                onChange={(e) => setWrapQuotes(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Wrap in Quotes (&quot;...&quot;)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wrapBraces}
                onChange={(e) => setWrapBraces(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Wrap in Braces ({'{...}'})</span>
            </label>

            {type === 'nanoid' && (
              <div className="flex items-center gap-2">
                <span>Length:</span>
                <input
                  type="number"
                  min="6"
                  max="64"
                  value={nanoLength}
                  onChange={(e) => setNanoLength(Number(e.target.value))}
                  className="w-16 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-center"
                />
              </div>
            )}
          </div>
        </div>

        {/* Output List Display */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-200">
              Generated Identifiers ({generatedList.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold font-raleway transition-all shadow-sm"
              >
                {copiedAll ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copied All' : 'Copy All'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all"
              >
                <FiDownload className="w-3.5 h-3.5" />
                <span>Save .txt</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 max-h-[500px] overflow-y-auto font-mono text-xs">
            {generatedList.map((id, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-5 py-3 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-zinc-400 select-none w-6 text-right">
                    {index + 1}.
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-100 selection:bg-amber-500/30 font-medium">
                    {id}
                  </span>
                </div>
                <button
                  onClick={() => handleCopySingle(id, index)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all opacity-80 group-hover:opacity-100"
                  title="Copy this ID"
                >
                  {copiedIndex === index ? <FiCheck className="text-emerald-500 w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                </button>
              </div>
            ))}