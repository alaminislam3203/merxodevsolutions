"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Mobile device mockup styled after Motorola Edge 50 Fusion
 * Aspect ratio: 20:9 (screen ~ 1080 x 2400)
 * Features curved edge aesthetic, ultra-slim bezels, punch-hole camera,
 * and automatic vertical back-and-forth scrolling for long page screenshots.
 */
export default function MobileAutoScrollMockup({
  src,
  alt = "Mobile Screen Preview",
  accent,
  index = 0,
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let animationFrameId;
    let direction = 1; // 1 = scroll down, -1 = scroll up
    let pauseTimer = null;
    let currentScroll = 0;
    const speed = 0.55; // Smooth realistic scroll speed in px per frame

    const checkScrollability = () => {
      const maxScroll = img.offsetHeight - container.offsetHeight;
      if (maxScroll > 15) {
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    };

    // Check after image loads
    if (img.complete) {
      checkScrollability();
    } else {
      img.onload = checkScrollability;
    }

    const scrollLoop = () => {
      if (!isPaused && container && img) {
        const maxScroll = img.offsetHeight - container.offsetHeight;
        if (maxScroll > 15) {
          currentScroll += direction * speed;

          // Reached bottom
          if (currentScroll >= maxScroll) {
            currentScroll = maxScroll;
            direction = -1;
            // Pause momentarily at the end
            pauseTimer = setTimeout(() => {
              animationFrameId = requestAnimationFrame(scrollLoop);
            }, 1200);
            return;
          }

          // Reached top
          if (currentScroll <= 0) {
            currentScroll = 0;
            direction = 1;
            // Pause momentarily at the top
            pauseTimer = setTimeout(() => {
              animationFrameId = requestAnimationFrame(scrollLoop);
            }, 1500);
            return;
          }

          container.scrollTop = currentScroll;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    // Stagger start of animation across the 4 phones
    const initialDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scrollLoop);
    }, index * 450);

    return () => {
      clearTimeout(initialDelay);
      if (pauseTimer) clearTimeout(pauseTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [src, isPaused, index]);

  if (!src) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Motorola Edge 50 Fusion Frame */}
      <div
        className="relative group w-full max-w-[240px] sm:max-w-[260px] md:max-w-[270px] aspect-[9/20] select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Outer Curved Edge & Metallic Frame Highlight */}
        <div
          className={`relative w-full h-full rounded-[2.5rem] sm:rounded-[2.8rem] p-[5px] sm:p-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_0_25px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.02] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 border border-white/10`}
        >
          {/* Edge Glow Subtle Reflex */}
          <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[2.8rem] pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5" />

          {/* Screen Chassis with 20:9 Curved Border */}
          <div className="relative w-full h-full rounded-[2.2rem] sm:rounded-[2.4rem] overflow-hidden bg-black flex flex-col">
            {/* Top Status Bar & Punch-Hole Camera */}
            <div className="absolute top-0 inset-x-0 h-7 z-20 flex items-center justify-between px-5 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
              {/* Clock */}
              <span className="text-[10px] font-semibold text-white/90 font-mono tracking-tight">
                12:45
              </span>

              {/* Centered Minimal Punch Hole Camera */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#050505] border border-white/15 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-950/80" />
              </div>

              {/* Battery & Network Icons */}
              <div className="flex items-center gap-1.5 opacity-80">
                <svg
                  className="w-2.5 h-2.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                </svg>
                <div className="w-3.5 h-1.5 rounded-xs border border-white flex items-center p-0.5">
                  <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div
              ref={containerRef}
              className="relative w-full h-full overflow-hidden no-scrollbar select-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-auto object-cover block"
                draggable={false}
              />
            </div>

            {/* Bottom Android Gesture Navigation Bar */}
            <div className="absolute bottom-0 inset-x-0 h-4 z-20 flex items-center justify-center pointer-events-none bg-gradient-to-t from-black/70 to-transparent">
              <div className="w-24 h-1 rounded-full bg-white/60 backdrop-blur-xs" />
            </div>
          </div>
        </div>

        {/* Ambient Glow underneath */}
        <div
          className={`absolute -inset-2 rounded-[3rem] -z-10 bg-gradient-to-b opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl ${
            accent?.gradient ? `bg-gradient-to-b ${accent.gradient}` : "from-indigo-500 to-purple-600"
          }`}
        />
      </div>

      {/* Screen label / indicator */}
      <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-display">
        Screen 0{index + 1}
      </span>
    </div>
  );
}
