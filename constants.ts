import { Artist, ArtistCategory } from './pages/types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'DJ Neon Pulse',
    category: ArtistCategory.DJ,
    genres: ['House', 'Techno', 'Top 40'],
    rating: 4.9,
    reviewCount: 124,
    location: 'New York, NY',
    image: 'https://picsum.photos/800/600?random=1',
    gallery: ['https://picsum.photos/800/600?random=11', 'https://picsum.photos/800/600?random=12'],
    priceWithSono: 1500,
    priceWithoutSono: 1000,
    maxTravelKm: 200,
    isLastMinuteAvailable: true,
    description: 'Bringing the pulse of the underground to your private events. Specialized in high-energy sets and immersive lighting experiences.',
    reviews: [
      { id: 'r1', author: 'Sarah J.', rating: 5, date: '2023-10-12', text: 'Absolutely electric performance!' },
      { id: 'r2', author: 'Mike T.', rating: 4.5, date: '2023-09-28', text: 'Great vibe, highly recommended.' }
    ]
  },
  {
    id: '2',
    name: 'The Midnight Groovers',
    category: ArtistCategory.LIVE_BAND,
    genres: ['Jazz', 'Funk', 'Soul'],
    rating: 5.0,
    reviewCount: 89,
    location: 'Los Angeles, CA',
    image: 'https://picsum.photos/800/600?random=2',
    gallery: ['https://picsum.photos/800/600?random=21', 'https://picsum.photos/800/600?random=22'],
    priceWithSono: 3500,
    priceWithoutSono: 2800,
    maxTravelKm: 500,
    isLastMinuteAvailable: false,
    description: 'A 5-piece band that brings class and groove. Perfect for upscale weddings and corporate galas.',
    reviews: [
      { id: 'r3', author: 'Elena R.', rating: 5, date: '2023-11-05', text: 'The soul they bring is unmatched.' }
    ]
  },
  {
    id: '3',
    name: 'Cyber Violinist',
    category: ArtistCategory.SOLOIST,
    genres: ['Classical Crossover', 'EDM'],
    rating: 4.8,
    reviewCount: 45,
    location: 'London, UK',
    image: 'https://picsum.photos/800/600?random=3',
    gallery: ['https://picsum.photos/800/600?random=31'],
    priceWithSono: 1200,
    priceWithoutSono: 900,
    maxTravelKm: 100,
    isLastMinuteAvailable: true,
    description: 'Classical training meets futuristic beats. An unforgettable solo performance.',
    reviews: []
  },
  {
    id: '4',
    name: 'Bassline Collective',
    category: ArtistCategory.DJ,
    genres: ['Drum & Bass', 'Dubstep'],
    rating: 4.7,
    reviewCount: 210,
    location: 'Berlin, DE',
    image: 'https://picsum.photos/800/600?random=4',
    gallery: [],
    priceWithSono: 1800,
    priceWithoutSono: 1200,
    maxTravelKm: 300,
    isLastMinuteAvailable: true,
    description: 'Deep bass lines and heavy rhythms for the ultimate party experience.',
    reviews: []
  }
];

export const CATEGORIES = [
  { id: 'wedding', label: 'Weddings', image: 'https://picsum.photos/400/300?random=5' },
  { id: 'birthday', label: 'Birthdays', image: 'https://picsum.photos/400/300?random=6' },
  { id: 'corporate', label: 'Corporate', image: 'https://picsum.photos/400/300?random=7' },
  { id: 'club', label: 'Club Events', image: 'https://picsum.photos/400/300?random=8' },
];
