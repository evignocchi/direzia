/**
 * DATI AZIENDALI: unico file che alimenta header, footer, schema.org, privacy, cookie, garanzia, form e one-pager.
 * Ogni valore tra [PARENTESI QUADRE] (o con zeri) è un SEGNAPOSTO: `npm run prelaunch` blocca il lancio finché ne resta uno.
 */
// `import.meta.env` esiste in Astro; gli script Node (brand, prelaunch) importano lo stesso file senza.
const env = ((import.meta as { env?: Record<string, string | undefined> }).env ?? {}) as Record<string, string | undefined>;

export const company = {
  brandName: 'Direzia',
  tagline: 'Siti web veloci, semplici e a prezzo chiaro per le attività del territorio.',

  legalName: '[RAGIONE SOCIALE]',
  vatId: '[P.IVA]',
  taxCode: '[CODICE FISCALE]',
  reaNumber: '[N. REA E CCIAA]',
  shareCapital: '[CAPITALE SOCIALE]',
  pec: '[PEC]',
  email: '[EMAIL]',

  address: {
    street: '[VIA E NUMERO]',
    zip: '[CAP]',
    city: '[CITTÀ]',
    province: '[PROVINCIA]',
    country: 'IT',
  },
  /** Zona servita, usata nei testi ("Siamo a …") e nello schema LocalBusiness. */
  area: '[CITTÀ] e provincia',

  phone: { display: '+39 000 000 0000', tel: '+390000000000' },
  /** Solo cifre, con prefisso internazionale, senza "+" (formato wa.me). */
  whatsappNumber: '390000000000',
  openingHours: 'Lunedì–venerdì, 9:00–18:00',
  /** Orari in formato schema.org (opzionale). */
  openingHoursSpec: ['Mo-Fr 09:00-18:00'],

  founders: [
    {
      name: '[NOME FONDATORE 1]',
      role: 'Fondatore, segue i clienti',
      bio: '[2 righe su chi è, che lavoro faceva prima, perché ha fondato Direzia]',
      photo: '/team/fondatore-1.svg',
    },
    {
      name: '[NOME FONDATORE 2]',
      role: 'Fondatore, realizza i siti',
      bio: '[2 righe su chi è, che lavoro faceva prima, perché ha fondato Direzia]',
      photo: '/team/fondatore-2.svg',
    },
  ],

  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  /** Link per prenotare i 15 minuti di chiamata (Cal.com, Calendly…). Variabile: PUBLIC_BOOKING_URL. Se vuoto, il pulsante non compare. */
  bookingUrl: env.PUBLIC_BOOKING_URL || '',
  /** Scheda Google Business Profile e link diretto per lasciare una recensione. Variabile: PUBLIC_GOOGLE_REVIEW_URL */
  googleReviewUrl: env.PUBLIC_GOOGLE_REVIEW_URL || '[LINK RECENSIONE GOOGLE]',
  googleBusinessUrl: env.PUBLIC_GOOGLE_BUSINESS_URL || '[LINK SCHEDA GOOGLE BUSINESS]',
} as const;

export const PLACEHOLDER_PATTERN = /\[(?=[^\]]*[A-ZÀ-Ý])[A-ZÀ-Ý0-9 .,/'’-]+\]|\+39 000 000 0000|\+?390000000000/;

export const isPlaceholder = (value: string) => PLACEHOLDER_PATTERN.test(value);

/** Indirizzo su una riga, per footer e documenti legali. */
export const fullAddress = () =>
  `${company.address.street}, ${company.address.zip} ${company.address.city} (${company.address.province})`;

export const phoneHref = `tel:${company.phone.tel}`;
export const emailHref = `mailto:${company.email}`;
export const whatsappHref = (message: string) =>
  `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
