"use client";

import React from 'react';

/**
 * ShowreelPanel — "The Reel" deck card. A full-screen looping showreel video
 * with a cinematic title and closing quote layered on top. Slots into the
 * ZoomDeck like any other panel and zooms in/out in place on scroll.
 */
export function ShowreelPanel() {
  return (
    <section className="relative w-full h-full overflow-hidden bg-black">
      {/* Showreel video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2069&auto=format&fit=crop"
        src="/videos/showreel-bg.mp4"
      />

      {/* Readability + color wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
      <div
        className="absolute inset-0 opacity-25 mix-blend-color pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,94,160,0.4), transparent 50%, rgba(45,212,191,0.3))' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="font-mono text-xs md:text-sm tracking-[0.6em] uppercase text-[var(--accent-pink)] mb-4">
          Crafting Digital Worlds
        </span>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,15vw,13rem)] leading-[0.85] text-white tracking-widest">
          THE REEL
        </h2>
        <p className="font-mono text-sm md:text-base text-white/60 mt-4 tracking-widest uppercase">
          Every frame tells a story
        </p>

        <div className="mt-10 max-w-2xl">
          <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed italic">
            Code is my medium.{' '}
            <span className="text-gradient-sunset" style={{ WebkitTextFillColor: 'unset' }}>
              Impact is the measure.
            </span>
          </p>
          <div className="mt-8 w-16 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[var(--accent-pink)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
