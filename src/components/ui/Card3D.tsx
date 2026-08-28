"use client";

import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { GlareOverlay } from './GlareOverlay';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glareColor?: string;
  maxTilt?: number;
  disabled?: boolean;
}

export function Card3D({
  children,
  className = '',
  onClick,
  glareColor = 'rgba(255,255,255,0.15)',
  maxTilt = 10,
  disabled = false,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();
  
  // Track current rotation for smooth interpolation
  const currentRot = useRef({ x: 0, y: 0, scale: 1 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover)').matches) return; // Desktop only
    
    if (!cardRef.current || !innerRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized pointer position (0-1) relative to card
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation (-maxTilt to +maxTilt). Opposite to mouse for realistic 3D feel.
    // When mouse is right (x > 0.5), card rotates left (rotateY < 0).
    const rotateY = (0.5 - x) * (maxTilt * 2);
    const rotateX = (y - 0.5) * (maxTilt * 2);

    // Update target rotation and animate smoothly
    gsap.to(currentRot.current, {
      x: rotateX,
      y: rotateY,
      scale: 1.02, // Subtle scale up on hover
      duration: 0.4,
      ease: 'power3.out',
      onUpdate: () => {
        if (innerRef.current) {
          innerRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg) scale(${currentRot.current.scale})`;
        }
      }
    });
    
    // Update glare overlay position in percentage
    setGlarePos({ x: x * 100, y: y * 100 });
  }, [disabled, prefersReducedMotion, maxTilt]);

  const handlePointerEnter = () => {
    if (disabled || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (disabled || prefersReducedMotion) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    
    setIsHovered(false);
    
    // Spring back to default flat rotation on mouse leave
    gsap.to(currentRot.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      onUpdate: () => {
        if (innerRef.current) {
          innerRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg) scale(${currentRot.current.scale})`;
        }
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full cursor-pointer card-3d ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative rounded-lg overflow-hidden glass transition-colors duration-300"
        style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' }}
      >
        {children}
        
        {!disabled && !prefersReducedMotion && (
          <GlareOverlay 
            x={glarePos.x} 
            y={glarePos.y} 
            visible={isHovered} 
            color={glareColor} 
          />
        )}
      </div>
    </div>
  );
}
