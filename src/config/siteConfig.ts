import {
  AmenityItem,
  ContactConfig,
  ImagesConfig,
  ExperienceItem,
  GalleryItem,
  FAQItem,
} from '../types';

/**
 * ============================================================================
 * HS VALLEY FARMHOUSE - CENTRALIZED CONFIGURATION
 * ============================================================================
 *
 * All imagery is shot on site and stored in /public/images (WebP).
 * Update phone and WhatsApp numbers below to immediately activate direct booking.
 */

export const contactConfig: ContactConfig = {
  phone: "+923102755957",
  displayPhone: "0310 275 5957",
  phoneAlt: "+923359590601",
  displayPhoneAlt: "0335 959 0601",
  whatsapp: "923102755957",
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

const photo = (name: string) => `/images/${name}.webp`;

/**
 * 640px-wide variant of any /images photograph, for grids, thumbnails and
 * small viewports. Returns the original path for non-photo assets (brand marks).
 */
export const thumbFor = (src: string) =>
  src.startsWith('/images/') ? src.replace('/images/', '/images/thumbs/') : src;

/** srcSet pairing the 640px thumbnail with the full-size photograph. */
export const srcSetFor = (src: string) =>
  src.startsWith('/images/') ? `${thumbFor(src)} 640w, ${src} 1600w` : undefined;

/**
 * Centralized Image Catalog — original photography of HS Valley Farmhouse.
 */
export const imagesConfig: ImagesConfig = {
  // Brand assets
  brandMark: "/brand-mark.png",
  brandMarkGold: "/brand-mark-gold.png",
  brandCover: photo("brand-cover"),

  // Architecture & grounds
  colonnadeSunset: photo("colonnade-sunset"),
  entranceDay: photo("entrance-day"),
  estateNight: photo("estate-night"),
  lawnPanorama: photo("lawn-panorama"),
  gazebosLawn: photo("gazebos-lawn"),
  gazeboDining: photo("gazebo-dining"),

  // Pool
  coveredPoolDay: photo("covered-pool-day"),
  poolNightBuilding: photo("pool-night-building"),
  poolLoungersMural: photo("pool-loungers-mural"),
  poolsideNightSeating: photo("poolside-night-seating"),
  signatureWallPool: photo("signature-wall-pool"),

  // Play & activities
  kidsPlayground: photo("kids-playground"),
  kidsSwingLawn: photo("kids-swing-lawn"),
  swingSeatRed: photo("swing-seat-red"),
  sportsCourtNight: photo("sports-court-night"),
  billiardsTable: photo("billiards-table"),
  gamesHallBilliards: photo("games-hall-billiards"),
  carromBoard: photo("carrom-board"),

  // Indoors
  grandHall: photo("grand-hall"),
  loungeFloorSeating: photo("lounge-floor-seating"),
  bedroomMaster: photo("bedroom-master"),
  bedroomSecond: photo("bedroom-second"),
  bedroomThird: photo("bedroom-third"),

  // Resident wildlife
  peacocksLawn: photo("peacocks-lawn"),
  deerEnclosure: photo("deer-enclosure"),
  turkeysGazebo: photo("turkeys-gazebo"),
  turkeysGarden: photo("turkeys-garden"),
  guineaFowlLawn: photo("guinea-fowl-lawn"),
  pigeonLoft: photo("pigeon-loft"),
  partridge: photo("partridge"),

  // Section roles
  hero: photo("hero-entrance"),
  heroMobile: photo("hero-entrance"),
  exterior: photo("entrance-day"),
  pool: photo("covered-pool-day"),
  garden: photo("gazebos-lawn"),
  interior: photo("grand-hall"),
  breakSection: photo("lawn-panorama"),
  ctaBackground: photo("pool-night-building"),
};

export const amenitiesData: AmenityItem[] = [
  {
    id: "pool",
    title: "Covered Swimming Pool",
    description: "A shaded, all-weather pool with a water slide, poolside loungers and a separate shallow area for children.",
    icon: "waves",
  },
  {
    id: "playground",
    title: "Children's Play Area",
    description: "Slides, swings, see-saws and a merry-go-round set on open grass, within full view of the seating areas.",
    icon: "toy",
  },
  {
    id: "sports",
    title: "Floodlit Sports Court",
    description: "A fully netted court for cricket and futsal, lit for night play on the paved forecourt.",
    icon: "trophy",
  },
  {
    id: "zoo",
    title: "Resident Mini Zoo",
    description: "Peacocks, deer, turkeys, guinea fowl and a pigeon loft kept across the grounds — a favourite with younger guests.",
    icon: "bird",
  },
  {
    id: "games",
    title: "Indoor Games Hall",
    description: "A marble-floored hall with a full-size billiards table and carrom, open through the day and night slots.",
    icon: "gamepad",
  },
  {
    id: "rooms",
    title: "Air-Conditioned Rooms",
    description: "Three furnished bedrooms plus a majlis-style floor seating lounge for families staying the full day.",
    icon: "bed",
  },
  {
    id: "gazebos",
    title: "Gazebos & Lawn Dining",
    description: "Timber gazebos, garden tables and wide lawns for BBQ evenings, tea service and open-air meals.",
    icon: "tent",
  },
  {
    id: "security",
    title: "Gated & Secure",
    description: "A walled private compound with 24/7 security, backup power and dedicated parking inside the gate.",
    icon: "shield",
  },
];

export const experiencesData: ExperienceItem[] = [
  {
    id: "family-gatherings",
    title: "Family Gatherings",
    subtitle: "Room for Every Generation",
    description: "Grandparents in the gazebos, children on the slides, everyone together for dinner on the lawn. The whole compound is yours for the slot.",
    image: imagesConfig.kidsSwingLawn,
    tag: "01 / PRIVACY",
    highlights: ["Exclusive private compound", "Play area in full view", "Shaded gazebo seating", "Indoor AC lounges"],
  },
  {
    id: "celebrations",
    title: "Celebrations",
    subtitle: "Birthdays & Milestone Moments",
    description: "The pool lit up after dark, the lawn set for dinner, and a backdrop that photographs beautifully from golden hour onwards.",
    image: imagesConfig.poolNightBuilding,
    tag: "02 / OCCASIONS",
    highlights: ["Illuminated pool terrace", "Open-air dining lawn", "Custom setup space", "Night slot until 4 AM"],
  },
  {
    id: "private-events",
    title: "Private Events",
    subtitle: "Group & Corporate Day-Outs",
    description: "A gated venue for team retreats and group outings, with a floodlit sports court, indoor games hall and parking inside the perimeter.",
    image: imagesConfig.sportsCourtNight,
    tag: "03 / GATHERINGS",
    highlights: ["Floodlit cricket & futsal court", "Billiards and carrom hall", "Secured gated perimeter", "High-capacity parking"],
  },
  {
    id: "weekend-escape",
    title: "Weekend Escape",
    subtitle: "Step Away from the Daily Pace",
    description: "Morning tea among the peacocks, an afternoon in the pool, and a sunset over the open Gabol Abad valley, a short drive from the city.",
    image: imagesConfig.colonnadeSunset,
    tag: "04 / SANCTUARY",
    highlights: ["Resident peacocks & deer", "Covered all-weather pool", "Cool evening breeze", "Open valley sunsets"],
  },
];

export const galleryItemsData: GalleryItem[] = [
  {
    id: "g1",
    title: "The Estate After Dark",
    category: "evening",
    image: imagesConfig.estateNight,
    aspect: "wide",
    caption: "Warm façade lighting across the main building and front lawn.",
  },
  {
    id: "g2",
    title: "Colonnade at Sunset",
    category: "exterior",
    image: imagesConfig.colonnadeSunset,
    aspect: "portrait",
    caption: "Golden hour through the entrance columns and palm court.",
  },
  {
    id: "g3",
    title: "Covered Swimming Pool",
    category: "pool",
    image: imagesConfig.coveredPoolDay,
    aspect: "landscape",
    caption: "Shaded year-round swimming with a slide and lawn surround.",
  },
  {
    id: "g4",
    title: "Main Entrance & Forecourt",
    category: "exterior",
    image: imagesConfig.entranceDay,
    aspect: "landscape",
    caption: "Paved arrival court with planted borders and wide parking.",
  },
  {
    id: "g5",
    title: "Poolside by Night",
    category: "pool",
    image: imagesConfig.poolNightBuilding,
    aspect: "landscape",
    caption: "The water slide and terrace under evening floodlights.",
  },
  {
    id: "g6",
    title: "The Open Lawn",
    category: "lawns",
    image: imagesConfig.lawnPanorama,
    aspect: "wide",
    caption: "A full stretch of green for cricket, seating and setups.",
  },
  {
    id: "g7",
    title: "Garden Gazebos",
    category: "lawns",
    image: imagesConfig.gazebosLawn,
    aspect: "landscape",
    caption: "Twin timber gazebos with built-in benches on the grass.",
  },
  {
    id: "g8",
    title: "Children's Playground",
    category: "activities",
    image: imagesConfig.kidsPlayground,
    aspect: "landscape",
    caption: "Slides, swings, climbing frame and merry-go-round.",
  },
  {
    id: "g9",
    title: "Floodlit Sports Court",
    category: "activities",
    image: imagesConfig.sportsCourtNight,
    aspect: "landscape",
    caption: "Netted cricket and futsal court, lit for night play.",
  },
  {
    id: "g10",
    title: "Billiards Hall",
    category: "activities",
    image: imagesConfig.billiardsTable,
    aspect: "portrait",
    caption: "Full-size table in the air-conditioned games room.",
  },
  {
    id: "g11",
    title: "Carrom Corner",
    category: "activities",
    image: imagesConfig.carromBoard,
    aspect: "landscape",
    caption: "Carrom set beside the windows overlooking the lawn.",
  },
  {
    id: "g12",
    title: "The Grand Hall",
    category: "rooms",
    image: imagesConfig.grandHall,
    aspect: "landscape",
    caption: "Marble-floored central hall linking rooms and games area.",
  },
  {
    id: "g13",
    title: "Majlis Floor Seating",
    category: "rooms",
    image: imagesConfig.loungeFloorSeating,
    aspect: "landscape",
    caption: "Traditional cushioned floor seating for long evenings.",
  },
  {
    id: "g14",
    title: "Master Bedroom",
    category: "rooms",
    image: imagesConfig.bedroomMaster,
    aspect: "landscape",
    caption: "Air-conditioned room with fresh linen and en-suite comfort.",
  },
  {
    id: "g15",
    title: "Second Bedroom",
    category: "rooms",
    image: imagesConfig.bedroomSecond,
    aspect: "landscape",
    caption: "Quiet double room with garden-facing windows.",
  },
  {
    id: "g16",
    title: "Third Bedroom",
    category: "rooms",
    image: imagesConfig.bedroomThird,
    aspect: "landscape",
    caption: "Additional sleeping quarters for full-day bookings.",
  },
  {
    id: "g17",
    title: "Resident Peacocks",
    category: "wildlife",
    image: imagesConfig.peacocksLawn,
    aspect: "portrait",
    caption: "Peafowl roaming the planted edge of the lawn.",
  },
  {
    id: "g18",
    title: "The Deer Enclosure",
    category: "wildlife",
    image: imagesConfig.deerEnclosure,
    aspect: "portrait",
    caption: "A resident deer in its shaded pen beside the pool garden.",
  },
  {
    id: "g19",
    title: "Turkeys by the Gazebo",
    category: "wildlife",
    image: imagesConfig.turkeysGazebo,
    aspect: "portrait",
    caption: "Free-roaming turkeys under the garden shelters.",
  },
  {
    id: "g20",
    title: "The Pigeon Loft",
    category: "wildlife",
    image: imagesConfig.pigeonLoft,
    aspect: "portrait",
    caption: "A working loft of fantail and homing pigeons.",
  },
  {
    id: "g21",
    title: "Poolside Loungers",
    category: "pool",
    image: imagesConfig.poolLoungersMural,
    aspect: "landscape",
    caption: "Deck chairs set against the hand-painted pool murals.",
  },
  {
    id: "g22",
    title: "Signature Wall",
    category: "pool",
    image: imagesConfig.signatureWallPool,
    aspect: "portrait",
    caption: "The HS Valley lettering above the reflecting pool.",
  },
  {
    id: "g23",
    title: "Lawn Swings",
    category: "activities",
    image: imagesConfig.kidsSwingLawn,
    aspect: "landscape",
    caption: "Canopied swing seat and see-saw on the open grass.",
  },
  {
    id: "g24",
    title: "Evening Poolside Seating",
    category: "evening",
    image: imagesConfig.poolsideNightSeating,
    aspect: "landscape",
    caption: "Tables laid along the pool deck once the lights come on.",
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
    answer: `You can check real-time date availability on WhatsApp (${contactConfig.displayPhone}), by calling either of our lines, or submitting the reservation form above. Our team typically responds in under 15 minutes. We advise inquiring 1–2 weeks in advance for prime weekend and holiday dates.`,
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
    answer: "The estate includes a covered swimming pool with a water slide and poolside loungers, a children's playground with slides, swings, see-saws and a merry-go-round, a floodlit netted court for cricket and futsal, an indoor games hall with billiards and carrom, three air-conditioned bedrooms, a majlis-style floor seating lounge, timber gazebos and open lawns for BBQ and dining, a resident mini zoo with peacocks, deer, turkeys, guinea fowl and pigeons, backup generator power, and 24/7 gated security with private parking.",
    category: "Facilities",
  },
  {
    id: "faq-6",
    question: "Is the swimming pool covered and usable year-round?",
    answer: "Yes. The pool sits under a full shade canopy, which keeps it usable through the Karachi summer and into the cooler months. It includes a water slide, a shallower section for children, poolside loungers and a changing area. The pool is cleaned and treated between bookings, and exclusive use is included with your slot.",
    category: "Facilities",
  },
  {
    id: "faq-7",
    question: "Is the farmhouse suitable for children?",
    answer: "It is built around families. Children have a dedicated playground, a shallow pool section, open lawns, and the resident mini zoo with peacocks, deer, turkeys and pigeons. The play areas sit within direct view of the gazebos and seating, and the entire compound is walled and gated.",
    category: "Facilities",
  },
  {
    id: "faq-8",
    question: "Are overnight stays available?",
    answer: "Yes, 24-hour stays and overnight packages are available upon advance request for families and verified private groups. Guests enjoy full compound access including the three furnished bedrooms, the majlis lounge, the games hall and the illuminated pool terrace.",
    category: "Stay",
  },
  {
    id: "faq-9",
    question: "Can we bring our own food, or arrange catering?",
    answer: "You are welcome to bring your own food, and the BBQ and kitchen station is available for your use. Guests who prefer catering can arrange it through their own caterer or ask our team to suggest local options when confirming the booking.",
    category: "Facilities",
  },
  {
    id: "faq-10",
    question: "What are the booking timings?",
    answer: "Standard booking slots include:\n• Day Slot: 8:00 AM – 6:00 PM\n• Night Slot: 8:00 PM – 6:00 AM\n• Full 24-Hour Stay: Flexible check-in (e.g., 12:00 PM to 10:00 AM next morning).\nCustom timing arrangements can also be scheduled based on date availability.",
    category: "Timings",
  },
];
