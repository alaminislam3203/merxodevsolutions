'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapTextProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Do NOT run global GSAP DOM mutations on account, auth, admin, or review pages to prevent hydration mismatches
    if (
      !pathname ||
      pathname.startsWith('/account') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/709832') ||
      pathname.startsWith('/write-review') ||
      pathname.startsWith('/forgot-password') ||
      pathname.startsWith('/forget-password') ||
      pathname.startsWith('/verify-code') ||
      pathname.startsWith('/reset-password')
    ) {
      return;
    }

    // Refresh ScrollTrigger on route change
    const ctx = gsap.context(() => {
      // 1. Animate Hero/Page Main Headings on Page Load
      const mainHeadings = Array.from(document.querySelectorAll('h1')).filter(
        (el) => !el.closest('.no-gsap') && !el.closest('form') && !el.closest('nav')
      );
      if (mainHeadings.length > 0) {
        gsap.fromTo(
          mainHeadings,
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform,scale,translate,rotate',
          }
        );
      }

      // 2. Animate Section Headings (h2, h3) with ScrollTrigger
      const sectionHeadings = document.querySelectorAll('h2, h3');
      sectionHeadings.forEach((heading) => {
        // Avoid re-animating if already processed or inside excluded containers
        if (
          heading.closest('.no-gsap') ||
          heading.closest('form') ||
          heading.closest('nav')
        ) {
          return;
        }

        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'transform,scale,translate,rotate',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 3. Animate Section Lead Paragraphs & Badges
      const badgesAndSubtexts = document.querySelectorAll(
        'span.inline-flex, span.inline-block, section p'
      );
      badgesAndSubtexts.forEach((el) => {
        if (
          el.closest('nav') ||
          el.closest('.no-gsap') ||
          el.closest('footer') ||
          el.closest('form')
        ) {
          return;
        }

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform,scale,translate,rotate',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 4. Subtle Interactive Hover Physics on Interactive Headings & Links
      const interactiveTitles = document.querySelectorAll(
        '.group h2, .group h3, a h2, a h3, h2.font-display'
      );
      interactiveTitles.forEach((title) => {
        if (title.closest('.no-gsap') || title.closest('form')) return;

        const handleMouseEnter = () => {
          gsap.to(title, {
            letterSpacing: '0.03em',
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        const handleMouseLeave = () => {
          gsap.to(title, {
            letterSpacing: 'normal',
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        title.addEventListener('mouseenter', handleMouseEnter);
        title.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    // Refresh ScrollTrigger calculations after initial DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
