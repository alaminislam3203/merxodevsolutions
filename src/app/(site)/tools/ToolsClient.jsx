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