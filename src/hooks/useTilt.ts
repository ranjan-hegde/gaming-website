'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from './useReducedMotion';
import { useMediaQuery } from './useMediaQuery';

export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>) {
  const prefersReducedMotion = useReducedMotion();
  const isHoverable = useMediaQuery('(hover: hover)');
  const [glareStyle, setGlareStyle] = useState({ x: 50, y: 50, opacity: 0 });
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    xTo.current = gsap.quickTo(ref.current, 'rotateY', { ease: 'power3', duration: 0.5 });
    yTo.current = gsap.quickTo(ref.current, 'rotateX', { ease: 'power3', duration: 0.5 });
  }, [ref]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion || !isHoverable || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width;
    const yPct = y / rect.height;

    const rotateX = (0.5 - yPct) * 24; // ±12deg
    const rotateY = (xPct - 0.5) * 24; // ±12deg

    if (xTo.current && yTo.current) {
      xTo.current(rotateY);
      yTo.current(rotateX);
    }
    
    setTiltStyle({ rotateX, rotateY });
    setGlareStyle({ x: xPct * 100, y: yPct * 100, opacity: 1 });
  };

  const onPointerLeave = () => {
    if (prefersReducedMotion || !isHoverable || !ref.current) return;

    if (xTo.current && yTo.current) {
      gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    }
    setTiltStyle({ rotateX: 0, rotateY: 0 });
    setGlareStyle({ x: 50, y: 50, opacity: 0 });
  };

  return { tiltStyle, glareStyle, onPointerMove, onPointerLeave };
}
