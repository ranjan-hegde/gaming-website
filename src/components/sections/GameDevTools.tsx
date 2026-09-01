"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { tools, type ToolItem } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTechStyle } from "@/lib/techIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Short monogram used as a stand-in when a logo PNG is missing.
const MONOGRAM: Record<string, string> = {
  'Unity': 'U',
  'Unreal Engine': 'UE',
  'Blender': 'B',
  'Cinema 4D': 'C4',
  'Autodesk Maya': 'MA',
  'Adobe After Effects': 'AE',
  'DaVinci Resolve': 'DR',
  'C#': 'C#',
  'C++': 'C++',
  'HLSL/GLSL': 'GL',
};

/** Floating tool logo using React Icons */
function ToolLogo({ tool, delay }: { tool: ToolItem; delay: number }) {
  const style = getTechStyle(tool.name);
  const Icon = style.icon;

  return (
    <div
      className="flex h-24 w-24 md:h-28 md:w-28 items-center justify-center"
      style={{
        animation: `tool-float ${5 + (delay % 3)}s ease-in-out infinite`,
        animationDelay: `${delay * 0.4}s`,
        filter: `drop-shadow(0 14px 30px ${tool.color}66)`,
      }}
    >
      <Icon 
        className="w-16 h-16 md:w-20 md:h-20"
        style={{ color: tool.color || style.color }}
      />
    </div>
  );
}

export function GameDevTools() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // Arc positions use Math.sin/cos, which can differ in the last ULP between
  // the Node (SSR) and browser JS engines — enough to trip a hydration
  // mismatch on the transform string. Render a neutral, deterministic layout
  // on the server + first client paint, then fan the cards into the arc after
  // mount (the CSS transition turns that into a smooth reveal).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeTool = tools[active];

  const go = (dir: number) => {
    setActive((a) => (a + dir + tools.length) % tools.length);
  };

  useGSAP(
    () => {
      gsap.from(".tools-rise", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-[var(--container-padding)] overflow-hidden bg-[var(--bg-deep)]"
    >
      {/* Background color washes with the active tool's brand color */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${activeTool.color}55, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-colors duration-700 ease-out"
        style={{ backgroundColor: `${activeTool.color}12` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto container-custom">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <h2 className="tools-rise text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
            TOOL <span className="text-gradient-gold">MASTERY</span>
          </h2>
          <p className="tools-rise font-mono text-xs md:text-sm text-white/40 tracking-widest uppercase mt-3">
            Click a tool to bring it forward
          </p>
        </div>

        {/* Arc carousel — floating logos, no cards */}
        <div className="tools-rise relative h-[300px] md:h-[360px] w-full" style={{ perspective: "1400px" }}>
          {tools.map((tool, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const angle = offset * 24; // degrees along the arc
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * 300;
            const y = (1 - Math.cos(rad)) * 220; // sink at the sides → half-oval dome
            const scale = Math.max(0.5, 1 - abs * 0.16);
            const hidden = abs > 3;

            return (
              <button
                key={tool.name}
                onClick={() => setActive(i)}
                aria-label={tool.name}
                aria-pressed={i === active}
                className="absolute left-1/2 top-6 md:top-10 -ml-[60px] w-[120px] flex flex-col items-center focus:outline-none"
                style={{
                  transform: mounted
                    ? `translateX(${x}px) translateY(${y}px) rotate(${angle * 0.35}deg) scale(${scale})`
                    : "translateX(0px) translateY(0px) scale(0.85)",
                  opacity: mounted ? (hidden ? 0 : 1 - abs * 0.24) : 0,
                  zIndex: 50 - abs,
                  pointerEvents: hidden ? "none" : "auto",
                  transition:
                    "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
                }}
              >
                <ToolLogo tool={tool} delay={i} />
                <span
                  className={`mt-3 text-center font-mono text-[11px] tracking-widest uppercase leading-tight transition-colors duration-500 ${
                    i === active ? "text-white" : "text-white/40"
                  }`}
                >
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active tool readout + controls */}
        <div className="tools-rise mt-4 flex flex-col items-center gap-6">
          <div className="text-center">
            <span
              className="font-mono text-[11px] tracking-[0.4em] uppercase transition-colors duration-500"
              style={{ color: activeTool.color }}
            >
              {activeTool.category}
            </span>
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl tracking-wide text-white leading-none mt-1">
              {activeTool.name}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous tool"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {tools.map((tool, i) => (
                <button
                  key={tool.name}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${tool.name}`}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 26 : 10,
                    backgroundColor: i === active ? tool.color : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next tool"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
