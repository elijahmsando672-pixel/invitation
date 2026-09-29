import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import FloatingHearts from './FloatingHearts';

type HeroProps = { onOpen: () => void };

export default function Hero({ onOpen }: HeroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpening) return;
    const timer = window.setTimeout(onOpen, reduceMotion ? 0 : 520);
    return () => window.clearTimeout(timer);
  }, [isOpening, onOpen, reduceMotion]);

  return (
    <motion.section
      className="invitation-gate"
      aria-labelledby="gate-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985, transition: { duration: 0.42 } }}
    >
      <div className="gate-orbit gate-orbit--one" aria-hidden="true" />
      <div className="gate-orbit gate-orbit--two" aria-hidden="true" />
      <div className="gate-stamp" aria-hidden="true">
        <Heart size={18} strokeWidth={1.3} />
      </div>
      <FloatingHearts className="gate-hearts" />

      <motion.div
        className={`gate-copy ${isOpening ? 'gate-copy--opening' : ''}`}
        animate={isOpening && !reduceMotion ? { y: -10, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.42, ease: 'easeInOut' }}
      >
        <p className="gate-eyebrow">
          <Sparkles size={13} strokeWidth={1.4} aria-hidden="true" />
          You Are Cordially Invited
        </p>
        <h1 id="gate-title" className="gate-title">
          A Night to <em>Remember</em>
        </h1>
        <p className="gate-name">{birthdayConfig.birthdayGirl}</p>
        <p className="gate-subtitle">Birthday Party</p>
        <div className="gate-date">
          <span />
          <time dateTime={birthdayConfig.date}>{birthdayConfig.displayDate}</time>
          <span />
        </div>
        <p className="gate-note">From {birthdayConfig.time} at {birthdayConfig.venue}.</p>
        <button
          className="button button--gold gate-open-button"
          type="button"
          onClick={() => setIsOpening(true)}
          disabled={isOpening}
          aria-busy={isOpening}
        >
          <span>{isOpening ? 'Opening your invitation' : 'Open Invitation'}</span>
          <ArrowDown size={15} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </motion.div>

      <motion.div
        className="envelope-art"
        aria-hidden="true"
        animate={isOpening && !reduceMotion ? { opacity: 0.2, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.44, ease: 'easeInOut' }}
      >
        <div className="envelope-paper" />
        <motion.div
          className="envelope-flap"
          animate={isOpening && !reduceMotion ? { rotateX: -165 } : { rotateX: 0 }}
          transition={{ duration: 0.44, ease: 'easeInOut' }}
          style={{ transformPerspective: 900 }}
        />
        <div className="envelope-seal"><Heart size={15} fill="currentColor" strokeWidth={1.2} /></div>
      </motion.div>
      <p className="gate-bottom-note" aria-hidden="true">A little something, made just for you</p>
    </motion.section>
  );
}
