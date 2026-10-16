'use client';

/**
 * ToolIllustration
 * Vector illustration component for each developer tool inspired by
 * the user's reference image (vibrant blue central badge, bold outline elements,
 * floating keys, locks, shields, and code blocks).
 */
export default function ToolIllustration({ id }) {
  const strokeColor = '#0f172a'; // Bold outline stroke
  const strokeW = '2.4';

  switch (id) {
    case 'jwt-decoder':
      // Matches the exact uploaded image reference (Key + Blue Card + Shield + Lock + Code)
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          {/* Subtle ambient aura */}
          <circle cx="100" cy="65" r="52" fill="#3b82f6" fillOpacity="0.08" />

          {/* Top floating code card */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="88" y="10" width="46" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M103 20 L97 24 L103 28" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M119 20 L125 24 L119 28" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="113" y1="18" x2="109" y2="30" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Central Blue Card */}
          <rect x="70" y="44" width="62" height="46" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Keyhole/Token handle inside blue card */}
          <rect x="80" y="60" width="28" height="14" rx="7" fill="none" stroke="#ffffff" strokeWidth="2.8" />
          <line x1="88" y1="67" x2="88" y2="76" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />

          {/* Floating Blue Shield with Checkmark */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M114 36 C124 36, 131 43, 131 52 C131 64, 122 72, 114 77 C106 72, 97 64, 97 52 C97 43, 104 36, 114 36 Z"
              fill="#3b82f6"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <path d="M107 52 L112 57 L122 47" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Floating Padlock on right */}
          <g className="transition-transform duration-300 group-hover:translate-x-1">
            {/* Shackle */}
            <path d="M140 68 V58 C140 52, 156 52, 156 58 V68" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none" />
            {/* Body */}
            <rect x="131" y="68" width="34" height="32" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            {/* Keyhole */}
            <circle cx="148" cy="81" r="3.2" fill="#2563eb" />
            <path d="M148 83 V89" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Large tilted Key on left */}
          <g transform="translate(18, 42) rotate(-35)" className="transition-transform duration-300 group-hover:-rotate-40">
            {/* Head circle */}
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="20" cy="20" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            {/* Stem */}
            <rect x="34" y="16" width="36" height="8" rx="2" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            {/* Teeth */}
            <path d="M58 24 V32 H66 V24" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} strokeLinejoin="round" />
            <path d="M48 24 V29 H54 V24" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} strokeLinejoin="round" />
          </g>
        </svg>
      );

    case 'bangladesh-geojson':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#10b981" fillOpacity="0.08" />

          {/* Top floating flag badge */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="86" y="10" width="50" height="26" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="111" cy="23" r="6.5" fill="#ef4444" />
          </g>

          {/* Central Blue/Green Card with Map Pin */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#059669" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Compass / polygon lines */}
          <path d="M82 68 L100 54 L118 68 L100 82 Z" fill="none" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="68" r="4" fill="#ffffff" />

          {/* Floating Map Pin on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M142 42 C134 42, 128 48, 128 56 C128 66, 142 80, 142 80 C142 80, 156 66, 156 56 C156 48, 150 42, 142 42 Z"
              fill="#2563eb"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <circle cx="142" cy="54" r="4.5" fill="#ffffff" />
          </g>

          {/* Floating Polygon Map card on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="22" y="56" width="38" height="38" rx="10" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M30 68 L42 62 L52 74 L40 84 Z" fill="#d1fae5" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="42" cy="62" r="2.5" fill="#059669" />
          </g>
        </svg>
      );

    case 'hash-generator':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#3b82f6" fillOpacity="0.08" />

          {/* Top card: Hash symbol */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="88" y="10" width="46" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M102 18 L100 30 M114 18 L112 30 M97 22 H118 M95 26 H116" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Central Blue Card */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Keyhole inside */}
          <circle cx="100" cy="64" r="5" fill="#ffffff" />
          <path d="M98 67 L96 76 H104 L102 67 Z" fill="#ffffff" />

          {/* Floating Shield */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M120 38 C130 38, 137 44, 137 53 C137 65, 128 73, 120 78 C112 73, 103 65, 103 53 C103 44, 110 38, 120 38 Z"
              fill="#3b82f6"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <path d="M113 53 L118 58 L128 48" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Floating Padlock on right */}
          <g className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M142 66 V56 C142 50, 158 50, 158 56 V66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none" />
            <rect x="133" y="66" width="34" height="32" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="150" cy="80" r="3.2" fill="#2563eb" />
          </g>

          {/* Floating Key on left */}
          <g transform="translate(18, 44) rotate(-35)" className="transition-transform duration-300 group-hover:-rotate-40">
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="20" cy="20" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <rect x="34" y="16" width="34" height="8" rx="2" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M56 24 V31 H62 V24" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
          </g>
        </svg>
      );

    case 'base64':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#06b6d4" fillOpacity="0.08" />

          {/* Top card: A -> 64 */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="84" y="10" width="52" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="110" y="29" fontSize="12" fontWeight="bold" fill="#0f172a" textAnchor="middle" fontFamily="monospace">A ⇄ 64</text>
          </g>

          {/* Central Blue Card */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#0284c7" stroke={strokeColor} strokeWidth={strokeW} />
          {/* File symbol */}
          <rect x="88" y="55" width="24" height="26" rx="4" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="93" y1="62" x2="107" y2="62" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="93" y1="68" x2="107" y2="68" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="93" y1="74" x2="103" y2="74" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />

          {/* Floating Binary document on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="52" width="36" height="42" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="42" y="68" fontSize="9" fontWeight="bold" fill="#0284c7" textAnchor="middle" fontFamily="monospace">0101</text>
            <text x="42" y="82" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle" fontFamily="monospace">1010</text>
          </g>

          {/* Floating Padlock on right */}
          <g className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M144 66 V56 C144 50, 160 50, 160 56 V66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none" />
            <rect x="135" y="66" width="34" height="32" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="152" cy="80" r="3.2" fill="#0284c7" />
          </g>
        </svg>
      );

    case 'url-encoder':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#3b82f6" fillOpacity="0.08" />

          {/* Top card: URL Query */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="80" y="10" width="58" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="109" y="28" fontSize="11" fontWeight="bold" fill="#2563eb" textAnchor="middle" fontFamily="monospace">?q=%20</text>
          </g>

          {/* Central Blue Card with Link chain */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          <path d="M88 72 L94 66 C98 62, 104 62, 108 66" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M112 60 L106 66 C102 70, 96 70, 92 66" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          {/* Floating Globe on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <circle cx="148" cy="74" r="18" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <ellipse cx="148" cy="74" rx="9" ry="18" stroke={strokeColor} strokeWidth="1.8" />
            <line x1="130" y1="74" x2="166" y2="74" stroke={strokeColor} strokeWidth="1.8" />
          </g>

          {/* Floating Lock on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M36 64 V56 C36 50, 48 50, 48 56 V64" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none" />
            <rect x="28" y="64" width="28" height="26" rx="6" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="42" cy="76" r="2.5" fill="#2563eb" />
          </g>
        </svg>
      );

    case 'uuid-generator':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#f59e0b" fillOpacity="0.08" />

          {/* Top card: v4 badge */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="88" y="10" width="46" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="111" y="29" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle" fontFamily="monospace">UUID</text>
          </g>

          {/* Central Blue/Amber Card */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#d97706" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Microchip grid */}
          <rect x="86" y="56" width="28" height="24" rx="5" fill="#ffffff" />
          <circle cx="94" cy="64" r="2" fill="#d97706" />
          <circle cx="106" cy="64" r="2" fill="#d97706" />
          <circle cx="94" cy="72" r="2" fill="#d97706" />
          <circle cx="106" cy="72" r="2" fill="#d97706" />

          {/* Floating Dice / Random Cube on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <rect x="132" y="58" width="34" height="34" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="141" cy="67" r="2.5" fill="#d97706" />
            <circle cx="149" cy="75" r="2.5" fill="#d97706" />
            <circle cx="157" cy="83" r="2.5" fill="#d97706" />
          </g>

          {/* Floating Key on left */}
          <g transform="translate(18, 44) rotate(-35)" className="transition-transform duration-300 group-hover:-rotate-40">
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="20" cy="20" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <rect x="34" y="16" width="34" height="8" rx="2" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M56 24 V31 H62 V24" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
          </g>
        </svg>
      );

    case 'css-shadow':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#8b5cf6" fillOpacity="0.08" />

          {/* Top card: Box-shadow code */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="80" y="10" width="58" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="109" y="28" fontSize="10" fontWeight="bold" fill="#7c3aed" textAnchor="middle" fontFamily="monospace">shadow-2xl</text>
          </g>

          {/* Central Violet Card with 3D stacked shadow */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#7c3aed" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Shadow layer visual */}
          <rect x="80" y="58" width="40" height="26" rx="6" fill="#4c1d95" opacity="0.4" />
          <rect x="76" y="54" width="40" height="26" rx="6" fill="#ffffff" stroke="#ffffff" strokeWidth="1" />

          {/* Floating 3D Cube / Layers on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <rect x="134" y="60" width="34" height="34" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <path d="M142 74 L151 70 L160 74 L151 78 Z" fill="#c4b5fd" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M142 79 L151 75 L160 79 L151 83 Z" fill="#8b5cf6" stroke={strokeColor} strokeWidth="1.5" />
          </g>

          {/* Floating Sliders control card on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="54" width="36" height="38" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <line x1="32" y1="64" x2="52" y2="64" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <circle cx="44" cy="64" r="3.5" fill="#7c3aed" />
            <line x1="32" y1="78" x2="52" y2="78" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
            <circle cx="38" cy="78" r="3.5" fill="#7c3aed" />
          </g>
        </svg>
      );

    case 'gradient-generator':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#ec4899" fillOpacity="0.08" />

          {/* Top card: Gradient CSS */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="80" y="10" width="58" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="109" y="28" fontSize="10" fontWeight="bold" fill="#db2777" textAnchor="middle" fontFamily="monospace">linear-grad</text>
          </g>

          {/* Central Gradient Card */}
          <defs>
            <linearGradient id="toolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="68" y="44" width="64" height="48" rx="14" fill="url(#toolGrad)" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Swatch circle */}
          <circle cx="100" cy="68" r="10" fill="#ffffff" stroke="#ffffff" strokeWidth="2" />

          {/* Floating Color Dropper / Swatch on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <rect x="134" y="60" width="34" height="34" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="145" cy="71" r="5" fill="#06b6d4" />
            <circle cx="157" cy="71" r="5" fill="#ec4899" />
            <circle cx="151" cy="81" r="5" fill="#8b5cf6" />
          </g>

          {/* Floating Sliders card on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="54" width="36" height="38" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="36" cy="66" r="4" fill="#ec4899" />
            <circle cx="48" cy="78" r="4" fill="#06b6d4" />
          </g>
        </svg>
      );

    case 'regex-tester':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#3b82f6" fillOpacity="0.08" />

          {/* Top card: Regex pattern */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="80" y="10" width="58" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="109" y="28" fontSize="11" fontWeight="bold" fill="#2563eb" textAnchor="middle" fontFamily="monospace">/^[a-z]+$/</text>
          </g>

          {/* Central Blue Card with Magnifying Glass */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          <circle cx="97" cy="66" r="8" fill="none" stroke="#ffffff" strokeWidth="2.8" />
          <line x1="103" y1="72" x2="111" y2="80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          {/* Floating Shield with Checkmark */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M124 38 C134 38, 141 44, 141 53 C141 65, 132 73, 124 78 C116 73, 107 65, 107 53 C107 44, 114 38, 124 38 Z"
              fill="#3b82f6"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <path d="M117 53 L122 58 L132 48" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Floating Match card on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="54" width="36" height="38" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="42" y="73" fontSize="12" fontWeight="bold" fill="#059669" textAnchor="middle" fontFamily="monospace">.*</text>
            <path d="M34 81 H50" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'meta-previewer':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#0ea5e9" fillOpacity="0.08" />

          {/* Top card: Meta tag */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="80" y="10" width="58" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="109" y="28" fontSize="10" fontWeight="bold" fill="#0284c7" textAnchor="middle" fontFamily="monospace">&lt;meta og&gt;</text>
          </g>

          {/* Central Blue Card with Browser Window */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#0284c7" stroke={strokeColor} strokeWidth={strokeW} />
          {/* Browser header */}
          <rect x="74" y="52" width="52" height="34" rx="4" fill="#ffffff" />
          <circle cx="80" cy="57" r="1.5" fill="#ef4444" />
          <circle cx="85" cy="57" r="1.5" fill="#f59e0b" />
          <circle cx="90" cy="57" r="1.5" fill="#10b981" />
          <rect x="80" y="63" width="40" height="18" rx="2" fill="#e0f2fe" />

          {/* Floating Share / Social node on right */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <rect x="134" y="60" width="34" height="34" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="144" cy="72" r="3" fill="#0284c7" />
            <circle cx="158" cy="66" r="3" fill="#0284c7" />
            <circle cx="158" cy="84" r="3" fill="#0284c7" />
            <line x1="144" y1="72" x2="158" y2="66" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="144" y1="72" x2="158" y2="84" stroke={strokeColor} strokeWidth="1.5" />
          </g>

          {/* Floating Globe on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <circle cx="42" cy="74" r="16" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <ellipse cx="42" cy="74" rx="8" ry="16" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="26" y1="74" x2="58" y2="74" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'http-status':
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#10b981" fillOpacity="0.08" />

          {/* Top card: 200 OK */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="84" y="10" width="52" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="110" y="28" fontSize="11" fontWeight="bold" fill="#059669" textAnchor="middle" fontFamily="monospace">200 OK</text>
          </g>

          {/* Central Blue Card with Lightning Bolt */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          <path d="M102 54 L92 68 H102 L98 82 L110 66 H100 L104 54 Z" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Floating Shield with Checkmark */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M124 38 C134 38, 141 44, 141 53 C141 65, 132 73, 124 78 C116 73, 107 65, 107 53 C107 44, 114 38, 124 38 Z"
              fill="#10b981"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <path d="M117 53 L122 58 L132 48" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Floating Server Card on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="54" width="36" height="38" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <rect x="29" y="60" width="26" height="7" rx="2" fill="#e2e8f0" />
            <circle cx="50" cy="63.5" r="1.5" fill="#10b981" />
            <rect x="29" y="70" width="26" height="7" rx="2" fill="#e2e8f0" />
            <circle cx="50" cy="73.5" r="1.5" fill="#10b981" />
            <rect x="29" y="80" width="26" height="7" rx="2" fill="#e2e8f0" />
            <circle cx="50" cy="83.5" r="1.5" fill="#f59e0b" />
          </g>
        </svg>
      );

    case 'json-formatter':
    default:
      return (
        <svg viewBox="0 0 200 130" className="w-full h-full max-h-36 select-none" fill="none">
          <circle cx="100" cy="65" r="52" fill="#3b82f6" fillOpacity="0.08" />

          {/* Top card: Code symbol */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="88" y="10" width="46" height="28" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <text x="111" y="28" fontSize="12" fontWeight="bold" fill="#64748b" textAnchor="middle" fontFamily="monospace">{'{ }'}</text>
          </g>

          {/* Central Blue Card with Curly Brackets */}
          <rect x="68" y="44" width="64" height="48" rx="14" fill="#2563eb" stroke={strokeColor} strokeWidth={strokeW} />
          <text x="100" y="76" fontSize="26" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="monospace">{'{ }'}</text>

          {/* Floating Shield with Checkmark */}
          <g className="transition-transform duration-300 group-hover:scale-105">
            <path
              d="M124 38 C134 38, 141 44, 141 53 C141 65, 132 73, 124 78 C116 73, 107 65, 107 53 C107 44, 114 38, 124 38 Z"
              fill="#3b82f6"
              stroke={strokeColor}
              strokeWidth={strokeW}
            />
            <path d="M117 53 L122 58 L132 48" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Floating Document on left */}
          <g className="transition-transform duration-300 group-hover:-translate-x-1">
            <rect x="24" y="52" width="36" height="42" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <line x1="30" y1="62" x2="48" y2="62" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="68" x2="52" y2="68" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="34" y1="74" x2="50" y2="74" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="30" y1="82" x2="44" y2="82" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Floating Padlock on right */}
          <g className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M144 66 V56 C144 50, 160 50, 160 56 V66" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" fill="none" />
            <rect x="135" y="66" width="34" height="32" rx="8" fill="#ffffff" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="152" cy="80" r="3.2" fill="#2563eb" />
          </g>
        </svg>
      );
  }
}
