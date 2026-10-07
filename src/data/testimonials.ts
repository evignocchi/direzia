/**
 * RECENSIONI. Un file, una voce per recensione.
 *
 * Le 12 recensioni qui sotto sono DIMOSTRATIVE: persone e attività sono inventate (`demo: true`, `verified: false`).
 * Finché `demo` è true il sito le etichetta "Esempio dimostrativo" e NON le inserisce nei dati strutturati per Google.
 * Per sostituirle con recensioni vere: scrivi una nuova voce con `demo: false`, `verified: true` e un `sourceUrl`
 * (link alla recensione originale, es. Google). Vedi la sezione "Recensioni vere" del README.
 */
export interface Testimonial {
  id: string;
  /** Nome e iniziale del cognome. */
  author: string;
  role: string;
  business: string;
  /** Settore (categoria progetti). */
  sector: string;
  /** Slug del progetto collegato, se c'è. */
  project?: string;
  stars: 4 | 5;
  text: string;
  /** Mese della recensione, formato AAAA-MM. */
  date: string;
  demo: boolean;
  verified: boolean;
  /** Link alla recensione originale (obbligatorio per le recensioni vere). */
  sourceUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'giorgio-osteria',
    author: 'Giorgio B.',
    role: 'Titolare',
    business: 'Osteria del Fico Storto',
    sector: 'ristorazione',
    project: 'osteria-del-fico-storto',
    stars: 5,
    text: 'Avevo un sito del 2014 che si apriva in dieci secondi e non si leggeva dal telefono. Martedì ci siamo sentiti, giovedì sera era online. Il menu lo cambio io quando finisce il pesce. Le prenotazioni sono aumentate già dalla prima settimana.',
    date: '2025-03',
    demo: true,
    verified: false,
  },
  {
    id: 'carla-studio',
    author: 'Carla A.',
    role: 'Commercialista',
    business: 'Studio Alderighi Commercialisti',
    sector: 'professionisti',
    project: 'studio-alderighi-commercialisti',
    stars: 4,
    text: 'Diffido di chi promette troppo. Hanno fatto quello che avevano scritto, nei tempi. Avrei voluto più spazio per i servizi, ma mi avevano spiegato prima cosa c\'era nel prezzo, quindi non ho niente da rimproverare.',
    date: '2025-04',
    demo: true,
    verified: false,
  },
  {
    id: 'marco-idraulico',
    author: 'Marco M.',
    role: 'Titolare',
    business: 'Idraulica Pronto Marini',
    sector: 'artigiani',
    project: 'idraulica-pronto-marini',
    stars: 5,
    text: 'Non sono uno da computer. Mi hanno chiesto due cose: le foto dei lavori e il numero. Il resto l\'hanno fatto loro. Adesso la gente mi chiama dal sito con un tocco.',
    date: '2025-05',
    demo: true,
    verified: false,
  },
  {
    id: 'silvia-estetica',
    author: 'Silvia M.',
    role: 'Titolare',
    business: 'Atelier Lumi Beauty',
    sector: 'benessere',
    project: 'atelier-lumi-beauty',
    stars: 5,
    text: 'Le clienti mi scrivono su WhatsApp e io rispondo quando ho finito il trattamento. Prima perdevo mezza giornata al telefono. Il sito è semplice e piace anche a loro.',
    date: '2025-05',
    demo: true,
    verified: false,
  },
  {
    id: 'davide-palestra',
    author: 'Davide L.',
    role: 'Responsabile',
    business: 'Palestra Forma Viva',
    sector: 'benessere',
    project: 'palestra-forma-viva',
    stars: 4,
    text: 'Sito bello e veloce, le prove gratuite sono arrivate subito. Una cosa: gli orari dei corsi cambiano spesso e all\'inizio mi sono incartato. La mezz\'ora di formazione è servita, ma una volta ho dovuto richiamarli. Mi hanno risposto in giornata.',
    date: '2025-06',
    demo: true,
    verified: false,
  },
  {
    id: 'anna-bnb',
    author: 'Anna P.',
    role: 'Proprietaria',
    business: 'Casa Ginestra B&B',
    sector: 'casa',
    project: 'casa-ginestra-bb',
    stars: 5,
    text: 'Il giorno 2 ho mandato altre foto delle camere e mi hanno avvisata che sarebbe slittato di un giorno. Mi è piaciuto che lo dicessero chiaramente. Ora una richiesta su tre arriva direttamente dal sito, senza pagare commissioni.',
    date: '2025-06',
    demo: true,
    verified: false,
  },
  {
    id: 'paolo-immobiliare',
    author: 'Paolo R.',
    role: 'Titolare',
    business: 'Immobiliare Torrenova',
    sector: 'casa',
    project: 'immobiliare-torrenova',
    stars: 4,
    text: 'Tempi rispettati e prezzo uguale a quello detto al telefono. Quattro stelle perché la prima volta che ho aggiunto un annuncio ho sbagliato la foto principale. Colpa mia, ma una guida con le schermate passo passo mi avrebbe aiutato.',
    date: '2025-07',
    demo: true,
    verified: false,
  },
  {
    id: 'lucia-merceria',
    author: 'Lucia F.',
    role: 'Titolare',
    business: 'Merceria Il Gomitolo',
    sector: 'negozi',
    project: 'merceria-il-gomitolo',
    stars: 5,
    text: 'Ho 61 anni e pensavo che il sito non fosse per me. Mi hanno fatto vedere la bozza sul mio telefono, ho chiesto di cambiare il colore e il giorno dopo era a posto. Adesso arrivano clienti anche dai paesi vicini.',
    date: '2025-07',
    demo: true,
    verified: false,
  },
  {
    id: 'elena-parrucchiera',
    author: 'Elena T.',
    role: 'Parrucchiera',
    business: 'Salone Elle',
    sector: 'benessere',
    stars: 5,
    text: 'Volevo solo che i clienti trovassero gli orari. Ora trovano anche i prezzi e le foto dei miei lavori. Mi sono sentita ascoltata, non trattata come una che non capisce.',
    date: '2025-08',
    demo: true,
    verified: false,
  },
  {
    id: 'stefano-elettricista',
    author: 'Stefano G.',
    role: 'Elettricista',
    business: 'G. Impianti Elettrici',
    sector: 'artigiani',
    stars: 5,
    text: 'Pagato solo dopo aver visto la bozza. Questo mi ha convinto. Il sito è semplice come lo volevo: chi sono, cosa faccio, il numero.',
    date: '2025-08',
    demo: true,
    verified: false,
  },
  {
    id: 'ilaria-avvocata',
    author: 'Ilaria N.',
    role: 'Avvocata',
    business: 'Studio Legale Nardini',
    sector: 'professionisti',
    stars: 4,
    text: 'Professionali e puntuali. Ho dovuto riscrivere io una parte dei testi perché l\'argomento era troppo tecnico: era previsto, me lo avevano detto. Il risultato è sobrio e fa il suo lavoro.',
    date: '2025-09',
    demo: true,
    verified: false,
  },
  {
    id: 'rosa-fioraia',
    author: 'Rosa D.',
    role: 'Fioraia',
    business: 'Fiori di Rosa',
    sector: 'negozi',
    stars: 5,
    text: 'Per la festa della mamma avevo bisogno del sito entro il fine settimana. Ci siamo sentite il lunedì, il giovedì era online. I clienti ordinano i mazzi chiamandomi, come volevo.',
    date: '2025-09',
    demo: true,
    verified: false,
  },
];

export const hasDemoTestimonials = () => testimonials.some((t) => t.demo);
/** Solo le recensioni vere e verificate: le uniche che finiscono in schema.org. */
export const verifiedTestimonials = () => testimonials.filter((t) => t.verified && !t.demo);
