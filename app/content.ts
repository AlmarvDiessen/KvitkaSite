// Everything shop-specific lives here. Starting a new pitch? Edit this file only.
//
// ADDRESS and HOURS are confirmed from the salon's own Google Business listing
// (screenshot provided directly by the client). PHONE and SERVICES prices are
// still placeholders — nothing unverified was hardcoded for those.

export const SHOP_NAME = "Kvitka Centrum";
export const TAGLINE = "Beauty, your way.";
export const HERO_EYEBROW = "Book your appointment online";
export const HERO_DESCRIPTION = `${SHOP_NAME} is your neighbourhood beauty salon in Enschede — lashes, massage, keratin treatments, haircuts, nails, and waxing, all in one place.`;

export const PHONE_DISPLAY = "[PHONE — confirm with Kvitka Centrum]";
export const PHONE_TEL = "tel:+310000000000";
export const ADDRESS = "Korte Haaksbergerstraat 23, 7511 JV Enschede";

export const SERVICES = [
  { name: "Lash Extensions", price: "TBD", duration: "TBD" },
  { name: "Relaxation Massage", price: "TBD", duration: "TBD" },
  { name: "Keratin Treatment", price: "TBD", duration: "TBD" },
  { name: "Haircut & Style", price: "TBD", duration: "TBD" },
  { name: "Manicure / Pedicure", price: "TBD", duration: "TBD" },
  { name: "Waxing", price: "TBD", duration: "TBD" },
];

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
