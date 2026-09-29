import { Heart } from 'lucide-react';
import type { BirthdayConfig } from '../types';
import SectionReveal from './SectionReveal';

type LoveMessageProps = { config: BirthdayConfig };

export default function LoveMessage({ config }: LoveMessageProps) {
  return (
    <section id="message" className="love-section" aria-labelledby="love-title">
      <SectionReveal className="love-inner">
        <p className="love-eyebrow" id="love-title">For {config.birthdayGirl}, always</p>
        <span className="love-quote-mark" aria-hidden="true">“</span>
        <blockquote>{config.birthdayQuote}</blockquote>
        <div className="love-rule" aria-hidden="true"><span /><Heart size={14} strokeWidth={1.2} /><span /></div>
        <p className="love-signoff">{config.loveSignoff} <span aria-hidden="true">♥</span></p>
      </SectionReveal>
    </section>
  );
}
