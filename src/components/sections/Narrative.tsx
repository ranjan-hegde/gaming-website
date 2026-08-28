"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { narrativeText } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Narrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into words for animation
    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = '';
    
    words.forEach(word => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.className = 'opacity-20 transition-opacity duration-300';
      textRef.current?.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll('span');

    // Scrub opacity based on scroll
    gsap.to(spans, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[var(--bg-deep)] relative flex items-center justify-center">
      
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[var(--accent-gold)] via-transparent to-[var(--accent-teal)] blur-[100px]" />
      </div>

      <div className="container-custom relative z-10 max-w-5xl">
        <p 
          ref={textRef}
          className="text-2xl md:text-4xl lg:text-5xl font-[family-name:var(--font-bebas-neue)] tracking-wide leading-relaxed md:leading-relaxed lg:leading-relaxed text-white text-center"
        >
          {narrativeText}
        </p>
      </div>
    </section>
  );
}
