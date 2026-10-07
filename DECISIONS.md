# Decisioni di progetto

Scelte prese in autonomia, con il motivo. Dove una scelta dipende da te (prezzi, legale, dati societari) è segnata **DA CONFERMARE** e si cambia in un file solo.

## Risposte del committente (guidano tutto il resto)

| Tema | Decisione |
|---|---|
| Tetto di 500 € | **IVA inclusa.** Flag `offer.vatIncluded` in `src/data/offer.ts`. |
| Rimborso | **14 giorni** dalla messa online. `offer.guarantee.days`. |
| Extra a pagamento | **Nessuno** nel primo anno. Dal secondo anno: dominio + manutenzione, max 100 € l'anno in tutto. Tutto è compreso per un sito vetrina. Quello che può cambiare sono i **tempi**, per progetti oltre il sito vetrina (negozio online, ecc.). Niente prezzi di extra nel sito. |
| Direzione colore | **Verde abete + zafferano.** |

## Strategia

**Il sito è la prova.** Un titolare scettico lo apre sul telefono, davanti a un venditore, e decide in 30 secondi se fidarsi. Se promettiamo un sito veloce, semplice ed economico, il nostro deve esserlo: poche parole, pagine leggere (nessun JavaScript di framework, nessun script di terzi), una sola offerta.

**Logica della pagina (un venditore esperto, in ordine).**
1. Promessa e prezzo subito (hero), con prova leggera sotto.
2. Tre impegni in una riga (3 giorni · max 500 € · rimborso).
3. Il problema, in tre frasi: l'altra esperienza (costi, mesi, dipendenza).
4. La soluzione: cosa è incluso, concreto.
5. Come funziona, giorno per giorno, con cosa serve da lui.
6. Prove: progetti per settore e recensioni (oggi dimostrativi, etichettati).
7. Prezzo e garanzia scritti in chiaro.
8. Chi siamo: facce e territorio.
9. FAQ che chiudono le obiezioni rimaste.
10. Contatto: form corto, WhatsApp, telefono, chiamata da 15 minuti.

Ogni obiezione del brief ha una risposta esplicita e un posto preciso:

| Obiezione | Dove la chiudiamo |
|---|---|
| Costa troppo / costi nascosti | Hero, barra impegni, Prezzi, FAQ |
| Ci metterete mesi | Come funziona (giorno 1-2-3) |
| Non so cosa darvi / non ho tempo | Come funziona ("cosa serve da te"), FAQ |
| E se non mi piace? | Garanzia, `/termini-garanzia` |
| Poi dipendo da voi | Incluso ("Il sito è tuo", formazione), FAQ |
| Siete affidabili / locali? | Chi siamo, Recensioni, Progetti |

## Headline dell'hero: tre alternative

1. **"Il tuo sito in 3 giorni."** ← scelta
2. "Il sito della tua attività, online in 3 giorni. Il prezzo lo sai prima."
3. "Basta preventivi che non finiscono mai. Il tuo sito in 3 giorni, massimo 500 €."

**Perché la 1.** È l'offerta, parola per parola, ed è il nome del servizio: quando il venditore dice "Il tuo sito in 3 giorni" al telefono e il prospect apre il link, legge la stessa frase. Parla dell'esito, non di chi siamo. La 2 è chiara ma lunga per uno schermo da 375 px. La 3 apre con una polemica ("basta preventivi…") che parla di noi contro altri; meglio dirlo nella sezione del problema, dopo aver dato la promessa. Prezzo e garanzia stanno nel sottotitolo, subito sotto, senza scroll.

## Palette, font, logo

- **Palette:** abete `#1A4A37` (primario), terracotta `#A63F24` (secondario, poco), zafferano `#F5B21B` (solo CTA), neutri caldi (crema, sabbia, pietra, muschio, inchiostro). Tutte le coppie testo/sfondo verificate WCAG AA (`npm run brand:contrast`). Motivazione completa in `brand/BRAND.md`.
- **Font:** Young Serif (titoli) + Atkinson Hyperlegible Next (testo), self-hosted, solo latino, circa 52 KB in totale.
- **Logo:** concept B (D con freccia + wordmark minuscolo). Perché: si legge a 24 px e in bianco e nero.

## Scelte tecniche

| Tema | Scelta | Motivo |
|---|---|---|
| Framework | Astro (output statico), TypeScript | Come da brief; zero JS di framework |
| CSS | Tailwind CSS 4 con plugin Vite; token in `src/styles/tokens.css` (`@theme`) | Tailwind 4 sostituisce `tailwind.config` con `@theme` in CSS: stessa funzione, un file |
| JavaScript lato client | Script inline di poche righe (filtri progetti, menu, saluto `?r=`, UTM, invio form). Nessuna island, nessuna libreria | Peso e semplicità |
| Accordion FAQ | `<details>/<summary>` nativi | Accessibile da tastiera senza JS |
| Contenuti | Un file per tipologia in `src/data/`: `company`, `offer`, `projects`, `testimonials`, `faq`, `sectors`, `copy` | Un non sviluppatore modifica un file e basta |
| Mockup dei siti demo | Componente `DemoSite` in HTML/CSS/SVG, scalato con unità `cqw` | Nessuna immagine da scaricare, nessun marchio o foto reale, sempre nitido |
| Immagini raster | Solo OG e icone (PNG generati). Le foto del team verranno aggiunte dal committente: la pipeline AVIF/WebP con `srcset` è pronta in `TeamPhoto` | Il sito non ha foto da ottimizzare oggi |
| Form | Cloudflare Pages Function `functions/api/contact.ts` → Resend/webhook, honeypot + Turnstile opzionale | Come da brief |
| Analytics | Nessuno attivo. Plausible/Umami/Cloudflare Web Analytics come opzione commentata in `astro.config.mjs` | Niente cookie, niente banner |

## Offerta: assunzioni da confermare

- **Pagamento:** dopo che il cliente ha visto e approvato la bozza (giorno 2), prima di andare online. Toglie il rischio al cliente e rende la garanzia credibile. **DA CONFERMARE.**
- **Cosa inizia il conteggio dei 3 giorni:** il giorno in cui riceviamo logo, foto e informazioni di base (testi inclusi). Lo scriviamo ovunque, perché è quello che evita liti. **DA CONFERMARE.**
- **Dal secondo anno (deciso dal committente):** rinnovo del dominio e manutenzione, **massimo 100 € l'anno in tutto**. Cifra in `offer.yearTwoMax`; il testo mostrato nel sito (`offer.afterYearOne`) ricalca il tetto.
- **Cosa è incluso:** sito vetrina fino a 5 pagine, dominio .it e hosting del primo anno, testi, SEO base, scheda Google collegata, modulo contatti, formazione di 30 minuti, 30 giorni di assistenza. Elenco in `offer.included`. **DA CONFERMARE** che i 500 € lo coprano con margine.
- **Garanzia:** condizioni scritte in italiano semplice. Il testo è un segnaposto da validare con un legale. Finché `offer.guarantee.legalReviewed` è `false`, `npm run prelaunch` blocca il lancio.

## Recensioni e casi: regola applicata

- 12 recensioni e 8 casi **inventati** in `src/data/testimonials.ts` e `src/data/projects.ts`, con `demo: true` e `verified: false`.
- Finché `demo: true`: etichetta "Esempio dimostrativo" sulle recensioni e sui progetti e nota nel footer. Nessuna recensione fa parte dello schema.org (`Review`/`AggregateRating`): lo schema si attiva solo con `verified: true`.
- `npm run prelaunch` blocca la produzione se resta contenuto demo senza `ALLOW_DEMO=true`.
- Flusso per raccogliere recensioni vere: `/lascia-una-recensione`, email pronta (`brand/assets/email-richiesta-recensione.txt`), istruzioni in `README.md`.
- Nomi di attività e persone sono di fantasia. Un'omonimia con un'attività reale può capitare: per questo la nota "Esempio dimostrativo" resta finché i contenuti non sono veri.

## Rischi

1. **Segnaposto dimenticati.** Mitigazione: `company.ts` unico, `npm run prelaunch` blocca.
2. **Demo scambiati per veri.** Mitigazione: etichette visibili, nota nel footer, `ALLOW_DEMO`.
3. **Garanzia non validata.** Mitigazione: flag `legalReviewed` e avviso in `/termini-garanzia`.
4. **Promesse di velocità non rispettate dal sito stesso.** Mitigazione: budget di peso e Lighthouse controllati in `README.md` (comandi) e in `REVIEW.md` (risultati).
5. **Margine.** 500 € IVA inclusa, con dominio e hosting inclusi e 30 giorni di assistenza: verifica che regga.
6. **Il team non c'è nelle foto.** Segnaposto marcati in `public/team/` con istruzioni su cosa fotografare.
