export interface ContactConfig {
  phone: string;
  displayPhone: string;
  whatsapp: string;
  whatsappPrefilledMessage: string;
  locationName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  instagramUrl: string;
  facebookUrl: string;
}

/**
 * Every photograph of HS Valley Farmhouse, addressed by a descriptive key.
 * Files live in /public/images and are served from the site root.
 */
export interface ImagesConfig {
  // Brand assets
  brandMark: string;
  brandMarkGold: string;
  brandCover: string;

  // Section roles (aliases of the named photographs below)
  hero: string;
  heroMobile: string;
  exterior: string;
  pool: string;
  garden: string;
  interior: string;
  breakSection: string;
  ctaBackground: string;

  // Architecture & grounds
  colonnadeSunset: string;
  entranceDay: string;
  estateNight: string;
  lawnPanorama: string;
  gazebosLawn: string;
  gazeboDining: string;

  // Pool
  coveredPoolDay: string;
  poolNightBuilding: string;
  poolLoungersMural: string;
  poolsideNightSeating: string;
  signatureWallPool: string;

  // Play & activities
  kidsPlayground: string;
  kidsSwingLawn: string;
  swingSeatRed: string;
  sportsCourtNight: string;
  billiardsTable: string;
  gamesHallBilliards: string;
  carromBoard: string;

  // Indoors
  grandHall: string;
  loungeFloorSeating: string;
  bedroomMaster: string;
  bedroomSecond: string;
  bedroomThird: string;

  // Resident wildlife
  peacocksLawn: string;
  deerEnclosure: string;
  turkeysGazebo: string;
  turkeysGarden: string;
  guineaFowlLawn: string;
  pigeonLoft: string;
  partridge: string;
}

export type GalleryCategory =
  | 'exterior'
  | 'pool'
  | 'lawns'
  | 'activities'
  | 'rooms'
  | 'wildlife'
  | 'evening';

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square' | 'wide';
  caption: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
}
