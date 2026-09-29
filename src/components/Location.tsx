import { ArrowUpRight, MapPin } from 'lucide-react';
import { resolveText } from '../lib/config';
import type { BirthdayConfig } from '../types';
import SectionReveal from './SectionReveal';

type LocationProps = { config: BirthdayConfig };

export default function Location({ config }: LocationProps) {
  const address = resolveText(config.address);

  return (
    <section className="location-section" aria-labelledby="location-title">
      <div className="section-width location-layout">
        <SectionReveal className="location-copy">
          <h2 className="section-title" id="location-title">A place to <em>gather</em></h2>
          <p>Meet us at {config.venue} for music, cocktails, and a night made to celebrate {config.birthdayGirl}.</p>
        </SectionReveal>
        <SectionReveal className="location-card">
          <div className="location-pin" aria-hidden="true"><MapPin size={20} strokeWidth={1.4} /></div>
          <div>
            <p className="detail-label">The venue</p>
            <h3>{config.venue}</h3>
            {address && <p className="location-address">{address}</p>}
            <p className="location-description">{config.venueDescription}</p>
            {config.mapsUrl.trim() && (
              <a className="text-link" href={config.mapsUrl} target="_blank" rel="noreferrer noopener">
                Open in Google Maps <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
          <span className="location-card-seal" aria-hidden="true">♡</span>
        </SectionReveal>
      </div>
    </section>
  );
}
