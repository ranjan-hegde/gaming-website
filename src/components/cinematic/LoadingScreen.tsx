"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * LoadingScreen — A clean, minimal, cinematic loading experience
 * inspired by GTA VI. Features horizontal converging lines and a screen split.
 */
export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced) {
      setTimeout(() => {
        setIsComplete(true);
        document.body.removeAttribute('data-loading');
        window.dispatchEvent(new Event('loading-complete'));
      }, 300);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.removeAttribute('data-loading');
        window.dispatchEvent(new Event('loading-complete'));
      }
    });

    // 1. (0-0.8s) Wait a moment, then lines converge
    tl.to([leftLineRef.current, rightLineRef.current], {
      scaleX: 1,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.2
    });

    // 2. (1.0-1.2s) Flash of light/glow in the center
    tl.to([leftLineRef.current, rightLineRef.current], {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 20px rgba(255,255,255,0.8)',
      duration: 0.2,
      ease: 'power2.in'
    }, 1.0);

    // 3. (1.2-1.8s) Screen splits open
    tl.to(topHalfRef.current, {
      y: '-100%',
      duration: 0.7,
      ease: 'power3.inOut'
    }, 1.2);
    
    tl.to(bottomHalfRef.current, {
      y: '100%',
      duration: 0.7,
      ease: 'power3.inOut'
    }, 1.2);

    // Clean up container
    tl.set(containerRef.current, { display: 'none' }, 1.9);

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
      aria-hidden="true"
    >
      {/* Top Half */}
      <div 
        ref={topHalfRef}
        className="w-full h-1/2 bg-[var(--bg-deep)] origin-top border-b border-white/5 relative"
      >
        <div 
          ref={leftLineRef}
          className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[var(--accent-gold)] origin-left scale-x-0"
        />
      </div>

      {/* Bottom Half */}
      <div 
        ref={bottomHalfRef}
        className="w-full h-1/2 bg-[var(--bg-deep)] origin-bottom relative"
      >
        <div 
          ref={rightLineRef}
          className="absolute top-0 right-0 w-1/2 h-[2px] bg-[var(--accent-teal)] origin-right scale-x-0"
        />
      </div>
    </div>
  );
}
