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