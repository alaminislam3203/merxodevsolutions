'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import '@/components/i18n';

// ─── High-End Vector Illustration Components ──────────────────────────────

function WebDevArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wd-win" x1="10" y1="10" x2="110" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" stopOpacity="0.18" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="wd-stroke" x1="15" y1="10" x2="105" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="wd-tag" x1="45" y1="36" x2="95" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <filter id="wd-glow" x="35" y="28" width="70" height="52" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Background soft glow */}
      <circle cx="60" cy="45" r="32" fill="#6366F1" fillOpacity="0.18" />
      {/* Main browser window */}
      <rect x="14" y="12" width="92" height="66" rx="10" fill="url(#wd-win)" stroke="url(#wd-stroke)" strokeWidth="1.5" />
      {/* Browser top header */}
      <rect x="14" y="12" width="92" height="14" rx="10" fill="#18181B" fillOpacity="0.15" />
      <circle cx="23" cy="19" r="2.5" fill="#EF4444" />
      <circle cx="31" cy="19" r="2.5" fill="#F59E0B" />
      <circle cx="39" cy="19" r="2.5" fill="#10B981" />
      {/* Code lines */}
      <line x1="22" y1="34" x2="48" y2="34" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <line x1="22" y1="43" x2="38" y2="43" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <line x1="22" y1="52" x2="50" y2="52" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="22" y1="61" x2="34" y2="61" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      {/* Central Floating Code Pill Badge */}
      <g filter="url(#wd-glow)">
        <rect x="46" y="34" width="48" height="34" rx="8" fill="url(#wd-tag)" stroke="#A5F3FC" strokeWidth="1.2" />
        <text x="70" y="56" fill="#F0FDFA" fontSize="15" fontWeight="800" fontFamily="monospace" textAnchor="middle" letterSpacing="-0.5">
          &lt;/&gt;
        </text>
      </g>
      {/* Floating Sparkle */}
      <circle cx="98" cy="20" r="1.5" fill="#38BDF8" />
      <circle cx="94" cy="25" r="2.5" fill="#67E8F9" />
    </svg>
  );
}

function ECommerceArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ec-cart" x1="20" y1="20" x2="90" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="ec-bag" x1="45" y1="16" x2="85" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Background Soft Glow */}
      <circle cx="60" cy="46" r="32" fill="#F97316" fillOpacity="0.16" />
      {/* Shopping Cart Body */}
      <path
        d="M20 22h12l8 32h38l8-24H35"
        stroke="url(#ec-cart)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cart Wheels */}
      <circle cx="44" cy="64" r="5" fill="#F97316" stroke="#FFEDD5" strokeWidth="1.5" />
      <circle cx="74" cy="64" r="5" fill="#EAB308" stroke="#FEF3C7" strokeWidth="1.5" />
      {/* Floating Shopping Bag */}
      <g transform="translate(48, 14)">
        <rect x="0" y="8" width="30" height="28" rx="6" fill="url(#ec-bag)" stroke="#A7F3D0" strokeWidth="1.5" />
        <path d="M8 8V5a7 7 0 0114 0v3" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
        {/* Glowing Star/Percent in Bag */}
        <path d="M15 17l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="#FEF08A" />
      </g>
      {/* Floating Discount Badge */}
      <g transform="translate(82, 14)">
        <circle cx="8" cy="8" r="9" fill="#EF4444" stroke="#FEE2E2" strokeWidth="1.5" />
        <text x="8" y="11.5" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle">%</text>
      </g>
    </svg>
  );
}

function WebAppArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wa-win" x1="12" y1="12" x2="108" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" stopOpacity="0.2" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="wa-bar" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#22D3EE" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      {/* Ambient Glow */}
      <circle cx="60" cy="45" r="32" fill="#06B6D4" fillOpacity="0.16" />
      {/* App Window Frame */}
      <rect x="14" y="14" width="92" height="62" rx="10" fill="url(#wa-win)" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Sidebar */}
      <rect x="14" y="14" width="22" height="62" rx="10" fill="#0284C7" fillOpacity="0.25" />
      <circle cx="25" cy="24" r="3.5" fill="#38BDF8" />
      <rect x="19" y="33" width="12" height="3" rx="1.5" fill="#93C5FD" opacity="0.7" />
      <rect x="19" y="40" width="12" height="3" rx="1.5" fill="#93C5FD" opacity="0.5" />
      <rect x="19" y="47" width="12" height="3" rx="1.5" fill="#93C5FD" opacity="0.5" />
      {/* Dashboard Metrics / Bar Chart */}
      <rect x="43" y="48" width="8" height="18" rx="2.5" fill="url(#wa-bar)" />
      <rect x="55" y="38" width="8" height="28" rx="2.5" fill="url(#wa-bar)" />
      <rect x="67" y="30" width="8" height="36" rx="2.5" fill="url(#wa-bar)" />
      <rect x="79" y="42" width="8" height="24" rx="2.5" fill="url(#wa-bar)" />
      <rect x="91" y="24" width="8" height="42" rx="2.5" fill="url(#wa-bar)" />
      {/* Top Sparkline Curve */}
      <path d="M43 44l16-8 12 5 16-16 8 4" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="87" cy="25" r="2.5" fill="#F43F5E" />
    </svg>
  );
}

function UIUXArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ui-grad" x1="20" y1="14" x2="100" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="45" r="32" fill="#A855F7" fillOpacity="0.18" />
      {/* Figma Frame Artboard */}
      <rect x="22" y="16" width="60" height="56" rx="8" fill="#581C87" fillOpacity="0.15" stroke="url(#ui-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Inner Design Elements */}
      <rect x="30" y="24" width="44" height="16" rx="4" fill="#A855F7" fillOpacity="0.35" />
      <circle cx="38" cy="32" r="4" fill="#F472B6" />
      <line x1="46" y1="30" x2="68" y2="30" stroke="#FDF2F8" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="35" x2="60" y2="35" stroke="#FDF2F8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Color Palette Swatches */}
      <circle cx="32" cy="54" r="4.5" fill="#84CC16" />
      <circle cx="44" cy="54" r="4.5" fill="#06B6D4" />
      <circle cx="56" cy="54" r="4.5" fill="#F43F5E" />
      {/* Pen Tool / Cursor with Pointer */}
      <g transform="translate(64, 38)">
        <path d="M0 0l28 10-12 5-5 12L0 0z" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
        {/* User tag */}
        <rect x="14" y="24" width="26" height="12" rx="3" fill="#A855F7" />
        <text x="27" y="32.5" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle">UI/UX</text>
      </g>
    </svg>
  );
}

function SEOGrowthArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="seo-arr" x1="20" y1="65" x2="95" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84CC16" />
          <stop offset="0.5" stopColor="#10B981" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Ambient Glow */}
      <circle cx="60" cy="45" r="32" fill="#84CC16" fillOpacity="0.16" />
      {/* Coordinate Grid axes */}
      <line x1="18" y1="72" x2="102" y2="72" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="18" x2="18" y2="72" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Growth Trend Line & Arrow */}
      <path
        d="M22 66c18-4 28-20 44-24s22-18 32-24"
        stroke="url(#seo-arr)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M94 18h8v8" stroke="url(#seo-arr)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Magnifying Glass with #1 Badge */}
      <g transform="translate(42, 28)">
        <circle cx="16" cy="16" r="14" fill="#0F172A" fillOpacity="0.5" stroke="#38BDF8" strokeWidth="2.5" />
        <line x1="26" y1="26" x2="38" y2="38" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        {/* #1 text */}
        <text x="16" y="21" fill="#CCFF00" fontSize="13" fontWeight="900" textAnchor="middle">#1</text>
      </g>
      {/* Floating Star */}
      <circle cx="98" cy="38" r="2.5" fill="#FACC15" />
    </svg>
  );
}

function APIIntegrationArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="api-hub" x1="40" y1="25" x2="80" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      {/* Ambient Glow */}
      <circle cx="60" cy="45" r="32" fill="#F59E0B" fillOpacity="0.16" />
      {/* Connecting Circuit Pipes */}
      <line x1="28" y1="28" x2="60" y2="45" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="92" y1="28" x2="60" y2="45" stroke="#34D399" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="28" y1="62" x2="60" y2="45" stroke="#A78BFA" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="92" y1="62" x2="60" y2="45" stroke="#F472B6" strokeWidth="2" strokeDasharray="3 3" />
      {/* 4 Satellite Endpoints */}
      <circle cx="28" cy="28" r="7" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="92" cy="28" r="7" fill="#065F46" stroke="#34D399" strokeWidth="1.5" />
      <circle cx="28" cy="62" r="7" fill="#5B21B6" stroke="#A78BFA" strokeWidth="1.5" />
      <circle cx="92" cy="62" r="7" fill="#9D174D" stroke="#F472B6" strokeWidth="1.5" />
      {/* Central Hexagon API Node */}
      <polygon
        points="60,26 78,35 78,55 60,64 42,55 42,35"
        fill="url(#api-hub)"
        stroke="#FEF3C7"
        strokeWidth="1.8"
      />
      <text x="60" y="48.5" fill="#FFFFFF" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">API</text>
    </svg>
  );
}

function SecurityArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sec-shield" x1="36" y1="14" x2="84" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="0.6" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Ambient Glow */}
      <circle cx="60" cy="45" r="32" fill="#0EA5E9" fillOpacity="0.18" />
      {/* Digital Defense Rings */}
      <circle cx="60" cy="45" r="38" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      {/* Metallic Security Shield */}
      <path
        d="M60 14L86 24v22c0 18-12 28-26 32-14-4-26-14-26-32V24l26-10z"
        fill="url(#sec-shield)"
        stroke="#E0F2FE"
        strokeWidth="2"
      />
      {/* Cyber Padlock inside Shield */}
      <g transform="translate(48, 32)">
        <rect x="3" y="10" width="18" height="15" rx="3.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M7 10V6a5 5 0 0110 0v4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="2" fill="#38BDF8" />
        <line x1="12" y1="18" x2="12" y2="21" stroke="#38BDF8" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function PaymentGatewayArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg-card1" x1="20" y1="20" x2="85" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="pg-card2" x1="35" y1="32" x2="100" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="45" r="32" fill="#EC4899" fillOpacity="0.16" />
      {/* Background Card */}
      <rect x="20" y="20" width="62" height="38" rx="6" fill="url(#pg-card1)" stroke="#FCE7F3" strokeWidth="1.2" transform="rotate(-6 51 39)" />
      {/* Foreground Card */}
      <rect x="34" y="30" width="64" height="40" rx="6" fill="url(#pg-card2)" stroke="#D1FAE5" strokeWidth="1.2" transform="rotate(4 66 50)" />
      {/* Card Chip & Magnetic line */}
      <rect x="42" y="44" width="9" height="7" rx="1.5" fill="#FDE047" stroke="#FEF08A" strokeWidth="0.8" transform="rotate(4 46 47)" />
      {/* Contactless waves */}
      <path d="M57 42a6 6 0 010 8m3-10a10 10 0 010 12" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      {/* Floating Currency / Success Token */}
      <g transform="translate(80, 16)">
        <circle cx="10" cy="10" r="10" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1.5" />
        <text x="10" y="14" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle">৳</text>
      </g>
    </svg>
  );
}

function DatabaseArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="db-grad" x1="30" y1="18" x2="90" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Ambient Glow */}
      <circle cx="60" cy="45" r="32" fill="#8B5CF6" fillOpacity="0.18" />
      {/* Bottom Cylinder Disc */}
      <g transform="translate(32, 50)">
        <path d="M0 8v10c0 5 12.5 9 28 9s28-4 28-9V8" fill="url(#db-grad)" fillOpacity="0.85" />
        <ellipse cx="28" cy="8" rx="28" ry="8" fill="#7C3AED" stroke="#C4B5FD" strokeWidth="1.2" />
        <circle cx="48" cy="16" r="2" fill="#34D399" />
      </g>
      {/* Middle Cylinder Disc */}
      <g transform="translate(32, 33)">
        <path d="M0 8v10c0 5 12.5 9 28 9s28-4 28-9V8" fill="url(#db-grad)" fillOpacity="0.9" />
        <ellipse cx="28" cy="8" rx="28" ry="8" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1.2" />
        <circle cx="48" cy="16" r="2" fill="#38BDF8" />
      </g>
      {/* Top Cylinder Disc */}
      <g transform="translate(32, 16)">
        <path d="M0 8v10c0 5 12.5 9 28 9s28-4 28-9V8" fill="url(#db-grad)" />
        <ellipse cx="28" cy="8" rx="28" ry="8" fill="#A78BFA" stroke="#EDE9FE" strokeWidth="1.5" />
        <circle cx="48" cy="16" r="2" fill="#F43F5E" />
      </g>
    </svg>
  );
}

function MaintenanceArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mt-gear" x1="25" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="45" r="32" fill="#06B6D4" fillOpacity="0.16" />
      {/* Big Interlocking Gear */}
      <g transform="translate(32, 22)">
        <circle cx="24" cy="24" r="16" fill="url(#mt-gear)" stroke="#BAE6FD" strokeWidth="1.5" />
        {/* Teeth */}
        <rect x="21" y="2" width="6" height="6" rx="1.5" fill="#38BDF8" />
        <rect x="21" y="40" width="6" height="6" rx="1.5" fill="#38BDF8" />
        <rect x="2" y="21" width="6" height="6" rx="1.5" fill="#38BDF8" />
        <rect x="40" y="21" width="6" height="6" rx="1.5" fill="#38BDF8" />
        <circle cx="24" cy="24" r="7" fill="#0F172A" />
      </g>
      {/* Smaller Gear */}
      <g transform="translate(66, 42)">
        <circle cx="14" cy="14" r="10" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="4" fill="#0F172A" />
      </g>
      {/* 24/7 SLA Badge */}
      <g transform="translate(18, 56)">
        <rect x="0" y="0" width="34" height="15" rx="4" fill="#6366F1" stroke="#C7D2FE" strokeWidth="1" />
        <text x="17" y="11" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">24/7 SLA</text>
      </g>
    </svg>
  );
}

function AutomationArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="at-cpu" x1="35" y1="20" x2="85" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="45" r="32" fill="#F43F5E" fillOpacity="0.18" />
      {/* CPU Silicon Chip */}
      <rect x="36" y="22" width="48" height="46" rx="8" fill="url(#at-cpu)" stroke="#FED7AA" strokeWidth="1.5" />
      <rect x="46" y="32" width="28" height="26" rx="4" fill="#0F172A" stroke="#F43F5E" strokeWidth="1.2" />
      {/* Inner AI Logo / Brain circuit */}
      <path d="M54 45a6 6 0 0112 0m-9-3a3 3 0 016 0" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="60" cy="48" r="2" fill="#F43F5E" />
      {/* Chip Pins Top/Bottom/Left/Right */}
      <line x1="44" y1="16" x2="44" y2="22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="16" x2="52" y2="22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="16" x2="60" y2="22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="16" x2="68" y2="22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="68" x2="44" y2="74" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="68" x2="52" y2="74" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="68" x2="60" y2="74" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="68" x2="68" y2="74" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
      {/* Floating AI Sparkles */}
      <circle cx="94" cy="24" r="2.5" fill="#38BDF8" />
      <circle cx="26" cy="62" r="2.5" fill="#CCFF00" />
    </svg>
  );
}

function AllServicesArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="as-all" x1="20" y1="15" x2="100" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#84CC16" />
          <stop offset="0.33" stopColor="#06B6D4" />
          <stop offset="0.66" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Ambient Spectrum Glow */}
      <circle cx="60" cy="45" r="32" fill="#84CC16" fillOpacity="0.16" />
      {/* 3x3 Isometric Service Matrix */}
      <rect x="28" y="20" width="16" height="14" rx="3.5" fill="#84CC16" stroke="#ECFCCB" strokeWidth="1" />
      <rect x="52" y="20" width="16" height="14" rx="3.5" fill="#06B6D4" stroke="#CFFAFE" strokeWidth="1" />
      <rect x="76" y="20" width="16" height="14" rx="3.5" fill="#3B82F6" stroke="#DBEAFE" strokeWidth="1" />

      <rect x="28" y="38" width="16" height="14" rx="3.5" fill="#8B5CF6" stroke="#EDE9FE" strokeWidth="1" />
      <rect x="52" y="38" width="16" height="14" rx="3.5" fill="#EC4899" stroke="#FCE7F3" strokeWidth="1" />
      <rect x="76" y="38" width="16" height="14" rx="3.5" fill="#F97316" stroke="#FFEDD5" strokeWidth="1" />

      <rect x="28" y="56" width="16" height="14" rx="3.5" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="1" />
      <rect x="52" y="56" width="16" height="14" rx="3.5" fill="#10B981" stroke="#D1FAE5" strokeWidth="1" />
      <rect x="76" y="56" width="16" height="14" rx="3.5" fill="#6366F1" stroke="#E0E7FF" strokeWidth="1" />

      {/* Orbit Ring */}
      <ellipse cx="60" cy="45" rx="46" ry="18" stroke="url(#as-all)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" transform="rotate(-15 60 45)" />
      <circle cx="98" cy="35" r="3" fill="#CCFF00" />
    </svg>
  );
}

function DashboardArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dsh-win" x1="12" y1="12" x2="108" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0284C7" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="dsh-area" x1="26" y1="36" x2="26" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#14B8A6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="dsh-bar" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      {/* Background Soft Glow */}
      <circle cx="60" cy="45" r="32" fill="#14B8A6" fillOpacity="0.16" />
      {/* Dashboard Window Frame */}
      <rect x="14" y="14" width="92" height="62" rx="10" fill="url(#dsh-win)" stroke="#2DD4BF" strokeWidth="1.5" />
      {/* Header Bar */}
      <rect x="14" y="14" width="92" height="13" rx="10" fill="#042F2E" fillOpacity="0.4" />
      <circle cx="22" cy="20.5" r="2.2" fill="#EF4444" />
      <circle cx="28" cy="20.5" r="2.2" fill="#F59E0B" />
      <circle cx="34" cy="20.5" r="2.2" fill="#10B981" />
      <rect x="42" y="18" width="30" height="5" rx="2.5" fill="#14B8A6" fillOpacity="0.4" />

      {/* Left KPI Mini Card */}
      <rect x="20" y="32" width="22" height="16" rx="4" fill="#115E59" fillOpacity="0.35" stroke="#2DD4BF" strokeWidth="0.8" />
      <line x1="24" y1="37" x2="36" y2="37" stroke="#5EEAD4" strokeWidth="1.8" strokeLinecap="round" />
      <text x="24" y="45" fill="#2DD4BF" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">+94%</text>

      {/* Middle KPI Mini Card */}
      <rect x="46" y="32" width="22" height="16" rx="4" fill="#0E7490" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="0.8" />
      <line x1="50" y1="37" x2="62" y2="37" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />
      <text x="50" y="45" fill="#38BDF8" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">$28K</text>

      {/* Right Circular Gauge */}
      <circle cx="86" cy="40" r="8" stroke="#134E4A" strokeWidth="2.5" />
      <circle cx="86" cy="40" r="8" stroke="#2DD4BF" strokeWidth="2.5" strokeDasharray="50.2" strokeDashoffset="14" strokeLinecap="round" />
      <circle cx="86" cy="40" r="2" fill="#5EEAD4" />

      {/* Area Chart with smooth spline */}
      <path
        d="M20 68 L20 61 C28 58, 36 64, 46 56 C56 48, 66 54, 76 50 C86 46, 92 52, 98 48 L98 68 Z"
        fill="url(#dsh-area)"
      />
      <path
        d="M20 61 C28 58, 36 64, 46 56 C56 48, 66 54, 76 50 C86 46, 92 52, 98 48"
        stroke="#2DD4BF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="76" cy="50" r="2.5" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1.5" />
      <circle cx="98" cy="48" r="2.5" fill="#2DD4BF" />

      {/* Floating Sparkle */}
      <circle cx="102" cy="22" r="2" fill="#5EEAD4" />
    </svg>
  );
}

function PluginArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full max-h-[72px] sm:max-h-[82px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plg-grad" x1="25" y1="20" x2="95" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D946EF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="plg-slot" x1="18" y1="24" x2="58" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A044E" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2E1065" stopOpacity="0.25" />
        </linearGradient>
        <filter id="plg-glow" x="40" y="20" width="60" height="58" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Background Glow */}
      <circle cx="60" cy="45" r="32" fill="#D946EF" fillOpacity="0.16" />

      {/* Base Platform / Core System Dock */}
      <rect x="18" y="22" width="42" height="46" rx="8" fill="url(#plg-slot)" stroke="#A21CAF" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="28" cy="32" r="3" fill="#F0ABFC" opacity="0.8" />
      <line x1="36" y1="32" x2="52" y2="32" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="28" y1="42" x2="48" y2="42" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="28" y1="52" x2="44" y2="52" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* Connecting Lightning / Energy stream */}
      <path d="M52 45 H64" stroke="#F472B6" strokeWidth="2" strokeDasharray="2 2" />

      {/* Modular Plugin Block (Puzzle / Extension Brick) */}
      <g filter="url(#plg-glow)">
        <path
          d="M62 26 C62 23 64 21 67 21 H89 C92 21 94 23 94 26 V37 C97 37 99 39 99 42 C99 45 97 47 94 47 V62 C94 65 92 67 89 67 H76 C76 70 74 72 71 72 C68 72 66 70 66 67 H67 C64 67 62 65 62 62 V51 C59 51 57 49 57 46 C57 43 59 41 62 41 Z"
          fill="url(#plg-grad)"
          stroke="#FDF4FF"
          strokeWidth="1.4"
        />
        {/* Plug connection symbol */}
        <path d="M73 40 L81 48 M81 40 L73 48" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="85" cy="34" r="1.5" fill="#FDE047" />
      </g>

      {/* Floating Badge */}
      <g transform="translate(84, 16)">
        <rect x="0" y="0" width="22" height="11" rx="3.5" fill="#701A75" stroke="#F472B6" strokeWidth="1" />
        <text x="11" y="8" fill="#FDF4FF" fontSize="6.5" fontWeight="800" textAnchor="middle">EXT</text>
      </g>
      <circle cx="20" cy="68" r="2" fill="#F472B6" />
    </svg>
  );
}

// ─── 14 Core Services Configuration ───────────────────────────────────────

const serviceCategories = [
  {
    id: 'webDev',
    defaultTitle: 'Web Dev',
    defaultFullTitle: 'Website Development',
    href: '/services-web',
    glowBg: 'bg-indigo-500',
    illustration: <WebDevArt />,
  },
  {
    id: 'ecommerce',
    defaultTitle: 'E-Commerce',
    defaultFullTitle: 'E-Commerce Solutions',
    href: '/services-ecommerce',
    glowBg: 'bg-amber-500',
    illustration: <ECommerceArt />,
  },
  {
    id: 'webApp',
    defaultTitle: 'Web App',
    defaultFullTitle: 'Custom Web Applications',
    href: '/services-web-app',
    glowBg: 'bg-cyan-500',
    illustration: <WebAppArt />,
  },
  {
    id: 'uiUx',
    defaultTitle: 'UI/UX Design',
    defaultFullTitle: 'UI/UX & Figma Design',
    href: '/services-design',
    glowBg: 'bg-purple-500',
    illustration: <UIUXArt />,
  },
  {
    id: 'seo',
    defaultTitle: 'SEO Growth',
    defaultFullTitle: 'SEO & Organic Growth',
    href: '/services-seo',
    glowBg: 'bg-lime-500',
    illustration: <SEOGrowthArt />,
  },
  {
    id: 'api',
    defaultTitle: 'API Integration',
    defaultFullTitle: 'APIs & Webhooks',
    href: '/services-api-integration',
    glowBg: 'bg-yellow-500',
    illustration: <APIIntegrationArt />,
  },
  {
    id: 'security',
    defaultTitle: 'Security',
    defaultFullTitle: 'Authentication & Security',
    href: '/services-security',
    glowBg: 'bg-sky-500',
    illustration: <SecurityArt />,
  },
  {
    id: 'payment',
    defaultTitle: 'Payment Gateway',
    defaultFullTitle: 'bKash, Nagad & Stripe',
    href: '/services-payment-gateway',
    glowBg: 'bg-pink-500',
    illustration: <PaymentGatewayArt />,
  },
  {
    id: 'database',
    defaultTitle: 'Database',
    defaultFullTitle: 'Database & Cloud Storage',
    href: '/services-database',
    glowBg: 'bg-violet-500',
    illustration: <DatabaseArt />,
  },
  {
    id: 'maintenance',
    defaultTitle: 'Maintenance',
    defaultFullTitle: 'Maintenance & 24/7 SLA',
    href: '/services-maintenance',
    glowBg: 'bg-blue-500',
    illustration: <MaintenanceArt />,
  },
  {
    id: 'automation',
    defaultTitle: 'Automation',
    defaultFullTitle: 'Business Automation & AI',
    href: '/services-automation',
    glowBg: 'bg-rose-500',
    illustration: <AutomationArt />,
  },
  {
    id: 'dashboard',
    defaultTitle: 'Dashboard',
    defaultFullTitle: 'Analytics & Admin Dashboards',
    href: '/services-dashboard',
    glowBg: 'bg-teal-500',
    illustration: <DashboardArt />,
  },
  {
    id: 'plugin',
    defaultTitle: 'Plugin Dev',
    defaultFullTitle: 'Custom Plugins & Extensions',
    href: '/services-plugin-development',
    glowBg: 'bg-fuchsia-500',
    illustration: <PluginArt />,
  },
  {
    id: 'allServices',
    defaultTitle: 'All Services',
    defaultFullTitle: 'Explore All Solutions',
    href: '/services',
    glowBg: 'bg-emerald-500',
    illustration: <AllServicesArt />,
  },
];

// ─── Individual Card Component ───────────────────────────────────────────

function ServiceCard({ item }) {
  const { t } = useTranslation();
  const title = t(`servicesPreview.${item.id}.title`, item.defaultTitle);
  const fullTitle = t(`servicesPreview.${item.id}.fullTitle`, item.defaultFullTitle);

  return (
    <Link
      href={item.href}
      title={fullTitle}
      className="group flex flex-col h-full bg-white dark:bg-[#0c1224] border border-zinc-200/90 dark:border-white/[0.08] rounded-2xl p-1.5 sm:p-2 lg:p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-violet-500/10 dark:hover:shadow-cyan-500/10 hover:border-violet-400 dark:hover:border-cyan-400/60 hover:-translate-y-1.5 transition-all duration-300 select-none cursor-pointer"
    >
      {/* Top Image / Illustration Box */}
      <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-b from-zinc-50 via-zinc-100/50 to-zinc-100/90 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-white/[0.015] border border-zinc-200/60 dark:border-white/[0.05] relative overflow-hidden flex items-center justify-center p-1 sm:p-1.5 lg:p-2 group-hover:scale-[1.03] transition-transform duration-300">
        {/* Subtle Ambient Radial Glow inside box */}
        <div
          className={`absolute inset-0 opacity-15 group-hover:opacity-35 transition-opacity duration-300 ${item.glowBg} blur-xl`}
        />
        {/* Render Vector Illustration */}
        <div className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-sm">
          {item.illustration}
        </div>
      </div>

      {/* Bottom Title Text */}
      <div className="mt-1.5 sm:mt-2 px-0.5 text-center flex items-center justify-center min-h-[22px] sm:min-h-[28px]">
        <span className="text-[10px] sm:text-xs md:text-[13px] font-bold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors font-exo-extralight truncate w-full">
          {title}
        </span>
      </div>
    </Link>
  );
}

// ─── Main Services Preview Carousel Component ─────────────────────────────

export default function ServicesPreview() {
  const { t } = useTranslation();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      dragFree: true,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-label={t('servicesPreview.ariaCore', 'Core Services')}
      className="w-full max-w-full relative py-3 sm:py-5 lg:py-6 px-3 sm:px-6 lg:px-8 overflow-hidden bg-transparent transition-colors duration-300"
    >
      {/* Ambient background soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl bg-violet-600"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl bg-cyan-500"
      />

      <div className="relative z-10 max-w-[1440px] w-full mx-auto">
        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-2 sm:-ml-2.5 lg:-ml-3">
              {serviceCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="pl-2 sm:pl-2.5 lg:pl-3 flex-[0_0_33.333333%] sm:flex-[0_0_25%] md:flex-[0_0_16.666667%] lg:flex-[0_0_12.5%] min-w-0"
                >
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Left Navigation Arrow — Hidden on Mobile, Shown on Desktop/Tablet */}
          <button
            onClick={scrollPrev}
            aria-label={t('servicesPreview.prev', 'Previous Services')}
            className="absolute -left-2 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 shadow-md hover:shadow-lg hidden md:flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Navigation Arrow — Hidden on Mobile, Shown on Desktop/Tablet */}
          <button
            onClick={scrollNext}
            aria-label={t('servicesPreview.next', 'Next Services')}
            className="absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 shadow-md hover:shadow-lg hidden md:flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Mobile Dot Indicators — Only visible on mobile devices (< 768px) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 pt-1">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={t('servicesPreview.goToSlide', `Go to slide ${index + 1}`, {
                index: index + 1,
              })}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? 'w-5 bg-gradient-to-r from-violet-600 to-cyan-400'
                  : 'w-1.5 bg-zinc-300 dark:bg-zinc-700/80 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
