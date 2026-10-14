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