import { Heart } from 'lucide-react';
import type { BirthdayConfig } from '../types';
import FloatingHearts from './FloatingHearts';

type FooterProps = { config: BirthdayConfig };

export default function Footer({ config }: FooterProps) {
  const year = config.date.slice(0, 4) || '2026';

  return (
    <footer className="closing-section" aria-labelledby="closing-title">
      <FloatingHearts className="closing-hearts" count={4} />
      <div className="section-width closing-content">
        <div className="closing-flourish" aria-hidden="true"><span /><Heart size={14} strokeWidth={1.2} /><span /></div>
        <h2 id="closing-title">{config.closingHeading}</h2>
        <p className="closing-message">{config.closingMessage}</p>
        <p className="closing-see-you">{config.seeYouMessage} <span aria-hidden="true">♥</span></p>
      </div>
      <div className="footer-note">
        <p>Made with love <Heart size={12} fill="currentColor" strokeWidth={1} aria-label="love" /></p>
        <p>© {year} {config.birthdayGirl}’s Birthday Celebration</p>
      </div>
    </footer>
  );
}
