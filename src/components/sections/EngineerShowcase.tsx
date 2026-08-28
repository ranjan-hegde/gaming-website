"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import { Card3D } from '@/components/ui/Card3D';
import { Code2, ExternalLink } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function EngineerShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up animation for cards as they enter viewport
    const cards = gsap.utils.toArray<HTMLElement>('.eng-card');
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
    <section id="engineering" ref={containerRef} className="py-24 md:py-32 bg-[var(--bg-deep)] relative">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
            SOFTWARE <span className="text-gradient-teal">ENGINEERING</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--accent-teal)] to-transparent mt-4 mx-auto md:mx-0" />
        </div>

        {/* Vertical List of Horizontal Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <div key={project.id} className="eng-card">
              <Card3D maxTilt={5} glareColor="rgba(45, 212, 191, 0.15)">
                <div className="flex flex-col lg:flex-row-reverse min-h-[400px] lg:h-[500px] w-full bg-[var(--bg-surface)]">
                  
                  {/* Image (60%) - on the right for engineering to differentiate from games */}
                  <div className="w-full lg:w-[60%] h-[300px] lg:h-full relative overflow-hidden group/img">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/img:scale-105"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--bg-surface)] hidden lg:block" />
                    
                    {/* Type Tag */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 glass rounded-full border border-white/10 backdrop-blur-md">
                      <span className="text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Content (40%) */}
                  <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center relative">
                    
                    {/* Background number watermark */}
                    <div className="absolute top-4 left-8 font-[family-name:var(--font-bebas-neue)] text-9xl text-white/[0.02] select-none pointer-events-none">
                      0{index + 1}
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-5xl tracking-wide text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                        <span className="text-[var(--accent-teal)] font-mono tracking-wider">{project.techStack[0]}</span>
                        <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span className="text-[var(--text-secondary)] font-mono tracking-wider">{project.year}</span>
                      </div>

                      <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 text-xs font-mono tracking-wider bg-white/5 border border-white/5 rounded-full text-[var(--text-muted)]">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 group/btn">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
                            <ExternalLink className="w-4 h-4 text-[var(--text-secondary)] group-hover/btn:text-white transition-colors" />
                          </div>
                          <span className="font-mono text-sm tracking-widest text-[var(--text-secondary)] group-hover/btn:text-white transition-colors uppercase">
                            View Live
                          </span>
                        </button>

                        <button className="flex items-center gap-2 group/btn">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
                            <Code2 className="w-4 h-4 text-[var(--text-secondary)] group-hover/btn:text-white transition-colors" />
                          </div>
                          <span className="font-mono text-sm tracking-widest text-[var(--text-secondary)] group-hover/btn:text-white transition-colors uppercase">
                            Source
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
