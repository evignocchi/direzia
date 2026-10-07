/**
 * PROGETTI / CASI DI SUCCESSO. Un file, una voce per progetto.
 * ATTENZIONE: tutti i progetti qui sotto sono DIMOSTRATIVI (`demo: true`): nomi, risultati e persone sono inventati.
 * Quando consegni un sito vero, sostituisci la voce (o aggiungila) con `demo: false` e dati reali.
 * I colori in `site.colors` sono quelli del cliente fittizio, non quelli di Direzia.
 */
export type ProjectCategory = 'ristorazione' | 'professionisti' | 'artigiani' | 'benessere' | 'negozi' | 'casa';

export const categories: { id: ProjectCategory; label: string }[] = [
  { id: 'ristorazione', label: 'Ristoranti e bar' },
  { id: 'professionisti', label: 'Studi professionali' },
  { id: 'artigiani', label: 'Artigiani' },
  { id: 'benessere', label: 'Benessere e sport' },
  { id: 'negozi', label: 'Negozi' },
  { id: 'casa', label: 'Case e ospitalità' },
];

export type DemoArt = 'osteria' | 'studio' | 'idraulico' | 'estetista' | 'palestra' | 'bnb' | 'immobiliare' | 'negozio';

export interface Project {
  slug: string;
  category: ProjectCategory;
  /** Nome dell'attività (di fantasia nei progetti demo). */
  name: string;
  /** Tipo di attività, in breve. */
  kind: string;
  /** Giorni di consegna reali di questo progetto. */
  deliveryDays: number;
  /** Una riga sul risultato, mostrata nella card. */
  result: string;
  situation: string;
  whatWeDid: string[];
  resultLong: string;
  /** Una frase del cliente (opzionale). */
  quote?: { text: string; who: string };
  demo: boolean;
  verified: boolean;
  /** Mockup del sito: tutto HTML/CSS/SVG, nessuna immagine. */
  site: {
    art: DemoArt;
    colors: { bg: string; ink: string; primary: string; accent: string; soft: string };
    nav: string[];
    headline: string;
    sub: string;
    cta: string;
    blocks: { title: string; text: string }[];
    footer: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'osteria-del-fico-storto',
    category: 'ristorazione',
    name: 'Osteria del Fico Storto',
    kind: 'Osteria con cucina del territorio',
    deliveryDays: 3,
    result: 'Prenotazioni al telefono più che raddoppiate in due mesi',
    situation:
      'Il titolare aveva un sito di dieci anni prima: lento, illeggibile dal telefono e con il menu in un PDF. I clienti chiamavano per chiedere gli orari.',
    whatWeDid: [
      'Un sito semplice con il menu del giorno sempre in vista e un pulsante per chiamare.',
      'Orari, mappa e come arrivare in cima alla pagina.',
      'Formazione di mezz\'ora: ora il titolare cambia il menu da solo.',
    ],
    resultLong:
      'Nei primi due mesi le prenotazioni telefoniche sono più che raddoppiate. Le telefonate per chiedere gli orari sono quasi sparite, e il menu si aggiorna in due minuti.',
    quote: { text: 'Il menu lo cambio io, quando finisce il pesce. Prima dovevo chiamare qualcuno.', who: 'Giorgio B., titolare' },
    demo: true,
    verified: false,
    site: {
      art: 'osteria',
      colors: { bg: '#fbf3e6', ink: '#3a2418', primary: '#8c2f1f', accent: '#d9a441', soft: '#f0dcc0' },
      nav: ['Menu', 'La storia', 'Orari', 'Contatti'],
      headline: 'Cucina di casa, a due passi dal centro.',
      sub: 'Tagliatelle fatte a mano, vino della zona e il tavolo che ti aspetta.',
      cta: 'Prenota un tavolo',
      blocks: [
        { title: 'Menu del giorno', text: 'Cambia con il mercato. Oggi: risotto alle erbe e arrosto.' },
        { title: 'Dove siamo', text: 'Vicolo del Fico 12, parcheggio gratuito vicino.' },
        { title: 'Orari', text: 'Pranzo e cena, chiuso il lunedì.' },
      ],
      footer: 'Osteria del Fico Storto · Tel. 000 000 0000',
    },
  },
  {
    slug: 'studio-alderighi-commercialisti',
    category: 'professionisti',
    name: 'Studio Alderighi Commercialisti',
    kind: 'Studio di commercialisti',
    deliveryDays: 3,
    result: 'Richieste di primo incontro dal sito, 6 al mese',
    situation:
      'Lo studio aveva solo una scheda su un elenco online. Chi cercava un commercialista in zona non trovava né i servizi né un contatto diretto.',
    whatWeDid: [
      'Un sito sobrio con i servizi spiegati in parole semplici.',
      'Un modulo breve per chiedere un primo incontro gratuito.',
      'Scheda Google collegata, con orari e indirizzo.',
    ],
    resultLong:
      'In due mesi sono arrivate in media 6 richieste di primo incontro al mese dal sito, la metà da persone che non conoscevano lo studio.',
    demo: true,
    verified: false,
    site: {
      art: 'studio',
      colors: { bg: '#f6f4ef', ink: '#1f2a33', primary: '#27455c', accent: '#b8893a', soft: '#e1e6ea' },
      nav: ['Servizi', 'Lo studio', 'Contatti'],
      headline: 'Le tue tasse in ordine, senza linguaggio da ufficio.',
      sub: 'Contabilità, dichiarazioni e consulenza per professionisti e piccole imprese.',
      cta: 'Primo incontro gratuito',
      blocks: [
        { title: 'Partita IVA', text: 'Apertura, regime giusto e scadenze sotto controllo.' },
        { title: 'Dichiarazioni', text: 'Redditi, 730 e adempimenti, spiegati con calma.' },
        { title: 'Consulenza', text: 'Una persona che risponde al telefono.' },
      ],
      footer: 'Studio Alderighi · Via della Stazione 8',
    },
  },
  {
    slug: 'idraulica-pronto-marini',
    category: 'artigiani',
    name: 'Idraulica Pronto Marini',
    kind: 'Idraulico e pronto intervento',
    deliveryDays: 2,
    result: 'Il 70% delle chiamate arriva ora dal pulsante "Chiama"',
    situation:
      'Il titolare lavorava solo con il passaparola. Quando qualcuno cercava "idraulico urgente" in zona, trovava la concorrenza.',
    whatWeDid: [
      'Un sito di una pagina con numero grande e pulsante per chiamare.',
      'Elenco chiaro dei lavori e della zona coperta.',
      'Foto dei lavori fatte dal telefono, ritoccate da noi.',
    ],
    resultLong:
      'Dopo la messa online, circa il 70% delle chiamate nuove arriva dal pulsante "Chiama" del sito. Consegnato in 2 giorni perché il sito è una pagina sola.',
    demo: true,
    verified: false,
    site: {
      art: 'idraulico',
      colors: { bg: '#f2f7f9', ink: '#10252e', primary: '#0f5d78', accent: '#f2a23a', soft: '#d6e8ee' },
      nav: ['Lavori', 'Zona', 'Chiama'],
      headline: 'Perdita d\'acqua? Arriviamo in giornata.',
      sub: 'Riparazioni, caldaie e bagni. Preventivo scritto prima di iniziare.',
      cta: 'Chiama adesso',
      blocks: [
        { title: 'Pronto intervento', text: 'Anche nel weekend per le urgenze.' },
        { title: 'Bagni e caldaie', text: 'Installazione e manutenzione.' },
        { title: 'Preventivo chiaro', text: 'Prezzo concordato prima del lavoro.' },
      ],
      footer: 'Idraulica Pronto Marini · Tel. 000 000 0000',
    },
  },
  {
    slug: 'atelier-lumi-beauty',
    category: 'benessere',
    name: 'Atelier Lumi Beauty',
    kind: 'Centro estetico',
    deliveryDays: 3,
    result: 'Telefono meno occupato: prenotazioni dal pulsante WhatsApp',
    situation:
      'Il centro riceveva prenotazioni solo al telefono, spesso mentre le operatrici lavoravano. Molte chiamate andavano perse.',
    whatWeDid: [
      'Listino semplice con i trattamenti e le durate.',
      'Pulsante WhatsApp con messaggio già scritto: "Vorrei prenotare…".',
      'Galleria del locale e dei prodotti, con foto del centro.',
    ],
    resultLong:
      'Le prenotazioni via WhatsApp sono diventate il canale principale. Le chiamate perse sono scese e le operatrici non vengono più interrotte durante i trattamenti.',
    quote: { text: 'Le clienti scrivono su WhatsApp e io rispondo quando ho finito. Prima perdevo mezza giornata al telefono.', who: 'Silvia M., titolare' },
    demo: true,
    verified: false,
    site: {
      art: 'estetista',
      colors: { bg: '#fbf4f1', ink: '#3b2a2a', primary: '#a8566b', accent: '#c9a36a', soft: '#f2dfdc' },
      nav: ['Trattamenti', 'Il centro', 'Prenota'],
      headline: 'Un\'ora per te, senza fretta.',
      sub: 'Trattamenti viso e corpo, con prodotti che usiamo davvero.',
      cta: 'Prenota su WhatsApp',
      blocks: [
        { title: 'Viso', text: 'Pulizia, idratazione e trattamenti mirati.' },
        { title: 'Corpo', text: 'Massaggi e percorsi di benessere.' },
        { title: 'Mani e piedi', text: 'Cura e smalto semipermanente.' },
      ],
      footer: 'Atelier Lumi Beauty · Tel. 000 000 0000',
    },
  },
  {
    slug: 'palestra-forma-viva',
    category: 'benessere',
    name: 'Palestra Forma Viva',
    kind: 'Palestra e corsi',
    deliveryDays: 3,
    result: '14 prove gratuite prenotate nel primo mese',
    situation:
      'Gli orari dei corsi stavano su fogli appesi all\'ingresso e su un profilo social. Chi cercava una palestra in zona non capiva cosa offrissimo.',
    whatWeDid: [
      'Orari dei corsi in una tabella leggibile dal telefono.',
      'Una prova gratuita da richiedere con un modulo di tre campi.',
      'Pagina dei prezzi chiara, senza "chiedi in segreteria".',
    ],
    resultLong:
      'Nel primo mese sono state prenotate 14 prove gratuite dal sito, e la segreteria riceve meno telefonate per chiedere gli orari.',
    demo: true,
    verified: false,
    site: {
      art: 'palestra',
      colors: { bg: '#f4f6f1', ink: '#1c2a1d', primary: '#2f6b3a', accent: '#f08a24', soft: '#dfe8dc' },
      nav: ['Corsi', 'Orari', 'Prezzi', 'Prova'],
      headline: 'Muoviti con noi. La prima prova è gratis.',
      sub: 'Sala pesi, corsi per tutti i livelli e istruttori che ti seguono.',
      cta: 'Prenota la prova',
      blocks: [
        { title: 'Corsi', text: 'Pilates, spinning, funzionale e ginnastica dolce.' },
        { title: 'Orari', text: 'Dalle 7 alle 22, anche il sabato.' },
        { title: 'Prezzi chiari', text: 'Abbonamenti mensili, senza vincoli lunghi.' },
      ],
      footer: 'Palestra Forma Viva · Tel. 000 000 0000',
    },
  },
  {
    slug: 'casa-ginestra-bb',
    category: 'casa',
    name: 'Casa Ginestra B&B',
    kind: 'Bed & Breakfast',
    deliveryDays: 4,
    result: 'Più richieste dirette, meno commissioni sui portali',
    situation:
      'Le prenotazioni arrivavano quasi tutte dai portali, con commissioni alte. La proprietaria non aveva una vetrina propria con le sue foto e i suoi prezzi.',
    whatWeDid: [
      'Un sito con le camere, le foto e i prezzi indicativi.',
      'Modulo per chiedere la disponibilità, con risposta diretta.',
      'Consegna in 4 giorni: il giorno 2 la proprietaria ha mandato altre foto delle camere.',
    ],
    resultLong:
      'In tre mesi circa un terzo delle richieste è arrivato direttamente dal sito, senza commissioni. Consegnato in 4 giorni perché abbiamo aspettato le foto nuove delle camere.',
    demo: true,
    verified: false,
    site: {
      art: 'bnb',
      colors: { bg: '#f7f3ea', ink: '#2b2a23', primary: '#5f6b3a', accent: '#c78a3b', soft: '#e7e5d2' },
      nav: ['Camere', 'Dintorni', 'Richiedi'],
      headline: 'Due notti tra le colline, colazione fatta in casa.',
      sub: 'Tre camere, un giardino e una proprietaria che ti aspetta.',
      cta: 'Chiedi la disponibilità',
      blocks: [
        { title: 'Le camere', text: 'Tre camere con bagno privato e vista sul giardino.' },
        { title: 'Colazione', text: 'Torte, pane e marmellate fatte da noi.' },
        { title: 'Dintorni', text: 'Sentieri, cantine e borghi a pochi minuti.' },
      ],
      footer: 'Casa Ginestra B&B · Tel. 000 000 0000',
    },
  },
  {
    slug: 'immobiliare-torrenova',
    category: 'casa',
    name: 'Immobiliare Torrenova',
    kind: 'Agenzia immobiliare',
    deliveryDays: 3,
    result: 'Schede degli immobili aggiornate dall\'agenzia in 5 minuti',
    situation:
      'L\'agenzia si affidava a un portale che mostrava gli annunci dei concorrenti accanto ai suoi. Non aveva un posto suo dove mostrare gli immobili.',
    whatWeDid: [
      'Elenco degli immobili con foto, metri quadri e prezzo.',
      'Una scheda per ogni immobile, con pulsante "Chiedi informazioni".',
      'Formazione per aggiungere o togliere un annuncio senza chiamarci.',
    ],
    resultLong:
      'L\'agenzia aggiorna le schede da sola in pochi minuti. Il sito è diventato il primo link che manda ai clienti dopo la prima telefonata.',
    quote: { text: 'Prima il link dell\'annuncio mi portava dai concorrenti. Adesso mando il mio sito e basta.', who: 'Paolo R., titolare' },
    demo: true,
    verified: false,
    site: {
      art: 'immobiliare',
      colors: { bg: '#f5f3f0', ink: '#232323', primary: '#7a3b2e', accent: '#d4a24c', soft: '#e8e1d9' },
      nav: ['Vendita', 'Affitto', 'L\'agenzia', 'Contatti'],
      headline: 'La casa giusta, spiegata senza giri di parole.',
      sub: 'Appartamenti e ville in zona, con foto vere e prezzi chiari.',
      cta: 'Vedi gli immobili',
      blocks: [
        { title: 'In vendita', text: 'Dodici immobili, aggiornati ogni settimana.' },
        { title: 'In affitto', text: 'Appartamenti per famiglie e per studenti.' },
        { title: 'Valutazione', text: 'Ti diciamo quanto vale la tua casa.' },
      ],
      footer: 'Immobiliare Torrenova · Tel. 000 000 0000',
    },
  },
  {
    slug: 'merceria-il-gomitolo',
    category: 'negozi',
    name: 'Merceria Il Gomitolo',
    kind: 'Merceria e filati',
    deliveryDays: 3,
    result: 'Clienti nuove da fuori zona, grazie alla scheda su Google',
    situation:
      'Il negozio era conosciuto solo nel quartiere. Online non si trovava né orario né indirizzo, e i social non bastavano.',
    whatWeDid: [
      'Un sito con le categorie di prodotto e le foto del negozio.',
      'Orari, mappa e indicazioni per arrivare.',
      'Scheda Google collegata con foto e orari aggiornati.',
    ],
    resultLong:
      'Dopo la scheda Google e il sito, arrivano clienti nuove da paesi vicini. Il negozio resta aperto con gli orari giusti anche nei giorni di festa, senza dover rispondere a messaggi.',
    demo: true,
    verified: false,
    site: {
      art: 'negozio',
      colors: { bg: '#f9f3f4', ink: '#33232b', primary: '#8a2f5a', accent: '#e6a23c', soft: '#f0dce4' },
      nav: ['Prodotti', 'Il negozio', 'Orari'],
      headline: 'Filati, bottoni e idee per le tue mani.',
      sub: 'Una merceria di quartiere dove trovi anche i consigli.',
      cta: 'Vieni a trovarci',
      blocks: [
        { title: 'Filati', text: 'Lana, cotone e misto, per ogni lavoro.' },
        { title: 'Cucito', text: 'Stoffe, fili, bottoni e accessori.' },
        { title: 'Consigli', text: 'Ti aiutiamo a scegliere cosa ti serve.' },
      ],
      footer: 'Merceria Il Gomitolo · Tel. 000 000 0000',
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectCategoryLabel = (id: ProjectCategory) => categories.find((c) => c.id === id)?.label ?? id;
