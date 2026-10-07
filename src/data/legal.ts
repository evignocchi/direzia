/**
 * TESTI LEGALI: informativa privacy, cookie policy, termini della garanzia.
 * Dati societari da company.ts, cifre da offer.ts. Sono testi di partenza conformi alla struttura del GDPR (artt. 13-14):
 * fai verificare privacy e garanzia da un consulente prima del lancio.
 */
import { company, fullAddress } from './company.ts';
import { offer, euro, priceLabel } from './offer.ts';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export const legalUpdatedAt = '7 ottobre 2026';

const titolare = `${company.legalName}, P.IVA ${company.vatId}, con sede in ${fullAddress()}. Email: ${company.email}. PEC: ${company.pec}.`;

export const privacy: { title: string; intro: string; sections: LegalSection[] } = {
  title: 'Informativa sulla privacy',
  intro: `Questa informativa spiega come trattiamo i dati personali di chi visita questo sito e di chi ci scrive, ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR). Ultimo aggiornamento: ${legalUpdatedAt}.`,
  sections: [
    { title: 'Chi è il titolare del trattamento', paragraphs: [titolare] },
    {
      title: 'Quali dati raccogliamo',
      paragraphs: ['Raccogliamo solo i dati che ci servono per risponderti.'],
      list: [
        'Dati che ci invii tramite il modulo di contatto: nome, nome dell\'attività, telefono o email, messaggio facoltativo.',
        'Dati di provenienza della richiesta: la fonte (per esempio "venditore" o "sito") e i parametri della campagna (utm_source, utm_medium, utm_campaign), per capire da dove arrivano le richieste. Se un nostro incaricato ti ha mandato il link con il tuo nome, quel nome si usa solo per salutarti nella pagina e non viene salvato.',
        'Dati tecnici di navigazione (indirizzo IP, tipo di browser, data e ora) registrati dal servizio di hosting per sicurezza e funzionamento del sito.',
        'Se ci scrivi per telefono, email o WhatsApp, i dati che ci comunichi in quella conversazione.',
      ],
    },
    {
      title: 'Perché li trattiamo e su quale base',
      list: [
        'Rispondere alle tue richieste e darti un preventivo: esecuzione di misure precontrattuali richieste da te (art. 6.1.b GDPR).',
        'Eseguire il contratto, se diventi cliente, e adempiere agli obblighi fiscali e contabili (art. 6.1.b e 6.1.c GDPR).',
        'Garantire la sicurezza del sito e prevenire abusi e spam, per esempio con un campo nascosto anti-spam e, se attivo, Cloudflare Turnstile: legittimo interesse (art. 6.1.f GDPR).',
      ],
      paragraphs: ['Non facciamo profilazione e non prendiamo decisioni basate su processi automatizzati.'],
    },
    {
      title: 'A chi comunichiamo i dati',
      paragraphs: [
        'I dati sono trattati da noi e da fornitori che ci aiutano a far funzionare il sito, nominati responsabili del trattamento dove previsto:',
      ],
      list: [
        'Cloudflare, Inc.: hosting del sito e protezione da abusi.',
        'Il servizio che usiamo per ricevere le richieste del modulo (email transazionale o webhook, per esempio Resend).',
        'Consulenti fiscali e legali, solo se necessario e nei limiti di legge.',
      ],
    },
    {
      title: 'Trasferimenti fuori dall\'Unione europea',
      paragraphs: [
        'Alcuni fornitori hanno sede negli Stati Uniti. I trasferimenti avvengono sulla base di una decisione di adeguatezza della Commissione europea (Data Privacy Framework) o delle clausole contrattuali standard.',
      ],
    },
    {
      title: 'Per quanto tempo conserviamo i dati',
      list: [
        'Richieste di contatto che non diventano un contratto: fino a 12 mesi dall\'ultimo contatto.',
        'Dati contrattuali, fatture e documenti contabili: 10 anni, come previsto dalla legge.',
        'Dati tecnici di navigazione: per il tempo stabilito dal fornitore di hosting, di norma non oltre 30 giorni.',
      ],
    },
    {
      title: 'I tuoi diritti',
      paragraphs: [
        `Puoi chiederci in ogni momento di accedere ai tuoi dati, correggerli, cancellarli, limitarne il trattamento, riceverli in formato leggibile o opporti al trattamento (artt. 15-22 GDPR). Scrivi a ${company.email} o a ${company.pec}: rispondiamo entro 30 giorni. Hai anche il diritto di presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).`,
      ],
    },
    {
      title: 'Se non ci dai i dati',
      paragraphs: ['I campi obbligatori del modulo servono per poterti rispondere. Se non li compili non possiamo gestire la tua richiesta. Il resto è facoltativo.'],
    },
    {
      title: 'Cookie',
      paragraphs: ['Questo sito non usa cookie di tracciamento né di profilazione. Trovi i dettagli nella pagina Cookie.'],
    },
  ],
};

export const cookiePolicy: { title: string; intro: string; sections: LegalSection[] } = {
  title: 'Cookie policy',
  intro: `Questo sito non usa cookie di tracciamento, di profilazione o pubblicitari, quindi non mostra nessun banner dei cookie. Ultimo aggiornamento: ${legalUpdatedAt}.`,
  sections: [
    {
      title: 'Che cosa sono i cookie',
      paragraphs: ['I cookie sono piccoli file di testo che un sito salva nel tuo browser. Servono, per esempio, a ricordare le preferenze o a misurare le visite.'],
    },
    {
      title: 'Quali cookie usiamo',
      paragraphs: [
        'Nessuno, di norma. Il sito non scrive cookie per tenere traccia di cosa fai o per mostrarti pubblicità.',
        'Per proteggere il modulo di contatto dallo spam usiamo un campo nascosto. Se attivi anche Cloudflare Turnstile, il servizio può usare tecnologie tecniche di sicurezza, necessarie al solo scopo di distinguere persone e programmi automatici. Non serve il tuo consenso per strumenti strettamente necessari.',
      ],
    },
    {
      title: 'Statistiche delle visite',
      paragraphs: [
        'Se attiviamo uno strumento di statistiche, usiamo solo strumenti senza cookie e senza dati che identificano le persone (per esempio Plausible, Umami o Cloudflare Web Analytics). Se un giorno questo cambia, aggiorniamo questa pagina e mostriamo un banner per chiederti il consenso.',
      ],
    },
    {
      title: 'Contenuti di terzi',
      paragraphs: [
        'Il sito non incorpora video, mappe o social. I link verso altri siti (WhatsApp, Google, il calendario per prenotare una chiamata) portano fuori dal sito: da lì valgono le regole di quel servizio.',
      ],
    },
    {
      title: 'Come cancellare i cookie dal browser',
      paragraphs: ['Puoi cancellare i cookie in ogni momento dalle impostazioni del tuo browser (Chrome, Safari, Firefox, Edge). Non c\'è nulla da disattivare per questo sito.'],
    },
    { title: 'Titolare', paragraphs: [titolare] },
  ],
};

export const guaranteeTerms: { title: string; intro: string; sections: LegalSection[] } = {
  title: 'Termini della garanzia',
  intro: `Questa pagina spiega la garanzia "soddisfatti o rimborsati" del servizio "${offer.name}". Ultimo aggiornamento: ${legalUpdatedAt}.`,
  sections: [
    {
      title: 'In breve',
      paragraphs: [
        `Se il sito che ti consegniamo non ti convince, per qualsiasi motivo, hai ${offer.guarantee.days} giorni dalla messa online per chiedere il rimborso. Non devi dimostrare nulla né compilare moduli.`,
      ],
    },
    {
      title: 'Cosa copre',
      paragraphs: [
        `Il prezzo del servizio, ${priceLabel}, e tutto quello che hai pagato a ${company.legalName} per il sito. La garanzia vale per il servizio "${offer.name}", cioè un sito vetrina fino a ${offer.pagesIncluded} pagine.`,
      ],
    },
    {
      title: 'Quando parte il termine',
      paragraphs: [
        `Il termine di ${offer.guarantee.days} giorni parte dal giorno in cui il sito va online sul tuo dominio.`,
      ],
    },
    {
      title: 'Come si chiede il rimborso',
      paragraphs: [
        `Scrivi una email a ${company.email} (o un messaggio WhatsApp al ${company.phone.display}) con la parola "rimborso". Basta questo: non servono motivazioni.`,
      ],
    },
    {
      title: 'Quando e come ricevi i soldi',
      paragraphs: [
        `Rimborsiamo entro ${offer.guarantee.refundWithinDays} giorni lavorativi dalla richiesta, con lo stesso metodo di pagamento che hai usato.`,
      ],
    },
    {
      title: 'Cosa succede dopo il rimborso',
      paragraphs: [
        'Il sito viene messo offline. Il dominio, se è già intestato a te, resta tuo. Le foto, i loghi e i testi che ci hai dato ti restano, e ti restituiamo quelli che ti servono.',
      ],
    },
    {
      title: 'Cosa non è coperto',
      list: [
        'Servizi che non fanno parte del sito vetrina descritto nell\'offerta (per esempio un negozio online), che hanno condizioni scritte a parte.',
        `Rinnovo del dominio e manutenzione dal secondo anno: massimo ${euro(offer.yearTwoMax)} l'anno in tutto.`,
      ],
    },
    {
      title: 'Rapporto con altri tuoi diritti',
      paragraphs: [
        'Questa garanzia è un impegno in più che prendiamo con te. Non toglie i diritti che la legge ti riconosce.',
      ],
    },
    {
      title: 'Importo di riferimento',
      paragraphs: [`Importo massimo del servizio: ${euro(offer.priceMax)}${offer.vatIncluded ? ', IVA inclusa' : ' + IVA'}.`],
    },
  ],
};
