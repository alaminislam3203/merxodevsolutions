'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiHash,
  FiCopy,
  FiCheck,
  FiDownload,
  FiRefreshCw,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiSliders,
  FiZap,
} from 'react-icons/fi';

// Custom lightweight NanoID generator using crypto.getRandomValues
function generateNanoId(size = 21, alphabet = 'use-standard') {
  const chars =
    alphabet === 'numbers'
      ? '0123456789'
      : alphabet === 'lowercase'
      ? 'abcdefghijklmnopqrstuvwxyz0123456789'
      : 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_kqer';
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < size; i++) {