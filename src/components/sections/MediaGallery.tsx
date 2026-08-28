"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Card3D } from '@/components/ui/Card3D';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusing some of the game images for the gallery
const galleryImages = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=800&q=80"
];

export function MediaGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We only want the horizontal scroll effect on desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    
    if (isDesktop && trackRef.current && containerRef.current) {
      // Get the width we need to translate
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const scrollDistance = trackWidth - containerWidth + (16 * 4); // + padding
      
      gsap.to(trackRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`, // Scroll distance determines how long it stays pinned
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-0 md:h-screen bg-[var(--bg-deep)] overflow-hidden flex flex-col justify-center">
      <div className="container-custom mb-12">
        <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
          MEDIA <span className="text-gradient-gold">GALLERY</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--accent-gold)] to-transparent mt-4" />
      </div>

      {/* The track that moves horizontally */}
      <div className="w-full pl-[clamp(1rem,4vw,3rem)] md:pr-[clamp(1rem,4vw,3rem)]">
        <div 
          ref={trackRef} 
          className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-max pr-4 md:pr-0"
        >
          {galleryImages.map((src, i) => (
            <div 
              key={i} 
              className="w-full md:w-[450px] h-[300px] md:h-[600px] shrink-0"
            >
              <Card3D maxTilt={8} glareColor="rgba(255,255,255,0.1)">
                <div className="w-full h-full relative group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Subtle border to frame the shot */}
                  <div className="absolute inset-4 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for horizontal section */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-4 text-[var(--text-secondary)] font-mono text-xs uppercase tracking-widest">
        <span>Scroll to pan</span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-secondary)] to-transparent" />
      </div>
    </section>
  );
}
