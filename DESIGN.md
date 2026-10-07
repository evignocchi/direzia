---
name: Direzia
description: "Il tuo sito in 3 giorni." Un sito a tabellone delle partenze: nero lavagna, celle split-flap gialle, campo giallo segnale per l'azione.
colors:
  ink: "#0d0f13"
  board: "#14171c"
  cell: "#1e222a"
  line: "#2d323c"
  mist: "#a6aebb"
  signal: "#ffd21f"
  signal-deep: "#f2bd00"
  white: "#ffffff"
  paper: "#f3f4f6"
  paper-2: "#e8eaee"
  rule: "#d2d6dc"
  graphite: "#565d68"
  go: "#2bd576"
  go-ink: "#0b7a3d"
  go-soft: "#dcf4e6"
  errore: "#b42318"
  attenzione: "#8a5b00"
  attenzione-chiaro: "#fff3d6"
typography:
  flap:
    fontFamily: "Barlow Condensed, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.35rem, 11.4vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.4rem, 1.6rem + 3.4vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, Impact, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  section-mobile: "64px"
  section-desktop: "96px"
  gutter-mobile: "20px"
  gutter-desktop: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12.8px 25.6px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.signal-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    height: "56px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "56px"
  flap-cell:
    backgroundColor: "{colors.cell}"
    textColor: "{colors.signal}"
    rounded: "0.09em"
  board-row:
    backgroundColor: "{colors.board}"
    textColor: "{colors.white}"
    padding: "10px 24px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12.8px 15.2px"
---

# Design System: Direzia

## Overview

**Creative North Star: "Il tabellone delle partenze"**

Un solo oggetto, visto una volta: il tabellone di una stazione. Il sito "parte" oggi e "arriva" tra tre giorni lavorativi, e la pagina lo dice con lo stesso linguaggio di un orario: righe, celle, stati. Il tabellone è la carta d'identità del mondo, non il contenuto: il titolo e i numeri stanno in celle split-flap, mentre il testo da leggere, i progetti e il modulo restano su campi chiari, normali, comodi da leggere a qualsiasi età.

La pagina alterna quattro campi: nero tabellone (hero e contatto), grigio chiaro (progetti, recensioni), bianco (cosa è incluso, domande) e il giallo segnale pieno dove il prezzo è l'argomento. Il giallo è l'unico colore di azione: dove c'è giallo, o c'è un pulsante da premere o c'è il prezzo.

**Key Characteristics:**
- Lettere condensate maiuscole in celle fisse con linea di cerniera a metà.
- Un solo colore di azione (giallo segnale) e un solo colore di stato (verde "arrivato").
- Righe e filetti al posto di card: la struttura è una tabella, non una griglia di riquadri.
- Movimento solo come flip a cascata sulle celle, spento con `prefers-reduced-motion`.
- Azioni su un piano separato e fermo (fascia gialla, pulsanti pieni), mai dentro le celle.

## Colors

Un tabellone nero con lettere gialle, e tutto il resto in grigi freddi e bianco.

### Primary
- **Nero Tabellone** (#0d0f13): campo dell'hero, del contatto e del footer; testo corrente su chiaro.
- **Giallo Segnale** (#ffd21f): lettere delle celle, pulsante principale, campo del prezzo. Il giallo più caldo (#f2bd00) è solo lo stato hover.

### Secondary
- **Verde Arrivato** (#2bd576 sul nero, #0b7a3d su chiaro): stato "arrivo" nel tabellone e segni di spunta nell'elenco.

### Neutral
- **Pannello** (#14171c), **Cella** (#1e222a), **Filetto** (#2d323c): i tre gradini del nero, per il pannello, le celle e le righe.
- **Foschia** (#a6aebb): testo secondario sul nero.
- **Carta** (#f3f4f6) e **Carta 2** (#e8eaee): campi chiari alternati, riquadri e campi del modulo.
- **Grafite** (#565d68): testo secondario su chiaro.
- **Filetto chiaro** (#d2d6dc): linee di separazione su chiaro (non portano testo).

### Named Rules
**The One Action Rule.** Il giallo segnale appartiene alle azioni e al prezzo. Nessun'altra decorazione usa il giallo.
**The Quiet Reading Rule.** Il testo da leggere sta sempre fuori dalle celle, su campo piano a contrasto alto (rapporti verificati con `npm run brand:contrast`).

## Typography

**Display Font:** Barlow Condensed 800 (con Arial Narrow, Impact)
**Body Font:** Barlow 400 e 600 (con system-ui)

**Character:** una condensata da segnaletica che ha il peso di un cartello e la chiarezza di un orario; il testo corrente in Barlow normale ha respiro e si legge senza fatica.

### Hierarchy
- **Flap** (800, `clamp(2.35rem, 11.4vw, 5.6rem)`, 1): il titolo in celle, undici celle per riga.
- **Headline** (800, `clamp(2.4rem, 1.6rem + 3.4vw, 4.2rem)`, 1, maiuscolo): titoli di sezione, frasi brevi.
- **Title** (800, 1.55rem, 1, maiuscolo nelle card): nomi dei progetti, righe del tabellone.
- **Body** (400, 1.125rem, 1.55): testo corrente, massimo circa 65 caratteri per riga.
- **Label** (600, 0.8125rem, +0.08em, maiuscolo): etichette di colonna (Costo, Rimborso, Paghi).

### Named Rules
**The Cell Alphabet Rule.** Le celle contengono solo maiuscole e cifre brevi: parole che si leggono come un tabellone, mai frasi.

## Layout

Una colonna di 76rem al massimo con margini di 20px su telefono e 32px da tablet. Le sezioni hanno 64px di aria sopra e sotto su telefono, 96px su schermo largo. Il tabellone dell'hero occupa tutta la larghezza; sotto compare la fascia gialla d'azione a piena larghezza. I progetti sono una striscia da scorrere con il dito su telefono (nessun avanzamento automatico) e una griglia a 2 e 4 colonne da tablet in su. La barra con Chiama, WhatsApp e Richiedi resta fissa in fondo allo schermo del telefono.

## Elevation & Depth

Piano per natura: la profondità viene dai campi di colore (nero, grigio, bianco, giallo) e dalle righe, non dalle ombre. Le ombre compaiono solo come risposta morbida a un riquadro bianco su campo chiaro o scuro.

### Shadow Vocabulary
- **Soft** (`0 1px 2px rgb(13 15 19 / 0.08), 0 10px 28px -10px rgb(13 15 19 / 0.22)`): recensioni su grigio.
- **Lift** (`0 2px 4px rgb(13 15 19 / 0.1), 0 22px 44px -14px rgb(13 15 19 / 0.35)`): riquadro del modulo sul nero.

### Named Rules
**The Flat-By-Default Rule.** Il tabellone non porta ombre esterne: la sua profondità è la linea di cerniera e il filo scuro sul bordo basso delle celle.

## Shapes

Angoli netti da insegna: 4px per i dettagli, 8px per pulsanti e campi, 12px per recensioni e modulo. Le celle hanno un raggio di 0.09em e una linea di cerniera a metà altezza. I filetti sono sottili (1px su chiaro, 1px `line` sul nero) e dividono le righe al posto dei bordi dei riquadri.

## Components

### Buttons
- **Shape:** rettangoli con angoli a 8px, altezza 56px, testo Barlow 600 a 1.25rem.
- **Primary:** giallo segnale con testo nero; hover giallo più caldo.
- **Su campo giallo:** pieno nero con testo bianco, oppure solo contorno nero.
- **Su nero:** contorno bianco.

### Cells (celle split-flap)
- **Style:** cella #1e222a, lettera gialla (o bianca nelle cifre dei giorni), linea di cerniera a metà, fondo scuro sottile.
- **Motion:** flip in ingresso a cascata (500ms, sfalsato per cella), solo trasformazione; con movimento ridotto restano ferme.

### Board rows
- **Style:** righe su pannello #14171c con filetti `line`; numero giorno in cella, titolo in condensata maiuscola, riga "Tu:" in foschia, stato a destra con pallino (giallo partenza, bianco in arrivo, verde arrivo).

### Inputs / Fields
- **Style:** fondo carta, contorno grafite di 2px, angoli 8px.
- **Focus:** anello nero di 3px (giallo su campi scuri). **Error:** contorno rosso e messaggio sotto il campo.

### Cards / Containers
- **Progetti:** mockup di sito in cornice di browser, nome in condensata, risultato in grafite, giorni di consegna in una cella.
- **Recensioni:** riquadro bianco con ombra *soft*, stelle in nero, etichetta "Esempio dimostrativo" finché i contenuti sono demo.

### Navigation
- Header nero sottile: logo negativo, quattro ancore, telefono e pulsante giallo. Su telefono: logo e menu a tendina, con la barra fissa in basso.

## Do's and Don'ts

### Do:
- **Do** tenere il giallo segnale per azioni e prezzo, e il verde solo per lo stato "arrivato".
- **Do** mettere il testo da leggere su campo piano, fuori dalle celle.
- **Do** mostrare le date vere ("gio 8 ott") invece di "tra 3 giorni" dove il JavaScript è disponibile.
- **Do** etichettare ogni contenuto dimostrativo con "Esempio dimostrativo".

### Don't:
- **Don't** usare le celle per frasi lunghe o per testo corrente.
- **Don't** aggiungere sfondi con gradienti, aloni luminosi o effetti vetro: il tabellone è piatto.
- **Don't** trasformare l'elenco in una griglia di card uguali con icona, titolo e testo.
- **Don't** far muovere nulla senza `prefers-reduced-motion` e mai in avanzamento automatico.
