"use client";

import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Play, Check, Cpu, Code2, Calendar, Monitor } from 'lucide-react';
import type { Game } from '@/lib/data';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
}

type Tab = 'overview' | 'features' | 'tech';

/**
 * GameDetailModal — PlayStation 5 style game detail screen.
 * Full-screen takeover: a blurred ambient backdrop of the game art, a cinematic
 * video/image hero, a big PS5-style action bar, and segmented tabs for the
 * overview, key features, and tech stack.
 */
export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (game && !dialog.open) {
      setTab('overview');
      dialog.showModal();
    }
    if (!game && dialog.open) dialog.close();
  }, [game]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const canDownload = !!game?.downloadUrl && game.downloadUrl !== '#';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="game-detail-title"
      className="ps5-dialog w-screen h-[100dvh] max-w-none max-h-none bg-[var(--bg-deep)] text-[var(--text-primary)] overflow-hidden"
    >
      {game && (
        <div className="relative w-full h-full">
          {/* Ambient blurred backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-125 blur-2xl opacity-40"
            style={{ backgroundImage: `url(${game.image})` }}
          />
          <div className="absolute inset-0 bg-[var(--bg-deep)]/70" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Scroll surface */}
          <div className="relative z-10 h-full overflow-y-auto">
            {/* ── Cinematic hero ── */}
            <div className="relative w-full h-[58vh] min-h-[360px] overflow-hidden">
              {game.videoUrl ? (
                <video
                  key={game.id}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline preload="auto"
                  poster={game.image}
                  src={game.videoUrl}
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${game.image})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/30 to-black/50" />

              <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8 max-w-[1400px] mx-auto">
                <span className="inline-block px-3 py-1 mb-4 text-[11px] font-mono tracking-widest uppercase rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 backdrop-blur-md">
                  {game.genre}
                </span>
                <h2
                  id="game-detail-title"
                  className="font-[family-name:var(--font-bebas-neue)] tracking-wide text-6xl md:text-8xl leading-[0.9] text-white drop-shadow-2xl"
                >
                  {game.title}
                </h2>
              </div>
            </div>
            {/* ── Body ── */}
            <div className="px-6 md:px-16 pb-24 max-w-[1400px] mx-auto">
              {/* Action bar (PS5 style) */}
              <div className="flex flex-wrap items-center gap-4 -mt-2 mb-8">
                {canDownload ? (
                  <a
                    href={game.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold text-black bg-white hover:bg-white/90 transition-colors shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold text-[var(--text-muted)] border border-[var(--glass-border)] bg-white/5 cursor-not-allowed">
                    <Download className="w-5 h-5" />
                    Coming Soon
                  </span>
                )}
                <button className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-white border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Gameplay
                </button>
              </div>

              {/* Info tiles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {[
                  { icon: Cpu, label: 'Engine', value: game.engine },
                  { icon: Code2, label: 'Language', value: game.language },
                  { icon: Calendar, label: 'Released', value: game.year },
                  { icon: Monitor, label: 'Platform', value: game.platforms.join(', ') },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)]">
                      <Icon className="w-4 h-4" />
                      <span className="font-mono text-[10px] tracking-widest uppercase">{label}</span>
                    </div>
                    <div className="text-white font-semibold text-sm md:text-base leading-tight">{value}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 mb-8 p-1 rounded-full bg-white/[0.04] border border-white/10 w-fit">
                {([['overview', 'Overview'], ['features', 'Features'], ['tech', 'Tech Stack']] as [Tab, string][]).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                      tab === id ? 'bg-white text-black' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {/* Tab: Overview */}
              {tab === 'overview' && (
                <div className="max-w-4xl">
                  <p className="text-lg md:text-xl text-white/90 mb-5 leading-relaxed">{game.description}</p>
                  <p className="text-base text-[var(--text-secondary)] mb-10 whitespace-pre-line leading-relaxed">
                    {game.longDescription}
                  </p>

                  {game.challenges && game.challenges.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-mono text-xs tracking-widest uppercase text-[var(--accent-pink)] mb-2">
                        Development Challenges
                      </h3>
                      {game.challenges.map((c) => (
                        <div key={c.problem} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                          <p className="text-white font-semibold mb-1.5">{c.problem}</p>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.solution}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Features */}
              {tab === 'features' && (
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
                  {(game.features ?? []).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-base text-white/90">
                      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[var(--accent-teal)]/15 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tab: Tech Stack */}
              {tab === 'tech' && (
                <div className="flex flex-wrap gap-3 max-w-4xl">
                  {game.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm font-mono border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
