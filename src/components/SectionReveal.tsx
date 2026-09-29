import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
