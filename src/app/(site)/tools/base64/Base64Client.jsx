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