"use client";

import React, { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/cinematic/LoadingScreen";
import Hero from "@/components/sections/Hero";
import { VideoShowreel } from "@/components/sections/VideoShowreel";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { VideoScrub } from "@/components/sections/VideoScrub";
import { GameDevTools } from "@/components/sections/GameDevTools";
import { Skills } from "@/components/sections/Skills";
import { Narrative } from "@/components/sections/Narrative";
import { Contact } from "@/components/sections/Contact";
import { Particles } from "@/components/ui/Particles";

export type PortfolioMode = 'games' | 'engineering' | null;

export default function Home() {
  const [mode, setMode] = useState<PortfolioMode>('games');

  return (
    <>
      <LoadingScreen />
      <Particles />
      <Navbar currentMode={mode} onModeChange={setMode} />

      <main id="main" className="relative z-10 bg-[var(--bg-deep)]">
        <Hero currentMode={mode} onModeChange={setMode} />

        {mode && (
          <div>
            {/* Phase 1: Showreel */}
            <VideoShowreel currentMode={mode} onModeChange={setMode} />

            {/* Phase 2: Horizontal Cards Showcase */}
            <CinematicShowcase mode={mode} />

            {/* Phase 3: Scrubbing Video */}
            <VideoScrub />

            {/* Phase 4: Tools/Skills, Narrative, Contact */}
            <div className="relative bg-[var(--bg-deep)]">
              {mode === 'games' ? <GameDevTools /> : <Skills />}
              <Narrative />
              <Contact />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
