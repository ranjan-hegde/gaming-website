"use client";

import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface CardDetailProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  mediaPlaceholder?: boolean;
  mediaImage?: string;
  type: 'game' | 'project';
  meta?: {
    genre?: string;
    engine?: string;
    language?: string;
    year?: string;
    platforms?: string[];
    liveUrl?: string;
    sourceUrl?: string;
  };
}

export function CardDetail({
  isOpen,
  onClose,
  title,
  description,
  longDescription,
  techStack,
  mediaPlaceholder = false,
  mediaImage,
  type,
  meta,
}: CardDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle click on ::backdrop to close native dialog
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-title"
      className="m-auto w-full max-w-4xl max-h-[90vh] rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden dialog-animated"
    >
      <div className="relative w-full h-full flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-[var(--glass-border)] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-y-auto w-full h-full">
          {/* Hero Media Area */}
          <div className="w-full aspect-video relative bg-[var(--bg-surface)] overflow-hidden rounded-t-lg flex items-center justify-center">
            {mediaPlaceholder ? (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: type === 'game' 
                    ? 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-orange) 100%)'
                    : 'linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-cyan) 100%)'
                }}
              >
                <span className="font-[family-name:var(--font-bebas-neue)] text-4xl text-white opacity-80 tracking-widest text-center px-4">
                  MEDIA COMING SOON
                </span>
              </div>
            ) : mediaImage ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mediaImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-black/50" />
            )}
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-12">
            <h2 id="dialog-title" className="font-[family-name:var(--font-bebas-neue)] tracking-wide text-4xl md:text-6xl mb-2">
              {title}
            </h2>
            
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              {type === 'game' ? (
                <>
                  {meta?.genre && (
                    <span className="px-3 py-1 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30">
                      {meta.genre}
                    </span>
                  )}
                  {meta?.engine && (
                    <span className="px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--glass-border)] text-[var(--text-secondary)]">
                      {meta.engine}
                    </span>
                  )}
                  {meta?.year && (
                    <span className="text-[var(--text-muted)]">{meta.year}</span>
                  )}
                  {meta?.platforms && meta.platforms.length > 0 && (
                    <div className="flex items-center gap-2 ml-2">
                      {meta.platforms.map(p => (
                        <span key={p} className="text-[var(--text-muted)]">{p}</span>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span className="px-3 py-1 rounded-full bg-[var(--accent-teal)]/20 text-[var(--accent-teal)] border border-[var(--accent-teal)]/30">
                    Project
                  </span>
                  {meta?.year && (
                    <span className="text-[var(--text-muted)]">{meta.year}</span>
                  )}
                </>
              )}
            </div>

            <p className="text-lg text-[var(--text-secondary)] mb-6">
              {description}
            </p>

            <div className="text-base text-[var(--text-secondary)]/80 mb-8 whitespace-pre-line leading-relaxed">
              {longDescription}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-10">
              {techStack.map(tech => (
                <span 
                  key={tech} 
                  className="px-3 py-1 rounded-full bg-[var(--bg-surface)]/50 text-[var(--text-primary)] text-xs font-mono border border-[var(--glass-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {type === 'game' ? (
                <>
                  <button className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-orange)] hover:opacity-90 transition-opacity">
                    Watch Gameplay
                  </button>
                  <button className="px-6 py-3 rounded-full text-sm font-semibold text-[var(--text-primary)] border border-[var(--glass-border)] bg-[var(--bg-surface)]/50 hover:bg-[var(--bg-surface)] transition-colors">
                    Play Demo
                  </button>
                </>
              ) : (
                <>
                  {meta?.liveUrl && (
                    <a href={meta.liveUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full text-sm font-semibold text-black bg-[var(--accent-teal)] hover:opacity-90 transition-opacity">
                      Live Demo
                    </a>
                  )}
                  {meta?.sourceUrl && (
                    <a href={meta.sourceUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full text-sm font-semibold text-[var(--text-primary)] border border-[var(--glass-border)] bg-[var(--bg-surface)]/50 hover:bg-[var(--bg-surface)] transition-colors">
                      Source Code
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
