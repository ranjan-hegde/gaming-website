"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { tools, stats, socialLinks } from '@/lib/data';

/**
 * OutroPanel — Final deck card: a "get in touch" contact form alongside a
 * compact stats + tools summary, with social links across the bottom.
 */
export function OutroPanel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-gold)]/60 focus:bg-white/[0.06] transition-colors';

  return (
    <section
      className="relative w-full h-full flex items-center justify-center overflow-y-auto px-6 md:px-12 py-16"
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(240,192,64,0.14), transparent 60%), var(--bg-deep)',
      }}
    >
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* ── Left: pitch + stats + tools ── */}
        <div>
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-gradient-sunset block mb-4">
            // Let&apos;s Talk
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wide text-white leading-[0.9] mb-8">
            READY TO <span className="text-gradient-gold">BUILD?</span>
          </h2>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-bebas-neue)] text-3xl md:text-5xl text-gradient-sunset leading-none">
                  {s.value}
                </div>
                <div className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-[var(--text-muted)] mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {tools.slice(0, 6).map((t) => (
              <span
                key={t.name}
                className="px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-[var(--text-secondary)] border border-[var(--glass-border)] bg-[var(--bg-surface)]/50"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
        {/* ── Right: contact form ── */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-name" className="block font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2">
                  Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="block font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@studio.com"
                  className={field}
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="block font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-2">
                Description
              </label>
              <textarea
                id="c-msg"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or idea…"
                className={`${field} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-orange)] hover:opacity-90 transition-opacity shadow-[0_0_36px_rgba(240,192,64,0.4)]"
            >
              <Send className="w-4 h-4" />
              {sent ? 'Opening your mail app…' : 'Send Message'}
            </button>
          </form>

          {/* Socials */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 pt-6 border-t border-white/10">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-white uppercase transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
