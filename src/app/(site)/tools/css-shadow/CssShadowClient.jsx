'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiBox,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiArrowLeft,
  FiSliders,
  FiCode,
  FiEye,
  FiLayers,
} from 'react-icons/fi';

const PRESETS = [
  { name: 'Smooth Modern', x: 0, y: 12, blur: 32, spread: -4, color: '#6366f1', opacity: 0.25, inset: false },
  { name: 'Soft Dark Floating', x: 0, y: 20, blur: 40, spread: -5, color: '#000000', opacity: 0.4, inset: false },
  { name: 'Neon Glow (Cyan)', x: 0, y: 0, blur: 30, spread: 4, color: '#06b6d4', opacity: 0.6, inset: false },
  { name: 'Violet Ambience', x: 0, y: 10, blur: 25, spread: 2, color: '#8b5cf6', opacity: 0.35, inset: false },
  { name: 'Inner Depressed (Inset)', x: 0, y: 6, blur: 16, spread: 0, color: '#000000', opacity: 0.3, inset: true },
  { name: 'Subtle Card Elevation', x: 0, y: 4, blur: 12, spread: 0, color: '#000000', opacity: 0.08, inset: false },
];

export default function CssShadowClient() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(14);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-4);
  const [shadowColor, setShadowColor] = useState('#7c3aed');
  const [opacity, setOpacity] = useState(0.3);
  const [inset, setInset] = useState(false);
  const [isGlass, setIsGlass] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((x) => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCss = useMemo(() => {
    const rgba = hexToRgba(shadowColor, opacity);
    const insetStr = inset ? 'inset ' : '';
    return `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
  }, [x, y, blur, spread, shadowColor, opacity, inset]);

  const tailwindSnippet = useMemo(() => {
    const rgbaClean = hexToRgba(shadowColor, opacity).replace(/\s/g, '');
    const insetPrefix = inset ? 'inset_' : '';
    return `shadow-[${insetPrefix}${x}px_${y}px_${blur}px_${spread}px_${rgbaClean}]`;
  }, [x, y, blur, spread, shadowColor, opacity, inset]);

  const fullCssSnippet = useMemo(() => {
    if (isGlass) {
      return `box-shadow: ${shadowCss};\nbackground: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(12px);\n-webkit-backdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.2);`;
    }
    return `box-shadow: ${shadowCss};`;
  }, [shadowCss, isGlass]);

  const handleCopy = (text, key) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        toast.success(`Copied ${key}!`);
        setTimeout(() => setCopiedKey(null), 1500);
      });
    }
  };

  const applyPreset = (p) => {
    setX(p.x);
    setY(p.y);
    setBlur(p.blur);
    setSpread(p.spread);
    setShadowColor(p.color);
    setOpacity(p.opacity);
    setInset(p.inset);
    toast.success(`Applied ${p.name}!`);
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-raleway text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">CSS Box Shadow Generator</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-raleway uppercase tracking-widest">
                <FiBox className="w-3.5 h-3.5" />
                CSS & UI Design
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiSliders className="w-3 h-3 text-rose-500" />
                Live Visual Canvas
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              CSS Shadow &{' '}
              <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
                Glass Builder
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-raleway">
              Fine-tune drop shadows and glassmorphic blur effects with interactive sliders. Copy ready-to-use CSS and Tailwind arbitrary classes.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-400 text-xs font-bold uppercase tracking-wider font-raleway transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Preset Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold font-raleway text-zinc-400 whitespace-nowrap">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 dark:hover:border-rose-500 text-zinc-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Main 2-Column Visual Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-5">
            <h2 className="font-display text-lg font-bold text-zinc-800 dark:text-white uppercase tracking-wider">
              Shadow Parameters
            </h2>

            {/* Horizontal (X) */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1.5">
                <span>Horizontal Offset (X)</span>
                <span className="font-mono text-rose-500">{x}px</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Vertical (Y) */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1.5">
                <span>Vertical Offset (Y)</span>
                <span className="font-mono text-rose-500">{y}px</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Blur Radius */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1.5">
                <span>Blur Radius</span>
                <span className="font-mono text-rose-500">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Spread Radius */}
            <div>
              <div className="flex justify-between text-xs font-raleway font-semibold mb-1.5">
                <span>Spread Radius</span>
                <span className="font-mono text-rose-500">{spread}px</span>
              </div>
              <input
                type="range"
                min="-40"
                max="60"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Shadow Color & Opacity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-raleway font-semibold mb-1.5">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-transparent p-0.5"
                  />
                  <input
                    type="text"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-raleway font-semibold mb-1.5">
                  <span>Opacity</span>
                  <span className="font-mono text-rose-500">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-raleway">
              <label className="flex items-center gap-2 cursor-pointer font-semibold select-none">
                <input
                  type="checkbox"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="rounded accent-rose-500"
                />
                <span>Inset Shadow (Inner)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold select-none">
                <input
                  type="checkbox"
                  checked={isGlass}
                  onChange={(e) => setIsGlass(e.target.checked)}
                  className="rounded accent-rose-500"
                />
                <span>Glassmorphism Effect</span>
              </label>
            </div>
          </div>

          {/* Interactive Preview Canvas & Code Output (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Visual Canvas */}
            <div className="relative w-full h-80 rounded-3xl bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-950 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-8 overflow-hidden">
              <div
                style={{
                  boxShadow: shadowCss,
                  backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.15)' : undefined,
                  backdropFilter: isGlass ? 'blur(14px)' : undefined,
                  border: isGlass ? '1px solid rgba(255, 255, 255, 0.25)' : undefined,
                }}
                className={`w-64 h-48 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-shadow duration-150 select-none ${
                  isGlass ? 'text-white' : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100'
                }`}
              >
                <FiBox className="w-8 h-8 text-rose-500 mb-2" />
                <h3 className="font-display text-lg font-bold">Preview Card</h3>
                <p className="text-xs opacity-70 font-raleway mt-1">
                  {inset ? 'Inner Inset Shadow' : 'Elevation Drop Shadow'}
                </p>
              </div>
            </div>

            {/* Generated CSS Snippets */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-4">
              {/* CSS Rule */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-300">
                    Pure CSS
                  </span>
                  <button
                    onClick={() => handleCopy(fullCssSnippet, 'CSS Rule')}
                    className="text-xs font-bold font-raleway text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    {copiedKey === 'CSS Rule' ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    Copy CSS
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-zinc-950 text-rose-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {fullCssSnippet}
                </pre>
              </div>

              {/* Tailwind CSS */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider font-raleway text-zinc-700 dark:text-zinc-300">
                    Tailwind CSS Arbitrary Value
                  </span>
                  <button
                    onClick={() => handleCopy(tailwindSnippet, 'Tailwind Class')}
                    className="text-xs font-bold font-raleway text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    {copiedKey === 'Tailwind Class' ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    Copy Tailwind
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-zinc-950 text-cyan-300 font-mono text-xs overflow-x-auto break-all">
                  {tailwindSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
              <FiEye className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              60 FPS Live Rendering
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Every slider adjust updates the CSS layout instantly in real time so you can design tactile elevation without leaving the browser.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
              <FiLayers className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Glassmorphism Presets
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Combine box-shadows with backdrop-filter blur and translucent borders to achieve state-of-the-art frosted glass aesthetic.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4">
              <FiCode className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Tailwind v3 & v4 Ready
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-raleway leading-relaxed">
              Generates ready-to-paste arbitrary classes formatted with underscores so Tailwind projects compile without syntax escapes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
