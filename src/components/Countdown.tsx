import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { createLocalDate, getCountdownParts, type CountdownParts } from '../lib/date';
import SectionReveal from './SectionReveal';

type CountdownProps = { date: string };
const labels: { key: keyof CountdownParts; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function Countdown({ date }: CountdownProps) {
  const target = createLocalDate(date);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(interval);
  }, []);

  if (!target) {
    return <p className="countdown-unavailable" role="status">The celebration date will be announced soon.</p>;
  }

  const parts = getCountdownParts(target, now);
  const isBirthday = target.getTime() <= now.getTime();

  return (
    <section className="countdown-section" aria-label="Countdown to the birthday">
      <SectionReveal className="section-width countdown-content">
        <div className="countdown-heading">
          <span className="countdown-flourish" aria-hidden="true">✳</span>
          <p>A little more, then it’s your day</p>
          <span className="countdown-flourish" aria-hidden="true">✳</span>
        </div>
        {isBirthday ? (
          <p className="countdown-today" role="status">Today is the day! 🎉</p>
        ) : (
          <div className="countdown-grid" role="timer" aria-live="off">
            {labels.map(({ key, label }) => (
              <div className={`countdown-cell countdown-cell--${key}`} key={key}>
                <span className="countdown-value" aria-hidden="true">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={parts[key]}
                      initial={{ y: 7, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -7, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {String(parts[key]).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
            <span className="sr-only">
              {parts.days} days, {parts.hours} hours, {parts.minutes} minutes and {parts.seconds} seconds remaining.
            </span>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
