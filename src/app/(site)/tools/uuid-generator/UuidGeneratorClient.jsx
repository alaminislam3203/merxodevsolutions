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
    id += chars[bytes[i] % chars.length];
  }
  return id;
}

export default function UuidGeneratorClient() {
  const [type, setType] = useState('uuidv4'); // 'uuidv4' | 'nanoid'
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [wrapQuotes, setWrapQuotes] = useState(false);
  const [wrapBraces, setWrapBraces] = useState(false);
  const [nanoLength, setNanoLength] = useState(21);
  const [generatedList, setGeneratedList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Generate IDs
  const generateIds = useCallback(() => {
    const list = [];
    const limit = Math.min(Math.max(1, count), 500);

    for (let i = 0; i < limit; i++) {
      let val = '';
      if (type === 'uuidv4') {
        val = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });

        if (!hyphens) val = val.replace(/-/g, '');
        if (uppercase) val = val.toUpperCase();
        else val = val.toLowerCase();
      } else {
        val = generateNanoId(nanoLength);
        if (uppercase) val = val.toUpperCase();
      }

      if (wrapBraces) val = `{${val}}`;
      if (wrapQuotes) val = `"${val}"`;

      list.push(val);
    }
    setGeneratedList(list);
  }, [type, count, uppercase, hyphens, wrapQuotes, wrapBraces, nanoLength]);

  useEffect(() => {
    generateIds();
  }, [generateIds]);

  const handleCopySingle = (text, index) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index);
        toast.success('Copied ID!');
        setTimeout(() => setCopiedIndex(null), 1500);
      });
    }
  };

  const handleCopyAll = () => {
    if (!generatedList.length) return;
    const text = generatedList.join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedAll(true);
        toast.success(`Copied all ${generatedList.length} IDs!`);
        setTimeout(() => setCopiedAll(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (!generatedList.length) return;