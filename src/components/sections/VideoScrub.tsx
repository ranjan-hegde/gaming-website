"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function VideoScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const videoSrc = "/videos/scrub-video-encoded.mp4";

  // Blob-fetch for perfect scrubbing
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const activate = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    document.documentElement.addEventListener("touchstart", activate, { once: true });

    const timer = setTimeout(() => {
      if (!window.fetch) return;
      const src = video.currentSrc || video.src;
      fetch(src)
        .then(r => r.blob())
        .then(blob => {
          const blobURL = URL.createObjectURL(blob);
          const t = video.currentTime;
          document.documentElement.addEventListener("touchstart", activate, { once: true });
          video.setAttribute("src", blobURL);
          video.currentTime = t + 0.01;
        })
        .catch(() => {});
    }, 1000);

    return () => {
      document.documentElement.removeEventListener("touchstart", activate);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(() => {
    if (!wrapperRef.current || !videoRef.current) return;

    const wrapper = wrapperRef.current;
    const video = videoRef.current;

    const initScrub = () => {
      // Video scrub
      gsap.fromTo(video,
        { currentTime: 0 },
        {
          currentTime: video.duration || 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        }
      );
    };

    if (video.readyState >= 1) {
      initScrub();
    } else {
      video.addEventListener('loadedmetadata', initScrub, { once: true });
    }

    // Title: fade in at start, hold, then fade out
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "top 60%",
            end: "15% top",
            scrub: 1,
          }
        }
      );
      gsap.to(titleRef.current, {
        opacity: 0, y: -40,
        scrollTrigger: {
          trigger: wrapper,
          start: "30% top",
          end: "45% top",
          scrub: 1,
        }
      });
    }

    // Stats: fade in mid-scroll
    if (statsRef.current) {
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: wrapper,
            start: "35% top",
            end: "50% top",
            scrub: 1,
          }
        }
      );
      gsap.to(statsRef.current, {
        opacity: 0, y: -30,
        scrollTrigger: {
          trigger: wrapper,
          start: "55% top",
          end: "65% top",
          scrub: 1,
        }
      });
    }

    // Quote: fade in at end
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: wrapper,
            start: "65% top",
            end: "80% top",
            scrub: 1,
          }
        }
      );
    }

  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Full-screen Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />

        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        {/* Subtle GTA6 color wash */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-color"
          style={{ background: 'linear-gradient(135deg, rgba(255,94,160,0.3), transparent 50%, rgba(45,212,191,0.2))' }}
        />

        {/* Content Layer 1: Title */}
        <div ref={titleRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0">
          <span className="font-mono text-xs md:text-sm tracking-[0.6em] uppercase text-[var(--accent-pink)] mb-4">
            Crafting Digital Worlds
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(4rem,14vw,14rem)] leading-none text-white tracking-widest text-center">
            THE REEL
          </h2>
          <p className="font-mono text-sm md:text-base text-white/50 mt-4 tracking-widest uppercase">
            Every frame tells a story
          </p>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--accent-pink)] to-transparent animate-pulse" />
          </div>
        </div>

        {/* Content Layer 2: Stats */}
        <div ref={statsRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
            {[
              { value: '4+', label: 'Games Shipped', color: 'var(--accent-gold)' },
              { value: '20+', label: 'Projects Built', color: 'var(--accent-pink)' },
              { value: '5+', label: 'Years Experience', color: 'var(--accent-teal)' },
              { value: '10+', label: 'Tools Mastered', color: 'var(--accent-orange)' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wider"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Layer 3: Quote */}
        <div ref={quoteRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none opacity-0 px-8">
          <div className="max-w-3xl text-center">
            <div className="text-6xl md:text-8xl text-[var(--accent-pink)] opacity-30 mb-4 font-serif">&ldquo;</div>
            <p className="text-xl md:text-3xl text-white/90 font-light leading-relaxed italic">
              Code is my medium.<br />
              <span className="text-gradient-sunset" style={{ WebkitTextFillColor: 'unset' }}>Impact is the measure.</span>
            </p>
            <div className="mt-8 w-16 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[var(--accent-pink)] to-transparent" />
          </div>
        </div>

      </div>
    </div>
  );
}
