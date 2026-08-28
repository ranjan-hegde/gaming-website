"use client";

import React, { useRef } from 'react';
import { Gamepad2, Code2 } from 'lucide-react';
import { PortfolioMode } from '@/app/page';

interface VideoShowreelProps {
  currentMode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
}

export function VideoShowreel({ currentMode, onModeChange }: VideoShowreelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Autoplay Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/videos/showreel-bg.mp4"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 z-10" />

      {/* GTA6 color wash */}
      <div
        className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,94,160,0.4), transparent 40%, rgba(45,212,191,0.3) 80%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        {/* Name */}
        <span className="font-mono text-xs md:text-sm tracking-[0.8em] uppercase text-[var(--accent-pink)] mb-4">
          Portfolio of
        </span>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,18vw,16rem)] leading-[0.85] tracking-widest text-white text-center mb-8">
          RANJU
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-sm md:text-base text-white/50 tracking-[0.3em] uppercase mb-12 text-center">
          Game Developer & Full-Stack Engineer
        </p>

        {/* 2 Mode Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={() => onModeChange('games')}
            className={`group relative flex items-center gap-4 px-8 py-4 rounded-xl border transition-all duration-500 font-mono text-sm tracking-widest uppercase overflow-hidden ${
              currentMode === 'games'
                ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] shadow-[0_0_30px_rgba(240,192,64,0.2)]'
                : 'border-white/20 text-white/70 hover:border-[var(--accent-gold)]/50 hover:text-[var(--accent-gold)]'
            }`}
          >
            {/* Hover gradient fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-gold)]/10 to-[var(--accent-orange)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Gamepad2 className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Game Dev</span>
          </button>

          <button
            onClick={() => onModeChange('engineering')}
            className={`group relative flex items-center gap-4 px-8 py-4 rounded-xl border transition-all duration-500 font-mono text-sm tracking-widest uppercase overflow-hidden ${
              currentMode === 'engineering'
                ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] shadow-[0_0_30px_rgba(45,212,191,0.2)]'
                : 'border-white/20 text-white/70 hover:border-[var(--accent-teal)]/50 hover:text-[var(--accent-teal)]'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-teal)]/10 to-[var(--accent-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Code2 className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Full Stack</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
