import { Camera, Dices, Mic2, Music2, PartyPopper, Sparkles, type LucideIcon } from 'lucide-react';
import type { BirthdayConfig } from '../types';
import SectionReveal from './SectionReveal';

type ActivitiesEntertainmentProps = { config: BirthdayConfig };

const activityIcons: Record<string, LucideIcon> = {
  music: Music2,
  dance: Sparkles,
  karaoke: Mic2,
  'photo-booth': Camera,
  'cake-cocktails': PartyPopper,
  games: Dices,
};

export default function ActivitiesEntertainment({ config }: ActivitiesEntertainmentProps) {
  return (
    <section className="activities-section" aria-labelledby="activities-title">
      <div className="section-width activities-layout">
        <SectionReveal className="activities-intro">
          <p className="activities-overline">An evening of glamour for {config.birthdayGirl}</p>
          <h2 className="section-title" id="activities-title">All Night <em>Long</em></h2>
          <p className="activities-description">
            Music, dancing, laughter, and lovely little surprises—from {config.time}.
          </p>
          <div className="activities-hosts" aria-label="Entertainment hosts">
            <div className="activity-host">
              <p className="detail-label">DJ of the night</p>
              <p className="activity-host-name">{config.djName}</p>
            </div>
            <div className="activity-host">
              <p className="detail-label">Master of ceremonies</p>
              <p className="activity-host-name">{config.mcName}</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="activities-list-wrap">
          <p className="detail-label">The night’s line-up</p>
          <ul className="activities-list">
            {config.activities.map((activity) => {
              const Icon = activityIcons[activity.id] ?? Sparkles;
              return (
                <li className="activity-item" key={activity.id}>
                  <span className="activity-ornament" aria-hidden="true">✦</span>
                  <Icon size={19} strokeWidth={1.45} aria-hidden="true" />
                  <span>{activity.label}</span>
                </li>
              );
            })}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
