import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { birthdayConfig } from './config/birthdayConfig';
import ActivitiesEntertainment from './components/ActivitiesEntertainment';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import FloatingHearts from './components/FloatingHearts';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import InvitationIntro from './components/InvitationIntro';
import Location from './components/Location';
import LoveMessage from './components/LoveMessage';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import RSVP from './components/RSVP';
import './styles/invitation.css';
import './styles/celebration.css';

function setMeta(selector: string, content: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { birthdayGirl, displayDate, memories } = birthdayConfig;
    const title = `${birthdayGirl}'s Birthday Party | ${displayDate}`;
    const description = `You are cordially invited to ${birthdayGirl}'s birthday party on ${displayDate}.`;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', memories[0]?.image ?? '');
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell min-h-screen overflow-x-clip bg-cream text-ink">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <Hero key="gate" onOpen={() => setIsOpen(true)} />
          ) : (
            <motion.div
              key="invitation"
              className="invitation-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <Navigation />
              <FloatingHearts className="page-hearts" count={3} />
              <main>
                <InvitationIntro config={birthdayConfig} />
                <Countdown date={birthdayConfig.date} />
                <EventDetails config={birthdayConfig} />
                <ActivitiesEntertainment config={birthdayConfig} />
                <Gallery memories={birthdayConfig.memories} />
                <LoveMessage config={birthdayConfig} />
                <Location config={birthdayConfig} />
                <RSVP config={birthdayConfig} />
              </main>
              <Footer config={birthdayConfig} />
              <MusicPlayer music={birthdayConfig.music} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
