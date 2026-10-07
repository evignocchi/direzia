// Verifica i contrasti WCAG delle coppie testo/sfondo usate dal sito. Fallisce se una coppia è sotto soglia.
// Uso: node scripts/brand-contrast.mjs [--markdown]
import { colors as c } from './brand-lib.mjs';

export { ratio } from '../src/lib/contrast.ts';
import { ratio } from '../src/lib/contrast.ts';

// [primo piano, sfondo, uso, soglia]  (4.5 testo normale, 3 testo grande / componenti UI)
export const pairs = [
  ['white', 'ink', 'Testo bianco sul tabellone', 4.5],
  ['white', 'cell', 'Lettere bianche nelle celle', 4.5],
  ['signal', 'ink', 'Lettere gialle e testi di accento sul tabellone', 4.5],
  ['signal', 'cell', 'Lettere gialle nelle celle', 4.5],
  ['go', 'ink', 'Stato "arrivato" sul tabellone', 4.5],
  ['mist', 'ink', 'Testo secondario sul nero (etichette di riga)', 4.5],
  ['mist', 'board', 'Testo secondario sul pannello', 4.5],
  ['ink', 'signal', 'Testo dei pulsanti e del campo giallo', 4.5],
  ['ink', 'signalDeep', 'Testo del pulsante in hover', 4.5],
  ['ink', 'white', 'Testo corrente su bianco', 4.5],
  ['ink', 'paper', 'Testo corrente su grigio chiaro', 4.5],
  ['ink', 'paper2', 'Testo su riquadri grigi', 4.5],
  ['graphite', 'white', 'Testo secondario su bianco', 4.5],
  ['graphite', 'paper', 'Testo secondario su grigio chiaro', 4.5],
  ['graphite', 'paper2', 'Testo secondario su riquadri grigi', 4.5],
  ['goInk', 'white', 'Testo verde su bianco', 4.5],
  ['goInk', 'goSoft', 'Messaggio di successo', 4.5],
  ['errore', 'erroreChiaro', 'Messaggio di errore', 4.5],
  ['errore', 'white', 'Errore sotto un campo', 4.5],
  ['attenzione', 'attenzioneChiaro', 'Etichetta "Esempio dimostrativo"', 4.5],
  ['graphite', 'white', 'Bordo dei campi form (componente UI, ≥3)', 3],
  ['ink', 'white', 'Anello di focus su chiaro (≥3)', 3],
  ['signal', 'ink', 'Anello di focus su nero (≥3)', 3],
  ['rule', 'white', 'Filetti decorativi (non testo: nessuna soglia)', 1],
];

export function evaluate() {
  return pairs.map(([fg, bg, use, min]) => {
    const r = ratio(c[fg], c[bg]);
    return { fg, bg, use, min, ratio: r, ok: r >= min };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = evaluate();
  if (process.argv.includes('--markdown')) {
    console.log('| Testo | Sfondo | Uso | Contrasto | Soglia | Esito |\n|---|---|---|---|---|---|');
    for (const r of rows) console.log(`| \`${c[r.fg]}\` ${r.fg} | \`${c[r.bg]}\` ${r.bg} | ${r.use} | ${r.ratio.toFixed(2)}:1 | ${r.min}:1 | ${r.ok ? 'OK' : 'NO'} |`);
  } else {
    for (const r of rows) console.log(`${r.ok ? 'OK ' : 'NO '} ${r.ratio.toFixed(2).padStart(5)}:1 (min ${r.min})  ${r.fg} su ${r.bg}  — ${r.use}`);
  }
  const bad = rows.filter((r) => !r.ok);
  if (bad.length) { console.error(`\n${bad.length} coppie sotto soglia.`); process.exit(1); }
}
