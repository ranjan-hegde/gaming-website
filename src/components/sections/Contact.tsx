"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Send, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { socialLinks } from '@/lib/data';

const CONTACT_EMAIL = 'indrajag2005@gmail.com';

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from('.contact-rise', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
    });
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 15% 20%, rgba(255,94,160,0.08), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(45,212,191,0.08), transparent 55%), var(--bg-deep)',
      }}
    >
      {/* Subtle dotted texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '44px 44px' }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <span className="contact-rise font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-gradient-sunset block mb-4">
            // Get in touch
          </span>
          <h2 className="contact-rise font-[family-name:var(--font-bebas-neue)] text-6xl md:text-8xl tracking-wide leading-[0.9] text-white mb-6">
            LET&apos;S BUILD<br />SOMETHING.
          </h2>
          <p className="contact-rise text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
            Have a game, a prototype, or a wild idea that needs an engineer?
            Drop a message and I&apos;ll get back to you within a couple of days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — details + socials */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-rise group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--accent-gold)]/40 transition-colors"
            >
              <span className="shrink-0 w-11 h-11 rounded-xl bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center text-[var(--accent-gold)]">
                <Mail className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Email</span>
                <span className="block text-white font-mono text-sm group-hover:text-[var(--accent-gold)] transition-colors break-all">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>

            <div className="contact-rise flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
              <span className="shrink-0 w-11 h-11 rounded-xl bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/30 flex items-center justify-center text-[var(--accent-teal)]">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Availability</span>
                <span className="block text-white font-mono text-sm">Open to freelance & full-time</span>
              </span>
            </div>

            <div className="contact-rise">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4">Elsewhere</span>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 bg-black/30 text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)] hover:text-white hover:border-white/30 transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="contact-rise h-full min-h-[24rem] flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/[0.04] p-10">
                <CheckCircle2 className="w-14 h-14 text-[var(--accent-teal)] mb-5" />
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl tracking-wide text-white mb-2">MESSAGE READY</h3>
                <p className="text-[var(--text-secondary)] text-sm max-w-sm">
                  Your message has been successfully sent. 
                  I will get back to you at my earliest convenience!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-xs font-mono tracking-widest uppercase text-[var(--accent-gold)] hover:text-white transition-colors"
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-rise flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                      placeholder="you@domain.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono text-white/40 mb-2 uppercase tracking-widest">Message</label>
                  <textarea
                    id="message" name="message" required rows={6}
                    value={form.message} onChange={handleChange}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-orange)] text-white font-mono tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(255,94,160,0.4)] transition-shadow"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
