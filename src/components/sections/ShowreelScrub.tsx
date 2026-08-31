"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ShowreelScrub — a standalone pinned section (NOT a deck panel). As you scroll,
 * the showreel video scrubs frame-by-frame while three content layers reveal in
 * sequence: the title, the stats, then the closing quote. Sits between the two
 * ZoomDecks so it reads as a cinematic interlude.
 */
export function ShowreelScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scrub the video's playhead across the scroll range.
    const initScrub = () => {
      gsap.fromTo(video,
        { currentTime: 0 },
        {
          currentTime: video.duration || 1,
          ease: 'none',
          scrollTrigger: { trigger: wrapper, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
        }
      );
    };
    if (!reduce) {
      if (video.readyState >= 1) initScrub();
      else video.addEventListener('loadedmetadata', initScrub, { once: true });
    }

    // Sequential content reveals — one after another.
    const reveal = (el: HTMLElement | null, inStart: string, inEnd: string, outStart?: string, outEnd?: string) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, scrollTrigger: { trigger: wrapper, start: inStart, end: inEnd, scrub: 1 } });
      if (outStart && outEnd) {
        gsap.to(el, { opacity: 0, y: -40, scrollTrigger: { trigger: wrapper, start: outStart, end: outEnd, scrub: 1 } });
      }
    };

    reveal(titleRef.current, 'top 60%', '15% top', '30% top', '45% top');
    reveal(statsRef.current, '35% top', '50% top', '58% top', '68% top');
    reveal(quoteRef.current, '68% top', '82% top');
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative" style={{ height: '420vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2069&auto=format&fit=crop"
          src="/videos/scrub-video-encoded.mp4"
        />

        {/* Readability + color wash */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-color"
          style={{ background: 'linear-gradient(135deg, rgba(255,94,160,0.3), transparent 50%, rgba(45,212,191,0.2))' }}
        />

        {/* Layer 1: Title */}
        <div ref={titleRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0 px-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.6em] uppercase text-[var(--accent-pink)] mb-4">
            Crafting Digital Worlds
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,14vw,14rem)] leading-none text-white tracking-widest text-center">
            THE REEL
          </h2>
          <p className="font-mono text-sm md:text-base text-white/50 mt-4 tracking-widest uppercase">
            Every frame tells a story
          </p>
        </div>

        {/* Layer 2: Stats */}
        <div ref={statsRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
            {[
              { value: '4+', label: 'Games Shipped', color: 'var(--accent-gold)' },
              { value: '20+', label: 'Projects Built', color: 'var(--accent-pink)' },
              { value: '5+', label: 'Years Experience', color: 'var(--accent-teal)' },
              { value: '10+', label: 'Tools Mastered', color: 'var(--accent-orange)' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 3: Quote */}
        <div ref={quoteRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 px-8">
          <div className="max-w-3xl text-center">
            <div className="text-6xl md:text-8xl text-[var(--accent-pink)] opacity-30 mb-4 font-serif">&ldquo;</div>
            <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed italic">
              Code is my medium.<br />
              <span className="text-gradient-sunset" style={{ WebkitTextFillColor: 'unset' }}>Impact is the measure.</span>
            </p>
            <div className="mt-8 w-16 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[var(--accent-pink)] to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
