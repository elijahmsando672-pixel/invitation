import { Heart } from 'lucide-react';
import type { BirthdayConfig } from '../types';
import SectionReveal from './SectionReveal';

type InvitationIntroProps = { config: BirthdayConfig };

export default function InvitationIntro({ config }: InvitationIntroProps) {
  const floralMemory = config.memories[0];

  return (
    <section id="home" className="intro-section" aria-labelledby="intro-title">
      <div className="section-width intro-layout">
        <SectionReveal className="intro-copy">
          <p className="intro-overline">A little extra sparkle for {config.birthdayGirl}</p>
          <h2 id="intro-title" className="section-title intro-title">Today Is<br /><em>All About You</em></h2>
          <p className="intro-message">{config.introMessage}</p>
          <div className="foil-rule" aria-hidden="true"><span /></div>
          <p className="intro-greeting">{config.birthdayGreeting} <span>{config.birthdayGirl}</span></p>
          <Heart className="intro-heart" size={16} strokeWidth={1.3} aria-hidden="true" />
        </SectionReveal>
        {floralMemory && (
          <SectionReveal className="intro-photo-wrap">
            <figure className="intro-photo">
              <img
                src={floralMemory.image}
                alt={floralMemory.alt}
                loading="lazy"
                fetchPriority="low"
                style={{ objectPosition: floralMemory.position }}
              />
              <figcaption>{floralMemory.caption}</figcaption>
            </figure>
            <span className="intro-photo-mark" aria-hidden="true">With love</span>
          </SectionReveal>
        )}
      </div>
      <div className="intro-wash" aria-hidden="true" />
    </section>
  );
}
