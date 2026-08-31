"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { ArrowDown, Play } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hidden until the loader clears, then fade the headline stack in smoothly.
    gsap.set('.hero-rise', { opacity: 0, y: 50 });
    const reveal = () => {
      gsap.to('.hero-rise', {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14,
      });
    };

    if (reduce) {
      gsap.set('.hero-rise', { opacity: 1, y: 0 });
    } else if (document.body.hasAttribute('data-loading')) {
      window.addEventListener('loading-complete', reveal, { once: true });
      // Fallback in case the loader already finished before this mounted.
      gsap.delayedCall(4, reveal);
    } else {
      reveal();
    }

    if (reduce || !containerRef.current) return;

    // Slow-spinning conic glow behind the name.
    gsap.to(ringRef.current, { rotate: 360, duration: 40, ease: 'none', repeat: -1 });

    // Floating orbs drift forever.
    gsap.to('.hero-orb', {
      y: '+=30', x: '+=20', duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.5,
    });

    // Mouse parallax "depth": background drifts OPPOSITE the cursor, content WITH it.
    gsap.set(videoRef.current, { scale: 1.18 });
    const vx = gsap.quickTo(videoRef.current, 'x', { duration: 0.9, ease: 'power3' });
    const vy = gsap.quickTo(videoRef.current, 'y', { duration: 0.9, ease: 'power3' });
    const ox = gsap.quickTo(orbsRef.current, 'x', { duration: 1.2, ease: 'power3' });
    const oy = gsap.quickTo(orbsRef.current, 'y', { duration: 1.2, ease: 'power3' });
    const cx = gsap.quickTo(contentRef.current, 'x', { duration: 1, ease: 'power3' });
    const cy = gsap.quickTo(contentRef.current, 'y', { duration: 1, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = (e.clientX / w) - 0.5;
      const ny = (e.clientY / h) - 0.5;
      vx(-nx * 60); vy(-ny * 60);
      ox(-nx * 30); oy(-ny * 30);
      cx(nx * 22);  cy(ny * 22);
    };

    const el = containerRef.current;
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, { scope: containerRef });

  const goTo = (target: string) => lenis?.scrollTo(target, { duration: 1.6, offset: -1 });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic gaming background video (far parallax layer) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        autoPlay loop muted playsInline preload="auto"
        src="https://www.shutterstock.com/shutterstock/videos/3455010261/preview/stock-footage-animation-of-the-strategy-mobile-game-animation-of-the-gameplay-of-the-strategy-mobile-video-game.webm"
        style={{ filter: 'brightness(0.32) saturate(1.3)' }}
      />

      {/* Floating color orbs (mid depth) */}
      <div ref={orbsRef} className="absolute inset-0 z-[1] pointer-events-none will-change-transform">
        <div className="hero-orb absolute top-[15%] left-[12%] w-[38vmin] h-[38vmin] rounded-full blur-[80px] opacity-40" style={{ background: 'radial-gradient(circle, var(--accent-pink), transparent 70%)' }} />
        <div className="hero-orb absolute bottom-[12%] right-[10%] w-[42vmin] h-[42vmin] rounded-full blur-[90px] opacity-35" style={{ background: 'radial-gradient(circle, var(--accent-teal), transparent 70%)' }} />
        <div className="hero-orb absolute top-[45%] right-[28%] w-[26vmin] h-[26vmin] rounded-full blur-[70px] opacity-30" style={{ background: 'radial-gradient(circle, var(--accent-gold), transparent 70%)' }} />
      </div>

      {/* Grid texture + vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }}
      />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[var(--bg-deep)]/50 via-transparent to-[var(--bg-deep)]" />

      {/* Rotating conic glow behind the name (impact) */}
      <div
        ref={ringRef}
        className="absolute z-[4] w-[80vmin] h-[80vmin] rounded-full pointer-events-none opacity-25 blur-2xl"
        style={{ background: 'conic-gradient(from 0deg, var(--accent-pink), var(--accent-orange), var(--accent-gold), var(--accent-teal), var(--accent-violet), var(--accent-pink))', maskImage: 'radial-gradient(circle, transparent 46%, black 50%, transparent 66%)' }}
      />

      {/* Main content (near depth) */}
      <div ref={contentRef} className="relative z-10 container-custom w-full flex flex-col items-center justify-center text-center will-change-transform px-6">
        <span className="hero-rise inline-flex items-center gap-3 px-4 py-2 mb-7 rounded-full border border-white/15 bg-white/5 backdrop-blur-md font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/80">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
          Game Developer · Interactive Worlds
        </span>

        <h1 className="hero-rise text-[clamp(5.5rem,19vw,22rem)] font-[family-name:var(--font-bebas-neue)] leading-[0.78] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          INDRAJ
        </h1>

        <div className="hero-rise overflow-hidden leading-[0.85] mt-2 mb-7">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.25rem,8vw,6rem)] tracking-widest">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-pink)] via-[var(--accent-orange)] to-[var(--accent-gold)]">
              I BUILD WORLDS YOU CAN PLAY
            </span>
          </h2>
        </div>

        {/* Engine chips */}
        <div className="hero-rise flex flex-wrap items-center justify-center gap-2.5 mb-9">
          {['Unity', 'Unreal Engine', 'Godot', 'C#', 'C++'].map((t) => (
            <span key={t} className="px-3.5 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white/70">
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-rise flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => goTo('#showcase-section')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] text-white font-mono tracking-widest uppercase text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,94,160,0.4)]"
          >
            Explore Games
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => goTo('#reel-section')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-white font-mono tracking-widest uppercase text-sm hover:bg-white/10 transition-colors"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Watch Reel
          </button>
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
