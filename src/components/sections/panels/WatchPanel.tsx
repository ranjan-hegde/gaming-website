"use client";

import React, { useRef, useState } from 'react';
import { games } from '@/lib/data';
import { Play } from 'lucide-react';

/**
 * WatchPanel — "The Feed" deck card. A featured gameplay player with a
 * thumbnail rail; clicking a thumbnail swaps the hero video. Slots into the
 * ZoomDeck like any other panel.
 */
export function WatchPanel() {
  const clips = games.filter((g) => g.videoUrl);
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = clips[active] ?? games[0];

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      style={{
        background:
          'radial-gradient(ellipse at 80% 15%, rgba(45,212,191,0.12), transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(139,92,246,0.12), transparent 55%), var(--bg-deep)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 shrink-0">
        <span className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-gradient-sunset block mb-3">
          // Gameplay Footage
        </span>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider leading-none text-white">
          WATCH IT RUN
        </h2>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Featured player */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black">
          <video
            key={current.id}
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={current.image}
            src={current.videoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 pointer-events-none">
            <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] bg-black/40 backdrop-blur-md">
              {current.genre}
            </span>
            <h3 className="mt-3 font-[family-name:var(--font-bebas-neue)] text-4xl md:text-5xl tracking-wide text-white leading-none">
              {current.title}
            </h3>
            <p className="font-mono text-[11px] md:text-xs text-[var(--accent-pink)] mt-1">
              {current.engine} · {current.year}
            </p>
          </div>
        </div>

        {/* Thumbnail rail */}
        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-3 lg:max-h-[52vh] lg:overflow-y-auto pr-1">
          {clips.map((clip, i) => (
            <button
              key={clip.id}
              onClick={() => setActive(i)}
              aria-label={`Play ${clip.title} gameplay`}
              aria-pressed={i === active}
              className={`group relative rounded-xl overflow-hidden border aspect-video text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] transition-all ${
                i === active
                  ? 'border-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]/50'
                  : 'border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${clip.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[var(--accent-gold)]/90 transition-colors">
                  <Play className="w-3.5 h-3.5 text-white group-hover:text-black" fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-2 left-3 font-[family-name:var(--font-bebas-neue)] text-lg tracking-wide text-white">
                {clip.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
