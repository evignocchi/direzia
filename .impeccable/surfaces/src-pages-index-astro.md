---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief: homepage

Mode: Persuade. Surface: `src/pages/index.astro` (homepage). Visitor: titolare di PMI (30-60 anni) che apre il link dal telefono davanti a un commerciale e decide in pochi secondi; poi il visitatore inbound.

Brief del committente: moderno ma commerciale, facile da usare, d'impatto, apprezzabile da un trentenne e da un cinquantenne. L'offerta è già forte: niente fronzoli. I progetti in primo piano ma non troppo.

Job: far capire "sito in 3 giorni, max 500 € IVA inclusa, rimborso 14 giorni" in un colpo d'occhio e portare a richiedere/chiamare/WhatsApp. Proof: nessun cliente reale; progetti e recensioni sono dimostrativi e restano etichettati.

## Direction contract

THESIS: la homepage è un tabellone delle partenze di stazione: un solo oggetto, visto una volta, in cui il sito "parte" oggi e "arriva" tra tre giorni lavorativi. Rifiuta la landing con eroe diviso, badge e riga di card uguali. Il tabellone è il mondo, mai il contenuto: il pulsante e i testi di lettura vivono fuori dalle celle.

OWN-WORLD: nero-lavagna da tabellone (#0D0F13) con celle split-flap un grado più chiare, giallo segnale da stazione come unico colore di azione, bianco e grigio freddo per la lettura, un verde "arrivato" solo come stato. Carattere: Barlow Condensed 800 in maiuscolo per cifre, celle e titoli; Barlow per il testo. Celle fisse con linea di cerniera a metà, righe separate da filetti, stati come etichette in riga. Riconoscibile anche senza contenuto: righe nere con lettere gialle in celle spezzate.

STORY: il visitatore capisce che il sito parte oggi, arriva giovedì, costa al massimo 500 € e si rimborsa; crede alla promessa perché è scritta come un orario che non si può negoziare e il sito stesso è leggero e immediato; agisce con il pulsante giallo sulla riga d'azione (Richiedi il tuo sito), WhatsApp o telefono.

FIRST VIEWPORT: a tutta larghezza su nero: header sottile (logo, Chiama, pulsante giallo); il titolo "IL TUO SITO IN 3 GIORNI" in celle split-flap enormi (11 celle per riga, occupano la larghezza), sotto la frase di prezzo e garanzia; poi il tabellone a tre righe (Giorno 1 PARTENZA, Giorno 2 IN ARRIVO, Giorno 3 ARRIVO con la data vera calcolata) e subito sotto la riga d'azione gialla a tutta larghezza con "Richiedi il tuo sito" e WhatsApp. Il pulsante è visibile nel primo schermo del telefono.

FORM: tabellone delle partenze di stazione (split-flap), posizione 4 della mia lista di sette (cantiere, volantino a prezzo, calendario a strappo, tabellone, insegna dipinta, scontrino, segnaletica stradale); seed key b677a13f. Raise: la griglia di caratteri rigida (da ASCII) governa celle e righe; gli stati del form si "stampano" come righe del tabellone (da terminale); le azioni vivono su un piano separato e fermo sopra il tabellone (da multiplane cel).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Scope and boundaries

Solo la homepage ora; il resto del sito (settori, progetti, legali, one-pager, brand) segue a cascata. Meno sezioni: tabellone/hero con timeline, progetti (4 in vista, 4 su richiesta), cosa è incluso (compatto), prezzo e garanzia (campo giallo), recensioni (3 + altre), domande, contatto. Via "problema" e "chi siamo" estesi.

## Open decisions

Nessuna immagine generata (non disponibile): tutto in HTML/CSS/SVG. Code-led.
