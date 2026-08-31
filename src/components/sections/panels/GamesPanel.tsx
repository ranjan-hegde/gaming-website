"use client";

import React, { useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { GameDetailsModal } from '@/components/ui/GameDetailsModal';
import { games, type Game } from '@/lib/data';
import { Play } from 'lucide-react';

/**
 * GamesPanel — Full-screen deck panel showing every game as a 3D card.
 * Hovering a card bleeds its screenshot into the section background; clicking
 * a card opens the detail overlay (3D case + animated gallery + download).
 */
export function GamesPanel() {
  const [selected, setSelected] = useState<Game | null>(null);
  const [hovered, setHovered] = useState<Game | null>(null);

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      style={{
        background:
          'radial-gradient(ellipse at 20% 20%, rgba(255,94,160,0.12), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(45,212,191,0.10), transparent 55%), var(--bg-deep)',
      }}
    >
      {/* Hovered card image bleeds into the background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[900ms] ease-out will-change-[opacity,transform]"
        style={{
          backgroundImage: hovered ? `url(${hovered.image})` : 'none',
          opacity: hovered ? 0.32 : 0,
          transform: hovered ? 'scale(1.05)' : 'scale(1.12)',
          filter: 'saturate(1.2)',
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: hovered ? 1 : 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, var(--bg-deep) 85%)' }}
      />

      {/* Header */}
      <div className="relative text-center mb-8 md:mb-12 shrink-0">
        <span className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-gradient-sunset block mb-3">
          // Featured Games
        </span>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider leading-none text-white">
          THE ARCADE
        </h2>
      </div>

      {/* Grid */}
      <div
        className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 w-full max-w-7xl"
        onMouseLeave={() => setHovered(null)}
      >
        {games.map((game, index) => (
          <Card3D key={game.id} maxTilt={8} glareColor="rgba(240,192,64,0.14)">
            <button
              onClick={() => setSelected(game)}
              onMouseEnter={() => setHovered(game)}
              onFocus={() => setHovered(game)}
              className="group relative block w-full text-left rounded-2xl overflow-hidden border border-white/10 bg-[var(--bg-card)] shadow-2xl aspect-[3/4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              aria-label={`View details for ${game.title}`}
            >
              {/* Screenshot */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
                style={{ backgroundImage: `url(${game.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Index */}
              <span className="absolute top-3 right-4 font-[family-name:var(--font-bebas-neue)] text-4xl text-white/10">
                0{index + 1}
              </span>

              {/* Genre badge */}
              <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] bg-black/40 backdrop-blur-md">
                {game.genre}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wide text-white mb-1 group-hover:text-[var(--accent-gold)] transition-colors">
                  {game.title}
                </h3>
                <p className="font-mono text-[11px] text-[var(--accent-pink)] mb-3">
                  {game.engine} · {game.year}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--accent-gold)] group-hover:text-white transition-colors">
                  <Play className="w-3.5 h-3.5" fill="currentColor" />
                  View & Download
                </span>
              </div>
            </button>
          </Card3D>
        ))}
      </div>

      <GameDetailsModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
