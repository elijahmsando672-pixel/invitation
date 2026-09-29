import type { BirthdayConfig } from '../types';

/** Edit this file to personalize the invitation. Optional map, WhatsApp and audio
 * settings can remain blank; their controls are hidden or safely disabled.
 */
export const birthdayConfig = {
  birthdayGirl: 'Fifi',
  date: '2026-11-21',
  displayDate: '21st November 2026',
  time: '9 PM mpaka chee',
  venue: 'Tsavo Sunset',
  address: '[ADD ADDRESS]',
  venueDescription: 'Join us for music, dancing, and a glamorous birthday celebration.',
  dressCode: '[ADD DRESS CODE]',
  mapsUrl: '',
  whatsappNumber: '',
  music: '/music/birthday.mp3',
  introMessage:
    'Some people make every moment brighter. Tonight, all the music, laughter, and love are for one of them.',
  birthdayGreeting: 'Happy Birthday,',
  birthdayQuote:
    'May the year ahead be as joyful, radiant, and unforgettable as you are.',
  loveSignoff: 'Here’s to dancing through another beautiful year.',
  closingHeading: 'The Night Is Yours…',
  closingMessage:
    'Here’s to music that keeps us moving, laughter that carries into the night, and memories we’ll talk about for years.',
  seeYouMessage: 'See you at Tsavo Sunset on 21 November',
  djName: 'DJ Crumsey',
  mcName: 'Mdava',
  activities: [
    { id: 'music', label: 'Music' },
    { id: 'dance', label: 'Dance' },
    { id: 'karaoke', label: 'Karaoke' },
    { id: 'photo-booth', label: 'Photo Booth' },
    { id: 'cake-cocktails', label: 'Cake & Cocktails' },
    { id: 'games', label: 'Games' },
  ],
  memories: [
    {
      id: 'rose',
      image: 'https://images.pexels.com/photos/14375896/pexels-photo-14375896.jpeg?auto=compress&cs=tinysrgb&w=900&h=1250&fit=crop',
      alt: 'Soft blush roses and silk — photograph by Jessika Arraes on Pexels',
      caption: 'A little softness, for your day',
      position: 'center 47%',
      shape: 'gallery-photo-button--oval',
    },
    {
      id: 'champagne',
      image: 'https://images.pexels.com/photos/15007524/pexels-photo-15007524.jpeg?auto=compress&cs=tinysrgb&w=900&h=1250&fit=crop',
      alt: 'Champagne glass in warm evening light — photograph by Darya Grey_Owl on Pexels',
      caption: 'A night worth raising a glass to',
      position: 'center 45%',
      shape: 'gallery-photo-button--arch',
    },
    {
      id: 'garden',
      image: 'https://images.unsplash.com/photo-1782038522334-94a51783e4a1?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=80&w=1000&h=1300&fit=crop',
      alt: 'Rose garden details — photograph by Volodymyr Lymariev on Unsplash',
      caption: 'The loveliest little details',
      position: 'center 50%',
      shape: '',
    },
    {
      id: 'paper',
      image: 'https://images.pexels.com/photos/5993559/pexels-photo-5993559.jpeg?auto=compress&cs=tinysrgb&w=900&h=1250&fit=crop',
      alt: 'Warm textured handmade paper — photograph by Kaboompics.com on Pexels',
      caption: 'Made with love, just for you',
      position: 'center 50%',
      shape: 'gallery-photo-button--oval',
    },
    {
      id: 'roses',
      image: 'https://images.unsplash.com/photo-1615800098746-73af8261e3df?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=80&w=1000&h=1300&fit=crop',
      alt: 'Blush-toned roses — photograph by Kiwihug on Unsplash',
      caption: 'For someone who makes life bloom',
      position: 'center 52%',
      shape: '',
    },
    {
      id: 'toast',
      image: 'https://images.pexels.com/photos/38962881/pexels-photo-38962881.jpeg?auto=compress&cs=tinysrgb&w=900&h=1250&fit=crop',
      alt: 'An elegant champagne toast — photograph by Nati on Pexels',
      caption: 'Here is to your next chapter',
      position: 'center 55%',
      shape: 'gallery-photo-button--arch',
    },
  ],
} satisfies BirthdayConfig;
