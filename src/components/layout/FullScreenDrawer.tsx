"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
// We use simple SVG elements to avoid dependency on lucide-react just in case, but using standard svgs as icons.
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.14-3.2s-1.12-.3-3.4 1.2a11.5 11.5 0 0 0-6.2 0C6.12 1.5 5 1.8 5 1.8a4.2 4.2 0 0 0-.14 3.2 4.6 4.6 0 0 0-1.39 3.2c0 5.6 3.35 6.6 6.5 7.02a4.8 4.8 0 0 0-1 2.98v4"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const GamepadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
);

interface FullScreenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenDrawer({ isOpen, onClose }: FullScreenDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  // Focus management and escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      
      if (e.key === 'Tab' && isOpen && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      // Wait for animation to start
      setTimeout(() => {
        const closeBtn = containerRef.current?.querySelector('button');
        closeBtn?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useGSAP(() => {
    if (isOpen) {
      // Stagger animate links in
      const links = gsap.utils.toArray('.drawer-link');
      gsap.fromTo(links, 
        { x: 60, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  // Match the sections actually rendered on the page (see src/app/page.tsx).
  const navLinks = [
    { label: 'Home', target: 0 },
    { label: 'Games', target: '#showcase-section' },
    { label: 'Journey', target: '#timeline-section' },
    { label: 'Showreel', target: '#reel-section' },
    { label: 'Tools', target: '#tools' },
    { label: 'Contact', target: '#contact' },
  ] as const;

  const handleNavigate = (target: string | number) => {
    onClose();
    // Wait for the drawer's slide-out + scroll-unlock before scrolling.
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(target, { offset: -1, duration: 1.2 });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 380);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[150] bg-[var(--bg-obsidian,#09090b)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-[clamp(1rem,4vw,3rem)] py-4 h-[64px] border-b border-[var(--glass-border,rgba(255,255,255,0.1))]">
        <span className="font-[family-name:var(--font-bebas-neue)] text-sm text-[var(--text-muted,#52525b)] tracking-widest">
          MENU
        </span>
        <button
          onClick={onClose}
          className="text-[var(--text-primary,#f4f4f5)] hover:text-[var(--accent-warm,#ff5c00)] transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-[#ff5c00]"
          aria-label="Close navigation menu"
        >
          <XIcon />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 overflow-y-auto py-8">
        {navLinks.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => handleNavigate(link.target)}
            className="drawer-link group relative font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl uppercase text-[var(--text-primary,#f4f4f5)] transition-transform duration-300 hover:translate-x-1"
          >
            {link.label}
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[var(--accent-warm,#ff5c00)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="py-8 flex justify-center gap-8 border-t border-[var(--glass-bg,rgba(255,255,255,0.05))] text-[var(--text-secondary,#a1a1aa)]">
        <a href="#" className="hover:text-[var(--accent-cool,#00f0ff)] hover:scale-110 transition-all duration-300" aria-label="GitHub">
          <GithubIcon />
        </a>
        <a href="#" className="hover:text-[var(--accent-cool,#00f0ff)] hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
        <a href="#" className="hover:text-[var(--accent-warm,#ff5c00)] hover:scale-110 transition-all duration-300" aria-label="Twitter">
          <TwitterIcon />
        </a>
        <a href="#" className="hover:text-[var(--accent-warm,#ff5c00)] hover:scale-110 transition-all duration-300" aria-label="Itch.io">
          <GamepadIcon />
        </a>
      </div>
    </div>
  );
}
