# TODO

## Fatto
- [x] Fase 0: brand (logo, palette con contrasti verificati, font, tono, asset derivati) in `brand/`
- [x] Dati centralizzati: company, offer, projects, testimonials, faq, sectors, copy, legal
- [x] Home di 12 sezioni e header/footer/barra CTA mobile
- [x] Pagine: progetti/[slug], per-[settore] (4), privacy, cookie, termini-garanzia, 404, grazie, brand, one-pager, lascia-una-recensione
- [x] Strumenti venditore: `?r=nome`, WhatsApp per settore, UTM e fonte nel form, one-pager stampabile
- [x] Modulo + Cloudflare Pages Function (honeypot, Turnstile opzionale, Resend o webhook)
- [x] SEO: meta, OG, sitemap, robots, canonical, schema.org (Review/AggregateRating solo se verificate)
- [x] `npm run prelaunch`
- [x] Test e2e Playwright (76 test) e Lighthouse 100/100/100/100
- [x] REVIEW.md e README.md

## Da fare a cura tua (il lancio è bloccato finché non sono fatti)
- [ ] Dati societari e contatti in `src/data/company.ts`
- [ ] Validazione legale della garanzia e dei testi legali, poi `offer.guarantee.legalReviewed = true`
- [ ] Conferma di prezzo (IVA inclusa), 14 giorni, cosa è incluso e quando si paga (`src/data/offer.ts`)
- [ ] Foto vere del team in `src/assets/team/`
- [ ] Recensioni e progetti veri al posto dei demo
- [ ] Dominio, `SITE_URL`, variabili del modulo e prova di invio reale
- [ ] `PUBLIC_BOOKING_URL`, link Google Business e recensioni
- [ ] (Facoltativo) statistiche senza cookie
