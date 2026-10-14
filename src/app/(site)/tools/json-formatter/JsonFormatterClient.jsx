'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiCode,
  FiCopy,
  FiCheck,
  FiDownload,
  FiTrash2,
  FiUpload,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiMaximize2,
  FiMinimize2,
  FiLayers,
  FiFileText,
  FiRefreshCw,
  FiChevronDown,
  FiChevronRight,
  FiLock,
} from 'react-icons/fi';

const SAMPLE_JSON = JSON.stringify(
  {
    project: 'MerxoDev Solutions',
    version: '1.0.0',
    status: 'active',
    isProductionReady: true,
    features: ['Next.js 16', 'Tailwind CSS v4', 'Client-side Tools', 'SEO-Ready'],
    metrics: {
      stars: 120,
      monthlyActiveUsers: 45000,
      uptimePercentage: 99.98,
    },
    team: [
      {
        id: 1,
        name: 'Al Amin',
        role: 'Full Stack Engineer',
        skills: ['React', 'Node.js', 'PostgreSQL', 'Cloud'],
        verified: true,
      },
      {
        id: 2,
        name: 'Merxo Team',
        role: 'Engineering & Design',
        skills: ['UI/UX', 'DevOps', 'Next.js'],
        verified: true,
      },
    ],
    settings: {
      theme: 'dark',
      notifications: null,
      maxConnections: 100,
    },
  },
  null,
  2
);

// ── Recursive JSON Tree Node Component ──────────────────────────────────────────
function TreeNode({ keyName, value, isLast, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 2);

  const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isComplex = isObject || isArray;

  const toggle = () => setCollapsed(!collapsed);

  // Render Primitive values
  const renderValue = (val) => {
    if (val === null) {
      return <span className="text-rose-400 font-mono italic">null</span>;
    }
    if (typeof val === 'boolean') {
      return <span className="text-violet-400 font-mono font-semibold">{val ? 'true' : 'false'}</span>;
    }
    if (typeof val === 'number') {
      return <span className="text-cyan-400 font-mono">{val}</span>;
    }
    if (typeof val === 'string') {
      return <span className="text-emerald-400 font-mono">&quot;{val}&quot;</span>;
    }
    return <span className="text-zinc-300 font-mono">{String(val)}</span>;
  };

  if (!isComplex) {
    return (
      <div className="flex items-start gap-1 py-0.5 hover:bg-zinc-800/40 px-2 rounded font-mono text-xs">
        {keyName !== undefined && (
          <span className="text-indigo-300 font-medium">
            &quot;{keyName}&quot;<span className="text-zinc-500 mr-1.5">:</span>
          </span>
        )}
        {renderValue(value)}
        {!isLast && <span className="text-zinc-500">,</span>}
      </div>
    );
  }

  const entries = isArray ? value.map((v, i) => [i, v]) : Object.entries(value);
  const openBracket = isArray ? '[' : '{';
  const closeBracket = isArray ? ']' : '}';

  return (
    <div className="font-mono text-xs py-0.5">
      <div
        onClick={toggle}
        className="flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800/40 px-2 py-0.5 rounded select-none group"
      >
        <span className="text-zinc-500 group-hover:text-zinc-300">
          {collapsed ? <FiChevronRight className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
        </span>

        {keyName !== undefined && (
          <span className="text-indigo-300 font-medium">
            &quot;{keyName}&quot;<span className="text-zinc-500 mr-1.5">:</span>
          </span>
        )}

        <span className="text-zinc-400 font-semibold">{openBracket}</span>

        {collapsed && (
          <span className="text-[11px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 ml-1">
            {entries.length} {entries.length === 1 ? 'item' : 'items'}
          </span>
        )}

        {collapsed && <span className="text-zinc-400 font-semibold">{closeBracket}</span>}
        {!isLast && collapsed && <span className="text-zinc-500">,</span>}
      </div>

      {!collapsed && (
        <div className="pl-4 border-l border-zinc-800/80 ml-3.5 mt-0.5 space-y-0.5">
          {entries.map(([k, val], index) => (
            <TreeNode
              key={k}
              keyName={isArray ? undefined : k}
              value={val}
              isLast={index === entries.length - 1}
              depth={depth + 1}
            />
          ))}
          <div className="text-zinc-400 font-semibold px-2">
            {closeBracket}
            {!isLast && <span className="text-zinc-500">,</span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Client Component ───────────────────────────────────────────────────────
export default function JsonFormatterClient() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [indentSize, setIndentSize] = useState(2);
  const [viewMode, setViewMode] = useState('code'); // 'code' | 'tree'
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Parsing & Validation
  const parseResult = useMemo(() => {
    if (!inputJson.trim()) {
      return { isValid: null, error: null, parsed: null, formatted: '', minified: '' };
    }
    try {
      const parsed = JSON.parse(inputJson);
      const space = indentSize === 'tab' ? '\t' : Number(indentSize);
      const formatted = JSON.stringify(parsed, null, space);
      const minified = JSON.stringify(parsed);
      return {
        isValid: true,
        error: null,
        parsed,
        formatted,
        minified,
      };
    } catch (err) {
      return {
        isValid: false,
        error: err.message,
        parsed: null,
        formatted: '',
        minified: '',
      };
    }
  }, [inputJson, indentSize]);

  // Size and stats calculation
  const stats = useMemo(() => {
    const rawBytes = new Blob([inputJson]).size;
    const formattedBytes = parseResult.formatted ? new Blob([parseResult.formatted]).size : 0;
    const minifiedBytes = parseResult.minified ? new Blob([parseResult.minified]).size : 0;
    const lineCount = inputJson ? inputJson.split('\n').length : 0;
    const reductionPercent =
      rawBytes > 0 && minifiedBytes > 0
        ? Math.max(0, Math.round(((rawBytes - minifiedBytes) / rawBytes) * 100))
        : 0;

    return {
      rawBytes,
      formattedBytes,
      minifiedBytes,
      lineCount,
      reductionPercent,
    };
  }, [inputJson, parseResult]);

  // Format button handler
  const handleFormat = () => {
    if (parseResult.isValid && parseResult.formatted) {
      setInputJson(parseResult.formatted);
      toast.success('JSON formatted & beautified!');
    } else if (!parseResult.isValid) {
      toast.error('Invalid JSON. Fix syntax errors first.');
    }
  };

  // Minify handler
  const handleMinify = () => {
    if (parseResult.isValid && parseResult.minified) {
      setInputJson(parseResult.minified);
      toast.success('JSON minified!');
    } else if (!parseResult.isValid) {
      toast.error('Invalid JSON. Fix syntax errors first.');
    }
  };

  // Smart Fix Common Mistakes (single quotes, trailing commas, unquoted keys)
  const handleAutoFix = () => {
    if (!inputJson.trim()) return;
    try {
      let fixed = inputJson
        // Replace single quotes around keys/values with double quotes
        .replace(/'/g, '"')
        // Remove trailing commas before closing braces/brackets
        .replace(/,\s*([\]}])/g, '$1');

      JSON.parse(fixed); // Test if it parses
      setInputJson(fixed);
      toast.success('Repaired common JSON syntax mistakes!');
    } catch {
      toast.error('Could not auto-repair. Please inspect the syntax error manually.');
    }
  };

  // Copy output
  const handleCopy = (textToCopy) => {
    const content = textToCopy || (parseResult.isValid ? parseResult.formatted : inputJson);
    if (!content) return;

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Download JSON
  const handleDownload = (isMin = false) => {
    const content = isMin ? parseResult.minified : parseResult.formatted || inputJson;
    if (!content) return;
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isMin ? 'minified.json' : 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  // File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setInputJson(text);
        toast.success(`Loaded "${file.name}"`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
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
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">JSON Formatter</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
                <FiCode className="w-3.5 h-3.5" />
                Formatting & Validation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/70">
                <FiLock className="w-3 h-3" />
                100% Private (Client-side)
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              JSON{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                Formatter & Validator
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Beautify, inspect, validate, and minify your JSON data in real time. Zero server transmission.
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

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 mb-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {/* Left tools: Format, Minify, Fix */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFormat}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm shadow-violet-500/20 active:scale-95"
            >
              <FiCheck className="w-3.5 h-3.5" />
              Beautify
            </button>

            <button
              onClick={handleMinify}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider font-raleway transition-all active:scale-95"
            >
              <FiMinimize2 className="w-3.5 h-3.5" />
              Minify
            </button>

            <button
              onClick={handleAutoFix}
              title="Automatically fix single quotes and trailing commas"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 text-xs font-bold font-raleway transition-all"
            >
              <FiZap className="w-3.5 h-3.5" />
              Fix Quotes/Commas
            </button>

            {/* Indent Selector */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-200 dark:border-zinc-800 text-xs font-raleway">
              <span className="text-zinc-400 hidden sm:inline">Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-200 font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value="tab">Tab</option>
              </select>
            </div>
          </div>

          {/* Right tools: Sample, Upload, Clear */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setInputJson(SAMPLE_JSON)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              Load Sample
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all"
            >
              <FiUpload className="w-3.5 h-3.5" />
              Upload .json
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json,.txt"
              className="hidden"
            />

            <button
              onClick={() => setInputJson('')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 text-xs font-bold font-raleway transition-all"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Validation Status Banner */}
        {parseResult.isValid === true && (
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold">Valid JSON</span>
              <span className="text-zinc-400">|</span>
              <span>{stats.lineCount} lines</span>
              <span className="text-zinc-400">|</span>
              <span>Original: {stats.rawBytes} bytes</span>
              {stats.reductionPercent > 0 && (
                <>
                  <span className="text-zinc-400">|</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Minify saves ~{stats.reductionPercent}%
                  </span>
                </>
              )}
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 hidden sm:inline">
              ✓ Ready for API / Payload
            </span>
          </div>
        )}

        {parseResult.isValid === false && (
          <div className="flex items-start gap-2.5 px-4 py-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs">
            <FiAlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-0.5">Invalid JSON Syntax</span>
              <code className="font-mono text-[11px] bg-rose-100 dark:bg-rose-900/50 px-2 py-0.5 rounded text-rose-900 dark:text-rose-200 break-all">
                {parseResult.error}
              </code>
            </div>
          </div>
        )}

        {/* Main Side-by-Side Editor & Output Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Input Editor */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <FiFileText className="w-4 h-4 text-violet-500" />
                <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-200">
                  Raw JSON Input
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                {inputJson.length} chars
              </span>
            </div>

            <div className="relative flex-1 min-h-[460px]">
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Paste or write raw JSON here..."
                spellCheck={false}
                className="w-full h-full min-h-[460px] p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 bg-transparent resize-y focus:outline-none placeholder-zinc-400"
              />
            </div>
          </div>

          {/* RIGHT: Output Panel */}
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
              {/* Mode switch: Code view vs Tree view */}
              <div className="flex items-center gap-1 bg-zinc-200/80 dark:bg-zinc-800 p-0.5 rounded-lg">
                <button
                  onClick={() => setViewMode('code')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold font-raleway transition-all ${
                    viewMode === 'code'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <FiCode className="w-3.5 h-3.5" />
                  Code
                </button>
                <button
                  onClick={() => setViewMode('tree')}
                  disabled={!parseResult.isValid}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold font-raleway transition-all ${
                    viewMode === 'tree'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-40'
                  }`}
                >
                  <FiLayers className="w-3.5 h-3.5" />
                  Tree View
                </button>
              </div>

              {/* Action buttons: Copy & Download */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy()}
                  disabled={!inputJson.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-violet-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-violet-600 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all disabled:opacity-40"