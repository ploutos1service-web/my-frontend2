export enum ArtistCategory {
  DJ = 'DJ',
  LIVE_BAND = 'Live Band',
  SOLOIST = 'Solo Instrumentalist'
}

export enum EventType {
  WEDDING = 'Wedding',
  BIRTHDAY = 'Birthday',
  CORPORATE = 'Corporate',
  CLUB = 'Club/Party'
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Artist {
  id: string;
  name: string;
  category: ArtistCategory;
  genres: string[];
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  gallery: string[];
  priceWithSono: number;
  priceWithoutSono: number;
  maxTravelKm: number;
  isLastMinuteAvailable: boolean;
  description: string;
  reviews: Review[];
  videoUrl?: string; // Placeholder for video link
}

export interface BookingDraft {
  artistId: string;
  date: string;
  eventType: EventType;
  guests: number;
  withSono: boolean;
  notes: string;
  location: string;
}

export interface NavItem {
  label: string;
  path: string;
}
