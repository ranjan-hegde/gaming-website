"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FullScreenDrawer } from "./FullScreenDrawer";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Navbar — Sticky navigation bar with hamburger menu and BGM control.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio("/bgm.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Slightly lower volume for BGM

    // Attempt to play on first user interaction to bypass autoplay restrictions
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.log("Autoplay blocked:", err);
          });
      }
      
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("scroll", handleInteraction, { passive: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
      setHasInteracted(true); // User explicitly interacted
    }
  };

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <span className="relative z-10">I*</span>
            <span
              className="absolute inset-0 blur-md opacity-40"
              style={{ color: "var(--accent-gold)" }}
              aria-hidden="true"
            >
              I*
            </span>
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Music Toggle */}
            <button
              onClick={toggleMusic}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-white"
              aria-label={isPlaying ? "Mute music" : "Play music"}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-[var(--accent-gold)]" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/50" />
              )}
            </button>

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
