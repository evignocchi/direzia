/**
 * DOMANDE FREQUENTI. Un file: ogni voce diventa una risposta nella home e nei dati strutturati FAQPage.
 * Le cifre (prezzo, giorni, garanzia) vengono da offer.ts: non scriverle a mano qui.
 */
import { offer, euro, priceLabel } from './offer.ts';

export interface Faq {
  id: string;
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    id: 'costi',
    q: 'Ci sono costi nascosti?',
    a: `No. Il prezzo è ${priceLabel} e comprende tutto quello che serve a un sito vetrina: progetto, testi, dominio .it e hosting del primo anno, assistenza per ${offer.freeSupportDays} giorni. ${offer.afterYearOne}`,
  },
  {
    id: 'dominio',
    q: 'Il dominio e il sito sono davvero miei?',
    a: 'Sì. Il dominio è intestato a te, i testi e le foto sono tuoi. Se un giorno vuoi andare da un altro, ti consegniamo tutto e puoi portare il sito dove vuoi.',
  },
  {
    id: 'modifiche',
    q: 'Poi dovrò chiamarvi ogni volta che cambio qualcosa?',
    a: `No. Nella formazione di ${offer.trainingMinutes} minuti ti facciamo vedere come cambiare orari, prezzi e foto da solo. Ti lasciamo anche una guida scritta. Nei primi ${offer.freeSupportDays} giorni le correzioni piccole le facciamo noi, gratis. Dopo, se ti serve una mano, ci scrivi.`,
  },
  {
    id: 'tempi',
    q: `Davvero in ${offer.deliveryDays} giorni?`,
    a: `Sì, dal giorno in cui abbiamo logo, foto e informazioni di base. Giorno 1: ci sentiamo e ci mandi il materiale. Giorno 2: ricevi la bozza. Giorno 3: il sito è online. Se il tuo progetto è più grande del sito vetrina, ti diciamo prima quanto tempo serve.`,
  },
  {
    id: 'lento',
    q: 'E se sono io a mandare il materiale in ritardo?',
    a: 'Capita a tutti. Il conteggio dei giorni riparte da quando ci arriva il materiale, e noi intanto restiamo disponibili. Se non hai tempo, ti chiediamo solo le foto: i testi li scriviamo noi dalla chiamata.',
  },
  {
    id: 'non-piace',
    q: 'E se il sito non mi piace?',
    a: `Ti rimborsiamo. Hai ${offer.guarantee.days} giorni dalla messa online per dirci che non ti convince, per qualsiasi motivo, e ti restituiamo ${euro(offer.priceMax)} o quello che hai pagato. Non devi spiegare né compilare moduli. Le condizioni complete sono nella pagina Termini della garanzia.`,
  },
  {
    id: 'pagamento',
    q: 'Quando e come si paga?',
    a: `${offer.payment.when} ${offer.payment.methods}`,
  },
  {
    id: 'senza-materiale',
    q: 'Non ho un logo, né foto, né testi. Cosa faccio?',
    a: 'Partiamo da quello che hai. Per il logo facciamo una versione semplice con il nome della tua attività. Per le foto bastano quelle del telefono, e ti diciamo come scattarle. I testi li scriviamo noi dopo la chiamata e tu li correggi.',
  },
  {
    id: 'ecommerce',
    q: 'Fate anche negozi online con carrello e pagamenti?',
    a: 'Il sito che offriamo è una vetrina: fa conoscere la tua attività e ti fa chiamare o scrivere. Per un negozio online con carrello e pagamenti ti diciamo subito se rientra nell\'offerta e quanto tempo serve. Condizioni e tempi li vedi per iscritto prima di iniziare.',
  },
  {
    id: 'google',
    q: 'Il sito mi farà comparire su Google?',
    a: 'Lo prepariamo per essere trovato: titoli e descrizioni a posto, scheda Google Business collegata, velocità alta. Nessuno può garantire il primo posto su Google, e chi lo promette ti racconta una storia. Quello che garantiamo è che il sito sia fatto bene e che chi ti cerca per nome ti trovi.',
  },
  {
    id: 'cookie',
    q: 'Serve il banner dei cookie?',
    a: 'Sul sito che ti consegniamo di norma no, perché non usiamo cookie di tracciamento. Troverai già l\'informativa privacy e cookie. Se in futuro aggiungi strumenti di terzi (come pubblicità o mappe incorporate), le regole possono cambiare e ti avvisiamo.',
  },
  {
    id: 'locali',
    q: 'Siete davvero della zona? Posso venirvi a trovare?',
    a: 'Sì. Puoi chiamarci, scriverci su WhatsApp o fissare un incontro di persona. Indirizzo e orari sono in fondo alla pagina.',
  },
];
