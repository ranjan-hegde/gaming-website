"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/cinematic/LoadingScreen";
import Hero from "@/components/sections/Hero";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { VideoScrub } from "@/components/sections/VideoScrub";
import { GameDevTools } from "@/components/sections/GameDevTools";
import { Narrative } from "@/components/sections/Narrative";
import { Contact } from "@/components/sections/Contact";
import { Particles } from "@/components/ui/Particles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainRef.current) return;

    // ── Consistent cinematic stacking ──────────────────────────────────
    // The whole page is one "deck": every section has a higher z-index and
    // an opaque background than the one before it, so each new section rises
    // up and covers the previous one. The transition at every boundary is
    // the same mechanism (a −100vh overlap into the previous section's
    // fixed/empty tail), which is what keeps the stacking feeling consistent
    // instead of only working for the first two sections.

    // Hero is the base of the stack. Pinned with no spacer, it stays fixed
    // while the Showcase scrolls up over it, and zooms/dims as it's covered.
    ScrollTrigger.create({
      trigger: '#hero-section',
      start: 'top top',
      pin: true,
      pinSpacing: false,
    });

    gsap.to('#hero-content', {
      scale: 0.9,
      opacity: 0,
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Recompute positions after fonts/videos settle so the overlaps line up.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
    };
  }, { scope: mainRef });

  return (
    <>
      <LoadingScreen />
      <Particles />
      <Navbar />

      <main id="main" ref={mainRef} className="relative z-10 bg-black">

        {/* ═══════ Layer 1 — Hero (pinned base) ═══════ */}
        <section id="hero-section" className="relative z-[1] w-full h-screen">
          <div id="hero-content" className="w-full h-full will-change-transform">
            <Hero />
          </div>
        </section>

        {/* ═══════ Layer 2 — Showcase (rises over Hero) ═══════ */}
        {/* Self-pinned horizontal scroll; its long tail is safe to overlap. */}
        <section id="showcase-section" className="relative z-[2] w-full bg-black shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
          <CinematicShowcase />
        </section>

        {/* ═══════ Layer 3 — Timeline (rises over Showcase's tail) ═══════ */}
        <section id="timeline-section" className="relative z-[3] w-full bg-[var(--bg-deep)] rounded-t-[2.5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] mt-[-100vh]">
          <HistoryTimeline />
          {/* Empty tail the Reel can safely rise over — keeps timeline content visible. */}
          <div aria-hidden className="h-screen w-full" />
        </section>

        {/* ═══════ Layer 4 — Showreel (rises over Timeline's tail) ═══════ */}
        <section id="reel-section" className="relative z-[4] w-full bg-black shadow-[0_-30px_60px_rgba(0,0,0,0.9)] mt-[-100vh]">
          <VideoScrub />
        </section>

        {/* ═══════ Layer 5 — Tools / Narrative / Contact (rises over Reel's tail) ═══════ */}
        <section className="relative z-[5] w-full bg-[var(--bg-deep)] rounded-t-[2.5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] mt-[-100vh]">
          <GameDevTools />
          <Narrative />
          <Contact />
        </section>

      </main>

      <Footer />
    </>
  );
}
