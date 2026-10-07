/**
 * OFFERTA: prezzo, tempi, garanzia, cosa è incluso, timeline.
 * "3 giorni", "500 €" e "14 giorni" vengono SOLO da qui: cambiali qui e cambiano in tutto il sito (testi, schema.org, one-pager, FAQ).
 */
const days = 3;
const yearTwoMax = 100;
const pages = 5;
const supportDays = 30;
const trainingMinutes = 30;
const firstCallMinutes = 20;

export const offer = {
  name: `Il tuo sito in ${days} giorni`,
  /** Giorni lavorativi dal momento in cui riceviamo logo, foto e informazioni di base. */
  deliveryDays: days,
  /** Tetto massimo: il prezzo concordato non lo supera mai. */
  priceMax: 500,
  currency: 'EUR',
  /** DECISIONE DA CONFERMARE: prezzo IVA inclusa (più chiaro per chi diffida dei costi nascosti). */
  vatIncluded: true,
  pagesIncluded: pages,
  freeSupportDays: supportDays,
  trainingMinutes,
  firstCallMinutes,

  guarantee: {
    /** Giorni, dalla messa online, entro cui si può chiedere il rimborso. */
    days: 14,
    /** Giorni lavorativi entro cui rimborsiamo dopo la richiesta. */
    refundWithinDays: 10,
    /** Metti true SOLO dopo che un legale ha validato /termini-garanzia. Finché è false, `npm run prelaunch` blocca il lancio. */
    legalReviewed: false,
  },

  /** Quando si paga. Default: dopo aver visto e approvato la bozza, prima di andare online. */
  payment: {
    when: 'Dopo che hai visto e approvato la bozza, prima di andare online.',
    methods: 'Bonifico o carta. Ricevi sempre fattura.',
  },

  /** Cosa serve da te per partire. */
  customerNeeds: [
    { id: 'logo', text: 'Il logo, se ce l\'hai. Se non ce l\'hai, ne facciamo uno semplice con il nome della tua attività.' },
    { id: 'foto', text: '5–10 foto del tuo lavoro, del locale o di te. Bastano quelle del telefono.' },
    { id: 'info', text: 'Orari, indirizzo, telefono e i servizi che offri.' },
    { id: 'testi', text: 'Qualche frase su di te. Se non hai tempo, i testi li scriviamo noi dalla chiamata.' },
  ],

  /** Tutto compreso nel prezzo. Nessun extra a pagamento per un sito vetrina. `group` decide in quale colonna appare. */
  included: [
    { id: 'pagine', group: 'sito', title: `Un sito fino a ${pages} pagine`, text: 'Home, servizi o menu, chi sei, galleria e contatti. Quello che serve per farti trovare e chiamare.' },
    { id: 'design', group: 'sito', title: 'Disegnato per il tuo mestiere', text: 'Colori, foto e testi pensati per la tua attività. Non lo stesso modello che usa il tuo vicino.' },
    { id: 'mobile', group: 'sito', title: 'Perfetto sul telefono', text: 'La maggior parte dei tuoi clienti ti cerca da lì. Il sito si legge bene e il numero si tocca per chiamare.' },
    { id: 'velocita', group: 'sito', title: 'Si apre in meno di 2 secondi', text: 'Un sito lento fa scappare chi ti cerca. Il nostro è fatto per essere leggero.' },
    { id: 'dominio', group: 'online', title: 'Dominio .it e hosting del primo anno', text: 'L\'indirizzo del sito (per esempio iltuonome.it) e lo spazio online sono già pagati. Il dominio è intestato a te.' },
    { id: 'testi', group: 'sito', title: 'I testi li scriviamo noi', text: 'Ci racconti l\'attività in una chiamata e ne ricaviamo i testi. Tu leggi e correggi.' },
    { id: 'google', group: 'online', title: 'Google ti trova e ti mostra sulla mappa', text: 'Titoli e descrizioni a posto e scheda Google Business collegata, così chi cerca la tua zona ti vede.' },
    { id: 'contatti', group: 'online', title: 'Pulsanti per chiamarti subito', text: 'Chiama, scrivi su WhatsApp o compila il modulo: le richieste ti arrivano direttamente via email.' },
    { id: 'formazione', group: 'dopo', title: 'Ti insegniamo a fare le modifiche', text: `${trainingMinutes} minuti con noi per imparare a cambiare orari, prezzi e foto senza chiamare nessuno. Ti lasciamo anche una guida scritta.` },
    { id: 'assistenza', group: 'dopo', title: `${supportDays} giorni di assistenza gratuita`, text: 'Una correzione, una foto da cambiare, un dubbio: scrivici e sistemiamo.' },
    { id: 'privacy', group: 'online', title: 'Privacy e cookie già inseriti', text: 'Informative pronte e nessun cookie di tracciamento: niente banner fastidiosi sul tuo sito.' },
    { id: 'tuo', group: 'dopo', title: 'Il sito è tuo', text: 'Dominio, testi e foto sono tuoi. Se un giorno vuoi cambiare, puoi portare via tutto.' },
  ],

  /** Cosa NON rientra: lo diciamo prima, con tempi e condizioni scritti. */
  outOfScope: [
    'Negozio online con carrello e pagamenti',
    'Prenotazioni online con pagamento anticipato',
    'Area riservata con accesso per i clienti',
    'Sito in più lingue con testi tradotti da noi',
  ],

  /** Dal secondo anno: rinnovo del dominio e manutenzione, tetto massimo annuo in tutto. */
  yearTwoMax,
  /** Testo sul secondo anno: costruito da yearTwoMax, non scriverlo a mano altrove. */
  afterYearOne:
    `Dal secondo anno ci sono solo il rinnovo del dominio e la manutenzione, massimo ${yearTwoMax} € l'anno in tutto. Nessun'altra voce.`,

  timeline: [
    {
      day: 1,
      board: 'Chiamata e materiale',
      status: 'Partenza',
      title: 'Ci sentiamo e ci mandi il materiale',
      text: `Una chiamata di ${firstCallMinutes} minuti (o una visita da te). Ci racconti l'attività e ci mandi logo, foto e informazioni. Se non hai tempo, partiamo da quello che hai.`,
      you: `Tu: ${firstCallMinutes} minuti e le foto dal telefono.`,
    },
    {
      day: 2,
      board: 'Bozza da approvare',
      status: 'In arrivo',
      title: 'Ricevi la bozza e dici cosa cambiare',
      text: 'Ti mandiamo il link alla bozza, già navigabile dal telefono. Ci dici cosa non ti convince e correggiamo in giornata.',
      you: 'Tu: guardi la bozza e ci scrivi cosa cambiare.',
    },
    {
      day: 3,
      board: 'Sito online sul tuo dominio',
      status: 'Arrivo',
      title: 'Il sito va online',
      text: `Approvi, il sito va online sul tuo dominio e la scheda Google è collegata. Ti facciamo la formazione di ${trainingMinutes} minuti.`,
      you: 'Tu: dici "va bene" e non c\'è altro da fare.',
    },
  ],
} as const;

export const includedGroups = [
  { id: 'sito', title: 'Il sito' },
  { id: 'online', title: 'Online e trovato' },
  { id: 'dopo', title: 'Dopo la consegna' },
] as const;

export const euro = (n: number) => `${n.toLocaleString('it-IT')} €`;
export const price = `${euro(offer.priceMax)}`;
export const priceLabel = `massimo ${euro(offer.priceMax)}${offer.vatIncluded ? ' IVA inclusa' : ' + IVA'}`;
export const daysLabel = `${offer.deliveryDays} giorni`;
export const guaranteeLabel = 'soddisfatti o rimborsati';
