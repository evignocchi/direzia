/**
 * TESTI DEL SITO (home e pagine). Tutto il copy sta qui, non nei componenti.
 * Prezzo, giorni e garanzia arrivano da offer.ts; indirizzo e contatti da company.ts.
 * Regole di voce: frasi corte, "tu", cifre vere, niente gergo (vedi brand/BRAND.md).
 */
import { offer, euro, priceLabel, daysLabel } from './offer.ts';
import { company, isPlaceholder } from './company.ts';

const { deliveryDays, priceMax, guarantee } = offer;

export const copy = {
  site: {
    name: company.brandName,
    title: `${offer.name}. Massimo ${euro(priceMax)}, soddisfatti o rimborsati | ${company.brandName}`,
    description: `Siti web per piccole attività del territorio: online in ${daysLabel}, prezzo massimo ${euro(priceMax)} ${offer.vatIncluded ? 'IVA inclusa' : '+ IVA'}, rimborso se non ti convince.`,
    ogAlt: `${company.brandName}: ${offer.name}`,
  },

  nav: [
    { label: 'Cosa ricevi', href: '#incluso' },
    { label: 'Come funziona', href: '#come-funziona' },
    { label: 'Progetti', href: '#progetti' },
    { label: 'Prezzi', href: '#prezzi' },
    { label: 'Domande', href: '#domande' },
  ],

  cta: {
    primary: 'Richiedi il tuo sito',
    whatsapp: 'Scrivici su WhatsApp',
    call: 'Chiama',
    callLong: 'Chiamaci',
    book: 'Prenota una chiamata di 15 minuti',
    mobileRequest: 'Richiedi',
    whatsappMessage: `Ciao, vorrei un sito in ${daysLabel}. Possiamo sentirci?`,
  },

  hero: {
    headline: offer.name,
    sub: `Per negozi, studi e attività del territorio. Prezzo massimo ${euro(priceMax)} ${offer.vatIncluded ? 'IVA inclusa' : '+ IVA'}. Se non ti convince, ti rimborsiamo.`,
    proof: [
      `Sito online in ${daysLabel}`,
      'Rimborso se non ti convince',
      `Max ${euro(priceMax)}`,
      isPlaceholder(company.address.city) ? 'Siamo del territorio, ci trovi di persona' : `Siamo a ${company.address.city}, ci trovi di persona`,
    ],
    /** Saluto personalizzato dal parametro ?r=nome (il nome non viene salvato). */
    greeting: 'Ciao {nome}, ecco cosa possiamo fare per te.',
    deviceCaption: 'Siti d\'esempio, su telefono e computer.',
  },

  commitments: [
    { id: 'giorni', value: String(deliveryDays), unit: 'giorni', text: 'dalla chiamata al sito online' },
    { id: 'prezzo', value: euro(priceMax), unit: 'massimo', text: `${offer.vatIncluded ? 'IVA inclusa' : '+ IVA'}, tutto compreso` },
    { id: 'rimborso', value: 'Rimborso', unit: '', text: `se non ti convince, entro ${guarantee.days} giorni` },
  ],

  problem: {
    heading: 'Fare un sito non dovrebbe essere un\'impresa.',
    intro: 'Lo sentiamo da quasi tutti i titolari che incontriamo.',
    items: [
      { title: 'Il preventivo cresce', text: 'Parti da una cifra e a fine lavoro ne paghi un\'altra: pagine extra, hosting, "manutenzione", ritocchi. Non sai mai quanto spenderai davvero.' },
      { title: 'Passano i mesi', text: 'Aspetti la prima bozza, poi la seconda, poi la terza. Intanto i clienti ti cercano e non ti trovano.' },
      { title: 'Poi non lo sai toccare', text: 'Per cambiare un orario devi scrivere a qualcuno. Se quel qualcuno sparisce, il sito resta com\'è.' },
    ],
    closing: 'Abbiamo costruito Direzia al contrario: prezzo scritto prima, tempi in giorni, sito tuo.',
  },

  included: {
    heading: 'Tutto compreso, scritto prima.',
    intro: `Questo è quello che ricevi per un prezzo massimo di ${euro(priceMax)}. Se ti serve qualcosa che qui non c'è, te lo diciamo prima di iniziare.`,
    outOfScopeHeading: 'Cosa non rientra',
    outOfScopeIntro: 'Il sito che facciamo è una vetrina. Queste cose sono un altro lavoro, con tempi diversi, e le vediamo insieme prima:',
  },

  how: {
    heading: `Dalla chiamata al sito online in ${daysLabel}.`,
    intro: 'Il conteggio parte quando abbiamo logo, foto e informazioni di base. Se ci metti più tempo, aspettiamo senza fretta.',
    needsHeading: 'Cosa serve da te',
    needsIntro: 'Poco, e dal telefono. Se non hai qualcosa, ci pensiamo noi.',
    dayLabel: 'Giorno',
  },

  showcase: {
    heading: 'Siti fatti per attività come la tua.',
    intro: 'Scegli il tuo settore per vedere un esempio.',
    filterLabel: 'Filtra per settore',
    all: 'Tutti',
    cardCta: 'Vedi il caso',
    daysLabel: (n: number) => `${n} ${n === 1 ? 'giorno' : 'giorni'}`,
    demoNote: 'Questi sono esempi dimostrativi con nomi di fantasia. I progetti veri li pubblichiamo man mano che li consegniamo.',
    caseSituation: 'La situazione',
    caseDone: 'Cosa abbiamo fatto',
    caseResult: 'Il risultato',
    caseBack: 'Tutti i progetti',
    caseCta: 'Voglio un sito così',
  },

  reviews: {
    heading: 'Cosa dicono i titolari.',
    intro: 'Parole di chi ha già il sito. Non tutte cinque stelle: ci interessa sapere cosa migliorare.',
    demoNote: 'Recensioni dimostrative con persone e attività inventate. Le sostituiremo con quelle vere dei nostri clienti.',
    leaveReview: 'Hai un sito fatto da noi? Lascia una recensione',
    stars: (n: number) => `${n} stelle su 5`,
  },

  pricing: {
    heading: 'Un prezzo solo. Lo sai prima.',
    intro: `Il prezzo lo concordiamo in chiamata e non supera mai ${euro(priceMax)}.`,
    packageName: 'Sito vetrina',
    priceCaption: priceLabel,
    priceNote: offer.payment.when,
    includedLabel: 'Incluso',
    totalLabel: 'Totale',
    rows: [
      'Progetto grafico per il tuo mestiere',
      `Fino a ${offer.pagesIncluded} pagine`,
      'Testi scritti da noi',
      'Dominio .it, primo anno',
      'Hosting, primo anno',
      'Modulo contatti, pulsanti Chiama e WhatsApp',
      'Google: titoli, descrizioni e scheda Business',
      `Formazione di ${offer.trainingMinutes} minuti e guida scritta`,
      `${offer.freeSupportDays} giorni di assistenza`,
      'Informative privacy e cookie',
    ],
    noHidden: { title: 'Costi nascosti: nessuno.', text: offer.afterYearOne },
    noExtras: { title: 'Extra a pagamento: nessuno.', text: `Quello che serve a un sito vetrina è nel prezzo. Non ti chiediamo soldi in più per ritocchi, correzioni o assistenza nei primi ${offer.freeSupportDays} giorni.` },
    custom: {
      title: 'Ti serve qualcosa di più grande?',
      text: 'Un negozio online, prenotazioni con pagamento, un\'area riservata. Ti diciamo subito se rientra nell\'offerta e quanto tempo serve. Tempi e condizioni li vedi per iscritto prima di iniziare.',
      cta: 'Parliamone',
    },
  },

  guarantee: {
    heading: 'Se non ti convince, ti ridiamo i soldi.',
    intro: 'Lo scriviamo in modo semplice, perché deve essere chiaro a chiunque.',
    points: [
      { title: 'Cosa vuol dire "soddisfatto"', text: 'Se il sito online non ti convince, per qualsiasi motivo, hai diritto al rimborso. Non devi dimostrare nulla.' },
      { title: 'Entro quanti giorni', text: `Hai ${guarantee.days} giorni dalla messa online del sito.` },
      { title: 'Come chiedi il rimborso', text: 'Ci scrivi una email o un messaggio WhatsApp con la parola "rimborso". Basta questo.' },
      { title: 'Quando arrivano i soldi', text: `Entro ${guarantee.refundWithinDays} giorni lavorativi, con lo stesso metodo con cui hai pagato.` },
      { title: 'Nessuna domanda strana', text: 'Nessuna penale, nessun modulo, nessuna spiegazione da dare. Se vuoi dirci cosa non andava lo ascoltiamo volentieri, ma non sei obbligato.' },
    ],
    after: 'Dopo il rimborso il sito viene spento. Il dominio, se è già intestato a te, resta tuo.',
    link: 'Leggi le condizioni complete',
    badge: `${guarantee.days} giorni`,
  },

  about: {
    // Finché la città è un segnaposto, il titolo resta leggibile anche per chi riceve il link oggi.
    heading: isPlaceholder(company.address.city) ? 'Siamo del territorio. Puoi venirci a trovare.' : `Siamo a ${company.address.city}. Puoi venirci a trovare.`,
    intro: 'Direzia nasce per fare una cosa sola: siti che le attività del territorio possono permettersi, pronti in pochi giorni. Se preferisci, ci vediamo di persona e guardiamo la bozza insieme.',
    reasons: [
      { title: 'Sai dove trovarci', text: 'Abbiamo un indirizzo, un telefono che risponde e una scrivania dove puoi sederti.' },
      { title: 'Conosciamo la zona', text: 'Sappiamo come cercano i tuoi clienti e cosa conta per un\'attività come la tua.' },
      { title: 'Ci metti la faccia anche tu', text: 'Parli con le persone che fanno il tuo sito, non con un centralino.' },
    ],
    photoPending: 'Foto in arrivo',
    visit: 'Dove siamo',
  },

  faq: {
    heading: 'Le domande che ci fanno più spesso.',
    intro: 'Non trovi la tua? Scrivici su WhatsApp, rispondiamo noi.',
  },

  contact: {
    heading: 'Raccontaci la tua attività.',
    intro: 'Ti richiamiamo entro un giorno lavorativo, senza impegno. Bastano pochi dati.',
    fields: {
      name: 'Il tuo nome',
      business: 'La tua attività',
      businessHint: 'Per esempio: ristorante, studio, idraulico',
      contact: 'Telefono o email',
      contactHint: 'Come preferisci essere ricontattato',
      message: 'Vuoi aggiungere qualcosa? (facoltativo)',
    },
    privacyLabel: 'Ho letto l\'informativa privacy e accetto che mi contattiate per rispondere alla mia richiesta.',
    privacyLink: 'informativa privacy',
    submit: 'Invia la richiesta',
    sending: 'Invio in corso…',
    success: 'Grazie! Abbiamo ricevuto la tua richiesta e ti ricontattiamo entro un giorno lavorativo.',
    error: 'Qualcosa non ha funzionato. Riprova tra poco, oppure chiamaci o scrivici su WhatsApp.',
    invalid: {
      required: 'Questo campo è obbligatorio.',
      contact: 'Inserisci un numero di telefono o un\'email valida.',
      privacy: 'Per inviare la richiesta devi accettare l\'informativa.',
    },
    alternativesHeading: 'Preferisci un altro modo?',
    finalHeading: `Il tuo sito può essere online fra ${deliveryDays} giorni.`,
    finalText: 'Una chiamata di 15 minuti e partiamo. Se non ti convince, ti rimborsiamo.',
  },

  footer: {
    blurb: company.tagline,
    linksHeading: 'Pagine',
    contactHeading: 'Contatti',
    legalHeading: 'Dati societari',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookie', href: '/cookie' },
      { label: 'Termini della garanzia', href: '/termini-garanzia' },
      { label: 'Lascia una recensione', href: '/lascia-una-recensione' },
      { label: 'Scheda stampabile', href: '/one-pager' },
    ],
    demoNote: 'Recensioni e progetti mostrati sono esempi dimostrativi, con nomi e persone di fantasia.',
    rights: `© ${new Date().getFullYear()} ${company.legalName}. Tutti i diritti riservati.`,
  },

  demo: {
    label: 'Esempio dimostrativo',
  },

  reviewPage: {
    title: 'Lascia una recensione',
    heading: 'Il tuo sito è online? Raccontaci com\'è andata.',
    intro: 'Bastano due minuti. La tua opinione aiuta chi sta decidendo se fidarsi, e a noi dice cosa migliorare.',
    steps: [
      'Apri il link qui sotto: ti porta alla nostra scheda Google.',
      'Scegli le stelle e scrivi due righe: cosa ti aspettavi, com\'è andata, cosa cambieresti.',
      'Se ti va, indica la tua attività, così chi legge capisce se siete simili.',
    ],
    button: 'Scrivi la recensione su Google',
    noteHeading: 'Preferisci scrivere a noi?',
    noteText: 'Rispondiamo a ogni messaggio. Se qualcosa non ti è piaciuto, vogliamo saperlo prima di tutti.',
    honesty: 'Non ti chiediamo recensioni di cinque stelle e non offriamo sconti in cambio: scrivi quello che pensi davvero.',
  },

  notFound: {
    title: 'Pagina non trovata',
    heading: 'Questa pagina non c\'è.',
    text: 'Forse l\'indirizzo è sbagliato o la pagina è stata spostata. Da qui puoi tornare alla home o chiamarci.',
    back: 'Torna alla home',
  },
} as const;

/** Testo per le pagine /per-… */
export const sectorPage = {
  problemsHeading: 'Cosa va storto di solito',
  featuresHeading: 'Cosa mettiamo nel tuo sito',
  needsHeading: 'Cosa ci serve da te',
  exampleHeading: 'Un esempio per il tuo settore',
  otherSectors: 'Non è il tuo settore? Guarda gli altri',
  cta: 'Voglio il mio sito in 3 giorni',
};
