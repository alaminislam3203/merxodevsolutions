'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiSliders,
  FiCopy,
  FiCheck,
  FiRefreshCw,
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiCompass,
  FiEye,
} from 'react-icons/fi';

const PRESET_GRADIENTS = [
  { name: 'Merxo Violet', type: 'linear', angle: 135, stops: [{ color: '#7c3aed', pos: 0 }, { color: '#d946ef', pos: 50 }, { color: '#06b6d4', pos: 100 }] },
  { name: 'Sunset Glow', type: 'linear', angle: 90, stops: [{ color: '#f43f5e', pos: 0 }, { color: '#fb923c', pos: 100 }] },
  { name: 'Neon Cyber', type: 'linear', angle: 120, stops: [{ color: '#06b6d4', pos: 0 }, { color: '#3b82f6', pos: 50 }, { color: '#9333ea', pos: 100 }] },
  { name: 'Emerald Ocean', type: 'linear', angle: 180, stops: [{ color: '#10b981', pos: 0 }, { color: '#047857', pos: 100 }] },
  { name: 'Midnight Radiance', type: 'radial', angle: 0, stops: [{ color: '#312e81', pos: 0 }, { color: '#090d16', pos: 100 }] },
  { name: 'Cosmic Flare', type: 'linear', angle: 45, stops: [{ color: '#ec4899', pos: 0 }, { color: '#8b5cf6', pos: 100 }] },
];

export default function GradientGeneratorClient() {
  const [type, setType] = useState('linear'); // 'linear' | 'radial'
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: '#7c3aed', pos: 0 },
    { color: '#d946ef', pos: 50 },
    { color: '#06b6d4', pos: 100 },
  ]);
  const [copiedKey, setCopiedKey] = useState(null);

  // Computed gradient string
  const gradientString = useMemo(() => {
    const sorted = [...stops].sort((a, b) => a.pos - b.pos);
    const stopsStr = sorted.map((s) => `${s.color} ${s.pos}%`).join(', ');
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    }
    return `radial-gradient(circle, ${stopsStr})`;
  }, [type, angle, stops]);

  const cssRule = `background: ${gradientString};`;

  const tailwindSnippet = useMemo(() => {
    return `bg-[${gradientString.replace(/\s+/g, '_')}]`;
  }, [gradientString]);

  const handleCopy = (text, key) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        toast.success(`Copied ${key}!`);
        setTimeout(() => setCopiedKey(null), 1500);
      });
    }
  };

  const handleUpdateStop = (index, field, value) => {
    setStops((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddStop = () => {
    if (stops.length >= 6) {
      toast.error('Maximum 6 color stops.');
      return;
    }
    const lastPos = stops[stops.length - 1]?.pos || 50;
    const newPos = Math.min(100, lastPos + 15);
    setStops([...stops, { color: '#ec4899', pos: newPos }]);
  };

  const handleRemoveStop = (index) => {
    if (stops.length <= 2) {
      toast.error('Gradients require at least 2 color stops.');
      return;
    }
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleRandom = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setAngle(Math.floor(Math.random() * 360));
    setStops([
      { color: randomHex(), pos: 0 },
      { color: randomHex(), pos: Math.floor(Math.random() * 40) + 30 },
      { color: randomHex(), pos: 100 },
    ]);
    toast.success('Generated random gradient!');
  };

  const applyPreset = (p) => {
    setType(p.type);
    setAngle(p.angle);
    setStops(p.stops);
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
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-12 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">CSS Gradient Maker</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-100 dark:bg-fuchsia-950 text-fuchsia-700 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800 font-exo-extralight uppercase tracking-widest">
                <FiSliders className="w-3.5 h-3.5" />
                Color & Gradient Tools
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiEye className="w-3 h-3 text-cyan-500" />
                Interactive Visual Designer
              </span>
            </div>

            <h1 className="font-exo-medium text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              CSS Gradient{' '}
              <span className="bg-gradient-to-r from-fuchsia-500 via-rose-500 to-cyan-500 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-exo-extralight">
              Craft multi-stop linear and radial gradients with interactive angle sliders, preset palettes, and one-click CSS and Tailwind exports.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 hover:border-fuchsia-400 text-xs font-bold uppercase tracking-wider font-exo-extralight transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Presets Gallery */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-bold font-exo-extralight text-zinc-400 whitespace-nowrap">Presets:</span>
          {PRESET_GRADIENTS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-fuchsia-400 dark:hover:border-fuchsia-500 text-zinc-700 dark:text-zinc-300 text-xs font-semibold whitespace-nowrap transition-all shadow-sm"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={handleRandom}
            className="px-3.5 py-1.5 rounded-xl bg-fuchsia-50 hover:bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-300 text-xs font-bold whitespace-nowrap transition-all border border-fuchsia-200 dark:border-fuchsia-800 flex items-center gap-1.5"
          >
            <FiRefreshCw className="w-3 h-3" />
            Random
          </button>
        </div>

        {/* Main 2-Column Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-5">
            {/* Type Switcher: Linear vs Radial */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-300 mb-2">
                Gradient Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setType('linear')}
                  className={`py-2 rounded-lg text-xs font-bold font-exo-extralight uppercase transition-all ${type === 'linear'
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setType('radial')}
                  className={`py-2 rounded-lg text-xs font-bold font-exo-extralight uppercase transition-all ${type === 'radial'
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  Radial (Circle)
                </button>
              </div>
            </div>

            {/* Angle Slider (if linear) */}
            {type === 'linear' && (
              <div>
                <div className="flex justify-between text-xs font-exo-extralight font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FiCompass className="w-3.5 h-3.5 text-fuchsia-500" />
                    Angle Direction
                  </span>
                  <span className="font-mono text-fuchsia-500">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-fuchsia-600 cursor-pointer"
                />
              </div>
            )}

            {/* Color Stops List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-300">
                  Color Stops ({stops.length}/6)
                </span>
                <button
                  onClick={handleAddStop}
                  className="text-xs font-bold font-exo-extralight text-fuchsia-600 hover:text-fuchsia-700 flex items-center gap-1"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  Add Color
                </button>
              </div>

              <div className="space-y-3">
                {stops.map((stop, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => handleUpdateStop(index, 'color', e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-600 bg-transparent p-0.5"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => handleUpdateStop(index, 'color', e.target.value)}
                      className="w-20 px-2 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-mono"
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.pos}
                        onChange={(e) => handleUpdateStop(index, 'pos', Number(e.target.value))}
                        className="w-full accent-fuchsia-600 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-zinc-500 w-8 text-right">{stop.pos}%</span>
                    </div>
                    {stops.length > 2 && (
                      <button
                        onClick={() => handleRemoveStop(index)}
                        className="text-zinc-400 hover:text-rose-500 p-1"
                        title="Delete stop"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Code (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Live Gradient Preview Box */}
            <div
              style={{ background: gradientString }}
              className="w-full h-80 rounded-3xl shadow-xl flex items-center justify-center p-8 text-white text-center transition-all duration-200 select-none border border-white/20"
            >
              <div className="px-6 py-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                <h3 className="font-exo-medium text-2xl font-bold uppercase tracking-wider">
                  Live Gradient Preview
                </h3>
                <p className="text-xs font-mono opacity-90 mt-1">{type.toUpperCase()} • {stops.length} STOPS</p>
              </div>
            </div>

            {/* Code Output Cards */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-300">
                    CSS Rule
                  </span>
                  <button
                    onClick={() => handleCopy(cssRule, 'CSS Rule')}
                    className="text-xs font-bold font-exo-extralight text-fuchsia-600 hover:text-fuchsia-700 flex items-center gap-1"
                  >
                    {copiedKey === 'CSS Rule' ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
                    Copy CSS
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-zinc-950 text-fuchsia-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {cssRule}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider font-exo-extralight text-zinc-700 dark:text-zinc-300">
                    Tailwind CSS Arbitrary Value
                  </span>
                  <button
                    onClick={() => handleCopy(tailwindSnippet, 'Tailwind Class')}
                    className="text-xs font-bold font-exo-extralight text-fuchsia-600 hover:text-fuchsia-700 flex items-center gap-1"
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
      </div>
    </div>
  );
}
