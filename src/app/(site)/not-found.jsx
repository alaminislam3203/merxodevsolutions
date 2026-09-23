'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleMouse = e => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 px-6">
      {/* Background Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
        }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full opacity-30 animate-bounce"
          style={{
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            background: i % 2 === 0 ? '#7c3aed' : '#f59e0b',
            top: `${15 + i * 12}%`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        {/* 404 Illustration */}
        <div
          className="relative select-none"
          style={{
            transform: `translate(${position.x * 0.3}px, ${position.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Big 404 */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-display text-[100px] sm:text-[150px] md:text-[180px] font-extrabold leading-none text-zinc-100 dark:text-zinc-800 select-none">
              4
            </span>

            {/* Broken Circle SVG */}
            <div className="relative flex items-center justify-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] animate-spin"
                style={{ animationDuration: '12s' }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="6"
                  strokeDasharray="80 240"
                  strokeLinecap="round"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#grad2)"
                  strokeWidth="6"
                  strokeDasharray="40 280"
                  strokeLinecap="round"
                  strokeDashoffset="120"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient
                    id="grad2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#iconGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-[50px] sm:h-[50px]"
                >
                  <defs>
                    <linearGradient
                      id="iconGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                </svg>
              </div>
            </div>

            <span className="font-display text-[100px] sm:text-[150px] md:text-[180px] font-extrabold leading-none text-zinc-100 dark:text-zinc-800 select-none">
              4
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3 -mt-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest font-raleway">
              Page Not Found
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-widest">
            Oops! Lost in{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Space
            </span>
          </h1>

          <p className="max-w-md text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 font-raleway"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg> */}
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors font-raleway"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Bottom hint */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 font-raleway">
          Need help?{' '}
          <Link href="/contact" className="text-violet-500 hover:underline">
            Reach out to us
          </Link>{' '}
          and we'll assist you.
        </p>
      </div>
    </div>
  );
}
