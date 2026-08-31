"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download, X } from 'lucide-react';
import { Game } from '@/lib/data';
import { GameBox3D } from './GameBox3D';

interface GameDetailsModalProps {
  item: Game | null;
  onClose: () => void;
}

export function GameDetailsModal({ item, onClose }: GameDetailsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item) {
      // Body lock
      document.body.style.overflow = 'hidden';

      // Animate in
      gsap.fromTo(overlayRef.current, 
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(16px)', duration: 0.5, ease: 'power3.out' }
      );
      
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.9, y: 40, rotationX: 10 },
        { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  // 3D Tilt effect for the modal itself
  useEffect(() => {
    if (!contentRef.current || !item) return;

    const xTo = gsap.quickTo(contentRef.current, "rotationY", { ease: "power3", duration: 0.8 });
    const yTo = gsap.quickTo(contentRef.current, "rotationX", { ease: "power3", duration: 0.8 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = window.document.body.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt (max 3 degrees)
      const rotateY = ((x - centerX) / centerX) * 3;
      const rotateX = -((y - centerY) / centerY) * 3;

      xTo(rotateY);
      yTo(rotateX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [item]);

  if (!item) return null;

  const handleClose = () => {
    // Animate out
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.4, ease: 'power2.in', onComplete: onClose });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden perspective-[2000px]">
      {/* Background Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80"
        onClick={handleClose}
      >
        {item.videoUrl ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
            src={item.videoUrl}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        )}
        
        {/* GTA VI ambient gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,94,160,0.3), rgba(240,192,64,0.3))' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Main Content Modal with Preserve 3D */}
      <div 
        ref={contentRef}
        className="relative z-10 w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto glass p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 custom-scrollbar transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors border border-white/10 z-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: 3D PlayStation Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-8" style={{ transform: 'translateZ(30px)' }}>
            <GameBox3D image={item.image} title={item.title} />
            
            {item.downloadUrl && (
              <div className="mt-12">
                <a 
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] text-white font-mono tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,94,160,0.4)]"
                >
                  <Download className="w-5 h-5" />
                  Download Game
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-full border bg-black/40 border-[var(--accent-gold)]/30 text-[var(--accent-gold)]`}>
                {item.genre}
              </span>
              <span className="text-white/50 font-mono text-sm">{item.year}</span>
            </div>

            <h2 className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider mb-6 leading-[0.9] text-gradient-sunset">
              {item.title}
            </h2>

            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-8">
              {item.longDescription}
            </p>

            <div className="mb-8">
              <h4 className="font-mono text-sm tracking-widest text-white/50 uppercase mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {item.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-mono tracking-widest bg-white/5 border border-white/10 rounded-full text-white/70">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {item.features && (
                <div>
                  <h4 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] mt-2 shrink-0" />
                        <span className="font-light text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.challenges && (
                <div>
                  <h4 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-white mb-4">Development Challenges</h4>
                  <div className="space-y-4">
                    {item.challenges.map((challenge, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <p className="text-[var(--accent-gold)] font-mono text-xs uppercase tracking-wider mb-2">Problem:</p>
                        <p className="text-white/80 text-sm mb-3 font-light">{challenge.problem}</p>
                        <p className="text-[var(--accent-pink)] font-mono text-xs uppercase tracking-wider mb-2">Solution:</p>
                        <p className="text-white/80 text-sm font-light">{challenge.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
