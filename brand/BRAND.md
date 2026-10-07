# Direzia: identità di marca (Fase 0)

> **In aggiornamento.** La homepage è stata ridisegnata come "tabellone delle partenze" (nero, giallo segnale, Barlow Condensed + Barlow). Il sistema attuale è descritto in `DESIGN.md`; token in `src/styles/tokens.css`. Questo documento descrive ancora la prima identità (verde abete, Young Serif) e verrà riallineato quando il resto del sito segue la nuova direzione.

Direzia non aveva nulla: né nome visivo, né colori, né voce. Questo documento fissa le scelte. I valori operativi vivono in `src/styles/tokens.css` (unica fonte di verità); gli asset si rigenerano con `npm run brand`.

## 1. Posizionamento

**In una frase:** Direzia fa il sito alle attività del territorio in 3 giorni, con un prezzo massimo scritto prima e i soldi indietro se non ti convince.

**Il nome.** "Direzia" richiama *direzione* e *diritto al punto*. Si legge in italiano senza esitazioni, suona come un cognome o una via di quartiere (locale, non inglese) e promette quello che facciamo: ti diamo una direzione chiara, senza giri. Per questo il simbolo è una **D** con una freccia che punta avanti.

**Tre valori**

| Valore | Cosa vuol dire | Perché conta per un titolare diffidente |
|---|---|---|
| **Velocità** | 3 giorni dalla chiamata al sito online. Anche il nostro sito è leggero e si apre subito. | Ha poco tempo ed è abituato a preventivi che durano mesi. |
| **Chiarezza** | Prezzo massimo scritto, cosa è incluso, parole semplici. Niente gergo. | Teme i costi nascosti e non capisce il linguaggio dei siti. |
| **Onestà** | Garanzia soddisfatti o rimborsati, dominio e contenuti intestati a te, tempi veri. | È stato scottato da freelance spariti e preventivi gonfiati. |

## 2. Logo

Tre concept (in `brand/logo/concepts/`):

- **A. Wordmark.** "direzia" in minuscolo, con una piccola freccia finale. Semplice, ma da solo non lascia un segno riconoscibile a 24 px.
- **B. Simbolo + wordmark.** La D con la freccia, accanto al nome. Si legge a colpo d'occhio, funziona anche solo come simbolo (favicon, avatar).
- **C. Monogramma.** La D su quadrato verde con angoli morbidi. Ottimo come icona app e avatar, meno adatto come firma completa.

**Scelto: B.** Il simbolo regge a 24 px e in bianco e nero stampato (la freccia diventa un vuoto nella D, quindi non serve il colore per leggerla). Il wordmark in Young Serif dà il tono caldo e "di quartiere" che manca ai loghi tutti sans-serif delle agenzie web. Il concept C resta come icona (favicon, avatar). Il concept A non si usa.

| File | Quando usarlo |
|---|---|
| `direzia-principale.svg` | Versione principale (verticale): copertine, documenti, spazi alti |
| `direzia-orizzontale.svg` | Header, firma email, spazi bassi e larghi |
| `direzia-simbolo.svg` | Avatar, icone, quando il nome è già nel testo |
| `direzia-monocromatico.svg` | Stampa in bianco e nero, timbri, fax, ricevute |
| `direzia-negativo.svg` / `direzia-negativo-simbolo.svg` | Su sfondo scuro (verde abete o inchiostro) |
| `favicon.svg`, `favicon/favicon-32.png`, `apple-touch-icon-180.png`, `icon-512.png` | Browser e telefono |

**Regole d'uso.** Area di rispetto: metà dell'altezza della D su ogni lato. Dimensione minima: simbolo 20 px, logo orizzontale 96 px di larghezza. Niente effetti, niente ombre, niente rotazioni, niente nuovi colori. Su fondi non verdi o scuri si usa la versione monocromatica.

## 3. Palette

Pensata per titolari di PMI locali, 35–65 anni: caldo e solido, lontano dal blu tech.

| Ruolo | Nome | HEX | Token Tailwind | Perché |
|---|---|---|---|---|
| Primario | Abete | `#1A4A37` | `abete` | Verde profondo: territorio, fiducia, "via libera". Non è il solito blu delle agenzie. |
| Primario scuro | Abete scuro | `#0F2F23` | `abete-scuro` | Footer, testo sui pulsanti |
| Primario chiaro | Abete chiaro | `#E3EEE7` | `abete-chiaro` | Riquadri, sfondi di evidenza |
| Secondario | Terracotta | `#A63F24` | `terracotta` | Calore da bottega. Si usa poco, per evidenziare |
| Secondario chiaro | Terracotta chiaro | `#F7E4DC` | `terracotta-chiaro` | Riquadri di avviso morbido |
| Accento CTA | Zafferano | `#F5B21B` | `zafferano` | Solo per i pulsanti principali: l'unico giallo della pagina è quello su cui cliccare |
| Accento hover | Zafferano scuro | `#E0A010` | `zafferano-scuro` | Stato hover dei pulsanti |
| Neutro 1 | Crema | `#FBF7EE` | `crema` | Sfondo pagina: più caldo del bianco |
| Neutro 2 | Sabbia | `#F2EBDC` | `sabbia` | Sezioni alternate |
| Neutro 3 | Pietra | `#DDD3BF` | `pietra` | Linee e bordi decorativi |
| Neutro 4 | Muschio | `#5E5A4E` | `muschio` | Testo secondario, bordi dei campi |
| Neutro 5 | Inchiostro | `#1E2722` | `inchiostro` | Testo corrente |
| Stato: ok | Ok | `#1F7A4A` su `#E3F3EA` | `ok`, `ok-chiaro` | Conferme |
| Stato: errore | Errore | `#B42318` su `#FBEAE8` | `errore`, `errore-chiaro` | Errori nel form |
| Stato: attenzione | Attenzione | `#8A5B00` su `#FFF3D6` | `attenzione`, `attenzione-chiaro` | Etichette "Esempio dimostrativo" |
| Stato: info | Info | `#1F5F8B` | `info` | Note informative |

### Contrasti WCAG (calcolati da `npm run brand:contrast`)

Soglie: 4,5:1 per testo normale, 3:1 per grafica e componenti. Lo script fallisce se una coppia scende sotto soglia.

| Testo | Sfondo | Uso | Contrasto | Soglia | Esito |
|---|---|---|---|---|---|
| `#1E2722` inchiostro | `#FBF7EE` crema | Testo corrente su fondo pagina | 14.35:1 | 4.5:1 | OK |
| `#1E2722` inchiostro | `#F2EBDC` sabbia | Testo su sezioni sabbia | 12.93:1 | 4.5:1 | OK |
| `#1E2722` inchiostro | `#E3EEE7` abeteChiaro | Testo su riquadri verde chiaro | 12.90:1 | 4.5:1 | OK |
| `#5E5A4E` muschio | `#FBF7EE` crema | Testo secondario / etichette form | 6.44:1 | 4.5:1 | OK |
| `#5E5A4E` muschio | `#F2EBDC` sabbia | Testo secondario su sabbia | 5.80:1 | 4.5:1 | OK |
| `#1A4A37` abete | `#FBF7EE` crema | Link e titoli verdi su crema | 9.45:1 | 4.5:1 | OK |
| `#1A4A37` abete | `#F2EBDC` sabbia | Titoli verdi su sabbia | 8.51:1 | 4.5:1 | OK |
| `#1A4A37` abete | `#E3EEE7` abeteChiaro | Testo verde su riquadro chiaro | 8.49:1 | 4.5:1 | OK |
| `#FBF7EE` crema | `#1A4A37` abete | Testo chiaro su sezione verde | 9.45:1 | 4.5:1 | OK |
| `#FBF7EE` crema | `#0F2F23` abeteScuro | Testo chiaro su footer scuro | 13.53:1 | 4.5:1 | OK |
| `#E3EEE7` abeteChiaro | `#0F2F23` abeteScuro | Testo secondario su footer scuro | 12.16:1 | 4.5:1 | OK |
| `#F5B21B` zafferano | `#1A4A37` abete | Accenti e icone su verde (grafica, ≥3) | 5.42:1 | 3:1 | OK |
| `#F5B21B` zafferano | `#0F2F23` abeteScuro | Accenti su verde scuro (grafica, ≥3) | 7.76:1 | 3:1 | OK |
| `#0F2F23` abeteScuro | `#F5B21B` zafferano | Testo dei pulsanti CTA | 7.76:1 | 4.5:1 | OK |
| `#0F2F23` abeteScuro | `#E0A010` zafferanoScuro | Testo CTA in hover | 6.34:1 | 4.5:1 | OK |
| `#A63F24` terracotta | `#FBF7EE` crema | Testo di evidenza terracotta | 5.85:1 | 4.5:1 | OK |
| `#A63F24` terracotta | `#F7E4DC` terracottaChiaro | Testo terracotta su riquadro chiaro | 5.09:1 | 4.5:1 | OK |
| `#FBF7EE` crema | `#A63F24` terracotta | Etichetta chiara su terracotta | 5.85:1 | 4.5:1 | OK |
| `#1F7A4A` ok | `#E3F3EA` okChiaro | Messaggio di successo | 4.64:1 | 4.5:1 | OK |
| `#B42318` errore | `#FBEAE8` erroreChiaro | Messaggio di errore | 5.65:1 | 4.5:1 | OK |
| `#B42318` errore | `#FBF7EE` crema | Errore sotto un campo | 6.15:1 | 4.5:1 | OK |
| `#8A5B00` attenzione | `#FFF3D6` attenzioneChiaro | Avviso / etichetta "Esempio dimostrativo" | 5.32:1 | 4.5:1 | OK |
| `#5E5A4E` muschio | `#FBF7EE` crema | Bordo dei campi form (componente UI, ≥3) | 6.44:1 | 3:1 | OK |
| `#1A4A37` abete | `#FBF7EE` crema | Anello di focus (componente UI, ≥3) | 9.45:1 | 3:1 | OK |
| `#F5B21B` zafferano | `#0F2F23` abeteScuro | Anello di focus su sfondo scuro (≥3) | 7.76:1 | 3:1 | OK |

## 4. Tipografia

Due famiglie open source, ospitate sul nostro server (nessuna richiesta a Google Fonts), solo glifi latini.

| Uso | Famiglia | Pesi | Peso file (woff2) |
|---|---|---|---|
| Titoli e cifre grandi | **Young Serif** (Fontsource) | 400 (ha un solo peso, già robusto) | ~27 KB |
| Testo, pulsanti, interfaccia | **Atkinson Hyperlegible Next** (Fontsource) | 400, 700 | ~12 KB ciascuno |

**Perché.** Young Serif ha l'aria di una buona insegna di quartiere: caldo, sicuro di sé, mai "tech". Atkinson Hyperlegible Next è nata per essere letta senza fatica da chiunque, anche a 55 anni su un telefono sotto il sole. Insieme pesano circa 52 KB.

**Scala** (fluida, definita in `tokens.css`): 13 · 15 · 17 (testo base) · 19 · 21–26 · 26–38 · 32–54 · 38–70 px. Interlinea: 1,1 titoli grandi · 1,25 sottotitoli · 1,6 testo. Lunghezza riga: massimo 70 caratteri. Titoli sempre in Young Serif; tutto il resto in Atkinson.

## 5. Tono di voce

Parliamo come un artigiano di zona che sa il fatto suo: diretto, caldo, concreto. Diamo del **tu**.

1. **Frasi corte, una idea alla volta.**
   - Sì: "Il sito è online in 3 giorni."
   - No: "Grazie alla nostra metodologia ottimizzata garantiamo tempistiche ridotte."
2. **Parla alla persona, non all'azienda.**
   - Sì: "Ci mandi le foto dal telefono e ci pensiamo noi."
   - No: "Il cliente è tenuto a fornire il materiale iconografico."
3. **Prima il vantaggio, poi come funziona.**
   - Sì: "I clienti ti trovano su Google e ti chiamano con un tocco."
   - No: "Ottimizzazione SEO e pulsanti click-to-call."
4. **Cifre vere, mai aggettivi vaghi.**
   - Sì: "Massimo 500 €, IVA inclusa. Rimborso entro 14 giorni."
   - No: "Prezzi super competitivi e massima garanzia."
5. **Se serve una parola tecnica, la spieghi in una riga. Se no, la togli.**
   - Sì: "Si legge bene anche sul telefono."
   - No: "Design responsive con UX ottimizzata."

| Usa | Evita |
|---|---|
| sito, sito web, pagina | piattaforma, ecosistema digitale |
| ci pensiamo noi | soluzioni chiavi in mano a 360° |
| online, in linea | go-live, deploy |
| si legge bene sul telefono | responsive, mobile-first |
| ti trovano su Google | posizionamento SEO (ok solo se spiegato) |
| prezzo massimo 500 €, IVA inclusa | prezzi competitivi, pacchetti vantaggiosi |
| rimborso, soldi indietro | policy di reso, garanzia di soddisfazione |
| il sito è tuo | proprietà intellettuale, licenza d'uso |
| modifiche | change request, aggiornamenti evolutivi |
| tutto compreso | all inclusive, full service |

Frasi da non scrivere mai: "nel panorama digitale odierno", "soluzioni innovative", "a 360°", "porta il tuo business al livello successivo", e la costruzione "non X ma Y" ripetuta.

## 6. Sistema visivo

- **Icone:** set disegnato a mano in SVG (`src/components/Icon.astro`), griglia 24 px, tratto 1,75 px, estremità arrotondate, nessun riempimento. Una sola famiglia, nessuna emoji.
- **Forme:** angoli arrotondati di 14 px sui riquadri (22 px sui blocchi grandi). La D del logo ha gli spigoli sinistri quasi vivi e la curva a destra: la stessa logica dei pulsanti e dei riquadri.
- **Ombre:** sempre con offset e sfumatura morbida (`shadow-soft`, `shadow-lift`, `shadow-device`). Niente ombre piene e dure.
- **Bordi:** 1 px in `pietra` per dividere, 2 px in `muschio` per i campi form.
- **Immagini e mockup:** niente foto stock di persone. I siti d'esempio sono mockup disegnati in HTML/CSS/SVG (`src/components/DemoSite.astro`), inseriti in cornici di telefono e computer con ombra morbida. Le foto del team sono segnaposto chiaramente marcati in `public/team/`.
- **Pattern di sfondo:** griglia di piccole frecce (`.pattern-frecce` in `global.css`, stessa logica dei banner). Una sola trama, usata su fondi verdi.
- **Movimento:** comparse leggere e hover, tutto spento con `prefers-reduced-motion`. Niente carousel, popup o video.

## 7. Asset derivati (`brand/assets/`)

| File | Misura | Uso |
|---|---|---|
| `og-1200x630.png` (+ `.svg`) | 1200×630 | Anteprima nei link condivisi (copiata in `public/og.png`) |
| `avatar-800.png` | 800×800 | Profili social |
| `banner-linkedin-1584x396.png` | 1584×396 | Copertina LinkedIn |
| `banner-facebook-1640x624.png` | 1640×624 | Copertina Facebook |
| `firma-email.html` | n/a | Firma email (tabelle e stili inline) |
| `onepager-header.svg` / `.png` | 1240×260 | Intestazione del PDF one-pager |

I testi di tutti gli asset sono convertiti in tracciati: si aprono uguali ovunque, senza installare font. Prezzo, giorni e colori si leggono dai file dati e da `tokens.css`: cambiali lì e lancia `npm run brand`.

## 8. Dove vive

- Pagina `/brand` (non indicizzata, `noindex`): logo, colori, font, regole d'uso, scaricabile dal team.
- Cartella `brand/`: logo in tutte le varianti, asset derivati e questo documento, pronti all'uso fuori dal sito.
