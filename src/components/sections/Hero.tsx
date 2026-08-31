"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
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
      {/* Cinematic Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="https://www.shutterstock.com/shutterstock/videos/3455010261/preview/stock-footage-animation-of-the-strategy-mobile-game-animation-of-the-gameplay-of-the-strategy-mobile-video-game.webm"
        style={{ filter: 'brightness(0.4) saturate(1.2)' }}
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
            INDRAJ
          </h1>
          <p className="text-xl md:text-3xl text-[var(--text-secondary)] tracking-[0.3em] uppercase font-bold mix-blend-difference mb-6">
            Building Interactive Worlds
          </p>
          <div className="overflow-hidden leading-[0.85] mb-8">
            <h2 className="hero-text-line font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,15vw,12rem)] text-white tracking-widest mix-blend-difference">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-pink)] via-[var(--accent-orange)] to-[var(--accent-gold)]">
                GAME DEVELOPER
              </span>
            </h2>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[bounce-down_2s_infinite]">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--text-secondary)] to-transparent" />
      </div>
    </section>
  );
}
