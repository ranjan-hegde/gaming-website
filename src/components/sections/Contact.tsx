"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Send, X } from 'lucide-react';
import { socialLinks } from '@/lib/data';

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useGSAP(() => {
    if (!ctaRef.current || !textRef.current) return;
    
    // Magnetic button effect
    const btn = ctaRef.current;
    const text = textRef.current;
    
    const xToBtn = gsap.quickTo(btn, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yToBtn = gsap.quickTo(btn, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    
    const xToText = gsap.quickTo(text, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yToText = gsap.quickTo(text, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Move button towards mouse
      xToBtn(x * 0.4);
      yToBtn(y * 0.4);
      
      // Move text slightly more for parallax
      xToText(x * 0.2);
      yToText(y * 0.2);
    };

    const handleMouseLeave = () => {
      xToBtn(0);
      yToBtn(0);
      xToText(0);
      yToText(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-48 bg-[var(--bg-deep)] relative overflow-hidden">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

      <div className="container-custom relative z-10 flex flex-col items-center justify-center text-center">
        
        <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white mb-16">
          READY TO <span className="text-gradient-gold">BUILD?</span>
        </h2>

        {/* Magnetic CTA */}
        <button
          ref={ctaRef}
          onClick={() => setIsDialogOpen(true)}
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer group hover:bg-white/10 transition-colors"
        >
          {/* Inner pulse */}
          <div className="absolute inset-0 rounded-full border border-[var(--accent-gold)] scale-[0.8] opacity-0 group-hover:animate-[pulse-ring_2s_infinite]" />
          
          <span ref={textRef} className="text-xl md:text-2xl font-[family-name:var(--font-bebas-neue)] tracking-widest text-white group-hover:text-[var(--accent-gold)] transition-colors">
            GET IN TOUCH
          </span>
        </button>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-24">
          {socialLinks.map((link) => (
            <a 
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono tracking-widest text-[var(--text-secondary)] hover:text-white uppercase transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Dialog */}
      <dialog 
        open={isDialogOpen}
        className="fixed inset-0 m-auto z-[200] w-[90vw] max-w-lg glass"
      >
        <div className="p-8 relative">
          <button 
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl text-white mb-2">INITIATE SEQUENCE</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-8">System ready to receive transmission.</p>

          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsDialogOpen(false); }}>
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Return Address</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-[var(--bg-deep)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors font-mono text-sm"
                placeholder="you@domain.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase tracking-widest">Payload</label>
              <textarea 
                id="message" 
                required
                rows={4}
                className="w-full bg-[var(--bg-deep)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors font-mono text-sm resize-none"
                placeholder="Enter transmission data..."
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-[var(--accent-gold)] text-[var(--bg-deep)] font-[family-name:var(--font-bebas-neue)] tracking-widest text-xl py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors"
            >
              <Send className="w-5 h-5" />
              TRANSMIT
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
}
