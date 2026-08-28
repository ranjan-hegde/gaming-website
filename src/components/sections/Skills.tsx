"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Code2, Database, Layout, Server, Cloud, Cpu } from 'lucide-react';
import { skills } from '@/lib/data';
import { Card3D } from '@/components/ui/Card3D';

// Map icon strings to actual Lucide components
const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout className="w-6 h-6" />,
  server: <Server className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
};

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade in categories sequentially
    gsap.fromTo('.skill-category',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="py-24 bg-[var(--bg-surface)] border-t border-white/5">
      <div className="container-custom">
        
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
            TECHNICAL <span className="text-gradient-teal">ARSENAL</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--accent-teal)] to-transparent mt-4 mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((category) => (
            <div key={category.title} className="skill-category h-full">
              <Card3D maxTilt={6} glareColor="rgba(45, 212, 191, 0.1)">
                <div className="p-8 h-full bg-[var(--bg-elevated)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-[var(--accent-teal)]/30 flex items-center justify-center text-[var(--accent-teal)]">
                      {iconMap[category.icon] || <Code2 className="w-6 h-6" />}
                    </div>
                    <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wide text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-4 py-2 bg-[var(--bg-deep)] border border-white/5 rounded-lg text-sm text-[var(--text-secondary)] font-mono tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
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
