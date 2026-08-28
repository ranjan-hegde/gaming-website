"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  /** If true, skip the zoom-out at the end (useful for the last section) */
  noZoomOut?: boolean;
  /** If true, skip the zoom-in at the start (useful for the first section) */
  noZoomIn?: boolean;
}

/**
 * Wraps a section with scroll-driven zoom in/out transitions.
 * 
 * As you scroll INTO this section: it scales from 0.88 → 1, opacity 0 → 1
 * As you scroll OUT of this section: it scales from 1 → 0.88, opacity 1 → 0
 * 
 * This creates a cinematic "camera pull" effect between sections.
 */
export function ZoomSection({ children, className = '', noZoomOut = false, noZoomIn = false }: ZoomSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !innerRef.current) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current;

    // Zoom IN: scale up and fade in as section enters viewport
    if (!noZoomIn) {
      gsap.fromTo(inner,
        { scale: 0.88, opacity: 0, filter: 'blur(8px)' },
        {
          scale: 1, opacity: 1, filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    }

    // Zoom OUT: scale down and fade out as section exits viewport
    if (!noZoomOut) {
      gsap.fromTo(inner,
        { scale: 1, opacity: 1, filter: 'blur(0px)' },
        {
          scale: 0.88, opacity: 0, filter: 'blur(8px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: wrapper,
            start: 'bottom 80%',
            end: 'bottom 10%',
            scrub: 1,
          }
        }
      );
    }

  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div ref={innerRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
