// Utilità condivise per generare gli asset del brand (testo convertito in tracciati: nessun font richiesto per renderizzare).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// I colori si leggono da src/styles/tokens.css (unica fonte di verità).
const tokens = fs.readFileSync(path.join(root, 'src/styles/tokens.css'), 'utf8');
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
export const colors = Object.fromEntries(
  [...tokens.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)].map(([, n, v]) => [camel(n), v.toUpperCase()]),
);
colors.white = colors.white ?? '#FFFFFF';
colors.black = '#000000';
// Nomi della versione precedente, ancora usati dagli script e dalle pagine non migrate
Object.assign(colors, {
  abete: colors.ink, abeteScuro: colors.ink, abeteChiaro: colors.paper2,
  zafferano: colors.signal, zafferanoScuro: colors.signalDeep,
  crema: colors.paper, sabbia: colors.paper2, pietra: colors.rule, muschio: colors.graphite, inchiostro: colors.ink,
  terracotta: colors.errore, terracottaChiaro: colors.erroreChiaro, ok: colors.goInk, okChiaro: colors.goSoft,
});

const fontCache = {};
export function loadFont(pkg, file) {
  const key = `${pkg}/${file}`;
  if (!fontCache[key]) {
    const buf = fs.readFileSync(path.join(root, 'node_modules', pkg, 'files', file));
    fontCache[key] = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }
  return fontCache[key];
}
export const displayFont = () => loadFont('@fontsource/barlow-condensed', 'barlow-condensed-latin-800-normal.woff');
export const bodyFont = (w = 600) => loadFont('@fontsource/barlow', `barlow-latin-${w}-normal.woff`);

/** Converte i comandi del glifo (unità del font, asse y verso l'alto) in dati di tracciato SVG. */
function glyphToSvg(glyph, x, y, scale) {
  const f = (n) => +n.toFixed(2);
  const X = (v) => f(x + v * scale);
  const Y = (v) => f(y - v * scale);
  return glyph.path.commands
    .map((c) => {
      switch (c.type) {
        case 'M': return `M${X(c.x)} ${Y(c.y)}`;
        case 'L': return `L${X(c.x)} ${Y(c.y)}`;
        case 'Q': return `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`;
        case 'C': return `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`;
        default: return 'Z';
      }
    })
    .join('');
}

/** Restituisce { d, width } per una stringa a una data dimensione, con baseline in (x, y). */
export function textPath(font, text, x, y, size, letterSpacing = 0) {
  const scale = size / font.unitsPerEm;
  let cx = x;
  let d = '';
  const glyphs = font.stringToGlyphs(text);
  glyphs.forEach((g, i) => {
    d += glyphToSvg(g, cx, y, scale);
    let adv = g.advanceWidth * scale;
    if (i < glyphs.length - 1) {
      const k = font.getKerningValue(g, glyphs[i + 1]);
      if (Number.isFinite(k)) adv += k * scale;
    }
    cx += adv + letterSpacing * size;
  });
  return { d, width: cx - x - letterSpacing * size };
}

/** Estremi verticali del testo rispetto alla baseline (y negativo = sopra). */
export function textExtents(font, text, size) {
  const scale = size / font.unitsPerEm;
  let top = 0;
  let bottom = 0;
  for (const g of font.stringToGlyphs(text)) {
    const b = g.getBoundingBox();
    top = Math.min(top, -b.y2 * scale);
    bottom = Math.max(bottom, -b.y1 * scale);
  }
  return { top, bottom };
}

export function svgDoc(w, h, inner, { title } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"${title ? ` aria-label="${title}"` : ''}>${title ? `<title>${title}</title>` : ''}${inner}</svg>\n`;
}

// Simbolo: una "D" solida il cui vuoto interno è una freccia che punta avanti (la direzione).
export const symbolD = 'M12 6H25C37 6 44 14 44 24C44 34 37 42 25 42H12Q10 42 10 40V8Q10 6 12 6Z';
export const symbolArrow = 'M17 21.5H26V16.5L35 24L26 31.5V26.5H17Z';

/** Simbolo a 48x48 con colori variabili. mode: 'color' | 'mono' | 'negative' */
export function symbolSvg({ d = colors.abete, arrow = colors.zafferano, hole = true } = {}) {
  const outer = hole
    ? `<path fill="${d}" fill-rule="evenodd" d="${symbolD}${symbolArrow}"/>`
    : `<path fill="${d}" d="${symbolD}"/>`;
  const a = arrow ? `<path fill="${arrow}" d="${symbolArrow}"/>` : '';
  return outer + a;
}

export function write(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  return p;
}
