"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScrollProvider
 * 
 * Wraps the application with Lenis smooth scrolling, synchronized to the
 * GSAP ticker for frame-perfect ScrollTrigger integration.
 * 
 * Architecture:
 * - Lenis handles the smooth interpolation of scroll position
 * - GSAP ticker drives Lenis's RAF loop (autoRaf=false) so both systems
 *   share the exact same frame timing — no jitter or desync
 * - lagSmoothing(0) disables GSAP's built-in lag compensation which
 *   would otherwise fight Lenis's own interpolation
 * 
 * Accessibility:
 * - When `prefers-reduced-motion: reduce` is active, Lenis is configured
 *   with lerp=1 (instant) so scroll feels native with no smooth inertia
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Bind Lenis RAF to GSAP's ticker for synchronized updates
    function update(time: number) {
      // GSAP ticker provides time in seconds; Lenis expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    // Disable lag smoothing so Lenis and ScrollTrigger stay perfectly in sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: prefersReduced ? 1 : 0.1,
        duration: prefersReduced ? 0 : 1.2,
        smoothWheel: !prefersReduced,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
