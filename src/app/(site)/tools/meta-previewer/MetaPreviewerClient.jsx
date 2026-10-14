'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiGlobe,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiEye,
  FiShare2,
  FiCode,
  FiRefreshCw,
} from 'react-icons/fi';

export default function MetaPreviewerClient() {
  const [title, setTitle] = useState('MerxoDev Solutions — Full Stack Web Engineering & Software');
  const [description, setDescription] = useState('We build high-performance Next.js websites, SaaS platforms, and enterprise solutions for businesses in Bangladesh and worldwide.');
  const [url, setUrl] = useState('https://merxodevsolutions.pro.bd');
  const [image, setImage] = useState('https://merxodevsolutions.pro.bd/logo-light.png');
  const [siteName, setSiteName] = useState('MerxoDev Solutions');
  const [twitterUser, setTwitterUser] = useState('@merxodev');
  const [activePreview, setActivePreview] = useState('google'); // 'google' | 'facebook' | 'twitter'
  const [copied, setCopied] = useState(false);

  // Generate HTML tags