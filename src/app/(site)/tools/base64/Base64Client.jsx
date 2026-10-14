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