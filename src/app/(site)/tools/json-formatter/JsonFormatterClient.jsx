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