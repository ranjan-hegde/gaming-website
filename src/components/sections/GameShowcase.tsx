"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { games } from '@/lib/data';
import { Card3D } from '@/components/ui/Card3D';
import { Play } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GameShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up animation for cards as they enter viewport
    const cards = gsap.utils.toArray<HTMLElement>('.game-card');
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="games" ref={containerRef} className="py-24 md:py-32 bg-[var(--bg-deep)] relative">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
            GAME <span className="text-gradient-gold">DEVELOPMENT</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--accent-gold)] to-transparent mt-4 mx-auto md:mx-0" />
        </div>

        {/* Vertical List of Horizontal Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {games.map((game, index) => (
            <div key={game.id} className="game-card">
              <Card3D maxTilt={5} glareColor="rgba(212, 168, 83, 0.15)">
                <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[500px] w-full bg-[var(--bg-surface)]">
                  
                  {/* Left: Image (60%) */}
                  <div className="w-full lg:w-[60%] h-[300px] lg:h-full relative overflow-hidden group/img">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/img:scale-105"
                      style={{ backgroundImage: `url(${game.image})` }}
                    />
                    {/* Gradient overlay for text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-surface)] hidden lg:block" />
                    
                    {/* Genre Tag */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full border border-white/10 backdrop-blur-md">
                      <span className="text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase">
                        {game.genre}
                      </span>
                    </div>
                  </div>

                  {/* Right: Content (40%) */}
                  <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center relative">
                    
                    {/* Background number watermark */}
                    <div className="absolute top-4 right-8 font-[family-name:var(--font-bebas-neue)] text-9xl text-white/[0.02] select-none pointer-events-none">
                      0{index + 1}
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-5xl tracking-wide text-white mb-2">
                        {game.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                        <span className="text-[var(--accent-gold)] font-mono tracking-wider">{game.engine}</span>
                        <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)] font-mono tracking-wider">{game.language}</span>
                        <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)] font-mono tracking-wider">{game.year}</span>
                      </div>

                      <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 leading-relaxed">
                        {game.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-10">
                        {game.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 text-xs font-mono tracking-wider bg-white/5 border border-white/5 rounded-full text-[var(--text-muted)]">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 group/btn">
                          <div className="w-12 h-12 rounded-full border border-[var(--accent-gold)] flex items-center justify-center group-hover/btn:bg-[var(--accent-gold)] transition-colors">
                            <Play className="w-4 h-4 text-[var(--accent-gold)] group-hover/btn:text-[var(--bg-deep)] transition-colors ml-1" fill="currentColor" />
                          </div>
                          <span className="font-mono text-sm tracking-widest text-[var(--text-secondary)] group-hover/btn:text-white transition-colors uppercase">
                            Watch Trailer
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
