'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiLink,
  FiCopy,
  FiCheck,
  FiDownload,
  FiRefreshCw,
  FiTrash2,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiCode,
  FiGlobe,
} from 'react-icons/fi';

const SAMPLE_URL = 'https://merxodevsolutions.pro.bd/search?category=web & saas&query=বাংলা ফ্রন্টএন্ড&ref=facebook&utm_source=social #preview';

export default function UrlEncoderClient() {
  const [inputVal, setInputVal] = useState(SAMPLE_URL);
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [scope, setScope] = useState('component'); // 'component' (encodeURIComponent) | 'full' (encodeURI)
  const [copied, setCopied] = useState(false);

  // Conversion logic
  const outputResult = useMemo(() => {
    if (!inputVal.trim()) return { success: true, result: '', error: null };
    try {
      if (mode === 'encode') {
        const encoded =
          scope === 'component'
            ? encodeURIComponent(inputVal)
            : encodeURI(inputVal);
        return { success: true, result: encoded, error: null };
      } else {
        const decoded =
          scope === 'component'
            ? decodeURIComponent(inputVal)
            : decodeURI(inputVal);
        return { success: true, result: decoded, error: null };
      }
    } catch (err) {
      return { success: false, result: '', error: 'Malformed URI sequence. Check percent-encoded sequences.' };
    }
  }, [inputVal, mode, scope]);

  const handleCopy = () => {
    if (!outputResult.result) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(outputResult.result).then(() => {
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (!outputResult.result) return;
    const blob = new Blob([outputResult.result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'url_encoded.txt' : 'url_decoded.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded file!');
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">URL Encoder & Decoder</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-raleway uppercase tracking-widest">
                <FiLink className="w-3.5 h-3.5" />
                Formatters & Converters
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                100% Client-Side Privacy
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              URL{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Encoder & Decoder
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Safely encode and decode percent-encoded URLs, query string parameters, and URI components with RFC 3986 compliance.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 mb-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Mode switch */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setMode('encode')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                  mode === 'encode'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Encode URL
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                  mode === 'decode'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Decode URL
              </button>
            </div>

            {/* Scope: Component vs Full */}
            <div className="flex items-center gap-1.5 text-xs font-raleway text-zinc-600 dark:text-zinc-300 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-400 hidden sm:inline">Method:</span>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-200 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="component">Component (encodeURIComponent - Strict)</option>
                <option value="full">Full URL (encodeURI - Preserves ://?#)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputVal(SAMPLE_URL)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              Load Sample
            </button>

            <button
              onClick={() => setInputVal('')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold font-raleway transition-all"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Error banner */}
        {outputResult.error && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{outputResult.error}</span>
          </div>
        )}

        {/* Side-by-side Input & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-200">
                {mode === 'encode' ? 'Raw URL / Query String Input' : 'Percent-Encoded URL Input'}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">{inputVal.length} chars</span>
            </div>
            <div className="p-4 flex-1 min-h-[380px]">
              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? 'Paste or type full URL or parameter string here...'
                    : 'Paste percent-encoded string here (e.g. https%3A%2F%2F...)...'
                }
                className="w-full h-full min-h-[360px] font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-transparent resize-y focus:outline-none placeholder-zinc-400 leading-relaxed"
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-200">
                {mode === 'encode' ? 'Encoded URL Output' : 'Decoded URL Output'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  disabled={!outputResult.result}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all disabled:opacity-40"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!outputResult.result}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all disabled:opacity-40"
                >
                  <FiDownload />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 min-h-[380px] bg-zinc-950 font-mono text-xs text-blue-200">
              <pre className="whitespace-pre-wrap break-all leading-relaxed">
                {outputResult.result || (
                  <span className="text-zinc-600 font-sans italic">Output will appear here...</span>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Informational Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <FiGlobe className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              RFC 3986 Compliance
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Correctly encodes unsafe characters including spaces into <code className="font-mono text-blue-600">%20</code>, ampersands, slashes, hash symbols, and UTF-8 multibyte characters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
              <FiCode className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Component vs Full URL
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Use <strong>Component</strong> mode for single query values so delimiters like <code className="font-mono text-violet-500">&</code> or <code className="font-mono text-violet-500">=</code> are safely escaped without breaking queries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Zero Latency & Private
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Everything happens directly on your machine. URLs with API keys, tokens, or personal identifiers are never transmitted across the network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
