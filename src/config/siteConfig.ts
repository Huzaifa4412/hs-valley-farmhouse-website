import { ContactConfig, ImagesConfig, ExperienceItem, GalleryItem, FAQItem } from '../types';

/**
 * ============================================================================
 * HS VALLEY FARMHOUSE - CENTRALIZED CONFIGURATION
 * ============================================================================
 * 
 * Replace image URLs with your real photographs when ready.
 * Update phone and WhatsApp numbers below to immediately activate direct booking.
 */

export const contactConfig: ContactConfig = {
  phone: "+923001234567",
  displayPhone: "+92 300 123 4567",
  whatsapp: "923001234567",
  whatsappPrefilledMessage: "Assalamualaikum, I would like to inquire about booking HS Valley Farmhouse. Please share availability and pricing.",
  locationName: "HS Valley Farmhouse",
  addressLine1: "Village VIP Usmania Hotel, Gabol Abad Road",
  addressLine2: "Bahria Town",
  city: "Karachi",
  country: "Pakistan",
  googleMapsUrl: "https://maps.google.com/?q=Gabol+Abad+Road+Bahria+Town+Karachi",
  coordinates: {
    lat: 25.0125,
    lng: 67.3325,
  },
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
};

/**
 * Centralized Image Catalog
 * Designed for effortless swapping with local or CDN images.
 */
export const imagesConfig: ImagesConfig = {
  // Hero: Atmospheric luxury architectural pavilion with illuminated pool and palms at twilight
  hero: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2160&q=85",
  heroMobile: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1080&q=85",
  
  // Property Sections
  exterior: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
  pool: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85",
  garden: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=85",
  interior: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85",
  breakSection: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2160&q=85",
  ctaBackground: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2160&q=85",

  // Curated High-Res Property Gallery
  gallery1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
  gallery2: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
  gallery3: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
  gallery4: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85",
  gallery5: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
  gallery6: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  gallery7: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
  gallery8: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85",
};

export const experiencesData: ExperienceItem[] = [
  {
    id: "family-gatherings",
    title: "Family Gatherings",
    subtitle: "A Peaceful Sanctuary for Reconnecting",
    description: "Quality time in a private environment where multiple generations can gather, dine, and unwind safely away from city noise.",
    image: imagesConfig.gallery1,
    tag: "01 / PRIVACY",
    highlights: ["Exclusive private compound", "Generous seating zones", "Child-friendly lawns", "Private family lounges"],
  },
  {
    id: "celebrations",
    title: "Celebrations",
    subtitle: "Birthdays & Milestone Moments",
    description: "A memorable setting tailored for birthdays, family milestones, and anniversary celebrations in an ambiance of natural refinement.",
    image: imagesConfig.gallery2,
    tag: "02 / OCCASIONS",
    highlights: ["Evening ambient lighting", "Open-air dining terrace", "Custom setup space", "Scenic photography backdrops"],
  },
  {
    id: "private-events",
    title: "Private Events",
    subtitle: "Curated Group & Corporate Outings",
    description: "A dedicated private space for team retreats, executive day-outs, and intimate dinners requiring quiet seclusion and bespoke exclusivity.",
    image: imagesConfig.gallery3,
    tag: "03 / GATHERINGS",
    highlights: ["Secured gated perimeter", "Spacious open lawns", "Comfortable breakout rooms", "High-capacity parking"],
  },
  {
    id: "weekend-escape",
    title: "Weekend Escape",
    subtitle: "Step Away from the Daily Pace",
    description: "Reclaim stillness. Experience golden hour reflections, cool night breezes, and restorative peace just a short drive from central Karachi.",
    image: imagesConfig.gallery4,
    tag: "04 / SANCTUARY",
    highlights: ["Tranquil valley vistas", "Cool evening breeze", "Stargazing open patio", "Morning fresh air"],
  },
];

export const galleryItemsData: GalleryItem[] = [
  {
    id: "g1",
    title: "The Main Pavilion & Pool Terrace",
    category: "exterior",
    image: imagesConfig.hero,
    aspect: "wide",
    caption: "Architectural symmetry reflecting against evening calm.",
  },
  {
    id: "g2",
    title: "Emerald Lawns & Palm Canopy",
    category: "lawns",
    image: imagesConfig.garden,
    aspect: "portrait",
    caption: "Meticulously maintained green spaces for outdoor strolls.",
  },
  {
    id: "g3",
    title: "Private Poolside Sanctuary",
    category: "pool",
    image: imagesConfig.pool,
    aspect: "landscape",
    caption: "Crystal blue water surrounded by sheltered cabanas.",
  },
  {
    id: "g4",
    title: "Contemporary Indoor Lounge",
    category: "lounge",
    image: imagesConfig.interior,
    aspect: "landscape",
    caption: "Air-conditioned indoor respite with panoramic property views.",
  },
  {
    id: "g5",
    title: "Evening Illumination",
    category: "evening",
    image: imagesConfig.gallery5,
    aspect: "square",
    caption: "Warm architectural lanterns greeting the dusk sky.",
  },
  {
    id: "g6",
    title: "Alfresco Dining Veranda",
    category: "exterior",
    image: imagesConfig.gallery6,
    aspect: "landscape",
    caption: "Gather under the stars for unforgettable shared meals.",
  },
  {
    id: "g7",
    title: "Minimalist Master Quarters",
    category: "lounge",
    image: imagesConfig.gallery7,
    aspect: "portrait",
    caption: "Quiet rest spaces crafted with neutral textures and comfort.",
  },
  {
    id: "g8",
    title: "The Sunset Horizon",
    category: "evening",
    image: imagesConfig.gallery8,
    aspect: "wide",
    caption: "Karachi's golden hour over the open Gabol Abad valley.",
  },
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "Where is HS Valley Farmhouse located?",
    answer: "HS Valley Farmhouse is located near Village VIP Usmania Hotel on Gabol Abad Road, in the Bahria Town Karachi vicinity. It offers a secure, quiet sanctuary accessible via the Super Highway / M-9 corridor with wide paved access and dedicated on-site parking.",
    category: "Location",
  },
  {
    id: "faq-2",
    question: "How can I check availability?",
    answer: "You can check real-time date availability directly by clicking our WhatsApp link (+92 300 123 4567), calling our hospitality team, or submitting the reservation form above. Our team typically responds in under 15 minutes. We advise inquiring 1–2 weeks in advance for prime weekend and holiday dates.",
    category: "Booking",
  },
  {
    id: "faq-3",
    question: "How can I make a booking?",
    answer: "1. Select your preferred date, slot (Day / Night / 24-Hr), and expected guest count.\n2. Contact our team via WhatsApp or phone to confirm slot availability.\n3. Secure your exclusive private reservation with an advance token deposit. A formal booking confirmation voucher will be issued immediately.",
    category: "Booking",
  },
  {
    id: "faq-4",
    question: "What type of events can be hosted?",
    answer: "HS Valley Farmhouse is designed for family day-outs, birthday celebrations, anniversary dinners, corporate day retreats, photography sessions, and private group gatherings. To preserve peace and safety, commercial public ticketed events are strictly prohibited.",
    category: "Events",
  },
  {
    id: "faq-5",
    question: "What facilities are available?",
    answer: "The estate features a crystal-clear private swimming pool, air-conditioned luxury lounge, comfortable master suites, manicured green lawns with palm canopy, covered alfresco dining verandas, dedicated BBQ & kitchen station, uninterrupted backup generator power, and 24/7 gated security with private parking.",
    category: "Facilities",
  },
  {
    id: "faq-6",
    question: "Are overnight stays available?",
    answer: "Yes, 24-hour stays and overnight packages are available upon advance request for families and verified private groups. Guests enjoy full compound access including the furnished master suites, lounges, and illuminated pool terrace.",
    category: "Stay",
  },
  {
    id: "faq-7",
    question: "What are the booking timings?",
    answer: "Standard booking slots include:\n• Day Slot: 10:00 AM – 6:00 PM\n• Night Slot: 8:00 PM – 4:00 AM\n• Full 24-Hour Stay: Flexible check-in (e.g., 12:00 PM to 10:00 AM next morning).\nCustom timing arrangements can also be scheduled based on date availability.",
    category: "Timings",
  },
];
