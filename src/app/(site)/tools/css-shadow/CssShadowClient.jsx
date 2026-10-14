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