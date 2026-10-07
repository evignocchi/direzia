# Direzia: il sito

Sito di Direzia, "Il tuo sito in 3 giorni. Massimo 500 €. Soddisfatti o rimborsati." Sito statico (Astro + Tailwind CSS 4 + TypeScript), pensato per essere aperto da un titolare scettico, sul telefono, in 30 secondi. Peso della home circa 80 KB, Lighthouse mobile 100/100/100/100, nessun cookie di tracciamento.

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm install` | Installa le dipendenze (Node 20 o più recente) |
| `npm run dev` | Sito in locale su http://localhost:4321 |
| `npm run build` | Build di produzione in `dist/` (nessun warning) |
| `npm run preview` | Serve `dist/` in locale |
| `npm run check` | `astro check` + controllo TypeScript delle Functions + ESLint |
| `npm run test:e2e` | Test Playwright (form, CTA, menu mobile, link, accessibilità con axe) su mobile e desktop |
| `npm run lighthouse` | Lighthouse mobile su 4 pagine, con compressione come in produzione. Fallisce sotto 95 |
| `npm run brand` | Rigenera logo, favicon, immagine OG, banner, firma email (legge colori e numeri dai file dati) |
| `npm run brand:contrast` | Verifica i contrasti WCAG della palette |
| `npm run prelaunch` | **Blocca il lancio** se restano segnaposto, contenuti demo o garanzia non validata |

Se Chromium non è nel percorso standard: `CHROMIUM_PATH=/percorso/chrome npm run test:e2e` e `CHROME_PATH=/percorso/chrome npm run lighthouse`.

## Come cambiare i contenuti (un file per tipologia)

Niente testi nei componenti. Modifica il file, salva, rifai il build.

| Cosa | File |
|---|---|
| Ragione sociale, P.IVA, sede, telefono, WhatsApp, email, PEC, fondatori, orari, link prenotazione | `src/data/company.ts` |
| **Prezzo, giorni, garanzia, cosa è incluso, timeline, pagamento** | `src/data/offer.ts` |
| Progetti e casi di successo (e i mockup dei siti) | `src/data/projects.ts` |
| Recensioni | `src/data/testimonials.ts` |
| Domande frequenti | `src/data/faq.ts` |
| Pagine per settore (`/per-ristoranti`, …) | `src/data/sectors.ts` |
| Testi della home e delle pagine (titoli, pulsanti, form) | `src/data/copy.ts` |
| Privacy, cookie, termini della garanzia | `src/data/legal.ts` |
| Colori, font, raggi, ombre | `src/styles/tokens.css` (poi `npm run brand`) |

"3 giorni", "500 €" e "14 giorni" stanno solo in `offer.ts`: cambiali lì e cambiano ovunque (testi, FAQ, schema.org, one-pager, immagine OG dopo `npm run brand`).

**Aggiungere un settore:** copia una voce in `sectors.ts`, cambia `slug` e testi. La pagina `/per-<slug>` nasce da sola.
**Aggiungere un progetto:** copia una voce in `projects.ts` (`demo: false`, `verified: true` quando è reale). La pagina `/progetti/<slug>` nasce da sola.

## Struttura

```
brand/            Brand: BRAND.md, logo (tutte le varianti), asset derivati, firma email, email per le recensioni
functions/        Cloudflare Pages Function del modulo di contatto (functions/api/contact.ts)
public/           Favicon, immagine OG, copia scaricabile del brand (/brand), _headers, foto segnaposto
scripts/          brand-*.mjs (asset), prelaunch.mjs, lighthouse.mjs
src/data/         I contenuti (vedi sopra)
src/components/   Componenti riusabili; home/ contiene le 12 sezioni della home
src/pages/        index, per-[settore], progetti/[slug], privacy, cookie, termini-garanzia, one-pager, brand, lascia-una-recensione, 404
src/styles/       tokens.css (unica fonte di verità del design) e global.css
tests/e2e/        Test Playwright
```

## Strumenti per il venditore

- **Saluto personalizzato:** manda il link `https://tuodominio.it/?r=Marco`. L'hero mostra "Ciao Marco, ecco cosa possiamo fare per te." Il nome si legge dall'indirizzo, si pulisce da caratteri strani e **non viene salvato** da nessuna parte.
- **Fonte della richiesta:** un link con `?r=` segna la richiesta come `venditore`, senza `?r=` è `inbound`. I parametri `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` finiscono in campi nascosti del modulo (restano nel browser solo finché la scheda è aperta). Arrivano nell'email/webhook.
- **WhatsApp per settore:** ogni pagina `/per-…` ha il suo messaggio precompilato (`whatsapp` in `sectors.ts`).
- **Scheda stampabile:** `/one-pager` (offerta, timeline, garanzia, contatti). Apri la pagina, "Stampa o salva in PDF", allegala alle email. Il layout per la stampa è curato per A4.
- **Pagine per campagne mirate:** manda `/per-ristoranti`, `/per-professionisti`, `/per-artigiani`, `/per-benessere` al settore giusto.

## Modulo di contatto

Il modulo invia a `/api/contact` (`functions/api/contact.ts`), che controlla campo anti-spam (honeypot), origine, lunghezze e, se configurato, Cloudflare Turnstile, poi inoltra:

1. **Email con Resend:** imposta `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (mittente di un dominio verificato su Resend).
2. **Webhook** (Zapier, Make, n8n, Slack…): imposta `CONTACT_WEBHOOK_URL`.
3. **Turnstile (facoltativo):** `PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY`. Lo script di Cloudflare si carica solo quando la persona inizia a compilare.

Tutte le variabili sono in `.env.example`. Senza almeno un canale configurato il modulo mostra un errore (e non perde i dati in silenzio): **prova un invio vero prima di lanciare**. Per provare in locale con le Functions: crea `.dev.vars` con i valori e lancia `npm run pages:dev`.

## Deploy su Cloudflare Pages

1. Carica il repository su GitHub.
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → scegli il repository.
3. Impostazioni di build: **Build command** `npm run build`, **Build output directory** `dist`, **Node** 20 o più recente (variabile `NODE_VERSION=20`).
4. Variabili d'ambiente (Settings → Environment variables), almeno: `SITE_URL` (il dominio definitivo, con `https://`), le variabili del modulo e `PUBLIC_BOOKING_URL`, `PUBLIC_GOOGLE_REVIEW_URL`, `PUBLIC_GOOGLE_BUSINESS_URL`. I segreti (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) come "Secret".
5. La cartella `functions/` viene riconosciuta da sola; `public/_headers` imposta sicurezza e cache.
6. Dominio: Custom domains → aggiungi il dominio. Poi imposta `SITE_URL` con quell'indirizzo e rifai il deploy.

Da riga di comando: `npm run build && npx wrangler pages deploy dist` (usa `wrangler.toml`).

## Statistiche (facoltative, senza cookie)

Spente di default, nessun banner necessario. Per attivarne una imposta UNA di queste variabili: `PUBLIC_PLAUSIBLE_DOMAIN`, `PUBLIC_UMAMI_WEBSITE_ID` (+ `PUBLIC_UMAMI_SRC` se self-hosted) oppure `PUBLIC_CF_ANALYTICS_TOKEN`. Gli script sono `defer`. Aggiorna la sezione "Statistiche delle visite" della cookie policy se ne attivi una e controlla `public/_headers` (la CSP già prevede i tre servizi).

## Recensioni vere (sostituire quelle demo)

Il sito oggi mostra 12 recensioni e 8 progetti **inventati**, tutti con `demo: true`, etichettati "Esempio dimostrativo" e con una nota nel footer. Non entrano nei dati strutturati per Google (`Review`/`AggregateRating` compaiono solo con `verified: true`). `npm run prelaunch` blocca la pubblicazione finché restano, salvo `ALLOW_DEMO=true`.

Per sostituirle:

1. **Raccogli:** una settimana dopo la consegna manda l'email di `brand/assets/email-richiesta-recensione.txt` con il link diretto a Google (Google Business Profile → "Chiedi recensioni" → copia il link in `PUBLIC_GOOGLE_REVIEW_URL`). Il cliente può anche aprire `/lascia-una-recensione`. Niente sconti o regali in cambio e niente recensioni scritte da te.
2. **Pubblica:** in `src/data/testimonials.ts` aggiungi una voce con `demo: false`, `verified: true`, il testo originale e `sourceUrl` (il link alla recensione su Google). Cancella una voce demo per ogni recensione vera.
3. **Progetti:** in `projects.ts` fai lo stesso per i casi reali, con `demo: false` e dati veri (e il consenso del cliente).
4. **Widget Google Reviews (facoltativo):** se vuoi mostrare le recensioni di Google in automatico serve un servizio esterno (per esempio Elfsight o Trustindex) che carica script di terzi e può impostare cookie: valuta il costo in peso e privacy, e aggiorna la cookie policy. Il sito funziona bene anche solo con le recensioni copiate a mano con il link all'originale.
5. Quando non resta più nulla di demo, la nota nel footer e le etichette spariscono da sole.

## Foto del team

Aggiungi `fondatore-1.jpg` e `fondatore-2.jpg` in `src/assets/team/`: il sito le ottimizza (AVIF/WebP, più misure, caricamento ritardato). Istruzioni su cosa fotografare in `src/assets/team/LEGGIMI.md`.

## Checklist pre-lancio

- [ ] `src/data/company.ts`: ragione sociale, P.IVA, codice fiscale, REA, capitale sociale, sede, telefono, WhatsApp, email, PEC, nomi dei fondatori, orari
- [ ] **Validazione legale** di `/termini-garanzia` e della privacy/cookie; poi `offer.guarantee.legalReviewed = true` e aggiorna `legalUpdatedAt` in `legal.ts`
- [ ] Conferma i numeri in `offer.ts`: prezzo e IVA inclusa, 14 giorni, cosa è incluso, quando si paga, cosa costa dal secondo anno
- [ ] Foto vere del team in `src/assets/team/`
- [ ] Recensioni e progetti veri al posto dei demo (o `ALLOW_DEMO=true` solo per la fase di vendita iniziale)
- [ ] Dominio: aggiungilo su Cloudflare Pages e imposta `SITE_URL`
- [ ] Variabili del modulo (Resend o webhook) e **prova di invio reale**
- [ ] `PUBLIC_BOOKING_URL` (Cal.com/Calendly) e link Google (`PUBLIC_GOOGLE_REVIEW_URL`, `PUBLIC_GOOGLE_BUSINESS_URL`)
- [ ] Scheda Google Business Profile creata e coerente con orari e indirizzo
- [ ] (Facoltativo) statistiche senza cookie
- [ ] Rigenera gli asset del brand con i dati definitivi: `npm run brand`
- [ ] `npm run prelaunch` senza errori, poi `npm run test:e2e` e `npm run lighthouse`
- [ ] Apri il sito dal tuo telefono, con il link `?r=` che manderai ai prospect

## Note tecniche

- **Tailwind 4:** niente `tailwind.config`: i token stanno in `@theme` dentro `src/styles/tokens.css` e generano le utility (`bg-abete`, `text-inchiostro`, `font-display`…). Nessun colore o font scritto a mano nei componenti. I colori dei mockup in `projects.ts` sono quelli dei clienti fittizi.
- **JavaScript:** nessun framework. Pochi script inline di poche righe (menu, filtro progetti, saluto `?r=`, provenienza, invio modulo). Funziona anche senza JavaScript: il menu si mostra aperto e il modulo invia con un normale POST.
- **Movimento:** comparsa leggera allo scroll solo dove il browser la supporta e mai con `prefers-reduced-motion`. Niente caroselli, popup, chatbot o video.
- **Pagine non indicizzate:** `/brand`, `/one-pager`, `/lascia-una-recensione`, `/grazie`, `/404` e le pagine dei progetti demo. Fuori dalla sitemap.
- **`/brand`:** `npm run prelaunch` non la controlla (è materiale interno con la firma email d'esempio). Se non vuoi pubblicarla, togli `src/pages/brand.astro` e la cartella `public/brand/`.
- **Decisioni, rischi e revisione critica:** `DECISIONS.md`, `REVIEW.md`, `brand/BRAND.md`.
