'use client';

import { useRef, useState, useCallback, RefObject } from 'react';

export function useDrag(containerRef: RefObject<HTMLElement | null>) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = 'grabbing';
  }, [containerRef]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // scroll-fast multiplier
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }, [isDragging, containerRef]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
    }
  }, [containerRef]);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}
