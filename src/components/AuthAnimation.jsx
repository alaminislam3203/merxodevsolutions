"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * High-performance, GPU-accelerated Lottie-style vector animation component
 * specifically tailored for authentication pages:
 * - login: Cyber Security Padlock & Biometric Shield
 * - register: Rocket Launch & Digital ID Identity
 * - forgot-password: Mailbox Radar & Flying Recovery Key
 * - verify-code: 2FA Hexagonal Shield & 6-Digit OTP Ring
 * - reset-password: Safe Dial Lock & Key Fortification
 */
export default function AuthAnimation({ type = "login", size = "md", className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dimensions =
    size === "sm"
      ? "w-28 h-28 sm:w-32 sm:h-32"
      : size === "lg"
      ? "w-72 h-56 sm:w-80 sm:h-64"
      : "w-full max-w-[340px] h-[210px] sm:h-[230px]";

  return (
    <div
      className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic Ambient Glow Backdrop */}
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl opacity-60 dark:opacity-40 transition-all duration-700 pointer-events-none ${
          type === "login"
            ? "bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-cyan-400/30"
            : type === "register"
            ? "bg-gradient-to-tr from-cyan-500/30 via-fuchsia-500/20 to-violet-600/30"
            : type === "forgot-password"
            ? "bg-gradient-to-tr from-amber-500/30 via-orange-500/20 to-violet-600/30"
            : type === "verify-code"
            ? "bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-indigo-600/30"
            : "bg-gradient-to-tr from-cyan-500/30 via-violet-600/20 to-emerald-500/30"
        }`}
      />

      {/* Glass Card Container */}
      <div className="relative z-10 w-full h-full rounded-2xl sm:rounded-3xl border border-violet-200/60 dark:border-violet-800/40 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg shadow-violet-500/5 dark:shadow-black/40 overflow-hidden flex items-center justify-center p-3 sm:p-5">
        {/* Subtle holographic grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

        {/* Animation Content by Page Type */}
        {type === "login" && <LoginAnimation mounted={mounted} />}
        {type === "register" && <RegisterAnimation mounted={mounted} />}
        {type === "forgot-password" && <ForgotPasswordAnimation mounted={mounted} />}
        {type === "verify-code" && <VerifyCodeAnimation mounted={mounted} />}
        {type === "reset-password" && <ResetPasswordAnimation mounted={mounted} />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. LOGIN ANIMATION: Cyber Padlock + Biometric Waves + Orbiting Key
// ─────────────────────────────────────────────────────────────────────────────
function LoginAnimation({ mounted }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full max-w-[300px] overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="loginGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="loginShackle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="loginGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Rotating Radar Dashed Ring */}
      <g className="origin-center animate-[spin_20s_linear_infinite]">
        <circle
          cx="160"
          cy="110"
          r="86"
          stroke="url(#loginGrad1)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.35"
        />
      </g>

      {/* Reverse Counter-Rotating Outer Ring with Nodes */}
      <g className="origin-center animate-[spin_28s_linear_infinite_reverse]">
        <circle
          cx="160"
          cy="110"
          r="72"
          stroke="#06b6d4"
          strokeWidth="1"
          strokeDasharray="3 14"
          opacity="0.45"
        />
        <circle cx="232" cy="110" r="3.5" fill="#06b6d4" />
        <circle cx="88" cy="110" r="3.5" fill="#8b5cf6" />
        <circle cx="160" cy="38" r="3.5" fill="#38bdf8" />
      </g>

      {/* Orbiting Satellite Security Particle */}
      <g className="origin-center animate-[spin_10s_linear_infinite]">
        <circle cx="160" cy="22" r="5" fill="#38bdf8" filter="url(#loginGlow)" />
        <circle cx="160" cy="22" r="2" fill="#ffffff" />
      </g>

      {/* Floating Padlock Body & Shackle */}
      <g className="origin-center animate-[bounce_4s_ease-in-out_infinite]">
        {/* Shackle (Metal U loop) */}
        <path
          d="M136 94 V 74 C 136 60, 184 60, 184 74 V 94"
          stroke="url(#loginShackle)"
          strokeWidth="8"
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Lock Body Shield/Box */}
        <rect
          x="122"
          y="92"
          width="76"
          height="62"
          rx="18"
          fill="url(#loginGrad1)"
          filter="url(#loginGlow)"
          opacity="0.95"
        />

        {/* Glossy inner bevel */}
        <rect
          x="126"
          y="96"
          width="68"
          height="54"
          rx="14"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.35"
        />

        {/* Keyhole / Biometric Scanner Eye */}
        <circle cx="160" cy="118" r="7" fill="#091124" />
        <path
          d="M157 122 L 155 136 H 165 L 163 122 Z"
          fill="#091124"
        />
        <circle cx="160" cy="118" r="3" fill="#38bdf8" className="animate-pulse" />
      </g>

      {/* Left Float Badge: 2FA Shield */}
      <g className="animate-[pulse_3s_ease-in-out_infinite]">
        <rect
          x="30"
          y="65"
          width="72"
          height="32"
          rx="10"
          fill="#0e1726"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M44 81 C44 76, 50 74, 52 74 C54 74, 60 76, 60 81 C60 86, 52 89, 52 89 C52 89, 44 86, 44 81 Z"
          fill="#8b5cf6"
        />
        <text x="66" y="85" fill="#e2e8f0" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          2FA
        </text>
      </g>

      {/* Right Float Badge: SSL SECURE */}
      <g className="animate-[pulse_3.5s_ease-in-out_infinite_0.5s]">
        <rect
          x="218"
          y="125"
          width="82"
          height="32"
          rx="10"
          fill="#0e1726"
          stroke="#06b6d4"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <circle cx="232" cy="141" r="4" fill="#10b981" className="animate-ping" opacity="0.75" />
        <circle cx="232" cy="141" r="3" fill="#10b981" />
        <text x="242" y="145" fill="#38bdf8" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          SSL ON
        </text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. REGISTER ANIMATION: Rocket Launch + Account Passport + Constellation
// ─────────────────────────────────────────────────────────────────────────────
function RegisterAnimation({ mounted }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full max-w-[300px] overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="regGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <filter id="regGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Orbital Journey Path Dashes */}
      <path
        d="M 40 180 Q 110 50, 260 40"
        stroke="url(#regGrad)"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.4"
      />

      {/* Floating Twinkling Stars */}
      <g className="animate-pulse">
        <polygon points="60,40 62,45 67,46 63,49 64,54 60,51 56,54 57,49 53,46 58,45" fill="#facc15" />
        <polygon points="270,140 271,143 275,144 272,146 273,150 270,148 267,150 268,146 265,144 269,143" fill="#38bdf8" />
        <polygon points="90,140 91,143 95,144 92,146 93,150 90,148 87,150 88,146 85,144 89,143" fill="#ec4899" />
      </g>

      {/* Center Stage: Futuristic Rocket / Journey Shuttle */}
      <g className="origin-center animate-[bounce_3.5s_ease-in-out_infinite]">
        {/* Thrust Flame */}
        <ellipse cx="140" cy="154" rx="9" ry="24" fill="#f97316" filter="url(#regGlow)" />
        <ellipse cx="140" cy="150" rx="5" ry="16" fill="#facc15" />

        {/* Left / Right Fins */}
        <path d="M 124 135 L 110 152 L 126 148 Z" fill="#8b5cf6" />
        <path d="M 156 135 L 170 152 L 154 148 Z" fill="#ec4899" />

        {/* Rocket Fuselage */}
        <path
          d="M 140 60 C 122 84, 122 135, 124 144 H 156 C 158 135, 158 84, 140 60 Z"
          fill="url(#rocketBody)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Porthole Window with Glowing Avatar */}
        <circle cx="140" cy="98" r="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
        <circle cx="140" cy="96" r="4.5" fill="#38bdf8" />
        <path d="M 133 108 C 133 104, 147 104, 147 108 Z" fill="#38bdf8" />
      </g>

      {/* Floating Account Badge: "NEW MEMBER" */}
      <g className="animate-[pulse_3s_ease-in-out_infinite]">
        <rect
          x="195"
          y="68"
          width="98"
          height="34"
          rx="12"
          fill="#0e1726"
          stroke="#ec4899"
          strokeWidth="1.5"
          opacity="0.92"
        />
        <circle cx="210" cy="85" r="5" fill="#ec4899" />
        <text x="222" y="89" fill="#f1f5f9" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          SIGN UP ✓
        </text>
      </g>

      {/* Left Float Badge: "PORTAL ACCESS" */}
      <g className="animate-[pulse_4s_ease-in-out_infinite_1s]">
        <rect
          x="28"
          y="105"
          width="82"
          height="32"
          rx="10"
          fill="#0e1726"
          stroke="#06b6d4"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="38" y="125" fill="#38bdf8" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          ⚡ 100% OWN
        </text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FORGOT PASSWORD ANIMATION: Flying Mail Radar + Recovery Envelope
// ─────────────────────────────────────────────────────────────────────────────
function ForgotPasswordAnimation({ mounted }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full max-w-[300px] overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="forgotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <filter id="forgotGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Pulsing Radar Ring Waves */}
      <circle cx="160" cy="110" r="78" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" className="animate-[spin_24s_linear_infinite]" />
      <circle cx="160" cy="110" r="62" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" className="animate-[spin_16s_linear_infinite_reverse]" />

      {/* Floating Flying Envelope */}
      <g className="origin-center animate-[bounce_3.8s_ease-in-out_infinite]">
        {/* Shadow */}
        <ellipse cx="160" cy="165" rx="42" ry="7" fill="#000000" opacity="0.2" />

        {/* Envelope Base */}
        <rect
          x="118"
          y="82"
          width="84"
          height="60"
          rx="12"
          fill="url(#envelopeGrad)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          filter="url(#forgotGlow)"
        />

        {/* Fold lines */}
        <path d="M 120 85 L 160 118 L 200 85" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 120 140 L 148 112" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M 200 140 L 172 112" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* Center Golden Key Escaping from Envelope */}
        <g className="animate-pulse">
          <circle cx="160" cy="110" r="9" fill="url(#forgotGrad)" />
          <circle cx="160" cy="110" r="4" fill="#ffffff" />
          <path d="M 160 119 V 132 H 165 M 160 126 H 164" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Upper-right Badge: "CODE DISPATCH" */}
      <g className="animate-[pulse_3s_ease-in-out_infinite]">
        <rect
          x="208"
          y="48"
          width="88"
          height="32"
          rx="10"
          fill="#0e1726"
          stroke="#f59e0b"
          strokeWidth="1.5"
          opacity="0.92"
        />
        <text x="218" y="68" fill="#fbbf24" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          ✉ SEND OTP
        </text>
      </g>

      {/* Lower-left Badge: "INBOX + SPAM" */}
      <g className="animate-[pulse_4s_ease-in-out_infinite_0.8s]">
        <rect
          x="28"
          y="132"
          width="90"
          height="32"
          rx="10"
          fill="#0e1726"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="38" y="152" fill="#c084fc" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          🛡 EMAIL LINK
        </text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. VERIFY CODE ANIMATION: 2FA Hexagon + 6 OTP Cells + Checkmark Pulse
// ─────────────────────────────────────────────────────────────────────────────
function VerifyCodeAnimation({ mounted }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full max-w-[300px] overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="verifyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="verifyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rotating Hex Shield Ring */}
      <circle
        cx="160"
        cy="105"
        r="75"
        stroke="url(#verifyGrad)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        opacity="0.4"
        className="animate-[spin_20s_linear_infinite]"
      />

      {/* Center 2FA Security Shield */}
      <g className="origin-center animate-[bounce_4s_ease-in-out_infinite]">
        <path
          d="M 160 52 L 195 68 V 110 C 195 132, 160 148, 160 148 C 160 148, 125 132, 125 110 V 68 Z"
          fill="url(#verifyGrad)"
          filter="url(#verifyGlow)"
          opacity="0.9"
        />
        <path
          d="M 160 56 L 190 71 V 109 C 190 128, 160 142, 160 142 C 160 142, 130 128, 130 109 V 71 Z"
          fill="#091124"
        />

        {/* Big Pulsing Green Checkmark */}
        <path
          d="M 146 102 L 156 112 L 176 90"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
      </g>

      {/* 6 OTP Digit Box Strip at Bottom */}
      <g transform="translate(65, 165)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${i * 32}, 0)`}>
            <rect
              x="0"
              y="0"
              width="26"
              height="30"
              rx="6"
              fill="#091124"
              stroke={i < 4 ? "#10b981" : "#06b6d4"}
              strokeWidth="1.5"
            />
            {i < 4 ? (
              <circle cx="13" cy="15" r="3.5" fill="#10b981" className="animate-pulse" />
            ) : (
              <line x1="8" y1="22" x2="18" y2="22" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            )}
          </g>
        ))}
      </g>

      {/* Top Left Float Badge: "6-DIGIT OTP" */}
      <g className="animate-[pulse_3.2s_ease-in-out_infinite]">
        <rect
          x="28"
          y="48"
          width="82"
          height="30"
          rx="10"
          fill="#0e1726"
          stroke="#10b981"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="36" y="67" fill="#34d399" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          ✓ 6 DIGITS
        </text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. RESET PASSWORD ANIMATION: Safe Combination Lock + Fortified Password Key
// ─────────────────────────────────────────────────────────────────────────────
function ResetPasswordAnimation({ mounted }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full max-w-[300px] overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="resetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="resetGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Safe Dial Outer Notches */}
      <g className="origin-center animate-[spin_30s_linear_infinite]">
        <circle cx="160" cy="105" r="76" stroke="url(#resetGrad)" strokeWidth="2" strokeDasharray="4 8" opacity="0.4" />
      </g>

      {/* Center Safe Dial Wheel */}
      <g className="origin-center animate-[bounce_4s_ease-in-out_infinite]">
        {/* Outer Wheel */}
        <circle cx="160" cy="105" r="54" fill="#091124" stroke="url(#resetGrad)" strokeWidth="3" filter="url(#resetGlow)" />

        {/* Dial Ticks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="160"
            y1="56"
            x2="160"
            y2="63"
            stroke="#38bdf8"
            strokeWidth="2"
            transform={`rotate(${deg} 160 105)`}
          />
        ))}

        {/* Center Knob with Lock / Key Icon */}
        <circle cx="160" cy="105" r="30" fill="url(#resetGrad)" opacity="0.9" />
        <circle cx="160" cy="105" r="26" fill="#091124" />

        {/* Golden Master Key in the Center */}
        <path
          d="M 160 92 C 154 92, 150 96, 150 102 C 150 106, 153 110, 157 111 V 122 H 163 V 118 H 167 V 114 H 163 V 111 C 167 110, 170 106, 170 102 C 170 96, 166 92, 160 92 Z M 160 98 C 162 98, 164 100, 164 102 C 164 104, 162 106, 160 106 C 158 106, 156 104, 156 102 C 156 100, 158 98, 160 98 Z"
          fill="#38bdf8"
          className="animate-pulse"
        />
      </g>

      {/* Floating Password Pill: "•••••••• (STRONG)" */}
      <g transform="translate(90, 172)" className="animate-[pulse_2.8s_ease-in-out_infinite]">
        <rect
          x="0"
          y="0"
          width="140"
          height="32"
          rx="10"
          fill="#091124"
          stroke="#10b981"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <text x="14" y="21" fill="#10b981" fontSize="14" fontWeight="800" letterSpacing="3">
          ••••••••
        </text>
        <text x="88" y="20" fill="#34d399" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
          100% OK
        </text>
      </g>

      {/* Upper-right Badge: "BCRYPT HASH" */}
      <g className="animate-[pulse_3.5s_ease-in-out_infinite]">
        <rect
          x="218"
          y="45"
          width="82"
          height="30"
          rx="10"
          fill="#0e1726"
          stroke="#06b6d4"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="228" y="64" fill="#38bdf8" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          🔒 BCRYPT
        </text>
      </g>
    </svg>
  );
}
