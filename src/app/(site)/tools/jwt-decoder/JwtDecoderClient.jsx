'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiKey,
  FiCopy,
  FiCheck,
  FiClock,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiRefreshCw,
  FiTrash2,
  FiLock,
  FiCode,
  FiUser,
  FiCalendar,
  FiActivity,
} from 'react-icons/fi';

// Safe Base64URL decoder with UTF-8 support
function base64UrlDecode(str) {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

// Generate realistic dynamic sample tokens
function generateSampleTokens() {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: 'HS256', typ: 'JWT' };
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  // Active token (expires in 24 hours)
  const activePayload = {
    sub: 'usr_8492049102',
    name: 'Al Amin',
    email: 'developer@merxodevsolutions.pro.bd',
    role: 'super_admin',
    iss: 'https://auth.merxodevsolutions.pro.bd',
    aud: 'merxodev-api-gateway',
    iat: now - 3600, // issued 1 hour ago
    nbf: now - 3600,
    exp: now + 86400, // expires in 24 hours
  };
  const activePayloadB64 = btoa(JSON.stringify(activePayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const activeSig = 'c4dE_39FkL78w0_sample_signature_abc123';

  // Expired token (expired 2 days ago)
  const expiredPayload = {
    sub: 'usr_old_5829104',
    name: 'Test Visitor',
    email: 'guest@example.com',
    role: 'tester',
    iss: 'https://auth.example.com',
    iat: now - 259200, // 3 days ago
    exp: now - 172800, // 2 days ago
  };
  const expiredPayloadB64 = btoa(JSON.stringify(expiredPayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return {
    active: `${headerB64}.${activePayloadB64}.${activeSig}`,
    expired: `${headerB64}.${expiredPayloadB64}.${activeSig}`,
  };
}

export default function JwtDecoderClient() {
  const samples = useMemo(() => generateSampleTokens(), []);
  const [tokenInput, setTokenInput] = useState(samples.active);
  const [copiedPart, setCopiedPart] = useState(null);

  // Decode JWT into parts
  const decodedResult = useMemo(() => {
    const raw = tokenInput.trim();
    if (!raw) {
      return { isValid: null, header: null, payload: null, signature: null, error: null };
    }

    const parts = raw.split('.');
    if (parts.length !== 3) {
      return {
        isValid: false,
        error: `A valid JWT must have 3 dot-separated parts (Header.Payload.Signature). Found ${parts.length} part(s).`,
        header: null,
        payload: null,
        signature: null,
      };
    }

    const [rawHeader, rawPayload, signature] = parts;
    const decodedHeaderStr = base64UrlDecode(rawHeader);
    const decodedPayloadStr = base64UrlDecode(rawPayload);

    if (!decodedHeaderStr) {
      return { isValid: false, error: 'Invalid Base64Url encoding in JWT Header.', header: null, payload: null };
    }
    if (!decodedPayloadStr) {
      return { isValid: false, error: 'Invalid Base64Url encoding in JWT Payload.', header: null, payload: null };
    }

    let headerObj, payloadObj;
    try {
      headerObj = JSON.parse(decodedHeaderStr);
    } catch {
      return { isValid: false, error: 'JWT Header is not valid JSON.', header: null, payload: null };
    }

    try {
      payloadObj = JSON.parse(decodedPayloadStr);
    } catch {
      return { isValid: false, error: 'JWT Payload is not valid JSON.', header: null, payload: null };
    }

    // Parse Expiration Status
    let expStatus = null;
    if (payloadObj && typeof payloadObj.exp === 'number') {
      const now = Math.floor(Date.now() / 1000);
      const diff = payloadObj.exp - now;
      const expDate = new Date(payloadObj.exp * 1000);

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        expStatus = {
          isExpired: false,
          label: 'Active & Valid',
          timeRemaining: `${hours}h ${minutes}m remaining`,
          humanDate: expDate.toLocaleString(),
          utcDate: expDate.toUTCString(),
        };
      } else {
        const absDiff = Math.abs(diff);
        const hours = Math.floor(absDiff / 3600);
        const minutes = Math.floor((absDiff % 3600) / 60);
        expStatus = {
          isExpired: true,
          label: 'Expired Token',
          timeRemaining: `Expired ${hours}h ${minutes}m ago`,
          humanDate: expDate.toLocaleString(),
          utcDate: expDate.toUTCString(),
        };
      }
    }

    // Issued At (iat)
    let iatDate = null;
    if (payloadObj && typeof payloadObj.iat === 'number') {
      iatDate = new Date(payloadObj.iat * 1000).toLocaleString();
    }

    return {
      isValid: true,
      error: null,
      rawHeader,
      rawPayload,
      signature,
      header: headerObj,
      payload: payloadObj,
      headerFormatted: JSON.stringify(headerObj, null, 2),
      payloadFormatted: JSON.stringify(payloadObj, null, 2),
      expStatus,
      iatDate,
    };
  }, [tokenInput]);

  const handleCopy = (text, partName) => {
    if (!text) return;