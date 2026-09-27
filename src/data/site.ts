/**
 * Single source of truth for Karisbridge Schools' public details.
 * Update contact information here and it changes everywhere on the site.
 */
export const site = {
  name: 'Karisbridge Schools',
  shortName: 'Karisbridge',
  initials: 'KBS',
  tagline: 'Holistic Education & Excellent Character',
  motto: 'Show forth your light',
  vision: 'To shape global citizens through holistic learning.',
  mission:
    'To give every child a holistic education that empowers vital skills and nurtures excellent character — in a safe, joyful and loving environment.',
  description:
    'Karisbridge Schools is a Creche, Nursery and Primary school in Kajola Estate, Ibeju-Lekki, Lagos — offering holistic education and excellent character in a warm, world-minded community.',
  levels: ['Creche', 'Nursery', 'Primary'],
  address: {
    street: '1st Avenue, Kajola Estate Phase 1',
    road: 'Lekki–Epe Expressway',
    area: 'Ibeju-Lekki',
    city: 'Lagos',
    country: 'Nigeria',
  },
  phones: [
    { display: '+234 904 011 8747', tel: '+2349040118747' },
    { display: '+234 913 699 1147', tel: '+2349136991147' },
  ],
  /** WhatsApp number in international format, digits only. */
  whatsapp: '2349040118747',
  email: 'karisbridgeschool@gmail.com',
  careersEmail: 'hr.karisbridgeschools@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/karisbridge_school/',
    instagramHandle: '@karisbridge_school',
    facebook: 'https://www.facebook.com/p/Karisbridge-Schools-61557747603843/',
  },
  mapQuery: 'Karisbridge Schools, 1st Avenue, Kajola Estate Phase 1, Ibeju-Lekki, Lagos',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Life at KBS', href: '/life' },
  { label: 'Contact', href: '/contact' },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.road}, ${site.address.area}, ${site.address.city}, ${site.address.country}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
export const whatsappLink = (text = 'Hello Karisbridge Schools, I would like to make an enquiry.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
