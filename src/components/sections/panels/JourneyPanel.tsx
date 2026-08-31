"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { historyTimeline } from '@/lib/data';

/**
 * JourneyPanel — Single-screen "4 years so far" milestone road.
 * A horizontal animated timeline: a flowing gradient line with pulsing
 * nodes and milestone cards alternating above / below the line.
 */
export function JourneyPanel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Gentle entrance stagger for the milestone nodes.
    gsap.from('.journey-node', {
      opacity: 0,
      y: 24,
      scale: 0.9,
      duration: 0.7,
      ease: 'back.out(1.4)',
      stagger: 0.12,
      delay: 0.2,
    });
  }, { scope: rootRef });

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.16), transparent 60%), var(--bg-deep)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-16 shrink-0">
        <span className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-gradient-sunset block mb-3">
          The Journey So Far
        </span>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-7xl md:text-[10rem] tracking-widest leading-none text-white">
          4 <span className="text-gradient-vice">YEARS</span>
        </h2>
      </div>

      {/* Desktop: horizontal animated road */}
      <div className="hidden md:block relative w-full max-w-6xl">
        {/* The flowing line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-orange), var(--accent-gold), var(--accent-teal), var(--accent-violet))',
              backgroundSize: '200% 100%',
              animation: 'mesh-shift 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Nodes */}
        <div className="relative flex justify-between items-center">
          {historyTimeline.map((item, index) => {
            const above = index % 2 === 0;
            return (
              <div key={index} className="journey-node relative flex flex-col items-center" style={{ width: `${100 / historyTimeline.length}%` }}>
                {/* Card above */}
                {above && <MilestoneCard item={item} className="mb-6" />}

                {/* Node dot */}
                <div className="relative w-5 h-5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[var(--accent-gold)] shadow-[0_0_20px_rgba(240,192,64,0.8)]" />
                  <span className="absolute inset-0 rounded-full bg-[var(--accent-gold)] animate-[pulse-ring_2.5s_ease-out_infinite]" />
                </div>

                {/* Card below */}
                {!above && <MilestoneCard item={item} className="mt-6" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: compact vertical list */}
      <div className="md:hidden w-full max-w-md overflow-y-auto flex flex-col gap-4">
        {historyTimeline.map((item, index) => (
          <div key={index} className="journey-node glass p-4 rounded-xl border-l-2 border-[var(--accent-gold)]">
            <span className="font-mono text-[11px] tracking-widest text-[var(--accent-pink)]">{item.year}</span>
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-wide text-white">{item.title}</h3>
            <p className="text-white/60 text-sm leading-snug">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MilestoneCard({
  item,
  className = '',
}: {
  item: { year: string; title: string; description: string };
  className?: string;
}) {
  return (
    <div className={`w-[92%] glass p-4 lg:p-5 rounded-xl text-center animate-[float_5s_ease-in-out_infinite] ${className}`}>
      <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-mono tracking-widest text-[var(--accent-pink)] border border-[var(--accent-pink)]/30 rounded-full bg-[var(--accent-pink)]/10">
        {item.year}
      </span>
      <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl lg:text-2xl tracking-wide text-white mb-1 leading-tight">
        {item.title}
      </h3>
      <p className="text-white/55 text-[11px] lg:text-xs leading-snug line-clamp-3">
        {item.description}
      </p>
    </div>
  );
}
