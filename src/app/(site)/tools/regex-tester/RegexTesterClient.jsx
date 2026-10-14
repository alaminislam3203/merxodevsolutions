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