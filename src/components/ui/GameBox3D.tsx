"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GameBox3DProps {
  image: string;
  title: string;
  onHoverStateChange?: (isHovered: boolean) => void;
  onColorExtracted?: (color: string) => void;
}

export function GameBox3D({ image, title, onHoverStateChange, onColorExtracted }: GameBox3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Extract average color from image
  useEffect(() => {
    if (!onColorExtracted) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = 64;
      canvas.height = 64;
      ctx.drawImage(img, 0, 0, 64, 64);
      
      try {
        const imageData = ctx.getImageData(0, 0, 64, 64).data;
        let r = 0, g = 0, b = 0;
        let count = 0;
        
        for (let i = 0; i < imageData.length; i += 16) { // Sample every 4th pixel
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }
        
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        
        onColorExtracted(`rgb(${r}, ${g}, ${b})`);
      } catch (e) {
        console.error("Could not extract color (CORS issue?)", e);
      }
    };
  }, [image, onColorExtracted]);

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
      
      // Dynamic glare tracking
      if (glareRef.current) {
        // Move gradient based on mouse position
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        gsap.to(glareRef.current, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
          duration: 0.1
        });
      }
    };

    const handleMouseEnter = () => {
      if (onHoverStateChange) onHoverStateChange(true);
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 1, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      if (onHoverStateChange) onHoverStateChange(false);
      
      // Spring back to slightly angled resting position
      gsap.to(boxRef.current, {
        rotationY: -15,
        rotationX: 5,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const container = containerRef.current;
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      // Initial state
      gsap.set(boxRef.current, { rotationY: -15, rotationX: 5 });

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
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
          className="absolute inset-0 rounded-r-md shadow-2xl backface-hidden border-l border-white/30 overflow-hidden"
          style={{ 
            transform: 'translateZ(10px)',
            boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.5), 10px 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {/* PS5-style Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-[12%] bg-white flex flex-col justify-center items-center z-10 border-b border-black/10">
            <div className="flex items-center gap-1.5 opacity-90">
              {/* PS Logo approximation */}
              <svg viewBox="0 0 50 50" className="h-3 md:h-4 w-auto fill-black">
                <path d="M12 28.5c-2.5 0-4.5 1-4.5 2.5s2 2.5 4.5 2.5 4.5-1 4.5-2.5-2-2.5-4.5-2.5zm19-8.5c-7.5 0-13.5 1.5-13.5 4.5 0 2 3.5 3.5 8 4.2V25c-5-.5-8-1.5-8-2.5 0-1.5 5.5-3 12.5-3s12.5 1.5 12.5 3c0 2-7.5 3.8-15 4.2v4.2c9-.5 16.5-2.8 16.5-5.5 0-3.5-6.5-5.4-13-5.4zm-14.5 9v11.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V14.5C11.5 13 12.5 12 14 12s2.5 1 2.5 2.5v14.5z"/>
              </svg>
              <span className="text-black font-sans text-[8px] md:text-[10px] tracking-tighter">PS5</span>
            </div>
          </div>

          {/* Cover Art */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[88%] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Glare effect */}
          <div 
            ref={glareRef}
            className="absolute inset-0 opacity-0 pointer-events-none mix-blend-screen z-20"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)' }}
          />
          
          {/* Plastic Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none mix-blend-overlay z-10" />
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 bg-[#0c0c0c] rounded-l-md backface-hidden overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg) translateZ(10px)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full opacity-30 px-4">
            <div className="w-full h-32 bg-white/5 rounded mb-4" />
            <div className="w-full h-4 bg-white/10 rounded mb-2" />
            <div className="w-3/4 h-4 bg-white/10 rounded mb-4" />
            <div className="grid grid-cols-2 gap-2 w-full mt-auto mb-4">
              <div className="h-12 bg-white/5 rounded" />
              <div className="h-12 bg-white/5 rounded" />
            </div>
            <p className="font-mono text-[8px] text-white uppercase tracking-widest mt-auto mb-2 opacity-50">{title}</p>
          </div>
        </div>

        {/* Left Spine */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[20px] bg-[#111] flex flex-col items-center justify-between py-4 border-r border-black/40 shadow-inner"
          style={{ 
            transform: 'rotateY(-90deg) translateZ(10px)',
            transformOrigin: 'left center'
          }}
        >
          <div className="text-white opacity-80">
            {/* PS Logo tiny */}
            <svg viewBox="0 0 50 50" className="h-2 w-auto fill-white">
              <path d="M12 28.5c-2.5 0-4.5 1-4.5 2.5s2 2.5 4.5 2.5 4.5-1 4.5-2.5-2-2.5-4.5-2.5zm19-8.5c-7.5 0-13.5 1.5-13.5 4.5 0 2 3.5 3.5 8 4.2V25c-5-.5-8-1.5-8-2.5 0-1.5 5.5-3 12.5-3s12.5 1.5 12.5 3c0 2-7.5 3.8-15 4.2v4.2c9-.5 16.5-2.8 16.5-5.5 0-3.5-6.5-5.4-13-5.4zm-14.5 9v11.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5V14.5C11.5 13 12.5 12 14 12s2.5 1 2.5 2.5v14.5z"/>
            </svg>
          </div>
          <span className="text-white font-sans font-bold text-[8px] tracking-wider uppercase whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
            {title}
          </span>
          <div className="w-3 h-3 border border-white/20 rounded-sm opacity-50" />
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
