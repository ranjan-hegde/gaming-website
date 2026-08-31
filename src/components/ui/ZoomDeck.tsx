"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ZoomDeckProps {
  /** Each entry becomes a full-screen "card" stacked in the same viewport slot. */
  panels: React.ReactNode[];
  className?: string;
  /**
   * How many viewport-heights of scroll each panel gets. Higher = you scroll
   * more per section, so the zoom transitions play out slower and read better.
   */
  screensPerPanel?: number;
}

/**
 * ZoomDeck — Cinematic "camera deck" scroll.
 *
 * Every panel occupies the SAME pinned viewport region (absolute, stacked).
 * A single scroll-scrubbed timeline swaps them IN PLACE:
 *   - the active panel zooms OUT + fades away (recedes into the distance)
 *   - the next panel zooms IN + fades up into the exact same spot
 *
 * Nothing is laid out below anything else — it reads like flipping through
 * a deck of 3D cards rather than scrolling a long page.
 */
export function ZoomDeck({ panels, className = '', screensPerPanel = 1.85 }: ZoomDeckProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = panels.length;

  useGSAP(() => {
    const items = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!outerRef.current || items.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: reveal everything, no scroll hijacking.
    if (reduce) {
      items.forEach((el) => gsap.set(el, { autoAlpha: 1, scale: 1, rotateX: 0, filter: 'none' }));
      return;
    }

    // Initial state: first panel front-and-center, the rest small + hidden behind.
    items.forEach((el, i) => {
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.55,
        rotateX: i === 0 ? 0 : -14,
        filter: i === 0 ? 'blur(0px)' : 'blur(14px)',
        zIndex: i + 1,
        transformOrigin: '50% 50%',
      });
    });

    const HOLD = 0.45; // dwell time on each panel (dead-scroll to read)
    const SWAP = 1;    // transition length between two panels

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    let t = HOLD; // hold the first panel before the first swap
    for (let i = 0; i < items.length - 1; i++) {
      // Outgoing panel: shrink into the distance + fade.
      tl.to(items[i], {
        scale: 0.5,
        autoAlpha: 0,
        rotateX: 12,
        filter: 'blur(14px)',
        duration: SWAP,
      }, t);

      // Incoming panel: grow into the SAME spot + fade up.
      tl.fromTo(items[i + 1],
        { scale: 0.55, autoAlpha: 0, rotateX: -14, filter: 'blur(14px)' },
        { scale: 1, autoAlpha: 1, rotateX: 0, filter: 'blur(0px)', duration: SWAP },
        t
      );

      t += SWAP + HOLD;
    }
  }, { scope: outerRef, dependencies: [n] });

  return (
    <div
      ref={outerRef}
      className={`relative ${className}`}
      style={{ height: `${n * screensPerPanel * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ perspective: '1400px' }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
