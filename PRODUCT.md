# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (output statico) + Tailwind CSS 4 + TypeScript, deploy su Cloudflare Pages. Già in uso; token in `src/styles/tokens.css`, contenuti in `src/data/*.ts`.

## Users

Titolari di piccole imprese locali (ristoranti, studi professionali, artigiani, estetiste e parrucchieri, palestre, negozi, B&B, agenzie immobiliari), 35-65 anni, con poco tempo e diffidenti verso "quelli dei siti web", spesso scottati da preventivi gonfiati o freelance spariti. Arrivano da un link mandato dal commerciale (telefono, WhatsApp, email, visita) e aprono il sito sul telefono davanti a un venditore: decidono in 30 secondi se fidarsi. In futuro arriveranno anche da Google, passaparola e social.

## Product Purpose

Direzia realizza siti web veloci, facili da usare e a basso costo per piccole imprese, professionisti e attività del territorio. L'offerta è una sola: **il tuo sito in 3 giorni, massimo 500 € IVA inclusa, soddisfatti o rimborsati (14 giorni).** Il sito è prima di tutto prova di competenza: se promette siti veloci, semplici ed economici, deve esserlo. Successo: il prospect lascia i dati nel modulo, chiama o scrive su WhatsApp.

## Positioning

Prezzo massimo scritto prima, consegna in giorni (non mesi), rimborso se non convince, dominio e contenuti intestati al cliente, azienda locale con cui si può parlare di persona. Un freelance anonimo o un'agenzia non possono promettere tutte e quattro le cose insieme.

## Operating Context

Vendita guidata da un commerciale che manda il link (`?r=nome` personalizza il saluto). Un secondo canale inbound arriva dopo. Pagamento dopo l'approvazione della bozza (giorno 2), prima di andare online. Dal secondo anno: rinnovo dominio e manutenzione, massimo 100 € l'anno in tutto.

## Capabilities and Constraints

- Offerta, prezzi, giorni e garanzia vivono in `src/data/offer.ts`; ogni cifra mostrata nel sito deve venire da lì.
- Segnaposto aziendali centralizzati in `src/data/company.ts` (città, ragione sociale, telefono, email, P.IVA, fondatori); `npm run prelaunch` blocca il lancio se restano.
- Recensioni e progetti oggi sono dimostrativi (`demo: true`): vanno sempre etichettati "Esempio dimostrativo" e non devono entrare nei dati strutturati. Non si pubblicano recensioni inventate come vere.
- Requisiti tecnici: Lighthouse mobile 95+ su tutte le metriche, LCP sotto 1,5 s, peso iniziale sotto 150 KB escluse immagini, nessun cookie di tracciamento, font ospitati da noi, nessuno script di terzi bloccante, WCAG 2.2 AA, `prefers-reduced-motion` rispettato.
- Barra CTA fissa su mobile (Chiama, WhatsApp, Richiedi).
- Niente caroselli automatici, popup, chatbot, video in autoplay.

## Brand Commitments

Nome Direzia ("direzione", "diritto al punto"). Tutto il resto dell'identità attuale (logo D con freccia, palette verde abete + zafferano, Young Serif + Atkinson) è **evolvibile**: il committente non la considera vincolante e vuole una homepage radicalmente più moderna. Voce: "tu", frasi corte, cifre concrete, zero gergo, nessuna frase da AI.

## Evidence on Hand

Nessun cliente reale, nessuna recensione reale, nessuna foto del team, nessun dato societario. Esistono solo contenuti dimostrativi dichiarati come tali. Non inventare clienti, risultati o numeri come fossero veri.

## Product Principles

1. Il sito è la prova: deve essere la dimostrazione di ciò che vende (veloce, semplice, chiaro, economico).
2. Una sola offerta, detta subito: 3 giorni, massimo 500 €, rimborso.
3. Ogni obiezione (costi nascosti, mesi di attesa, "non so cosa darvi", "se non mi piace", dipendenza, affidabilità) ha una risposta esplicita.
4. Onestà prima dell'effetto: niente prova sociale falsa, niente promesse che il sito non può mantenere.
5. Meno da leggere, più da capire: la pagina vende in pochi secondi, il dettaglio sta sotto per chi lo cerca.

## Accessibility & Inclusion

Lettori di 35-65 anni su telefono, spesso all'aperto o di fretta: testo grande e a contrasto alto, bersagli di tocco ampi, movimento sempre disattivabile, nessuna informazione solo nel colore o nel movimento. WCAG 2.2 AA.
