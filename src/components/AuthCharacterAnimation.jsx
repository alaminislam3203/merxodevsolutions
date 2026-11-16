"use client";

import React from "react";

/**
 * High-quality vector animated character matching the user's reference illustration:
 * A stylish modern professional standing with a briefcase, hand on chin in thought,
 * looking up at a floating speech bubble with animated typing dots (...) and
 * themed icons for each authentication page (Login, Register, Forgot Password, Verify Code, Reset Password).
 *
 * Designed to sit right in the central divider between the Left narrative panel and Right form panel.
 */
export default function AuthCharacterAnimation({
  type = "login",
  size = "md",
  className = "",
}) {
  // Height sizing
  const containerClasses =
    size === "sm"
      ? "w-[140px] h-[260px]"
      : size === "lg"
      ? "w-[200px] h-[380px]"
      : "w-[170px] h-[330px]";

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${containerClasses} ${className}`}
      aria-hidden="true"
    >
      {/* Background Ambient Aura */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl opacity-40 dark:opacity-30 pointer-events-none transition-all duration-700 ${
          type === "login"
            ? "bg-violet-500/25"
            : type === "register"
            ? "bg-cyan-500/25"
            : type === "forgot-password"
            ? "bg-amber-500/25"
            : type === "verify-code"
            ? "bg-emerald-500/25"
            : "bg-indigo-500/25"
        }`}
      />

      <svg
        viewBox="0 0 200 360"
        className="w-full h-full overflow-visible drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="charGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="bubbleGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          <linearGradient id="bubbleGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Shadows */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        <style>{`
          @keyframes charBreathe {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes bubbleBob {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-6px) scale(1.02); }
          }
          @keyframes dotBounce1 {
            0%, 100% { transform: translateY(0); opacity: 0.35; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes dotBounce2 {
            0%, 100% { transform: translateY(0); opacity: 0.35; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes dotBounce3 {
            0%, 100% { transform: translateY(0); opacity: 0.35; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes subtleWiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1.5deg); }
          }
          @keyframes pulseBadge {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes orbitRing {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {/* ── Floor Shadow ── */}
        <ellipse
          cx="100"
          cy="342"
          rx="52"
          ry="6"
          className="fill-zinc-300/60 dark:fill-black/50"
        />

        {/* ── Animated Character Group ── */}
        <g style={{ animation: "charBreathe 4s ease-in-out infinite", transformOrigin: "100px 340px" }}>
          
          {/* 1. LEGS & PANTS (Light pants with crisp dark border) */}
          {/* Left Leg (viewer's left) */}
          <path
            d="M 88 195 L 85 305 L 100 305 L 101 195 Z"
            className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Right Leg (viewer's right) */}
          <path
            d="M 103 195 L 104 305 L 119 305 L 115 195 Z"
            className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Crotch Inseam */}
          <line
            x1="101.5"
            y1="195"
            x2="102"
            y2="215"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.5"
          />

          {/* Ankle lines */}
          <line x1="85" y1="305" x2="100" y2="305" className="stroke-zinc-900 dark:stroke-zinc-200" strokeWidth="3" />
          <line x1="104" y1="305" x2="119" y2="305" className="stroke-zinc-900 dark:stroke-zinc-200" strokeWidth="3" />

          {/* Ankles (Skin) */}
          <rect x="89" y="305" width="7" height="8" className="fill-zinc-200 dark:fill-zinc-400 stroke-zinc-900 dark:stroke-zinc-200" strokeWidth="1.5" />
          <rect x="108" y="305" width="7" height="8" className="fill-zinc-200 dark:fill-zinc-400 stroke-zinc-900 dark:stroke-zinc-200" strokeWidth="1.5" />

          {/* 2. SHOES (Dark clean silhouette) */}
          {/* Left Shoe */}
          <path
            d="M 82 318 C 82 314, 88 313, 92 313 L 99 313 C 103 313, 107 315, 108 319 C 108 324, 103 325, 96 325 L 85 325 C 82 325, 82 322, 82 318 Z"
            className="fill-zinc-900 dark:fill-violet-950 stroke-zinc-900 dark:stroke-violet-400"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left Shoe Sole */}
          <line x1="82" y1="324" x2="108" y2="324" className="stroke-zinc-600 dark:stroke-zinc-300" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Shoe */}
          <path
            d="M 104 318 C 104 314, 110 313, 114 313 L 122 313 C 127 313, 131 315, 132 319 C 132 324, 127 325, 120 325 L 107 325 C 104 325, 104 322, 104 318 Z"
            className="fill-zinc-900 dark:fill-violet-950 stroke-zinc-900 dark:stroke-violet-400"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right Shoe Sole */}
          <line x1="104" y1="324" x2="132" y2="324" className="stroke-zinc-600 dark:stroke-zinc-300" strokeWidth="2.5" strokeLinecap="round" />

          {/* 3. TORSO / SWEATER (Dark navy/black modern sweatshirt) */}
          <path
            d="M 86 138 C 76 142, 73 155, 73 168 L 75 198 C 85 204, 115 205, 128 198 L 130 166 C 130 152, 126 142, 116 138 Z"
            className="fill-zinc-900 dark:fill-[#0c1322] stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Sweater hem bottom curve */}
          <path
            d="M 75 198 C 85 204, 115 205, 128 198"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3.2"
          />

          {/* 4. LEFT ARM & BRIEFCASE (Holding bag straight down) */}
          {/* Left Sleeve / Upper Arm */}
          <path
            d="M 75 142 L 70 178 L 81 180 L 83 146 Z"
            className="fill-zinc-900 dark:fill-[#0c1322] stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Left Hand gripping handle */}
          <circle
            cx="75"
            cy="198"
            r="4.5"
            className="fill-white dark:fill-zinc-300 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.5"
          />

          {/* ── Briefcase (Matching the reference image!) ── */}
          <g
            id="briefcase"
            style={{ animation: "subtleWiggle 4s ease-in-out infinite", transformOrigin: "75px 198px" }}
          >
            {/* Handle */}
            <path
              d="M 70 197 C 70 193, 80 193, 80 197"
              className="stroke-zinc-900 dark:stroke-zinc-200"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Briefcase Body */}
            <rect
              x="57"
              y="201"
              width="36"
              height="25"
              rx="4"
              className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
              strokeWidth="3"
            />
            {/* Middle divider line */}
            <line
              x1="57"
              y1="213"
              x2="93"
              y2="213"
              className="stroke-zinc-900 dark:stroke-zinc-200"
              strokeWidth="2.2"
            />
            {/* Clasp / Buckle */}
            <rect
              x="71"
              y="210"
              width="8"
              height="6"
              rx="1.5"
              className="fill-zinc-900 dark:fill-violet-400 stroke-zinc-900 dark:stroke-zinc-200"
              strokeWidth="1.8"
            />
          </g>

          {/* 5. RIGHT ARM (Raised in thought, hand touching chin) */}
          {/* Upper Arm angled up */}
          <path
            d="M 124 142 L 144 158 L 138 168 L 118 152 Z"
            className="fill-zinc-900 dark:fill-[#0c1322] stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Forearm angled up to chin */}
          <path
            d="M 144 158 L 126 122 L 119 125 L 138 168 Z"
            className="fill-zinc-900 dark:fill-[#0c1322] stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Hand touching chin (Index finger pointing at cheek) */}
          <path
            d="M 120 125 C 118 120, 122 114, 124 112 C 126 114, 128 118, 126 123 Z"
            className="fill-white dark:fill-zinc-300 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Thumb / knuckles */}
          <circle
            cx="122"
            cy="125"
            r="4"
            className="fill-white dark:fill-zinc-300 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.4"
          />

          {/* 6. NECK & HEAD */}
          {/* Neck */}
          <path
            d="M 98 136 L 98 122 L 108 122 L 108 136 Z"
            className="fill-white dark:fill-zinc-300 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.5"
          />

          {/* Head & Face (Profile / 3-quarter view looking up at the speech bubble) */}
          <path
            d="M 100 120 C 97 116, 96 106, 99 98 C 102 91, 109 88, 116 90 C 122 92, 125 98, 124 105 C 123 112, 120 118, 114 121 C 108 123, 102 122, 100 120 Z"
            className="fill-white dark:fill-zinc-300 stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="3"
          />

          {/* Ear */}
          <path
            d="M 103 105 C 101 104, 101 108, 104 109"
            className="stroke-zinc-900 dark:stroke-zinc-200"
            strokeWidth="2.2"
            fill="none"
          />

          {/* Eye looking upward */}
          <circle cx="114" cy="101" r="1.8" className="fill-zinc-900 dark:fill-zinc-900" />

          {/* Eyebrow raised in wonder / thought */}
          <path
            d="M 111 96 C 113 95, 116 95, 118 97"
            className="stroke-zinc-900 dark:stroke-zinc-900"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />

          {/* 7. HAIR (Stylish dark silhouette matching reference) */}
          <path
            d="M 98 102 C 94 99, 94 92, 98 87 C 102 81, 111 78, 118 80 C 123 81, 126 84, 125 88 C 123 88, 120 86, 116 86 C 111 86, 105 89, 103 94 C 102 97, 103 99, 101 102 Z"
            className="fill-zinc-900 dark:fill-zinc-100 stroke-zinc-900 dark:stroke-zinc-100"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Top hair tuft */}
          <path
            d="M 115 80 C 116 77, 121 78, 123 81"
            className="stroke-zinc-900 dark:stroke-zinc-100"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* ── 8. FLOATING SPEECH BUBBLE (Above Head with Animated Dots & Icons) ── */}
        <g
          id="speechBubble"
          style={{ animation: "bubbleBob 3.5s ease-in-out infinite", transformOrigin: "90px 48px" }}
        >
          {/* Thought Bubble Rounded Rect with downward pointer */}
          <g filter="url(#softShadow)">
            <path
              d="M 52 14 
                 H 128 
                 C 134 14, 138 18, 138 24 
                 V 54 
                 C 138 60, 134 64, 128 64 
                 H 104 
                 L 112 76 
                 L 96 64 
                 H 52 
                 C 46 64, 42 60, 42 54 
                 V 24 
                 C 42 18, 46 14, 52 14 Z"
              className="fill-white dark:fill-zinc-900 stroke-zinc-900 dark:stroke-zinc-200"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </g>

          {/* Page-Specific Content Inside Bubble */}
          {type === "login" && (
            <g>
              {/* 3 Animated Typing Dots */}
              <circle
                cx="66"
                cy="39"
                r="4.2"
                className="fill-violet-600 dark:fill-violet-400"
                style={{ animation: "dotBounce1 1.4s ease-in-out infinite 0s" }}
              />
              <circle
                cx="82"
                cy="39"
                r="4.2"
                className="fill-indigo-600 dark:fill-indigo-400"
                style={{ animation: "dotBounce2 1.4s ease-in-out infinite 0.25s" }}
              />
              <circle
                cx="98"
                cy="39"
                r="4.2"
                className="fill-cyan-500 dark:fill-cyan-400"
                style={{ animation: "dotBounce3 1.4s ease-in-out infinite 0.5s" }}
              />
              {/* Mini Padlock Icon inside bubble */}
              <g transform="translate(112, 30)" className="animate-pulse">
                <rect x="2" y="7" width="12" height="10" rx="2" className="fill-violet-600 dark:fill-violet-400" />
                <path d="M 5 7 V 4 C 5 2.5, 11 2.5, 11 4 V 7" stroke="#8b5cf6" strokeWidth="2" fill="none" />
                <circle cx="8" cy="12" r="1.2" fill="white" />
              </g>
            </g>
          )}

          {type === "register" && (
            <g>
              {/* Rocket launch / stars inside speech bubble */}
              <circle
                cx="64"
                cy="39"
                r="3.8"
                className="fill-cyan-500 dark:fill-cyan-400"
                style={{ animation: "dotBounce1 1.4s ease-in-out infinite 0s" }}
              />
              <circle
                cx="78"
                cy="39"
                r="3.8"
                className="fill-fuchsia-500 dark:fill-fuchsia-400"
                style={{ animation: "dotBounce2 1.4s ease-in-out infinite 0.25s" }}
              />
              {/* Rocket Icon */}
              <g transform="translate(94, 26)" className="animate-bounce">
                <path
                  d="M 12 2 C 7 5, 5 12, 5 18 L 19 18 C 19 12, 17 5, 12 2 Z"
                  className="fill-cyan-500 dark:fill-cyan-400"
                />
                <circle cx="12" cy="10" r="2.2" fill="white" />
                <path d="M 4 16 L 1 20 L 6 19 Z" fill="#ec4899" />
                <path d="M 20 16 L 23 20 L 18 19 Z" fill="#ec4899" />
                <path d="M 9 18 L 12 24 L 15 18 Z" fill="#f59e0b" />
              </g>
            </g>
          )}

          {type === "forgot-password" && (
            <g>
              {/* Question mark & dots */}
              <circle
                cx="62"
                cy="39"
                r="4"
                className="fill-amber-500 dark:fill-amber-400"
                style={{ animation: "dotBounce1 1.4s ease-in-out infinite 0s" }}
              />
              <circle
                cx="76"
                cy="39"
                r="4"
                className="fill-orange-500 dark:fill-orange-400"
                style={{ animation: "dotBounce2 1.4s ease-in-out infinite 0.25s" }}
              />
              <circle
                cx="90"
                cy="39"
                r="4"
                className="fill-amber-600 dark:fill-amber-300"
                style={{ animation: "dotBounce3 1.4s ease-in-out infinite 0.5s" }}
              />
              {/* Question mark "?" */}
              <text
                x="108"
                y="45"
                className="fill-amber-500 dark:fill-amber-400 font-extrabold text-lg select-none"
                style={{ animation: "pulseBadge 1.8s ease-in-out infinite" }}
              >
                ?
              </text>
            </g>
          )}

          {type === "verify-code" && (
            <g>
              {/* 6 OTP Cells Representation */}
              <g transform="translate(52, 28)">
                <rect x="0" y="0" width="11" height="15" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-500" strokeWidth="1.5" />
                <circle cx="5.5" cy="7.5" r="2" className="fill-emerald-600 dark:fill-emerald-400 animate-ping" />
                
                <rect x="15" y="0" width="11" height="15" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-500" strokeWidth="1.5" />
                <circle cx="20.5" cy="7.5" r="2" className="fill-emerald-600 dark:fill-emerald-400" />
                
                <rect x="30" y="0" width="11" height="15" rx="3" className="fill-emerald-100 dark:fill-emerald-950 stroke-emerald-500" strokeWidth="1.5" />
                <circle cx="35.5" cy="7.5" r="2" className="fill-emerald-600 dark:fill-emerald-400" />

                <g transform="translate(48, -2)" className="animate-pulse">
                  <circle cx="12" cy="10" r="10" className="fill-emerald-500" />
                  <path d="M 8 10 L 11 13 L 16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              </g>
            </g>
          )}

          {type === "reset-password" && (
            <g>
              {/* Key Turning into Checked Shield */}
              <circle
                cx="62"
                cy="39"
                r="3.5"
                className="fill-cyan-500 dark:fill-cyan-400"
                style={{ animation: "dotBounce1 1.4s ease-in-out infinite 0s" }}
              />
              <circle
                cx="74"
                cy="39"
                r="3.5"
                className="fill-indigo-500 dark:fill-indigo-400"
                style={{ animation: "dotBounce2 1.4s ease-in-out infinite 0.25s" }}
              />
              {/* Golden Key */}
              <g transform="translate(88, 27)" className="animate-pulse">
                <circle cx="8" cy="8" r="5" stroke="#38bdf8" strokeWidth="2.2" fill="none" />
                <line x1="12" y1="10" x2="24" y2="10" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="20" y1="10" x2="20" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="10" x2="24" y2="14" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
