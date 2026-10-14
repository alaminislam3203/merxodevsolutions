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