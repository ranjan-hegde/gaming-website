"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GameBox3DProps {
  image: string;
  title: string;
}

export function GameBox3D({ image, title }: GameBox3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !boxRef.current) return;

    // Quick setters for smooth rotation
    const xTo = gsap.quickTo(boxRef.current, "rotationY", { ease: "power3", duration: 0.6 });
    const yTo = gsap.quickTo(boxRef.current, "rotationX", { ease: "power3", duration: 0.6 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (max 30 degrees)
      const rotateY = ((x - centerX) / centerX) * 30;
      const rotateX = -((y - centerY) / centerY) * 30;

      xTo(rotateY);
      yTo(rotateX);
    };

    const handleMouseLeave = () => {
      // Spring back to slightly angled resting position
      gsap.to(boxRef.current, {
        rotationY: -15,
        rotationX: 5,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Initial state
    gsap.set(boxRef.current, { rotationY: -15, rotationX: 5 });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-[3/4] max-w-[300px] mx-auto perspective-[1200px] cursor-grab active:cursor-grabbing"
    >
      <div 
        ref={boxRef} 
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Cover) */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-r-lg shadow-2xl backface-hidden border-l border-black/20"
          style={{ 
            backgroundImage: `url(${image})`,
            transform: 'translateZ(10px)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
          }}
        >
          {/* Glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* PS5-style Header Bar (Optional touch of realism) */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-white/90 rounded-tr-lg flex items-center justify-between px-2">
            <span className="text-black font-sans text-[8px] font-bold tracking-tight">PS5</span>
            <div className="w-12 h-[2px] bg-black/20 rounded-full" />
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-[#111] rounded-l-lg backface-hidden"
          style={{ 
            transform: 'rotateY(180deg) translateZ(10px)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full opacity-30">
            <div className="w-16 h-16 rounded-full border-2 border-white/20 mb-4" />
            <p className="font-mono text-xs text-white uppercase tracking-widest">{title}</p>
          </div>
        </div>

        {/* Left Spine */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[20px] bg-[#1a1a1a] flex items-center justify-center"
          style={{ 
            transform: 'rotateY(-90deg) translateZ(10px)',
            transformOrigin: 'left center'
          }}
        >
          <span className="text-white font-sans font-bold text-[10px] tracking-wider uppercase whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
            {title}
          </span>
        </div>

        {/* Right Spine (Pages/Disk edge - darker) */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-[20px] bg-black/80"
          style={{ 
            transform: 'rotateY(90deg) translateZ(10px)',
            transformOrigin: 'right center'
          }}
        />

        {/* Top edge */}
        <div 
          className="absolute top-0 left-0 right-0 h-[20px] bg-[#222]"
          style={{ 
            transform: 'rotateX(90deg) translateZ(10px)',
            transformOrigin: 'top center'
          }}
        />

        {/* Bottom edge */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[20px] bg-[#0a0a0a]"
          style={{ 
            transform: 'rotateX(-90deg) translateZ(10px)',
            transformOrigin: 'bottom center'
          }}
        />
      </div>
    </div>
  );
}
