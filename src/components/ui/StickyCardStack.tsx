"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StickyCardStackProps {
  children: React.ReactNode[];
  className?: string;
  topOffset?: number;
  stackGap?: number;
}

export function StickyCardStack({
  children,
  className = '',
  topOffset = 80,
  stackGap = 40,
}: StickyCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 768px)').matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    
    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useGSAP(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current) return;
    
    const cards = cardRefs.current.filter(Boolean);
    
    // Create ScrollTriggers to scale down previous cards and darken them
    // as the next card in the stack overlaps them.
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        ScrollTrigger.create({
          trigger: cards[i + 1],
          start: 'top bottom', // Start when the next card hits the bottom of the viewport
          end: 'top top',    // End when the next card hits the top of the viewport
          scrub: true,
          onUpdate: (self) => {
            if (!card) return;
            // Update the current card scale and brightness smoothly based on scroll progress
            gsap.set(card, {
              scale: 1 - (self.progress * 0.05),
              filter: `brightness(${1 - self.progress * 0.2})`,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef, dependencies: [isMobile, prefersReducedMotion] });

  if (isMobile) {
    // Fallback for mobile: standard vertical scrolling flex column
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {children.map((child, index) => (
          <div key={index} className="w-full">
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      // Overall container provides scroll space equal to the number of cards
    >
      {children.map((child, index) => (
        <div key={index} className="w-full relative min-h-[100vh]">
          <div
            ref={(el) => {
               if (el) {
                  cardRefs.current[index] = el;
               }
            }}
            className="sticky w-full origin-top"
            style={{
              top: `${topOffset + index * stackGap}px`,
              zIndex: index + 1,
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
