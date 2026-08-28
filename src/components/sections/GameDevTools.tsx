"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { tools } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Group tools by category
const groupedTools = tools.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, typeof tools>);

export function GameDevTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tool-card", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-[var(--container-padding)] bg-[var(--bg-deep)] overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto container-custom">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[var(--text-section)] font-[family-name:var(--font-bebas-neue)] tracking-wide text-white">
            TOOL <span className="text-gradient-gold">MASTERY</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[var(--accent-gold)] to-transparent mt-4 mx-auto md:mx-0" />
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {Object.entries(groupedTools).map(([category, items]) => (
            <div key={category} className="tool-card">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--accent-gold)] mb-4 font-semibold">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((tool) => (
                  <div
                    key={tool.name}
                    className="glass rounded-xl px-5 py-4 flex items-center justify-between group hover:border-[rgba(212,168,83,0.3)] hover:bg-[var(--bg-card)] transition-colors"
                  >
                    <span className="text-sm md:text-base font-medium text-white">
                      {tool.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {'// ACTIVE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
