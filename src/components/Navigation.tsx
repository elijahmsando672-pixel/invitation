import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';

type LinkItem = { id: string; label: string };
const links: LinkItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'message', label: 'Message' },
  { id: 'details', label: 'Details' },
  { id: 'memories', label: 'Memories' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY < 70 || currentY < lastY || currentY < 10);
      lastY = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <motion.header
      className="floating-nav"
      aria-label="Invitation navigation"
      initial={false}
      animate={{ y: isVisible ? 0 : -95, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <button className="nav-monogram" type="button" onClick={() => goTo('home')} aria-label="Back to the beginning">♡</button>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <button type="button" key={link.id} onClick={() => goTo(link.id)}>{link.label}</button>
        ))}
      </nav>
      <button
        className="nav-menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {links.map((link) => (
              <button type="button" key={link.id} onClick={() => goTo(link.id)}>{link.label}</button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
