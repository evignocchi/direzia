// Verifica i contrasti WCAG delle coppie testo/sfondo usate dal sito. Fallisce se una coppia è sotto soglia.
// Uso: node scripts/brand-contrast.mjs [--markdown]
import { colors as c } from './brand-lib.mjs';

export { ratio } from '../src/lib/contrast.ts';
import { ratio } from '../src/lib/contrast.ts';

// [primo piano, sfondo, uso, soglia]  (4.5 testo normale, 3 testo grande / componenti UI)
export const pairs = [
  ['inchiostro', 'crema', 'Testo corrente su fondo pagina', 4.5],
  ['inchiostro', 'sabbia', 'Testo su sezioni sabbia', 4.5],
  ['inchiostro', 'abeteChiaro', 'Testo su riquadri verde chiaro', 4.5],
  ['muschio', 'crema', 'Testo secondario / etichette form', 4.5],
  ['muschio', 'sabbia', 'Testo secondario su sabbia', 4.5],
  ['abete', 'crema', 'Link e titoli verdi su crema', 4.5],
  ['abete', 'sabbia', 'Titoli verdi su sabbia', 4.5],
  ['abete', 'abeteChiaro', 'Testo verde su riquadro chiaro', 4.5],
  ['crema', 'abete', 'Testo chiaro su sezione verde', 4.5],
  ['crema', 'abeteScuro', 'Testo chiaro su footer scuro', 4.5],
  ['abeteChiaro', 'abeteScuro', 'Testo secondario su footer scuro', 4.5],
  ['zafferano', 'abete', 'Accenti e icone su verde (grafica, ≥3)', 3],
  ['zafferano', 'abeteScuro', 'Accenti su verde scuro (grafica, ≥3)', 3],
  ['abeteScuro', 'zafferano', 'Testo dei pulsanti CTA', 4.5],
  ['abeteScuro', 'zafferanoScuro', 'Testo CTA in hover', 4.5],
  ['terracotta', 'crema', 'Testo di evidenza terracotta', 4.5],
  ['terracotta', 'terracottaChiaro', 'Testo terracotta su riquadro chiaro', 4.5],
  ['crema', 'terracotta', 'Etichetta chiara su terracotta', 4.5],
  ['ok', 'okChiaro', 'Messaggio di successo', 4.5],
  ['errore', 'erroreChiaro', 'Messaggio di errore', 4.5],
  ['errore', 'crema', 'Errore sotto un campo', 4.5],
  ['attenzione', 'attenzioneChiaro', 'Avviso / etichetta "Esempio dimostrativo"', 4.5],
  ['muschio', 'crema', 'Bordo dei campi form (componente UI, ≥3)', 3],
  ['abete', 'crema', 'Anello di focus (componente UI, ≥3)', 3],
  ['zafferano', 'abeteScuro', 'Anello di focus su sfondo scuro (≥3)', 3],
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
