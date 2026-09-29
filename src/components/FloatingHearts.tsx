import { Heart } from 'lucide-react';

type FloatingHeartsProps = {
  count?: number;
  className?: string;
};

const positions = [
  { left: '8%', bottom: '16%', delay: '0s', duration: '11s', size: 13 },
  { left: '23%', bottom: '4%', delay: '3s', duration: '13s', size: 9 },
  { left: '51%', bottom: '12%', delay: '1.5s', duration: '12s', size: 10 },
  { left: '71%', bottom: '7%', delay: '5s', duration: '14s', size: 12 },
  { left: '89%', bottom: '19%', delay: '2.5s', duration: '10s', size: 8 },
  { left: '37%', bottom: '1%', delay: '6s', duration: '15s', size: 7 },
];

export default function FloatingHearts({ count = 6, className = '' }: FloatingHeartsProps) {
  return (
    <div className={`floating-hearts ${className}`} aria-hidden="true">
      {positions.slice(0, count).map((heart, index) => (
        <span
          className="floating-heart"
          key={`${heart.left}-${index}`}
          style={{
            left: heart.left,
            bottom: heart.bottom,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          <Heart size={heart.size} strokeWidth={1.25} />
        </span>
      ))}
    </div>
  );
}
