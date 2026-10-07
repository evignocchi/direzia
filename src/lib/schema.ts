/**
 * Dati strutturati schema.org (JSON-LD). Tutto deriva dai file in src/data.
 * Recensioni e valutazioni entrano SOLO se `verified: true` e `demo: false`: mai contenuti dimostrativi.
 */
import { company, isPlaceholder } from '../data/company';
import { offer } from '../data/offer';
import { faq } from '../data/faq';
import { verifiedTestimonials } from '../data/testimonials';
import { copy } from '../data/copy';

export const siteUrl = (site: URL | undefined) => (site ? site.href.replace(/\/$/, '') : 'https://direzia.pages.dev');

export function organizationSchema(base: string) {
  const sameAs = [...Object.values(company.social), company.googleBusinessUrl].filter((u) => u && !isPlaceholder(u));
  const reviews = verifiedTestimonials();
  const rating = reviews.length
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: +(reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
        },
        review: reviews.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
          reviewBody: r.text,
          url: r.sourceUrl,
        })),
      }
    : {};
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${base}/#organization`,
    name: company.brandName,
    legalName: company.legalName,
    url: base,
    logo: `${base}/icon-512.png`,
    image: `${base}/og.png`,
    description: copy.site.description,
    telephone: company.phone.tel,
    email: company.email,
    vatID: company.vatId,
    priceRange: `fino a ${offer.priceMax} €`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.zip,
      addressLocality: company.address.city,
      addressRegion: company.address.province,
      addressCountry: company.address.country,
    },
    areaServed: company.area,
    openingHours: company.openingHoursSpec,
    ...(sameAs.length ? { sameAs } : {}),
    ...rating,
  };
}

export function serviceSchema(base: string) {
  return {
    '@type': 'Service',
    '@id': `${base}/#service`,
    name: offer.name,
    serviceType: 'Realizzazione di siti web per piccole attività',
    provider: { '@id': `${base}/#organization` },
    areaServed: company.area,
    description: `Sito vetrina fino a ${offer.pagesIncluded} pagine, online in ${offer.deliveryDays} giorni, con dominio e hosting del primo anno. Rimborso entro ${offer.guarantee.days} giorni.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: offer.currency,
      price: offer.priceMax,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: offer.currency,
        maxPrice: offer.priceMax,
        valueAddedTaxIncluded: offer.vatIncluded,
      },
      availability: 'https://schema.org/InStock',
    },
  };
}

export function faqSchema() {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
