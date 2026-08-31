"use client";

import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/cinematic/LoadingScreen";
import Hero from "@/components/sections/Hero";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { VideoScrub } from "@/components/sections/VideoScrub";
import { GameDevTools } from "@/components/sections/GameDevTools";
// Removed Skills import
import { Narrative } from "@/components/sections/Narrative";
import { Contact } from "@/components/sections/Contact";
import { Particles } from "@/components/ui/Particles";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Particles />
      <Navbar />

      <main id="main" className="relative z-10 bg-[var(--bg-deep)]">
        <Hero />

        <div>
          {/* Phase 1: Horizontal Cards Showcase */}
          <CinematicShowcase />

          {/* Phase 3: History Timeline */}
          <HistoryTimeline />

          {/* Phase 4: Scrubbing Video */}
          <VideoScrub />

          {/* Phase 5: Tools, Narrative, Contact */}
          <div className="relative bg-[var(--bg-deep)]">
            <GameDevTools />
            <Narrative />
            <Contact />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
