'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiLink,
  FiCopy,
  FiCheck,
  FiDownload,
  FiRefreshCw,
  FiTrash2,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiCode,
  FiGlobe,
} from 'react-icons/fi';

const SAMPLE_URL = 'https://merxodevsolutions.pro.bd/search?category=web & saas&query=বাংলা ফ্রন্টএন্ড&ref=facebook&utm_source=social #preview';

export default function UrlEncoderClient() {
  const [inputVal, setInputVal] = useState(SAMPLE_URL);
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [scope, setScope] = useState('component'); // 'component' (encodeURIComponent) | 'full' (encodeURI)
  const [copied, setCopied] = useState(false);

  // Conversion logic
  const outputResult = useMemo(() => {
    if (!inputVal.trim()) return { success: true, result: '', error: null };
    try {
      if (mode === 'encode') {
        const encoded =
          scope === 'component'
            ? encodeURIComponent(inputVal)
            : encodeURI(inputVal);
        return { success: true, result: encoded, error: null };
      } else {
        const decoded =
          scope === 'component'
            ? decodeURIComponent(inputVal)
            : decodeURI(inputVal);
        return { success: true, result: decoded, error: null };
      }
    } catch (err) {
      return { success: false, result: '', error: 'Malformed URI sequence. Check percent-encoded sequences.' };
    }
  }, [inputVal, mode, scope]);

  const handleCopy = () => {
    if (!outputResult.result) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(outputResult.result).then(() => {
        setCopied(true);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };