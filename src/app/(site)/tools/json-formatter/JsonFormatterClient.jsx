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