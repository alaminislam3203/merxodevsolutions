'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiCode,
  FiKey,
  FiFileText,
  FiLink,
  FiHash,
  FiShield,
  FiBox,
  FiSliders,
  FiCheckCircle,
  FiSearch,
  FiX,
  FiArrowRight,
  FiExternalLink,
  FiLayers,
  FiGlobe,
  FiMapPin,
  FiLock,
  FiCpu,
  FiZap,
} from 'react-icons/fi';

const TOOLS_DATA = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description:
      'Clean, beautify, and validate complex JSON payloads with instant error detection and minification.',
    category: 'Formatters',
    badge: 'Popular',
    badgeColor: 'violet',
    icon: FiCode,
    href: '/tools/json-formatter',
    tags: ['Beautify', 'Minify', 'Validate'],
    clientSide: true,
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Debugger & Decoder',
    description:
      'Inspect JSON Web Tokens in real time. Decode header, payload claims, and verify token expiration securely.',
    category: 'Security',
    badge: 'Essential',
    badgeColor: 'emerald',
    icon: FiKey,
    href: '/tools/jwt-decoder',
    tags: ['JWT', 'Bearer', 'Auth'],
    clientSide: true,
  },
  {
    id: 'base64',
    title: 'Base64 Encoder & Decoder',
    description:
      'Instantly convert plain text, binary strings, and image assets to and from clean Base64 strings.',
    category: 'Formatters',
    badge: 'Fast',
    badgeColor: 'cyan',
    icon: FiFileText,
    href: '/tools/base64',
    tags: ['Encode', 'Decode', 'Data URI'],
    clientSide: true,
  },
  {
    id: 'url-encoder',
    title: 'URL & Query Encoder',
    description:
      'Safely encode and decode URL query parameters, escaped characters, and UTF-8 strings.',
    category: 'Formatters',
    icon: FiLink,
    href: '/tools/url-encoder',
    tags: ['RFC3986', 'URI Component'],
    clientSide: true,
  },
  {
    id: 'uuid-generator',
    title: 'UUID & NanoID Generator',
    description:
      'Generate cryptographically safe UUID v4, v1, and customizable NanoIDs in single or bulk quantities.',
    category: 'Generators',
    badge: 'Fast',
    badgeColor: 'amber',
    icon: FiHash,
    href: '/tools/uuid-generator',
    tags: ['UUID v4', 'NanoID', 'Bulk'],
    clientSide: true,
  },
  {
    id: 'hash-generator',
    title: 'Hash & Password Generator',
    description:
      'Generate secure MD5, SHA-1, SHA-256, SHA-512, and salted password hashes directly inside your browser.',
    category: 'Security',
    icon: FiShield,
    href: '/tools/hash-generator',
    tags: ['SHA-256', 'MD5', 'Crypto'],
    clientSide: true,
  },
  {
    id: 'css-shadow',
    title: 'CSS Shadow & Glass Builder',
    description:
      'Visual drop-shadow and glassmorphism designer with real-time preview and one-click CSS code export.',
    category: 'CSS & UI',
    badge: 'Creative',
    badgeColor: 'rose',
    icon: FiBox,
    href: '/tools/css-shadow',
    tags: ['Box Shadow', 'Glassmorphism', 'Tailwind'],
    clientSide: true,
  },
  {
    id: 'gradient-generator',
    title: 'CSS Gradient Maker',
    description:
      'Create high-contrast linear, radial, and mesh CSS gradients with color stop controls and CSS/Tailwind export.',
    category: 'CSS & UI',
    icon: FiSliders,
    href: '/tools/gradient-generator',
    tags: ['Linear', 'Radial', 'CSS Gradients'],
    clientSide: true,
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester & Visualizer',
    description:
      'Test and debug regular expressions with real-time match highlighting, capture groups, and flag toggles.',
    category: 'Utilities',
    badge: 'Popular',
    badgeColor: 'violet',
    icon: FiLayers,
    href: '/tools/regex-tester',
    tags: ['Regex', 'Match', 'Flags'],
    clientSide: true,
  },
  {
    id: 'meta-previewer',
    title: 'Meta Tags & OG Previewer',
    description:
      'Preview social share cards for Facebook, Twitter/X, and LinkedIn, plus copy ready-to-use HTML meta tags.',
    category: 'Web & SEO',
    badge: 'SEO',
    badgeColor: 'cyan',
    icon: FiGlobe,
    href: '/tools/meta-previewer',
    tags: ['Open Graph', 'Twitter Cards', 'SEO'],
    clientSide: true,
  },
  {
    id: 'http-status',
    title: 'HTTP Status Codes Reference',
    description:
      'Fast, searchable cheat sheet of all HTTP response codes (1xx - 5xx) with troubleshooting advice.',
    category: 'Utilities',
    icon: FiZap,
    href: '/tools/http-status',
    tags: ['REST API', 'HTTP Codes', 'Cheatsheet'],
    clientSide: true,
  },
  {
    id: 'bd-lookup',
    title: 'Bangladesh Postcode & Geo Data',
    description:
      'Instant lookup for Bangladesh divisions, districts, upazilas, and post codes with copyable JSON dataset.',
    category: 'BD Devs',
    badge: 'Local Special',
    badgeColor: 'emerald',
    icon: FiMapPin,
    href: '/tools/bd-lookup',
    tags: ['Districts', 'Postcodes', 'JSON Data'],
    clientSide: true,
  },
];

const CATEGORIES = [
  'All',
  'Formatters',
  'Security',
  'CSS & UI',
  'Generators',
  'Web & SEO',
  'Utilities',
  'BD Devs',
];

const BADGE_STYLES = {
  violet:
    'bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  emerald:
    'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  cyan:
    'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  amber:
    'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  rose:
    'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
};

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {