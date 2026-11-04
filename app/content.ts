// Everything shop-specific lives here. Starting a new pitch? Edit this file only.
//
// ADDRESS and HOURS are confirmed from the salon's own Google Business listing.
// SERVICE_CATEGORIES is transcribed directly from the salon's own Instagram
// price-list post (source-images/IMG_9360–9364). PHONE is still a placeholder
// — nothing unverified was hardcoded.

export const SHOP_NAME = "Kvitka Centrum";
export const TAGLINE = "Beauty, your way.";
export const HERO_EYEBROW = "Book your appointment online";
export const HERO_DESCRIPTION = `${SHOP_NAME} is your neighbourhood beauty salon in Enschede — lashes, massage, keratin treatments, haircuts, nails, and waxing, all in one place.`;

export const PHONE_DISPLAY = "[PHONE — confirm with Kvitka Centrum]";
export const PHONE_TEL = "tel:+310000000000";
export const ADDRESS = "Korte Haaksbergerstraat 23, 7511 JV Enschede";

export const SERVICE_CATEGORIES: {
  category: string;
  items: { name: string; price: string; note?: string }[];
}[] = [
  {
    category: "Nails",
    items: [
      { name: "Complex Natural", price: "€55", note: "BIAB/Gel — hygienic manicure, cover base or gel polish" },
      { name: "Complex Standard", price: "€60", note: "BIAB/Gel — short/medium nails" },
      { name: "Complex Extra", price: "€65", note: "BIAB/Gel — with nail length extension" },
      { name: "Nail Extensions", price: "€70" },
      { name: "Nail Extensions Extra", price: "€75" },
      { name: "Nail Design", price: "€5–10", note: "Depends on complexity and time required" },
    ],
  },
  {
    category: "Makeup",
    items: [
      { name: "Day Makeup", price: "€50" },
      { name: "Night Makeup", price: "€70" },
      { name: "Bridal Makeup", price: "€100" },
    ],
  },
  {
    category: "Lashes & Brows",
    items: [
      { name: "Lash Extensions", price: "€80" },
      { name: "Lash Lamination", price: "€60" },
      { name: "Lash Removal", price: "€15" },
      { name: "Brow Lamination", price: "€50" },
      { name: "Brow Tinting", price: "€15" },
      { name: "Brow Shaping", price: "€15" },
      { name: "Eyebrow Tinting & Shaping", price: "€30" },
    ],
  },
  {
    category: "Hair",
    items: [
      { name: "Woman's Haircut", price: "€50–65" },
      { name: "Man's Haircut", price: "€25" },
      { name: "Children's Haircut (boy)", price: "€20" },
      {
        name: "Coloring (single color, root touch-up, highlights, balayage, AirTouch, toning)",
        price: "On request",
        note: "Depends on hair length/thickness — send a photo via DM for a quote",
      },
      {
        name: "Treatments (keratin straightening, hair botox, nanoplastic, cold restoration)",
        price: "On request",
        note: "Depends on hair length/thickness — send a photo via DM for a quote",
      },
    ],
  },
  {
    category: "Massage",
    items: [
      {
        name: "Full Body / Relaxing / Pain Relief / Anti-Cellulite / Sport Massage",
        price: "€75",
        note: "60 min",
      },
      { name: "Children's Massage", price: "€50" },
    ],
  },
  {
    category: "Waxing / Sugaring",
    items: [
      { name: "Legs (to knees)", price: "€40" },
      { name: "Legs (full)", price: "€60" },
      { name: "Underarms", price: "€20" },
      { name: "Arms", price: "€35" },
      { name: "Bikini", price: "€40" },
      { name: "Neck & Upper Back", price: "€50" },
      { name: "Abdomen", price: "€30" },
      { name: "Stomach Line", price: "€20" },
      { name: "Back", price: "€45" },
      { name: "Glutes", price: "€30" },
    ],
  },
];

export const BOOKING_DEPOSIT_NOTE =
  "A €30 deposit is required to book. If you cancel with less than 48 hours' notice, it's non-refundable.";

export const GALLERY_ITEMS: { src: string | null; alt: string }[] = [
  { src: "/gallery/lashes.jpg", alt: "Lash Extensions" },
  { src: null, alt: "Relaxation Massage" },
  { src: "/gallery/keratin.jpg", alt: "Keratin Treatment" },
  { src: "/gallery/haircut.jpg", alt: "Haircut & Style" },
  { src: "/gallery/nails.jpg", alt: "Manicure / Pedicure" },
  { src: null, alt: "Waxing" },
];

export const HOURS = [
  { day: "Monday", time: "08:00 – 20:00" },
  { day: "Tuesday", time: "08:00 – 20:00" },
  { day: "Wednesday", time: "08:00 – 20:00" },
  { day: "Thursday", time: "08:00 – 20:00" },
  { day: "Friday", time: "08:00 – 20:00" },
  { day: "Saturday", time: "08:00 – 18:00" },
  { day: "Sunday", time: "08:00 – 18:00" },
];

export const REVIEWS: { quote: string; name: string }[] = [];
