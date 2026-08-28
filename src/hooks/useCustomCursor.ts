'use client';

import { useEffect, useState, RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from './useMediaQuery';

export function useCustomCursor(
  containerRef: RefObject<HTMLElement | null>,
  cursorRef: RefObject<HTMLElement | null>
) {
  const [isVisible, setIsVisible] = useState(false);
  const isHoverable = useMediaQuery('(hover: hover)');
  
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!cursorRef.current) return;
    
    xTo.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' });
    yTo.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });
  }, [cursorRef]);

  useEffect(() => {
    if (!isHoverable || !containerRef.current) return;

    const container = containerRef.current;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (xTo.current) xTo.current(x);
      if (yTo.current) yTo.current(y);
    };

    const onPointerEnter = () => {
      setIsVisible(true);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
      }
      container.style.cursor = 'none';
    };

    const onPointerLeave = () => {
      setIsVisible(false);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: 'power3.in' });
      }
      container.style.cursor = 'auto';
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [containerRef, cursorRef, isHoverable]);

  return { isVisible };
}
