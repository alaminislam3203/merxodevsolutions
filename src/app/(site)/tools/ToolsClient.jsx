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