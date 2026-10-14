'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiShield,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiTrash2,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiKey,
} from 'react-icons/fi';

// Lightweight pure-JS MD5 Implementation
function md5(string) {
  function md5_RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX, lY) {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }
  function md5_F(x, y, z) { return (x & y) | (~x & z); }
  function md5_G(x, y, z) { return (x & z) | (y & ~z); }
  function md5_H(x, y, z) { return x ^ y ^ z; }
  function md5_I(x, y, z) { return y ^ (x | ~z); }
  function md5_FF(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_ConvertToWordArray(string) {
    let lWordCount;
    const lMessageLength = string.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function md5_WordToHex(lValue) {
    let WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = '0' + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  const x = md5_ConvertToWordArray(string);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

async function shaHash(str, algo) {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGeneratorClient() {
  const [inputText, setInputText] = useState('MerxoDevSolutions2026');
  const [salt, setSalt] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha384: '',
    sha512: '',
  });

  const computeHashes = useCallback(async () => {
    const raw = inputText + salt;
    if (!raw) {
      setHashes({ md5: '', sha1: '', sha256: '', sha384: '', sha512: '' });
      return;
    }

    try {
      const [s1, s256, s384, s512] = await Promise.all([
        shaHash(raw, 'SHA-1'),
        shaHash(raw, 'SHA-256'),
        shaHash(raw, 'SHA-384'),
        shaHash(raw, 'SHA-512'),
      ]);
      const m = md5(raw);

      const format = (h) => (uppercase ? h.toUpperCase() : h.toLowerCase());

      setHashes({
        md5: format(m),
        sha1: format(s1),
        sha256: format(s256),
        sha384: format(s384),
        sha512: format(s512),
      });
    } catch {
      // Fallback
    }
  }, [inputText, salt, uppercase]);

  useEffect(() => {
    computeHashes();
  }, [computeHashes]);

  const handleCopy = (text, keyName) => {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(keyName);
        toast.success(`Copied ${keyName}!`);
        setTimeout(() => setCopiedKey(null), 1500);
      });
    }
  };

  const hashItems = [
    { key: 'sha256', name: 'SHA-256 (Recommended)', length: '256 bits (64 hex chars)', color: 'text-violet-500', value: hashes.sha256 },
    { key: 'sha512', name: 'SHA-512 (Ultra Secure)', length: '512 bits (128 hex chars)', color: 'text-emerald-500', value: hashes.sha512 },
    { key: 'md5', name: 'MD5 (Checksums & Legacy)', length: '128 bits (32 hex chars)', color: 'text-amber-500', value: hashes.md5 },
    { key: 'sha1', name: 'SHA-1 (Git Commit Hashes)', length: '160 bits (40 hex chars)', color: 'text-cyan-500', value: hashes.sha1 },
    { key: 'sha384', name: 'SHA-384', length: '384 bits (96 hex chars)', color: 'text-indigo-500', value: hashes.sha384 },
  ];

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">Hash & Password Generator</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800 font-raleway uppercase tracking-widest">
                <FiShield className="w-3.5 h-3.5" />
                Security & Cryptography
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                WebCrypto Subtle API
              </span>
            </div>