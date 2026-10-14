'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FiCode,
  FiKey,
  FiFileText,
  FiLink,
  FiHash,
  FiShield,
  FiBox,
  FiSliders,
  FiCheckCircle,
  FiSearch,
  FiX,
  FiArrowRight,
  FiExternalLink,
  FiLayers,
  FiGlobe,
  FiMapPin,
  FiLock,
  FiCpu,
  FiZap,
} from 'react-icons/fi';

const TOOLS_DATA = [
  {
    id: 'json-formatter',