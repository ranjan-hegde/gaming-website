"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * LoadingScreen — a 3-second cinematic intro. A giant letter "I" is drawn as an
 * outline; a gradient light streaks continuously around its border. When the
 * load finishes, the I zooms up to fill the screen and the overlay clears.
 */
export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<SVGTextElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReduced = useReducedMotion();

  const finish = () => {
    setIsComplete(true);
    document.body.removeAttribute('data-loading');
    window.dispatchEvent(new Event('loading-complete'));
  };

  useGSAP(() => {
    if (prefersReduced) {
      const id = setTimeout(finish, 300);
      return () => clearTimeout(id);
    }

    // Light streaking around the R's outline (loops for the whole load).
    const streak = gsap.to(litRef.current, {
      attr: { 'stroke-dashoffset': -1290 },
      duration: 1.3,
      ease: 'none',
      repeat: -1,
    });

    // Progress bar fills over ~2.4s.
    if (barRef.current) {
      gsap.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 2.4, ease: 'power1.inOut' });
    }

    const tl = gsap.timeline({
      onComplete: () => { streak.kill(); finish(); },
    });

    // Hold on the tracing animation, then the R zooms huge and the screen clears.
    tl.to(innerRef.current, {
      scale: 26,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.in',
      delay: 2.5,
    });

    return () => { streak.kill(); };
  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-deep)]"
      aria-hidden="true"
    >
      <div ref={innerRef} className="flex flex-col items-center will-change-transform">
        <svg viewBox="0 0 300 300" className="w-[42vmin] h-[42vmin]">
          <defs>
            <linearGradient id="r-streak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-pink)" />
              <stop offset="45%" stopColor="var(--accent-orange)" />
              <stop offset="75%" stopColor="var(--accent-gold)" />
              <stop offset="100%" stopColor="var(--accent-teal)" />
            </linearGradient>
          </defs>
          {/* Dim base outline */}
          <text
            x="150" y="158" textAnchor="middle" dominantBaseline="central"
            fontFamily="var(--font-bebas-neue), Impact, sans-serif" fontSize="300"
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2"
          >
            I
          </text>
          {/* Traveling gradient light */}
          <text
            ref={litRef}
            x="150" y="158" textAnchor="middle" dominantBaseline="central"
            fontFamily="var(--font-bebas-neue), Impact, sans-serif" fontSize="300"
            fill="none" stroke="url(#r-streak)" strokeWidth="3.5"
            strokeDasharray="95 1200" strokeDashoffset="0"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,94,160,0.6))' }}
          >
            I
          </text>
        </svg>

        {/* Progress bar */}
        <div className="mt-6 w-40 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-gold), var(--accent-teal))' }}
          />
        </div>
      </div>
    </div>
  );
}
