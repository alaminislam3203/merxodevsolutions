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