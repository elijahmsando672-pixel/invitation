
export type BirthdayActivity = {
  id: 'music' | 'dance' | 'karaoke' | 'photo-booth' | 'cake-cocktails' | 'games';
  label: string;
};

export type Memory = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  position?: string;
  shape?: string;
};

export type BirthdayConfig = {
  birthdayGirl: string;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  address: string;
  venueDescription: string;
  dressCode: string;
  mapsUrl: string;
  whatsappNumber: string;
  music: string;
  introMessage: string;
  birthdayGreeting: string;
  birthdayQuote: string;
  loveSignoff: string;
  closingHeading: string;
  closingMessage: string;
  seeYouMessage: string;
  djName: string;
  mcName: string;
  activities: BirthdayActivity[];
  memories: Memory[];
};

export type RSVPValues = {
  fullName: string;
  phone: string;
  guests: number;
  attendance: 'yes' | 'no' | '';
};
