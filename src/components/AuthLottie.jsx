"use client";

import React, { useState, useEffect } from "react";
import LottiePlayer from "./LottiePlayer";

/**
 * Unified Authentication Animation Component:
 * - login: Uses /animations/login.json via LottiePlayer
 * - register: Uses /animations/register.json via LottiePlayer
 * - verify-code: Uses /animations/otp.json via LottiePlayer
 * - forgot-password: Custom animated vector matching the user's reference image
 *   (stressed person with hands on head, ?? question marks, thought bubble *••, phone with X)
 * - reset-password: Custom animated vector (safe dial with turning master key & verified check)
 */
export default function AuthLottie({
  type = "login",
  size = "md",
  className = "",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dimensions based on size
  const containerClasses =
    size === "sm"
      ? "w-[150px] h-[150px]"
      : size === "lg"
      ? "w-[280px] h-[280px]"
      : "w-[220px] h-[220px] sm:w-[250px] sm:h-[250px]";

  // Background glow color based on page type
  const glowColor =
    type === "login"
      ? "bg-violet-500/20 dark:bg-violet-600/25"
      : type === "register"
      ? "bg-cyan-500/20 dark:bg-cyan-600/25"
      : type === "forgot-password"
      ? "bg-amber-500/20 dark:bg-amber-600/25"
      : type === "verify-code"
      ? "bg-emerald-500/20 dark:bg-emerald-600/25"
      : "bg-indigo-500/20 dark:bg-indigo-600/25";

  return (
    <div
      className={`relative flex items-center justify-center select-none ${containerClasses} ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Glow Aura */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl opacity-60 dark:opacity-40 pointer-events-none transition-all duration-700 ${glowColor}`}
      />

      {/* 1. LOGIN: Render /animations/login.json */}
      {type === "login" && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <LottiePlayer
            animationPath="/animations/login.json"
            loop={true}
            autoplay={true}
            className="w-full h-full drop-shadow-md"
          />
        </div>
      )}

      {/* 2. REGISTER: Render /animations/register.json */}
      {type === "register" && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <LottiePlayer
            animationPath="/animations/register.json"
            loop={true}
            autoplay={true}
            className="w-full h-full drop-shadow-md"
          />
        </div>
      )}

      {/* 3. VERIFY CODE / OTP: Render /animations/otp.json */}
      {type === "verify-code" && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <LottiePlayer
            animationPath="/animations/otp.json"
            loop={true}
            autoplay={true}
            className="w-full h-full drop-shadow-md"
          />
        </div>
      )}

      {/* 4. FORGOT PASSWORD: Custom Animated Vector matching user's image */}
      {type === "forgot-password" && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <ForgotPasswordIllustration mounted={mounted} />
        </div>
      )}

      {/* 5. RESET PASSWORD: New Password Fortification Animation */}
      {type === "reset-password" && (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <ResetPasswordIllustration mounted={mounted} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD ANIMATION
// Exactly matches the user's reference image:
// - Person with hands clutching temples/head in distress/frustration
// - Floating, oscillating question marks (??)
// - Thought bubble on top right with asterisk and dots (* • •)
// - Desk with smartphone showing an 'X' (locked/wrong password)
// ─────────────────────────────────────────────────────────────────────────────
function ForgotPasswordIllustration() {
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-full overflow-visible drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="thoughtShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
        </filter>
      </defs>

      <style>{`
        @keyframes sighBreathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(3.5px); }
        }
        @keyframes headPress {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.985); }
        }
        @keyframes floatQ1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-6deg); }
        }
        @keyframes floatQ2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(8deg); }
        }
        @keyframes floatThought {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.02); }
        }
        @keyframes spinAsterisk {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(45deg); }
        }
        @keyframes blinkDot1 {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes blinkDot2 {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes phoneCrossPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>

      {/* ── 1. DESK / TABLE SURFACE (Bottom) ── */}
      <polygon
        points="30,190 250,190 265,215 15,215"
        className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line
        x1="15"
        y1="215"
        x2="265"
        y2="215"
        className="stroke-zinc-900 dark:stroke-zinc-200"
        strokeWidth="2.5"
      />

      {/* ── 2. SMARTPHONE ON DESK WITH 'X' (Flat on table) ── */}
      <g id="phoneGroup">
        {/* Phone Body (3D angled rectangle on table) */}
        <polygon
          points="115,186 165,186 168,212 112,212"
          className="fill-zinc-100 dark:fill-zinc-950 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Phone Bezel Line */}
        <polygon
          points="119,189 161,189 164,208 116,208"
          className="fill-white dark:fill-zinc-900 stroke-zinc-400 dark:stroke-zinc-600"
          strokeWidth="1.2"
        />
        {/* Phone Home Bar */}
        <line
          x1="133"
          y1="206"
          x2="147"
          y2="206"
          className="stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* The 'X' Mark on the screen (Red in light, bright coral in dark) */}
        <g
          style={{
            animation: "phoneCrossPulse 2s ease-in-out infinite",
            transformOrigin: "140px 197px",
          }}
        >
          <line
            x1="133"
            y1="192"
            x2="147"
            y2="202"
            className="stroke-rose-600 dark:stroke-rose-400"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="147"
            y1="192"
            x2="133"
            y2="202"
            className="stroke-rose-600 dark:stroke-rose-400"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ── 3. CHARACTER GROUP (Body, Head, Hands clutching temples) ── */}
      <g
        id="characterBody"
        style={{
          animation: "sighBreathe 3.6s ease-in-out infinite",
          transformOrigin: "140px 200px",
        }}
      >
        {/* Torso / Shirt (Polka dot patterned sweater) */}
        <path
          d="M 85 190 L 72 165 C 68 150, 78 120, 115 106 L 140 108 L 165 106 C 202 120, 212 150, 208 165 L 195 190 Z"
          className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Polka Dots on Shirt (matching reference) */}
        <g className="fill-none stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.8">
          <circle cx="95" cy="155" r="5" />
          <circle cx="108" cy="176" r="5" />
          <circle cx="120" cy="145" r="5" />
          <circle cx="138" cy="168" r="5" />
          <circle cx="160" cy="148" r="5" />
          <circle cx="172" cy="175" r="5" />
          <circle cx="185" cy="155" r="5" />
        </g>

        {/* ── ARMS & HANDS ON HEAD (The iconic pose from image!) ── */}
        {/* Left Arm (viewer's left) curving up from desk to head */}
        <path
          d="M 68 188 C 65 150, 74 100, 112 85"
          className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Elbow Inseam */}
        <path
          d="M 88 188 C 86 160, 94 116, 120 95"
          className="stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.4"
          fill="none"
        />

        {/* Right Arm (viewer's right) curving up from desk to head */}
        <path
          d="M 212 188 C 215 150, 206 100, 168 85"
          className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Right Elbow Inseam */}
        <path
          d="M 192 188 C 194 160, 186 116, 160 95"
          className="stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.4"
          fill="none"
        />

        {/* ── HEAD & FACE ── */}
        <g
          id="headUnit"
          style={{
            animation: "headPress 3.6s ease-in-out infinite",
            transformOrigin: "140px 95px",
          }}
        >
          {/* Hair behind / top curly hair */}
          <path
            d="M 112 78 C 105 74, 102 62, 110 56 C 114 50, 125 50, 130 55 C 135 48, 148 48, 152 55 C 158 50, 168 52, 170 58 C 176 64, 172 74, 168 78 Z"
            className="fill-zinc-900 dark:fill-zinc-100 stroke-zinc-900 dark:stroke-zinc-100"
            strokeWidth="2"
          />

          {/* Ears */}
          <circle
            cx="106"
            cy="90"
            r="8"
            className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
          />
          <circle
            cx="174"
            cy="90"
            r="8"
            className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
          />

          {/* Face Base */}
          <path
            d="M 114 80 C 114 68, 166 68, 166 80 C 166 102, 155 120, 140 120 C 125 120, 114 102, 114 80 Z"
            className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.8"
          />

          {/* Hair Front Forehead locks */}
          <path
            d="M 124 66 C 128 72, 134 74, 140 70 C 146 74, 152 72, 156 66"
            className="stroke-zinc-900 dark:stroke-zinc-100"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Hands holding head / fingers on forehead (Matching reference!) */}
          {/* Left Hand Fingers */}
          <path
            d="M 114 84 C 114 74, 124 68, 130 68 C 132 72, 126 80, 122 84 Z"
            className="fill-white dark:fill-zinc-800 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
          />
          <path
            d="M 120 72 C 124 70, 136 70, 138 74"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
            fill="none"
          />
          {/* Right Hand Fingers */}
          <path
            d="M 166 84 C 166 74, 156 68, 150 68 C 148 72, 154 80, 158 84 Z"
            className="fill-white dark:fill-zinc-800 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
          />
          <path
            d="M 160 72 C 156 70, 144 70, 142 74"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
            fill="none"
          />

          {/* Forehead Distress Lines */}
          <path
            d="M 134 78 Q 140 81 146 78"
            className="stroke-zinc-600 dark:stroke-zinc-400"
            strokeWidth="1.8"
            fill="none"
          />

          {/* Nose */}
          <path
            d="M 138 88 L 140 98 L 144 98"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mouth (Troubled/stressed curve) */}
          <path
            d="M 135 108 Q 140 104 146 107"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Closed Eyes / Worry slits */}
          <line
            x1="126"
            y1="89"
            x2="133"
            y2="90"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="147"
            y1="90"
            x2="154"
            y2="89"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ── 4. QUESTION MARKS '? ?' (Floating on the left) ── */}
      {/* Big Question Mark */}
      <g
        style={{
          animation: "floatQ1 2.8s ease-in-out infinite",
          transformOrigin: "92px 50px",
        }}
      >
        <text
          x="84"
          y="56"
          className="fill-zinc-900 dark:fill-amber-400 text-3xl font-black font-sans select-none"
        >
          ?
        </text>
      </g>
      {/* Small Question Mark */}
      <g
        style={{
          animation: "floatQ2 3.4s ease-in-out infinite 0.4s",
          transformOrigin: "105px 44px",
        }}
      >
        <text
          x="100"
          y="48"
          className="fill-zinc-700 dark:fill-amber-300 text-xl font-extrabold font-sans select-none"
        >
          ?
        </text>
      </g>

      {/* ── 5. THOUGHT BUBBLE: '* • •' (Top Right matching reference!) ── */}
      <g
        id="thoughtBubble"
        filter="url(#thoughtShadow)"
        style={{
          animation: "floatThought 3.2s ease-in-out infinite",
          transformOrigin: "215px 50px",
        }}
      >
        {/* Bubble Box with pointer on bottom-left pointing to head */}
        <path
          d="M 180 34
             H 245
             C 250 34, 254 38, 254 43
             V 70
             C 254 75, 250 79, 245 79
             H 186
             L 178 89
             L 180 79
             C 176 79, 172 75, 172 70
             V 43
             C 172 38, 176 34, 180 34 Z"
          className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 1. Asterisk '*' (8-pointed star) */}
        <g
          transform="translate(192, 57)"
          style={{
            animation: "spinAsterisk 3s ease-in-out infinite",
            transformOrigin: "0px 0px",
          }}
        >
          <line x1="-8" y1="0" x2="8" y2="0" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="0" y1="-8" x2="0" y2="8" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-5.6" y1="5.6" x2="5.6" y2="-5.6" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* 2. Password Dot 1 '•' */}
        <circle
          cx="218"
          cy="57"
          r="4.8"
          className="fill-zinc-900 dark:fill-zinc-100"
          style={{ animation: "blinkDot1 1.6s ease-in-out infinite 0.2s" }}
        />

        {/* 3. Password Dot 2 '•' */}
        <circle
          cx="234"
          cy="57"
          r="4.8"
          className="fill-zinc-900 dark:fill-zinc-100"
          style={{ animation: "blinkDot2 1.6s ease-in-out infinite 0.4s" }}
        />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESET PASSWORD ANIMATION
// Stylish animated safe combination dial + master key turning into unlocked check
// ─────────────────────────────────────────────────────────────────────────────
function ResetPasswordIllustration() {
  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full h-full overflow-visible drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes dialSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes keyWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes safePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>

      {/* Outer Dial Glow */}
      <g
        style={{
          animation: "dialSpin 25s linear infinite",
          transformOrigin: "140px 115px",
        }}
      >
        <circle
          cx="140"
          cy="115"
          r="75"
          className="stroke-violet-400 dark:stroke-violet-600"
          strokeWidth="1.8"
          strokeDasharray="4 8"
          opacity="0.5"
        />
      </g>

      {/* Safe Body Wheel */}
      <g
        style={{
          animation: "safePulse 3.5s ease-in-out infinite",
          transformOrigin: "140px 115px",
        }}
      >
        <circle
          cx="140"
          cy="115"
          r="56"
          className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
          strokeWidth="3.2"
        />

        {/* Tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="140"
            y1="64"
            x2="140"
            y2="71"
            className="stroke-zinc-700 dark:stroke-zinc-300"
            strokeWidth="2.2"
            transform={`rotate(${deg} 140 115)`}
          />
        ))}

        {/* Center safe lock knob */}
        <circle
          cx="140"
          cy="115"
          r="32"
          className="fill-violet-100 dark:fill-violet-950 stroke-violet-600 dark:stroke-violet-400"
          strokeWidth="2.5"
        />

        {/* Golden Master Key in center */}
        <g
          style={{
            animation: "keyWiggle 2.8s ease-in-out infinite",
            transformOrigin: "140px 115px",
          }}
        >
          <circle
            cx="134"
            cy="115"
            r="8"
            className="fill-none stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2.8"
          />
          <line
            x1="142"
            y1="115"
            x2="156"
            y2="115"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <line
            x1="150"
            y1="115"
            x2="150"
            y2="120"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <line
            x1="155"
            y1="115"
            x2="155"
            y2="119"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Floating Status Pill: "NEW PASSWORD SET ✓" */}
      <g transform="translate(75, 188)" className="animate-pulse">
        <rect
          x="0"
          y="0"
          width="130"
          height="30"
          rx="10"
          className="fill-white dark:fill-zinc-900 stroke-emerald-500"
          strokeWidth="1.8"
        />
        <text
          x="12"
          y="19"
          className="fill-emerald-600 dark:fill-emerald-400 font-bold text-xs select-none"
        >
          •••••••• 100% OK
        </text>
      </g>
    </svg>
  );
}
