import { CalendarDays, Clock3, MapPin, Shirt, ArrowUpRight } from 'lucide-react';
import { resolveText } from '../lib/config';
import type { BirthdayConfig } from '../types';
import SectionReveal from './SectionReveal';

type EventDetailsProps = { config: BirthdayConfig };

export default function EventDetails({ config }: EventDetailsProps) {
  const dressCode = resolveText(config.dressCode);
  const address = resolveText(config.address);
  const details = [
    { label: 'Date', value: config.displayDate, Icon: CalendarDays, dateTime: config.date },
    { label: 'Time', value: config.time, Icon: Clock3 },
    ...(dressCode ? [{ label: 'Dress code', value: dressCode, Icon: Shirt }] : []),
  ];

  return (
    <section id="details" className="details-section" aria-labelledby="details-title">
      <div className="section-width">
        <SectionReveal className="details-header">
          <h2 className="section-title" id="details-title">The <em>Celebration</em></h2>
          <p>Join us at {config.venue} on {config.displayDate} from {config.time} to celebrate {config.birthdayGirl}.</p>
        </SectionReveal>
        <div className="details-layout">
          <div className="detail-facts">
            {details.map(({ label, value, Icon, dateTime }) => (
              <div className="detail-fact" key={label}>
                <Icon size={19} strokeWidth={1.35} aria-hidden="true" />
                <div>
                  <p className="detail-label">{label}</p>
                  {dateTime ? <time className="detail-value" dateTime={dateTime}>{value}</time> : <p className="detail-value">{value}</p>}
                </div>
              </div>
            ))}
          </div>
          <SectionReveal className="venue-note">
            <div className="venue-note-mark" aria-hidden="true"><MapPin size={19} strokeWidth={1.4} /></div>
            <p className="detail-label">Where we’ll celebrate</p>
            <h3>{config.venue}</h3>
            <p className="venue-description">{address ?? config.venueDescription}</p>
            {address && <p className="venue-description">{config.venueDescription}</p>}
            {config.mapsUrl.trim() && (
              <a className="text-link" href={config.mapsUrl} target="_blank" rel="noreferrer noopener">
                Get Directions <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </SectionReveal>
        </div>
        <div className="details-footnote" aria-hidden="true"><span /> A gathering made with love <HeartIcon /></div>
      </div>
    </section>
  );
}

function HeartIcon() {
  return <span className="tiny-heart">♥</span>;
}
