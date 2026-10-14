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