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

export interface ImagesConfig {
  hero: string;
  heroMobile: string;
  exterior: string;
  pool: string;
  garden: string;
  interior: string;
  breakSection: string;
  ctaBackground: string;
  gallery1: string;
  gallery2: string;
  gallery3: string;
  gallery4: string;
  gallery5: string;
  gallery6: string;
  gallery7: string;
  gallery8: string;
}

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
  category: 'exterior' | 'pool' | 'lawns' | 'lounge' | 'evening';
  image: string;
  aspect: 'landscape' | 'portrait' | 'square' | 'wide';
  caption: string;
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
