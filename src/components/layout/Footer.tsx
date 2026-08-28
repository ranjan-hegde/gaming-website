"use client";

import { ArrowUp } from "lucide-react";
import { socialLinks } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--bg-deep)] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl text-white mb-4">
              RANJU
            </h2>
            <p className="text-[var(--text-secondary)] max-w-sm mb-6">
              Building immersive worlds and engineering scalable systems. Available for freelance opportunities and full-time roles.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">Socials</h3>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Col */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">Connect</h3>
            <a 
              href="mailto:hello@example.com"
              className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              Start a Conversation
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-[var(--text-muted)] text-sm font-mono">
            © {new Date().getFullYear()} Ranju. All rights reserved.
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors group"
          >
            <span className="text-sm font-mono uppercase tracking-widest">Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
