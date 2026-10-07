# Revisione critica

Riletto il sito come un titolare scettico di 55 anni, con un iPhone in mano, davanti a un venditore. I 10 punti più deboli, in ordine di gravità. Dei primi 6 ho corretto quello che si poteva correggere nel codice; il resto dipende da materiale che solo tu hai.

| # | Punto debole | Stato |
|---|---|---|
| 1 | **Segnaposto visibili a chi riceve il link oggi.** Titolo "Siamo a [CITTÀ]", telefono finto nell'header, dati societari vuoti nel footer. Un prospect li vede e pensa a un sito non finito. | **Corretto in parte.** Il titolo di "Chi siamo" e il quarto punto sotto l'hero non mostrano più il segnaposto finché la città manca. Telefono, email e dati societari restano segnaposto per scelta: compila `src/data/company.ts` **prima** di mandare il link a qualcuno. `npm run prelaunch` te lo ricorda. |
| 2 | **Nessuna faccia, nessun "siamo di qui" nella prima schermata.** Il dubbio più forte ("siete locali? siete reali?") aveva risposta solo in fondo alla pagina. | **Corretto in parte.** Aggiunto sotto l'hero "Siamo del territorio, ci trovi di persona" (con il nome della città appena la inserisci). Le foto vere restano da fare: i segnaposto sono marcati "Foto in arrivo" e il lancio è bloccato finché ci sono. |
| 3 | **Cifre inventate presentate come tipiche.** La frase "Parti da 400 € e arrivi a 1.800" non è verificabile e suona come un'accusa agli altri. | **Corretto.** Ora dice solo che si parte da una cifra e se ne paga un'altra, senza numeri. |
| 4 | **Menu mobile inutilizzabile senza JavaScript.** Il pulsante apriva un pannello nascosto; senza script restava chiuso e le ancore non erano raggiungibili. | **Corretto.** Con JavaScript spento il menu compare aperto. |
| 5 | **Se il modulo non invia, la persona resta senza strada.** Un errore generico fa perdere un contatto caldo. | **Corretto.** In caso di errore compaiono subito i link "chiamarci" e "scriverci su WhatsApp", e il pulsante torna attivo. |
| 6 | **Hero a 768 px troppo stretto.** Con due colonne i pulsanti andavano a capo e la freccia si schiacciava. | **Corretto.** Fino a 1024 px l'hero è in una colonna sola; le frecce nei pulsanti non si restringono più. |
| 7 | **Lo zero barrato del font di testo.** Atkinson Hyperlegible disegna lo "0" con la barra (per non confonderlo con la "O"). In "500 €" nel corpo del testo può sembrare "5Ø0". | Non corretto. È una scelta di leggibilità del font e non si può spegnere. Le cifre grandi (barra impegni, prezzo, garanzia) sono in Young Serif e non hanno il problema. Se la cosa ti disturba, si cambia il font di testo. |
| 8 | **Tante etichette "Esempio dimostrativo".** Sono 12 recensioni e 8 progetti, ciascuno etichettato: è corretto e obbligatorio finché i contenuti sono inventati, ma dà un'aria da prototipo. | Non correggibile. Si risolve sostituendo i contenuti con casi veri (README, "Recensioni vere"). Le recensioni mostrate in apertura sono solo 6. |
| 9 | **Le anteprime dei progetti nelle card sono piccole** (circa 260 px): si vede il colore e la forma, non il testo. | Non corretto. Sono miniature; il dettaglio sta nella pagina del caso. Con foto e screenshot veri si può rivalutare. |
| 10 | **La garanzia "scrivi rimborso e basta" espone a rimborsi opportunistici.** È una scelta commerciale forte e convince chi diffida, ma ha un costo. | Non è un difetto del sito: è una decisione tua. L'unica protezione è la finestra di 14 giorni (`offer.guarantee.days`). Fai validare le condizioni da un legale. |

## Cosa ho verificato

- **Prestazioni** (Lighthouse mobile, `npm run lighthouse`): 100 / 100 / 100 / 100 su home, pagina per settore, privacy e termini. LCP 1,2–1,4 s, CLS 0,000, TBT 0–12 ms. Peso della home in rete circa 80 KB (HTML compresso 29 KB, tre font 52 KB), nessuna immagine da scaricare. L'HTML grezzo è di 203 KB perché contiene i mockup dei siti d'esempio e le icone in linea: compresso resta 29 KB.
- **Accessibilità:** axe (WCAG 2.2 AA) senza violazioni serie su 6 pagine; contrasti calcolati per ogni coppia di colori (`npm run brand:contrast`); focus visibile; menu, FAQ e filtri da tastiera; `prefers-reduced-motion` rispettato.
- **Test e2e:** 76 test passano su mobile (Pixel 7) e desktop (1440): form, CTA, menu mobile, `?r=`, filtri, link interni, noindex, dati strutturati.
- **Viewport guardati a occhio:** 375, 768 e 1440 px.
- **Coerenza:** prezzo, giorni e garanzia vengono da `offer.ts`. Scansionando tutte le pagine compaiono solo "500 €", "3 giorni", "14 giorni", "30 giorni" (assistenza e formazione). I "2 giorni" e "4 giorni" sono casi dimostrativi dichiarati.
- **Link:** nessun link interno rotto (test automatico).
- **Ortografia:** riletto a mano tutto il testo della home e i dati dei progetti, delle recensioni e delle FAQ; corretti un "porti via tutto" e un esempio di dominio poco chiaro. Le pagine legali e quelle per settore le ho rilette in fase di scrittura, senza correttore automatico: fai una lettura finale prima di pubblicare.

## Cosa non ho potuto verificare

- **Invio reale del modulo:** richiede le tue chiavi (Resend o webhook). Il test usa una risposta simulata. Prova un invio vero prima di lanciare.
- **Deploy su Cloudflare Pages:** configurazione pronta (`wrangler.toml`, `functions/`, `public/_headers`, istruzioni nel README) ma non pubblicata da qui.
- **Lighthouse su rete e telefono veri:** i numeri sopra sono in laboratorio (rete 4G simulata).
- **Testi legali:** privacy, cookie e garanzia sono bozze strutturate, non una consulenza.
