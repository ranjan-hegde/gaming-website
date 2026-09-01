"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { Download, X, ArrowLeft, MousePointerClick, Play } from 'lucide-react';
import { Game } from '@/lib/data';
import { GameBox3D } from './GameBox3D';
import { getTechStyle } from '@/lib/techIcons';

interface GameDetailsModalProps {
  item: Game | null;
  onClose: () => void;
}

type View = 'case' | 'gallery';

/**
 * GameDetailsModal — a portal overlay (escapes the ZoomDeck's 3D transforms)
 * that presents a game as a floating 3D PlayStation case. The case rotates
 * toward the cursor; clicking it flips to an animated screenshot gallery.
 * Page scroll is locked (Lenis + body) until the overlay is dismissed.
 */
export function GameDetailsModal({ item, onClose }: GameDetailsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>('case');
  const [boxColor, setBoxColor] = useState('rgba(255,94,160,0.3)');
  const [isBoxHovered, setIsBoxHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);
  useEffect(() => { if (item) { setView('case'); setShowVideo(false); } }, [item]);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onClose });
  }, [onClose]);

  // Lock scrolling while open
  useEffect(() => {
    if (!item) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => { lenis?.start(); document.body.style.overflow = ''; };
  }, [item, lenis]);

  // Escape to close
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (showVideo) setShowVideo(false);
        else handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, handleClose, showVideo]);

  // Entrance
  useGSAP(() => {
    if (!item) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(contentRef.current,
      { opacity: 0, scale: 0.92, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)', delay: 0.05 });
    // The flat card "spins up" into the 3D case.
    if (caseRef.current) {
      gsap.fromTo(caseRef.current,
        { rotateY: -115, scale: 0.5, opacity: 0, z: -260 },
        { rotateY: 0, scale: 1, opacity: 1, z: 0, duration: 0.95, ease: 'power3.out', delay: 0.15 });
    }
  }, { dependencies: [item], scope: overlayRef });

  // Animate gallery shots in when the case is opened
  useGSAP(() => {
    if (view !== 'gallery' || !galleryRef.current) return;
    gsap.fromTo(galleryRef.current.querySelectorAll('.shot'),
      { opacity: 0, y: 60, scale: 0.85, rotateX: -14 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 });
  }, { dependencies: [view], scope: galleryRef });

  if (!mounted || !item) return null;

  const shots = item.screenshots && item.screenshots.length > 0 ? item.screenshots : [item.image];

  return createPortal(
    <div
      ref={overlayRef}
      data-lenis-prevent
      className="fixed inset-0 z-[120] overflow-y-auto overscroll-contain"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Ambient backdrop — click to close */}
      <div className="fixed inset-0 bg-black/85" onClick={handleClose}>
        {item.videoUrl ? (
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            src={item.videoUrl}
          />
        ) : (
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${item.image})` }} />
        )}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
          style={{
            background: isBoxHovered
              ? `radial-gradient(100% 100% at 30% 50%, ${boxColor}, rgba(0,0,0,0) 75%)`
              : 'radial-gradient(100% 100% at 30% 50%, rgba(255,94,160,0.12), rgba(0,0,0,0) 75%)',
            opacity: 0.55,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Close */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/20 transition-colors border border-white/10"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Content — the overlay itself scrolls; wrapper centers when short */}
      <div
        className="relative z-10 min-h-full flex items-start md:items-center justify-center p-4 md:p-8"
        style={{ perspective: '2000px' }}
        onClick={handleClose}
      >
        <div
          ref={contentRef}
          className="w-[95vw] max-w-6xl my-auto"
          onClick={(e) => e.stopPropagation()}
        >
        {view === 'case' ? (
          <div className="glass rounded-3xl p-6 md:p-12 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: 3D PlayStation case (click → gallery) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                ref={caseRef}
                role="button"
                tabIndex={0}
                onClick={() => setView('gallery')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setView('gallery'); } }}
                className="w-full max-w-[300px] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
                style={{ transformStyle: 'preserve-3d' }}
                aria-label="View screenshots"
              >
                <GameBox3D
                  image={item.image}
                  title={item.title}
                  onColorExtracted={setBoxColor}
                  onHoverStateChange={setIsBoxHovered}
                />
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--accent-gold)] animate-pulse">
                <MousePointerClick className="w-4 h-4" />
                Click the case for screenshots
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 md:gap-5 w-full max-w-md">
                {item.videoUrl && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-mono tracking-widest uppercase hover:bg-[var(--accent-gold)] hover:text-black transition-colors"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    Watch Gameplay
                  </button>
                )}
                {item.downloadUrl && item.downloadUrl !== '#' ? (
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] text-white font-mono tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,94,160,0.4)]"
                  >
                    <Download className="w-5 h-5" />
                    Download Game
                  </a>
                ) : (
                  <span className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-[var(--text-muted)] font-mono tracking-widest uppercase">
                    <Download className="w-5 h-5" />
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
            {/* Right: details */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-full border bg-black/40 border-[var(--accent-gold)]/30 text-[var(--accent-gold)]">
                  {item.genre}
                </span>
                <span className="text-white/50 font-mono text-sm">{item.engine} · {item.year}</span>
              </div>

              <h2 className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider mb-5 leading-[0.9] text-gradient-sunset">
                {item.title}
              </h2>

              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-7">
                {item.longDescription}
              </p>

              <div className="mb-7">
                <h4 className="font-mono text-xs tracking-widest text-white/50 uppercase mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => {
                    const style = getTechStyle(tech);
                    const Icon = style.icon;
                    return (
                      <span 
                        key={tech} 
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-widest border rounded-full"
                        style={{
                          backgroundColor: `${style.color}25`, // 25 opacity hex
                          borderColor: `${style.color}50`, // 50 opacity hex
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}
                      >
                        <Icon 
                          className="w-3.5 h-3.5" 
                          style={{ color: style.color }} 
                        />
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {item.features && (
                <div>
                  <h4 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-widest text-white mb-3">Key Features</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] mt-2 shrink-0" />
                        <span className="font-light text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div ref={galleryRef} className="glass rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setView('case')}
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to case
              </button>
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-5xl tracking-widest text-gradient-sunset">
                {item.title} — Gallery
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ perspective: '1200px' }}>
              {shots.map((src, i) => (
                <div key={i} className="shot group relative overflow-hidden rounded-2xl border border-white/10 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${item.title} screenshot ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest uppercase text-white/85 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shot 0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Gameplay video popup — layered above the case, ambient glow behind */}
      {showVideo && item.videoUrl && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center px-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Ambient light behind the player */}
          <div
            className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] pointer-events-none animate-pulse"
            style={{ background: `radial-gradient(circle, ${boxColor}, transparent 70%)`, opacity: 0.6 }}
          />
          <div
            className="absolute w-[50vw] h-[40vh] rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.35), transparent 70%)', opacity: 0.5 }}
          />

          <div
            className="relative z-10 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl tracking-widest text-white">
                {item.title} <span className="text-[var(--accent-gold)]">— Gameplay</span>
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="p-3 rounded-full bg-white/5 hover:bg-white/20 transition-colors border border-white/10"
                aria-label="Close gameplay video"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)] aspect-video bg-black">
              <video
                key={item.id}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                controls
                playsInline
                poster={item.image}
                src={item.videoUrl}
              />
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
