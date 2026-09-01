'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapTextProvider({ children }) {
  const pathname = usePathname();
  const cursorDotRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── 1. Interactive Cursor Glow / Spotlight Engine ──
    const cursorGlow = cursorGlowRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorGlow) {
        gsap.to(cursorGlow, {
          x: mouseX,
          y: mouseY,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── 2. GSAP Context for Route-Specific Animations ──
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger calculations
      ScrollTrigger.refresh();

      // (A) Hero Main Headings Entrance
      const mainHeadings = document.querySelectorAll('h1');
      if (mainHeadings.length > 0) {
        gsap.fromTo(
          mainHeadings,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform,scale',
          }
        );
      }

      // (B) Section Headings (h2, h3) Scroll-Triggered Reveal
      const sectionHeadings = document.querySelectorAll('h2, h3');
      sectionHeadings.forEach((heading) => {
        if (heading.closest('.no-gsap') || heading.closest('h1')) return;

        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // (C) Staggered Card Grid Reveal on Scroll
      const cardGrids = document.querySelectorAll('.grid, ol.grid, ul.space-y-4');
      cardGrids.forEach((grid) => {
        if (grid.closest('.no-gsap') || grid.closest('nav') || grid.closest('footer')) return;

        const items = grid.children;
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 35,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform,scale',
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // (D) Interactive 3D Card Tilt Physics on Mouse Hover
      const tiltCards = document.querySelectorAll('.card-hover-lift, article, .dual-slide');
      tiltCards.forEach((card) => {
        const onCardMove = (e) => {
          const rect = card.getBoundingClientRect();
          const cardX = e.clientX - rect.left - rect.width / 2;
          const cardY = e.clientY - rect.top - rect.height / 2;

          const rotateX = (-cardY / rect.height) * 10;
          const rotateY = (cardX / rect.width) * 10;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 900,
            duration: 0.35,
            ease: 'power1.out',
          });
        };

        const onCardLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
            clearProps: 'rotateX,rotateY,transformPerspective',
          });
        };

        card.addEventListener('mousemove', onCardMove);
        card.addEventListener('mouseleave', onCardLeave);
      });

      // (E) Interactive Magnetic Physics on Buttons & CTAs
      const magneticButtons = document.querySelectorAll(
        'a[href*="/contact"], a[href*="/our-projects"], a[href*="/services"], button.cursor-pointer, .cta-btn'
      );
      magneticButtons.forEach((btn) => {
        if (btn.closest('nav') || btn.closest('footer')) return;

        const onBtnMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const btnX = e.clientX - rect.left - rect.width / 2;
          const btnY = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: btnX * 0.28,
            y: btnY * 0.28,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const onBtnLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)',
            clearProps: 'x,y',
          });
        };

        btn.addEventListener('mousemove', onBtnMove);
        btn.addEventListener('mouseleave', onBtnLeave);
      });

      // (F) Subtle Parallax Background Auras
      const ambientAuras = document.querySelectorAll('.animate-pulse-glow, [class*="radial-gradient"]');
      ambientAuras.forEach((aura) => {
        gsap.to(aura, {
          y: '+=25',
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <>
      {/* Interactive Cursor Ambient Spotlight (Desktop Only) */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="pointer-events-none fixed -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-25 blur-3xl z-40 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(6,182,212,0.18) 45%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      {children}
    </>
  );
}
