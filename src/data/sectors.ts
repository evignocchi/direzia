/**
 * PAGINE PER SETTORE (/per-ristoranti, /per-professionisti, …). Stesso template, contenuti qui.
 * Per aggiungere un settore: copia una voce, cambia `slug` e testi. La pagina nasce da sola.
 */
import type { ProjectCategory } from './projects.ts';

export interface Sector {
  slug: string;
  /** Come chiamiamo il settore ("Ristoranti e bar"). */
  name: string;
  /** Per il tag <title> e il saluto ("per i ristoranti"). */
  forWho: string;
  category: ProjectCategory;
  /** Titolo della pagina (H1). */
  headline: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** Tre cose che di solito vanno storte, dette dal punto di vista del titolare. */
  problems: { title: string; text: string }[];
  /** Cosa mettiamo nel sito per questo mestiere. */
  features: string[];
  /** Cosa ci serve da te, specifico per il settore. */
  needs: string[];
  /** Progetto d'esempio da mostrare. */
  exampleProject: string;
  /** Messaggio precompilato per WhatsApp. */
  whatsapp: string;
}

export const sectors: Sector[] = [
  {
    slug: 'ristoranti',
    name: 'Ristoranti e bar',
    forWho: 'ristoranti, trattorie e bar',
    category: 'ristorazione',
    headline: 'Il sito del tuo locale, online in 3 giorni.',
    intro: 'Chi cerca dove mangiare guarda il telefono. Vuole menu, orari e un numero da chiamare. Ti facciamo un sito che li mostra subito.',
    metaTitle: 'Sito per ristoranti, trattorie e bar in 3 giorni',
    metaDescription: 'Sito web per ristoranti e bar: menu, orari e prenotazioni al telefono. Online in 3 giorni, massimo 500 € IVA inclusa, soddisfatti o rimborsati.',
    problems: [
      { title: 'Il menu è un PDF', text: 'Sul telefono si ingrandisce, si scorre di lato e si abbandona. Il cliente chiama o va altrove.' },
      { title: 'Gli orari non sono aggiornati', text: 'Chi arriva e trova chiuso non torna. Su Google e sul sito gli orari devono coincidere.' },
      { title: 'Le recensioni vanno solo ai portali', text: 'Il tuo locale è bello ma non hai una vetrina tua dove raccontarlo.' },
    ],
    features: [
      'Menu del giorno in primo piano, che cambi da solo in due minuti',
      'Pulsante "Prenota" che chiama o apre WhatsApp',
      'Orari, mappa e come arrivare nella prima schermata',
      'Foto dei piatti e del locale',
      'Scheda Google collegata, con gli stessi orari',
    ],
    needs: [
      'Il menu (anche una foto va bene)',
      '5–10 foto del locale e dei piatti',
      'Orari di apertura e giorno di chiusura',
    ],
    exampleProject: 'osteria-del-fico-storto',
    whatsapp: 'Ciao, ho un ristorante e vorrei un sito in 3 giorni. Possiamo sentirci?',
  },
  {
    slug: 'professionisti',
    name: 'Studi professionali',
    forWho: 'commercialisti, avvocati, studi tecnici e professionisti',
    category: 'professionisti',
    headline: 'Il sito del tuo studio, serio e online in 3 giorni.',
    intro: 'Un cliente nuovo ti cerca su Google prima di chiamarti. Se non ti trova, o trova una pagina vecchia, si fa un\'idea sbagliata. Ti facciamo un sito sobrio e chiaro.',
    metaTitle: 'Sito per studi professionali in 3 giorni',
    metaDescription: 'Sito web per commercialisti, avvocati e studi professionali: servizi spiegati bene e modulo per il primo incontro. Online in 3 giorni, massimo 500 € IVA inclusa.',
    problems: [
      { title: 'Solo una scheda su un elenco', text: 'Chi ti cerca trova nome e numero, ma non capisce cosa fai e perché sceglierti.' },
      { title: 'Servizi spiegati con il gergo', text: 'Il cliente non capisce e chiama il concorrente che parla più semplice.' },
      { title: 'Nessun modo semplice per scriverti', text: 'Non tutti vogliono telefonare al primo contatto. Un modulo breve porta richieste in più.' },
    ],
    features: [
      'Servizi scritti in modo che li capisca anche chi non è del mestiere',
      'Modulo breve per chiedere un primo incontro',
      'Pagina "Lo studio" con chi sei e come lavori',
      'Orari, indirizzo e mappa',
      'Privacy e cookie già inseriti',
    ],
    needs: [
      'L\'elenco dei servizi principali',
      'Una foto tua o dello studio (se vuoi)',
      'Qualche frase su come lavori',
    ],
    exampleProject: 'studio-alderighi-commercialisti',
    whatsapp: 'Buongiorno, ho uno studio professionale e vorrei un sito in 3 giorni. Possiamo sentirci?',
  },
  {
    slug: 'artigiani',
    name: 'Artigiani e impiantisti',
    forWho: 'idraulici, elettricisti, imbianchini e artigiani',
    category: 'artigiani',
    headline: 'Fatti chiamare: il tuo sito in 3 giorni.',
    intro: 'Quando serve un idraulico o un elettricista si cerca sul telefono e si chiama il primo che risponde. Ti facciamo un sito con il numero in cima e i lavori ben visibili.',
    metaTitle: 'Sito per artigiani, idraulici ed elettricisti in 3 giorni',
    metaDescription: 'Sito web per artigiani, idraulici ed elettricisti: numero in evidenza e foto dei lavori. Online in 3 giorni, massimo 500 € IVA inclusa, soddisfatti o rimborsati.',
    problems: [
      { title: 'Vivi di passaparola', text: 'Funziona finché c\'è chi ti conosce. Chi non ti conosce cerca su Google e chiama chi trova.' },
      { title: 'Le foto dei lavori restano sul telefono', text: 'Sono la tua prova migliore. Messe in fila su una pagina convincono più di mille parole.' },
      { title: 'Non hai tempo di stare al computer', text: 'Giusto. Noi ci pensiamo: ci servono dieci minuti e le foto.' },
    ],
    features: [
      'Numero grande in cima, con un tocco chiami',
      'Elenco chiaro dei lavori e della zona che copri',
      'Galleria con i tuoi lavori fatti, dal telefono',
      'Pulsante WhatsApp per mandare una foto del problema',
      'Scheda Google collegata, per comparire sulla mappa',
    ],
    needs: [
      '5–10 foto dei tuoi lavori',
      'Il numero di telefono e la zona che copri',
      'L\'elenco dei lavori che fai',
    ],
    exampleProject: 'idraulica-pronto-marini',
    whatsapp: 'Ciao, sono un artigiano e vorrei un sito in 3 giorni. Possiamo sentirci?',
  },
  {
    slug: 'benessere',
    name: 'Estetiste, parrucchieri e palestre',
    forWho: 'centri estetici, parrucchieri e palestre',
    category: 'benessere',
    headline: 'Il sito del tuo centro, pronto in 3 giorni.',
    intro: 'Le clienti vogliono vedere il locale, i prezzi e prenotare senza telefonare. Ti facciamo un sito che lo permette con un tocco.',
    metaTitle: 'Sito per estetiste, parrucchieri e palestre in 3 giorni',
    metaDescription: 'Sito web per centri estetici, parrucchieri e palestre: listino, foto e prenotazione via WhatsApp. Online in 3 giorni, massimo 500 € IVA inclusa, soddisfatti o rimborsati.',
    problems: [
      { title: 'Il telefono squilla mentre lavori', text: 'Le chiamate perse sono clienti perse. Un pulsante WhatsApp le fa scrivere e tu rispondi dopo.' },
      { title: 'Il listino sta sui social', text: 'Sparisce tra i post. Chi cerca i prezzi non li trova e rinuncia.' },
      { title: 'Il tuo locale è bello e non si vede', text: 'Le foto vere, ben messe, valgono più di qualsiasi pubblicità.' },
    ],
    features: [
      'Listino con trattamenti, durate e prezzi',
      'Pulsante WhatsApp con messaggio già scritto per prenotare',
      'Galleria del locale e dei lavori',
      'Orari e mappa',
      'Per le palestre: tabella dei corsi e richiesta di prova gratuita',
    ],
    needs: [
      'Il listino o l\'elenco dei servizi',
      '5–10 foto del locale e dei lavori',
      'Orari di apertura',
    ],
    exampleProject: 'atelier-lumi-beauty',
    whatsapp: 'Ciao, ho un centro estetico o una palestra e vorrei un sito in 3 giorni. Possiamo sentirci?',
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
