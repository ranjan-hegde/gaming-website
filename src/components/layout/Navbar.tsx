"use client";

import { useState, useEffect, useCallback } from "react";
import { FullScreenDrawer } from "./FullScreenDrawer";
import { PortfolioMode } from "@/app/page";

interface NavbarProps {
  currentMode?: PortfolioMode;
  onModeChange?: (mode: PortfolioMode) => void;
}

/**
 * Navbar — Sticky navigation bar with mode switcher and hamburger menu.
 */
export function Navbar({ currentMode, onModeChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 80);
    // Hide nav on scroll down, show on scroll up (only after hero)
    if (currentY > 300) {
      setIsHidden(currentY > lastScrollY && currentY - lastScrollY > 5);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModeClick = (mode: PortfolioMode) => {
    if (onModeChange) onModeChange(mode);
    setIsMenuOpen(false); // Close drawer if open
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-[rgba(10,14,23,0.85)] backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-[clamp(1rem,4vw,3rem)]">
          {/* Skip to content — visually hidden */}
          <a
            href="#main"
            className="absolute -top-full left-4 bg-[var(--accent-gold)] text-[var(--bg-deep)] px-4 py-2 rounded-b-lg z-[200] focus:top-0 transition-all text-sm font-semibold"
          >
            Skip to Main Content
          </a>

          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="relative text-2xl md:text-3xl font-[family-name:var(--font-bebas-neue)] text-white tracking-wider hover:opacity-80 transition-opacity"
            aria-label="Scroll to top"
          >
            <span className="relative z-10">R*</span>
            <span
              className="absolute inset-0 blur-md opacity-40"
              style={{ color: "var(--accent-gold)" }}
              aria-hidden="true"
            >
              R*
            </span>
          </button>

          {/* Center Mode Switcher (Desktop) */}
          {currentMode && onModeChange && (
            <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button
                onClick={() => handleModeClick('games')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  currentMode === 'games' 
                    ? 'bg-[var(--accent-gold)] text-[var(--bg-deep)]' 
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Game Dev
              </button>
              <button
                onClick={() => handleModeClick('engineering')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  currentMode === 'engineering' 
                    ? 'bg-[var(--accent-teal)] text-[var(--bg-deep)]' 
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                Engineering
              </button>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              data-menu-open={isMenuOpen ? "true" : "false"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="nav-drawer"
            >
              <span className="hamburger-line block w-6 h-[2px] bg-white origin-center" />
              <span className="hamburger-line block w-6 h-[2px] bg-white origin-center" />
              <span className="hamburger-line block w-6 h-[2px] bg-white origin-center" />
            </button>
          </div>
        </div>
      </nav>

      <FullScreenDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
