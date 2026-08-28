"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Card3D } from '@/components/ui/Card3D';
import { PortfolioMode } from '@/app/page';
import { games, projects } from '@/lib/data';
import { Play, Code2, ExternalLink } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinematicShowcaseProps {
  mode: PortfolioMode;
}

// Golden ratio: 1.618
const GOLDEN_RATIO = 1.618;

export function CinematicShowcase({ mode }: CinematicShowcaseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState('400vh');

  const isGames = mode === 'games';
  const data = isGames ? games : projects;

  useEffect(() => {
    function calcHeight() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const excess = trackWidth - window.innerWidth;
      const totalHeight = window.innerHeight + Math.max(excess * 2, window.innerHeight * 2);
      setScrollHeight(`${totalHeight}px`);
    }
    calcHeight();
    window.addEventListener('resize', calcHeight);
    const timer = setTimeout(calcHeight, 1500);
    return () => {
      window.removeEventListener('resize', calcHeight);
      clearTimeout(timer);
    };
  }, [mode, data]);

  useGSAP(() => {
    if (!wrapperRef.current || !trackRef.current) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    function getScrollAmount() {
      return track.scrollWidth - window.innerWidth;
    }

    // Fade IN the section
    gsap.fromTo(wrapper.querySelector('.sticky-inner')!,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      }
    );

    // Horizontal scroll
    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

  }, { scope: wrapperRef, dependencies: [mode, scrollHeight] });

  return (
    <div ref={wrapperRef} className="relative" style={{ height: scrollHeight }}>
      <div className="sticky-inner sticky top-0 h-screen w-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0c1220 0%, #141e30 40%, #1c1028 100%)',
        }}
      >
        {/* Ambient GTA6 gradient glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(255,94,160,0.15), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(45,212,191,0.1), transparent 60%)',
          }}
        />

        <div className="relative z-10 h-full flex items-center">

          {/* Typography — z-10, behind cards */}
          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 hidden md:block text-white pointer-events-none select-none">
            <span className={`text-sm md:text-lg font-mono tracking-[0.4em] uppercase mb-4 block ${isGames ? 'text-gradient-sunset' : 'text-gradient-teal'}`}
              style={{ WebkitTextFillColor: 'unset' }}
            >
              {isGames ? '// Game Dev' : '// Engineering'}
            </span>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(5rem,10vw,12rem)] tracking-wider leading-[0.85] mb-6 opacity-[0.08]">
              FEATURED<br />ARCHIVES
            </h2>
            <p className="text-sm font-mono opacity-30 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-[2px] bg-gradient-to-r from-[var(--accent-pink)] to-transparent" />
              Scroll to explore
            </p>
          </div>

          {/* The Track — z-20, cards above text */}
          <div
            ref={trackRef}
            className="relative z-20 flex gap-6 md:gap-10 px-4 md:pl-[35vw] md:pr-[15vw] h-max w-max items-center"
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className="shrink-0"
                // Golden ratio card: width based on viewport, height = width / golden ratio
                style={{ width: 'clamp(320px, 42vw, 580px)' }}
              >
                <Card3D
                  maxTilt={6}
                  glareColor={isGames ? "rgba(240, 192, 64, 0.12)" : "rgba(45, 212, 191, 0.12)"}
                >
                  <div
                    className="relative w-full bg-[var(--bg-card)] border border-white/10 rounded-2xl overflow-hidden group/card shadow-2xl"
                    style={{ aspectRatio: `${GOLDEN_RATIO} / 1` }}
                  >
                    {/* Full background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover/card:scale-110"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Accent border glow on hover */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none ${isGames ? 'shadow-[inset_0_0_40px_rgba(240,192,64,0.15)]' : 'shadow-[inset_0_0_40px_rgba(45,212,191,0.15)]'}`} />

                    {/* Top badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full border backdrop-blur-md ${isGames ? 'border-[var(--accent-gold)]/30 text-[var(--accent-gold)] bg-black/40' : 'border-[var(--accent-teal)]/30 text-[var(--accent-teal)] bg-black/40'}`}>
                        {'genre' in item ? item.genre : item.type}
                      </span>
                    </div>

                    {/* Index number */}
                    <div className="absolute top-3 right-4 z-10 font-[family-name:var(--font-bebas-neue)] text-5xl text-white/[0.06]">
                      0{index + 1}
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                      <h3 className={`font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl tracking-wide text-white mb-2 transition-colors duration-500 ${isGames ? 'group-hover/card:text-[var(--accent-gold)]' : 'group-hover/card:text-[var(--accent-teal)]'}`}>
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-3">
                        <span className={`font-mono text-xs tracking-wider ${isGames ? 'text-[var(--accent-pink)]' : 'text-[var(--accent-cyan)]'}`}>
                          {'engine' in item ? item.engine : item.techStack[0]}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <span className="text-white/50 font-mono text-xs">
                          {'language' in item ? item.language : item.year}
                        </span>
                      </div>

                      {/* Tech tags — only show first 3 */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 rounded-full text-white/60">
                            {tech}
                          </span>
                        ))}
                        {item.techStack.length > 3 && (
                          <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-white/40">
                            +{item.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <button className={`flex items-center gap-2 group/btn text-xs font-mono tracking-widest uppercase transition-colors ${isGames ? 'text-[var(--accent-gold)] hover:text-white' : 'text-[var(--accent-teal)] hover:text-white'}`}>
                        {isGames ? <Play className="w-3.5 h-3.5" fill="currentColor" /> : <ExternalLink className="w-3.5 h-3.5" />}
                        <span>{isGames ? 'View Project' : 'View Source'}</span>
                        <span className="w-0 group-hover/btn:w-6 h-[1px] bg-current transition-all duration-300" />
                      </button>
                    </div>
                  </div>
                </Card3D>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
