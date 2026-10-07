// Controllo pre-lancio: fallisce se nel build di produzione restano segnaposto, contenuti demo o testi legali non validati.
// Uso: npm run prelaunch            (rifà il build e controlla)
//      npm run prelaunch -- --no-build   (controlla il build già in dist/)
// Variabili: ALLOW_DEMO=true consente recensioni/progetti dimostrativi (solo per la fase di vendita iniziale).
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PLACEHOLDER_PATTERN } from '../src/data/company.ts';
import { offer } from '../src/data/offer.ts';
import { projects } from '../src/data/projects.ts';
import { testimonials } from '../src/data/testimonials.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const allowDemo = process.env.ALLOW_DEMO === 'true';
const failures = [];
const warnings = [];

if (!process.argv.includes('--no-build')) {
  console.log('Build di produzione in corso…\n');
  execSync('npx astro build', { cwd: root, stdio: 'inherit' });
  console.log('');
}
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html non trovato: esegui prima il build.');
  process.exit(1);
}

/* 1. URL del sito */
const siteUrl = process.env.SITE_URL;
if (!siteUrl) failures.push('SITE_URL non impostato: canonical, sitemap e immagine OG puntano a un indirizzo provvisorio. Vedi .env.example.');
else if (/pages\.dev|localhost|example\./.test(siteUrl) && process.env.ALLOW_PAGES_DEV !== 'true')
  failures.push(`SITE_URL (${siteUrl}) è un indirizzo provvisorio. Imposta il dominio definitivo (oppure ALLOW_PAGES_DEV=true per un'anteprima).`);

/* 2. Segnaposto nel build (la pagina /brand e la cartella /brand sono materiale interno: esclusi) */
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const skip = (rel) => rel === 'brand.html' || rel.startsWith(`brand${path.sep}`);
const placeholderFiles = new Map(); // segnaposto → file in cui compare
const scanTextFiles = walk(dist).filter((f) => /\.(html|xml|txt|json|js|css|webmanifest)$/.test(f));
for (const file of scanTextFiles) {
  const rel = path.relative(dist, file);
  if (skip(rel)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const found of new Set(text.match(new RegExp(PLACEHOLDER_PATTERN.source, 'g')) ?? [])) {
    if (!placeholderFiles.has(found)) placeholderFiles.set(found, new Set());
    placeholderFiles.get(found).add(rel);
  }
}
if (placeholderFiles.size) {
  failures.push(`Segnaposto ancora presenti nel build (${placeholderFiles.size} diversi):`);
  for (const [value, files] of placeholderFiles) failures.push(`    ${value}   in ${files.size} file (es. ${[...files][0]})`);
  failures.push('→ Sostituisci i valori in src/data/company.ts (e le variabili PUBLIC_* in .env.example) e rifai il build.');
}

/* 3. Contenuti demo */
const demoProjects = projects.filter((p) => p.demo).length;
const demoReviews = testimonials.filter((t) => t.demo).length;
if ((demoProjects || demoReviews) && !allowDemo)
  failures.push(`Contenuti dimostrativi ancora presenti: ${demoProjects} progetti e ${demoReviews} recensioni con demo: true. Sostituiscili con casi reali (src/data/projects.ts, src/data/testimonials.ts) oppure imposta ALLOW_DEMO=true.`);
else if (demoProjects || demoReviews) warnings.push(`ALLOW_DEMO=true: pubblichi ${demoProjects} progetti e ${demoReviews} recensioni dimostrativi (restano etichettati "Esempio dimostrativo").`);
const fakeVerified = testimonials.filter((t) => t.verified && (t.demo || !t.sourceUrl));
if (fakeVerified.length) failures.push(`Recensioni segnate "verified" ma demo o senza sourceUrl: ${fakeVerified.map((t) => t.id).join(', ')}.`);

/* 4. Foto del team */
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (html.includes('data-placeholder')) failures.push('Le foto del team sono ancora segnaposto. Aggiungi le foto in src/assets/team/ (vedi LEGGIMI.md).');

/* 5. Garanzia validata da un legale */
if (!offer.guarantee.legalReviewed) failures.push('La garanzia non è stata validata: dopo la revisione legale imposta offer.guarantee.legalReviewed = true in src/data/offer.ts.');

/* 6. Controlli di coerenza sul build */
for (const needed of ['sitemap-index.xml', 'robots.txt', 'og.png', 'favicon.svg', '404.html']) if (!fs.existsSync(path.join(dist, needed))) failures.push(`File mancante nel build: ${needed}`);
if (!process.env.PUBLIC_BOOKING_URL) warnings.push('PUBLIC_BOOKING_URL non impostato: il pulsante "Prenota una chiamata di 15 minuti" non compare nel sito.');
if (!process.env.RESEND_API_KEY && !process.env.CONTACT_WEBHOOK_URL) warnings.push('RESEND_API_KEY / CONTACT_WEBHOOK_URL non trovate in questo ambiente: ricordati di impostarle su Cloudflare Pages (altrimenti il modulo non invia nulla).');

/* Esito */
console.log('Controllo pre-lancio Direzia\n');
for (const w of warnings) console.log(`  ATTENZIONE  ${w}`);
if (failures.length) {
  console.log('');
  for (const f of failures) console.log(`  BLOCCATO    ${f}`);
  console.log(`\nNon pubblicare: ${failures.length} problemi da risolvere.`);
  process.exit(1);
}
console.log('\n  OK: nessun segnaposto, nessun contenuto demo, garanzia validata. Puoi pubblicare.');
