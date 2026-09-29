import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Memory } from '../types';
import SectionReveal from './SectionReveal';

type GalleryProps = { memories: Memory[] };

export default function Gallery({ memories }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const currentIndexRef = useRef(selectedIndex);
  const isOpen = selectedIndex !== null;
  const selectedMemory = selectedIndex === null ? null : memories[selectedIndex];

  useEffect(() => {
    currentIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeys = (event: KeyboardEvent) => {
      const current = currentIndexRef.current;
      if (current === null) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((current + 1) % memories.length);
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((current - 1 + memories.length) % memories.length);
      } else if (event.key === 'Tab' && dialogRef.current) {
        const buttons = dialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton?.focus();
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault();
          firstButton?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeys);
      triggerRef.current?.focus();
    };
  }, [isOpen, memories.length]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ') event.stopPropagation();
  };

  return (
    <section id="memories" className="gallery-section" aria-labelledby="gallery-title">
      <div className="section-width">
        <SectionReveal className="gallery-header">
          <h2 className="section-title" id="gallery-title">Beautiful <em>Moments</em></h2>
          <p>A few little things we thought you’d love.</p>
        </SectionReveal>
        <div className="gallery-grid">
          {memories.map((memory, index) => (
            <SectionReveal className={`gallery-item gallery-item--${index + 1}`} key={memory.id}>
              <button
                className={`gallery-photo-button ${memory.shape ?? ''}`}
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
                aria-label={`Open photo: ${memory.caption}`}
                aria-haspopup="dialog"
              >
                <img
                  className="gallery-photo"
                  src={memory.image}
                  alt={memory.alt}
                  loading="lazy"
                  style={{ objectPosition: memory.position }}
                />
                <span className="gallery-photo-overlay" aria-hidden="true" />
              </button>
              <p className="gallery-caption">{memory.caption}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && selectedMemory && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedIndex(null);
            }}
          >
            <motion.div
              id="memory-lightbox"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-caption"
              className="lightbox-dialog"
              onKeyDown={handleDialogKeyDown}
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <button className="lightbox-control lightbox-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close photo">
                <X size={21} strokeWidth={1.5} />
              </button>
              <button
                className="lightbox-control lightbox-prev"
                type="button"
                aria-label="Previous photo"
                onClick={() => setSelectedIndex((selectedIndex! - 1 + memories.length) % memories.length)}
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <figure className="lightbox-figure">
                <img src={selectedMemory.image} alt={selectedMemory.alt} />
                <figcaption id="lightbox-caption">{selectedMemory.caption}</figcaption>
              </figure>
              <button
                className="lightbox-control lightbox-next"
                type="button"
                aria-label="Next photo"
                onClick={() => setSelectedIndex((selectedIndex! + 1) % memories.length)}
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
