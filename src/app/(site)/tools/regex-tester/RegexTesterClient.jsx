'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiLayers,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiHelpCircle,
  FiTrash2,
} from 'react-icons/fi';

const PRESETS = [
  { name: 'Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', flags: 'gm', sample: 'test@example.com\ninvalid-email\nal.amin@merxodevsolutions.pro.bd' },
  { name: 'URL / Website', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'g', sample: 'Visit https://merxodevsolutions.pro.bd or http://localhost:3000' },
  { name: 'Bangladesh Phone (+880)', pattern: '^(?:\\+?88)?01[3-9]\\d{8}$', flags: 'gm', sample: '+8801712345678\n01812345678\n01200000000\n01987654321' },
  { name: 'Hex Color Code', pattern: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b', flags: 'g', sample: 'Colors: #7c3aed, #fff, #10b981 and invalid #12345' },
  { name: 'IPv4 Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: 'g', sample: 'Router 192.168.1.1 and Cloudflare DNS 1.1.1.1 or 999.999.999.999' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\b\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b', flags: 'g', sample: 'Created 2026-10-14 and expired 2026-12-31' },
];

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState({ g: true, i: true, m: true, s: false, u: false });
  const [testText, setTestText] = useState('Contact developer team at hello@merxodevsolutions.pro.bd or support@example.com.\nInvalid email: no-at-symbol.domain.');
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  // Flags string
  const flagsStr = useMemo(() => {
    return Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join('');
  }, [flags]);

  // Execute regex
  const regexResult = useMemo(() => {
    if (!pattern) {
      return { isValid: true, error: null, matches: [] };
    }
    try {
      const re = new RegExp(pattern, flagsStr);
      const matches = [];

      if (flags.g) {
        let match;
        let count = 0;
        while ((match = re.exec(testText)) !== null && count < 200) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match.index === re.lastIndex) re.lastIndex++;
          count++;
        }
      } else {
        const match = re.exec(testText);
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { isValid: true, error: null, matches };
    } catch (err) {
      return { isValid: false, error: err.message, matches: [] };
    }
  }, [pattern, flagsStr, testText, flags.g]);

  const toggleFlag = (flag) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const applyPreset = (p) => {
    setPattern(p.pattern);
    setTestText(p.sample);
    const newFlags = { g: false, i: false, m: false, s: false, u: false };
    p.flags.split('').forEach((f) => {
      newFlags[f] = true;
    });
    setFlags(newFlags);
    toast.success(`Loaded preset: ${p.name}`);
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">Regex Tester & Debugger</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
                <FiLayers className="w-3.5 h-3.5" />
                Regular Expressions
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                Real-time JavaScript Engine
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              Regex Tester &{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
                Visualizer
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Test and debug regular expressions with live match counter, capture group inspection, and common pattern presets.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Preset Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold font-raleway text-zinc-400 whitespace-nowrap">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-violet-400 dark:hover:border-violet-500 text-zinc-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="px-3.5 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold whitespace-nowrap transition-all border border-violet-200 dark:border-violet-800 flex items-center gap-1.5"
          >
            <FiHelpCircle className="w-3.5 h-3.5" />
            Cheat Sheet
          </button>
        </div>

        {/* Cheat sheet Collapsible Drawer */}
        {showCheatsheet && (
          <div className="mb-6 p-5 rounded-2xl bg-zinc-950 text-zinc-200 border border-zinc-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeIn">
            <div>
              <span className="text-violet-400 font-bold block mb-1">Character Classes</span>
              <p><code className="text-cyan-400">\d</code> - Any digit [0-9]</p>
              <p><code className="text-cyan-400">\w</code> - Word char [a-zA-Z0-9_]</p>
              <p><code className="text-cyan-400">\s</code> - Whitespace [ \t\r\n]</p>
              <p><code className="text-cyan-400">.</code> - Any character except \n</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block mb-1">Quantifiers</span>
              <p><code className="text-cyan-400">+</code> - 1 or more</p>
              <p><code className="text-cyan-400">*</code> - 0 or more</p>
              <p><code className="text-cyan-400">?</code> - 0 or 1 (optional)</p>
              <p><code className="text-cyan-400">{'{n,m}'}</code> - Between n and m</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block mb-1">Anchors</span>
              <p><code className="text-cyan-400">^</code> - Start of string/line</p>
              <p><code className="text-cyan-400">$</code> - End of string/line</p>
              <p><code className="text-cyan-400">\b</code> - Word boundary</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block mb-1">Groups & Lookarounds</span>
              <p><code className="text-cyan-400">(abc)</code> - Capture group</p>
              <p><code className="text-cyan-400">(?:abc)</code> - Non-capturing group</p>
              <p><code className="text-cyan-400">(?=abc)</code> - Positive lookahead</p>
            </div>
          </div>
        )}

        {/* Pattern Input Card with Flag Toggles */}
        <div className="p-5 mb-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-300 mb-2">
              Regular Expression Pattern
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2">
              <span className="text-zinc-400 font-mono text-base">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern here..."
                className="flex-1 bg-transparent text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
              <span className="text-zinc-400 font-mono text-base">/</span>
              <span className="text-violet-600 dark:text-violet-400 font-mono text-sm font-bold">
                {flagsStr || 'none'}
              </span>
            </div>
          </div>

          {/* Flag checkboxes */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-raleway pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-400 font-bold">Flags:</span>
            {[
              { id: 'g', label: 'g (global match)' },
              { id: 'i', label: 'i (case-insensitive)' },
              { id: 'm', label: 'm (multi-line)' },
              { id: 's', label: 's (dot matches all)' },
              { id: 'u', label: 'u (unicode)' },
            ].map((f) => (
              <label key={f.id} className="flex items-center gap-1.5 cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={flags[f.id]}
                  onChange={() => toggleFlag(f.id)}
                  className="rounded accent-violet-600"
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error banner if regex syntax invalid */}
        {regexResult.isValid === false && (
          <div className="flex items-start gap-2.5 px-4 py-3 mb-6 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs">
            <FiAlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Regex Syntax Error</span>
              <p className="font-mono text-[11px] text-rose-700 dark:text-rose-200">{regexResult.error}</p>
            </div>
          </div>
        )}

        {/* Match Count Banner */}
        {regexResult.isValid && (
          <div className="flex items-center justify-between px-4 py-2.5 mb-6 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/80 text-violet-800 dark:text-violet-300 text-xs font-medium">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span>
                Found <strong className="font-bold">{regexResult.matches.length}</strong> match
                {regexResult.matches.length === 1 ? '' : 'es'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              Evaluated via native V8 JavaScript RegExp
            </span>
          </div>
        )}

        {/* Test String Input & Match Results Grid */}