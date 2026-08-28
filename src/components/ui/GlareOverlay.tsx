"use client";

import React from 'react';

interface GlareOverlayProps {
  x: number;
  y: number;
  visible: boolean;
  color?: string;
}

export function GlareOverlay({
  x,
  y,
  visible,
  color = 'rgba(255,255,255,0.15)',
}: GlareOverlayProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 transition-opacity duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(600px circle at ${x}% ${y}%, ${color}, transparent 50%)`,
        borderRadius: 'inherit',
      }}
    />
  );
}
