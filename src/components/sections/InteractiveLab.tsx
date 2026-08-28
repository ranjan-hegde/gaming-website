"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, ScrollTrigger);
}

/**
 * Same fix as CinematicShowcase: NO GSAP pin: true.
 * Use a tall wrapper + CSS sticky for pinning.
 * GSAP only drives the yPercent animation via scrub.
 */
export function InteractiveLab() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    label: `SYS.OBJ.${i}`,
    size: 82 + ((i * 37) % 58),
    color: i % 2 === 0 ? 'var(--accent-gold)' : 'var(--accent-teal)'
  }));

  useGSAP(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    // Start hidden below
    gsap.set(containerRef.current, { yPercent: 100 });

    // NO pin: true! The sticky CSS handles pinning.
    gsap.to(containerRef.current, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Scatter elements randomly
    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];
    const bounds = { width: window.innerWidth, height: window.innerHeight };

    items.forEach((item) => {
      const index = Number(item.dataset.index || 0);
      gsap.set(item, {
        x: ((index * 193) % Math.max(bounds.width - 220, 1)) + 90,
        y: ((index * 137) % Math.max(bounds.height - 240, 1)) + 90,
        rotation: (index * 41) % 360,
      });
    });

    // Make them draggable
    Draggable.create('.draggable-item', {
      bounds: containerRef.current,
      onDragStart: function () {
        gsap.to(this.target, { scale: 1.1, zIndex: 100, duration: 0.2 });
      },
      onDragEnd: function () {
        gsap.to(this.target, { scale: 1, zIndex: 10, duration: 0.2 });
      }
    });

    // Grid ripple effect
    const container = containerRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (document.querySelector('.grid-dot')) {
        gsap.to('.grid-dot', {
          duration: 0.6,
          stagger: {
            grid: "auto",
            from: [x, y],
            amount: 1.5
          },
          scale: 2,
          opacity: 0.8,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          overwrite: "auto"
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: wrapperRef });

  return (
    /* Tall wrapper: 100vh for the sticky viewport + 100vh for the reveal scroll distance */
    <div ref={wrapperRef} className="relative" style={{ height: '200vh' }}>
      {/* Sticky container stays pinned while you scroll through the wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--bg-deep)]">
        <div ref={containerRef} className="absolute inset-0 h-screen w-full bg-[var(--bg-deep)] overflow-hidden flex items-center justify-center border-t border-white/10">

          {/* Background Interactive Grid */}
          <div className="absolute inset-0 z-0 flex flex-wrap content-start gap-8 p-8 opacity-20 pointer-events-none overflow-hidden">
            {Array.from({ length: 300 }).map((_, i) => (
              <div key={i} className="grid-dot w-2 h-2 rounded-full bg-white opacity-20" />
            ))}
          </div>

          {/* Ambient center glow */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(45,212,191,0.08),transparent_42%,rgba(212,168,83,0.08))] pointer-events-none" />

          {/* Header - MASSIVE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center w-full">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(6rem,15vw,18rem)] leading-none text-white tracking-widest mix-blend-difference opacity-80">
              THE <span className="text-[var(--accent-teal)]">LAB</span>
            </h2>
            <p className="font-mono text-[var(--text-secondary)] text-sm md:text-xl mt-4 uppercase tracking-widest mix-blend-difference">
              Interactive Physics Canvas // Drag to manipulate
            </p>
          </div>

          {/* Draggable Elements */}
          <div className="absolute inset-0 z-20">
            {elements.map((el) => (
              <div
                key={el.id}
                data-index={el.id}
                className="draggable-item absolute cursor-grab active:cursor-grabbing flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl"
                style={{
                  width: el.size,
                  height: el.size,
                  borderRadius: el.id % 3 === 0 ? '50%' : '12px',
                  backgroundColor: 'rgba(255,255,255,0.05)'
                }}
              >
                <div className="absolute inset-2 border border-dashed opacity-50 rounded-inherit" style={{ borderColor: el.color }} />
                <span className="font-mono text-[10px] md:text-xs text-white/70 tracking-tighter mix-blend-screen pointer-events-none">
                  {el.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
