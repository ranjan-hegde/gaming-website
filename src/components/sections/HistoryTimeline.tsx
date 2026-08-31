"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { historyTimeline } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HistoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Animate the center line drawing down
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      }
    );

    // Animate each timeline item as it enters the viewport
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const isLeft = index % 2 === 0;

      gsap.fromTo(item,
        { 
          opacity: 0, 
          x: isLeft ? -50 : 50,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--bg-deep)] overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[80%] opacity-20 pointer-events-none blur-[120px]"
        style={{ background: 'linear-gradient(180deg, var(--accent-pink), var(--accent-ocean))' }}
      />

      <div className="container-custom relative z-10">
        <div className="text-center mb-24">
          <span className="font-mono text-sm tracking-[0.5em] uppercase text-gradient-sunset block mb-4">
            The Journey So Far
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-7xl md:text-9xl tracking-widest text-white leading-none">
            4 YEARS OF DEV
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* The vertical center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10 rounded-full">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-[var(--accent-pink)] via-[var(--accent-orange)] to-[var(--accent-teal)]" />
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {historyTimeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  ref={el => { itemsRef.current[index] = el }}
                  className={`relative flex items-center justify-between w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--bg-deep)] border-2 border-[var(--accent-gold)] -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(240,192,64,0.6)]" />

                  {/* Content Card */}
                  <div className="w-full md:w-5/12 pl-12 md:pl-0">
                    <div className="glass p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(255,94,160,0.15)] group">
                      <div className="inline-block px-3 py-1 mb-4 text-xs font-mono tracking-widest text-[var(--accent-pink)] border border-[var(--accent-pink)]/30 rounded-full bg-[var(--accent-pink)]/10 group-hover:bg-[var(--accent-pink)]/20 transition-colors">
                        {item.year}
                      </div>
                      <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-4xl tracking-wide text-white mb-3 group-hover:text-gradient-sunset transition-all">
                        {item.title}
                      </h3>
                      <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
