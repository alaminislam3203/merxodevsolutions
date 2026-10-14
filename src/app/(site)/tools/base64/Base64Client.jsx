'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiFileText,
  FiImage,
  FiCopy,
  FiCheck,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiTrash2,
  FiArrowLeft,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiCode,
  FiEye,
} from 'react-icons/fi';

// Safe UTF-8 Base64 Encoder
function utf8ToBase64(str, isUrlSafe = false) {
  try {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64 = btoa(binary);
    if (isUrlSafe) {
      base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return { success: true, result: base64, error: null };
  } catch (err) {
    return { success: false, result: '', error: err.message };
  }
}

// Safe UTF-8 Base64 Decoder
function base64ToUtf8(str) {
  try {
    let base64 = str.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder().decode(bytes);
    return { success: true, result: decoded, error: null };
  } catch (err) {
    return { success: false, result: '', error: 'Invalid Base64 string syntax.' };
  }
}

const SAMPLE_TEXT = `Hello World! 🚀
MerxoDev Solutions — Full Stack Web Engineering.
বাংলা ভাষা ও ইউনিকোড সাপোর্ট (UTF-8 Verified).
Special symbols: @#$%^&*()_+={}:"<>?`;

export default function Base64Client() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image'

  // Text Mode state
  const [textMode, setTextMode] = useState('encode'); // 'encode' | 'decode'
  const [textInput, setTextInput] = useState(SAMPLE_TEXT);
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Image Mode state
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUri, setImageDataUri] = useState('');
  const [imageDetails, setImageDetails] = useState(null);
  const [customB64Input, setCustomB64Input] = useState('');
  const fileInputRef = useRef(null);

  // Process text conversion
  const textOutput = useMemo(() => {
    if (!textInput.trim()) return { success: true, result: '', error: null };
    if (textMode === 'encode') {
      return utf8ToBase64(textInput, isUrlSafe);
    } else {
      return base64ToUtf8(textInput);
    }
  }, [textInput, textMode, isUrlSafe]);

  // Copy helper
  const handleCopy = (text, keyName = 'Output') => {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(keyName);
        toast.success(`Copied ${keyName}!`);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  // Download text file
  const handleDownloadText = () => {
    if (!textOutput.result) return;
    const blob = new Blob([textOutput.result], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = textMode === 'encode' ? 'base64_encoded.txt' : 'decoded_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded text file!');
  };

  // Handle Image Upload
  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result;
      if (typeof dataUri === 'string') {
        setImageDataUri(dataUri);
        setImageFile(file);
        setImageDetails({
          name: file.name,
          size: file.size,
          type: file.type,
          rawBase64: dataUri.split(',')[1] || '',
        });
        toast.success(`Loaded "${file.name}"`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop for image
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  // Handle custom pasted base64 image preview
  const handlePreviewCustomB64 = () => {
    const raw = customB64Input.trim();
    if (!raw) return;
    const uri = raw.startsWith('data:image/') ? raw : `data:image/png;base64,${raw}`;
    setImageDataUri(uri);
    setImageDetails({
      name: 'pasted_image.png',
      size: Math.round((raw.length * 3) / 4),
      type: 'image/png',
      rawBase64: raw.replace(/^data:image\/[a-z]+;base64,/, ''),
    });
    toast.success('Decoded and rendered image preview!');
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">Base64 Encoder & Decoder</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-raleway uppercase tracking-widest">
                <FiFileText className="w-3.5 h-3.5" />
                Formatters & Converters
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiLock className="w-3 h-3 text-emerald-500" />
                100% Client-Side Privacy
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              Base64{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-violet-600 bg-clip-text text-transparent">
                Encoder & Decoder
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Encode and decode plain text, UTF-8 strings, and image assets to Base64 and Data URIs with zero server upload.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Mode Selector Tabs: Text vs Image */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider font-raleway transition-all ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600'
            }`}
          >
            <FiFileText className="w-4 h-4" />
            Text Converter (UTF-8)
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider font-raleway transition-all ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-cyan-600'
            }`}
          >
            <FiImage className="w-4 h-4" />
            Image to Base64 & Data URI
          </button>
        </div>

        {/* ── TAB 1: TEXT CONVERTER ────────────────────────────────────────────── */}
        {activeTab === 'text' && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 mb-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-2">
                {/* Encode vs Decode toggle */}
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <button
                    onClick={() => setTextMode('encode')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                      textMode === 'encode'
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Text → Base64
                  </button>
                  <button
                    onClick={() => setTextMode('decode')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-raleway uppercase transition-all ${
                      textMode === 'decode'
                        ? 'bg-cyan-500 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    Base64 → Text
                  </button>
                </div>

                {/* URL Safe Toggle (applicable in encode mode) */}
                {textMode === 'encode' && (
                  <label className="flex items-center gap-2 text-xs font-raleway cursor-pointer ml-2 text-zinc-600 dark:text-zinc-300">
                    <input
                      type="checkbox"
                      checked={isUrlSafe}
                      onChange={(e) => setIsUrlSafe(e.target.checked)}
                      className="rounded accent-cyan-500"
                    />
                    <span>URL-Safe (- and _)</span>
                  </label>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTextInput(SAMPLE_TEXT)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold font-raleway transition-all"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  Load Sample
                </button>

                <button
                  onClick={() => setTextInput('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold font-raleway transition-all"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              </div>
            </div>

            {/* Error banner if decoding fails */}
            {textOutput.error && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs">
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                <span>{textOutput.error}</span>
              </div>
            )}

            {/* Side-by-side Input / Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-200">
                    {textMode === 'encode' ? 'Plain Text Input (UTF-8)' : 'Base64 Encoded Input'}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">{textInput.length} chars</span>
                </div>
                <div className="p-4 flex-1 min-h-[380px]">
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={