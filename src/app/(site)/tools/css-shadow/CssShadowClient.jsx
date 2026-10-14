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