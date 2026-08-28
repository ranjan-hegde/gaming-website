"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PortfolioMode } from '@/app/page';

interface HeroProps {
  currentMode: PortfolioMode;
  onModeChange: (mode: PortfolioMode) => void;
}

export default function Hero({ currentMode, onModeChange }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Initial fade in for the text
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
      delay: 1.5, // wait for loading screen to split
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1542382257-80da9fb9f5c5?q=80&w=2000&auto=format&fit=crop")', // Neon city background
          filter: 'brightness(0.4) saturate(1.2)'
        }}
      />
      
      {/* Fog/Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg-deep)]/40 via-transparent to-[var(--bg-deep)]" />

      {/* Main Content */}
      <div className="relative z-10 container-custom w-full flex flex-col items-center justify-center pt-20">
        
        {/* Name / Title */}
        <div className="text-center mb-16">
          <h1 
            ref={textRef}
            className="text-[clamp(6rem,20vw,24rem)] font-[family-name:var(--font-bebas-neue)] leading-[0.8] tracking-tight text-white mb-6 drop-shadow-2xl mix-blend-overlay opacity-90"
          >
            RANJU
          </h1>
          <p className="text-xl md:text-3xl text-[var(--text-secondary)] tracking-[0.3em] uppercase font-bold mix-blend-difference">
            Building Worlds & Engineering Systems
          </p>
        </div>

        {/* Mode Selector Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
          
          {/* Game Dev Path */}
          <button
            onClick={() => onModeChange('games')}
            className={`group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[4/3] glass transition-all duration-500 hover:scale-[1.02] ${
              currentMode === 'games' ? 'ring-2 ring-[var(--accent-gold)] glow-gold scale-[1.02]' : 'hover:ring-1 hover:ring-white/30'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop")' }} // Gaming/controller abstract
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
              <span className="text-[var(--accent-gold)] font-mono text-sm tracking-widest mb-2 font-semibold">01 // PATH</span>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-bebas-neue)] tracking-wide text-white mb-2 group-hover:text-[var(--accent-gold)] transition-colors">
                Game Developer
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-[90%]">
                Unity & Unreal Engine. Procedural generation, shaders, and real-time multiplayer systems.
              </p>
            </div>
          </button>

          {/* Engineer Path */}
          <button
            onClick={() => onModeChange('engineering')}
            className={`group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[4/3] glass transition-all duration-500 hover:scale-[1.02] ${
              currentMode === 'engineering' ? 'ring-2 ring-[var(--accent-teal)] glow-teal scale-[1.02]' : 'hover:ring-1 hover:ring-white/30'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop")' }} // Code/Engineering
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
              <span className="text-[var(--accent-teal)] font-mono text-sm tracking-widest mb-2 font-semibold">02 // PATH</span>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-bebas-neue)] tracking-wide text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors">
                Full Stack Engineer
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-[90%]">
                React, Node.js, and Python. Distributed cloud architectures, real-time data, and AI pipelines.
              </p>
            </div>
          </button>

        </div>
      </div>
      
      {/* Scroll indicator */}
      {currentMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[bounce-down_2s_infinite]">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--text-secondary)] to-transparent" />
        </div>
      )}
    </section>
  );
}
