// Genera logo, favicon, immagine OG, avatar, banner, firma email e intestazione one-pager.
// Uso: npm run brand   (legge colori da src/styles/tokens.css e numeri da src/data/offer.ts)
import sharp from 'sharp';
import { Buffer } from 'node:buffer';
import { colors as c, displayFont, bodyFont, textPath, textExtents, symbolSvg, symbolD, symbolArrow, svgDoc, write, root } from './brand-lib.mjs';
import { offer, euro } from '../src/data/offer.ts';
import { company } from '../src/data/company.ts';

const serif = displayFont();
const sans = bodyFont(700);

/* ---------- Wordmark ---------- */
const WM_SIZE = 40;
const wm = textPath(serif, 'direzia', 0, 0, WM_SIZE, 0);
const { top: wmTop, bottom: wmBottom } = textExtents(serif, 'direzia', WM_SIZE); // wmTop negativo: sopra la baseline
const wmPath = (fill, tx, ty, scale = 1) =>
  `<path fill="${fill}" transform="translate(${tx} ${ty}) scale(${scale})" d="${wm.d}"/>`;

/** Logo orizzontale: simbolo 48x48 + wordmark, altezza 48. */
function horizontal({ d, arrow, text, hole = true }) {
  const baseline = 24 - (wmTop + wmBottom) / 2; // centra verticalmente il wordmark sul simbolo
  const gap = 14;
  const width = Math.ceil(48 + gap + wm.width + 2);
  return svgDoc(width, 48, symbolSvg({ d, arrow, hole }) + wmPath(text, 48 + gap, baseline), { title: 'Direzia' });
}

/** Logo principale (verticale): simbolo sopra, wordmark sotto. */
function stacked({ d, arrow, text }) {
  const scale = 1.35;
  const w = Math.ceil(wm.width * scale) + 8;
  const sym = `<g transform="translate(${(w - 96) / 2} -12) scale(2)">${symbolSvg({ d, arrow })}</g>`;
  const baseline = 72 + 20 - wmTop * scale;
  const h = Math.ceil(baseline + wmBottom * scale + 4);
  return svgDoc(w, h, sym + wmPath(text, 4, baseline, scale), { title: 'Direzia' });
}

const files = {};
files['brand/logo/direzia-principale.svg'] = stacked({ d: c.abete, arrow: c.zafferano, text: c.inchiostro });
files['brand/logo/direzia-orizzontale.svg'] = horizontal({ d: c.abete, arrow: c.zafferano, text: c.inchiostro });
files['brand/logo/direzia-simbolo.svg'] = svgDoc(48, 48, symbolSvg(), { title: 'Direzia' });
files['brand/logo/direzia-monocromatico.svg'] = horizontal({ d: c.black, arrow: null, text: c.black });
files['brand/logo/direzia-negativo.svg'] = horizontal({ d: c.crema, arrow: c.zafferano, text: c.crema });
files['brand/logo/direzia-negativo-simbolo.svg'] = svgDoc(48, 48, symbolSvg({ d: c.crema, arrow: c.zafferano }), { title: 'Direzia' });
// Favicon: simbolo su fondo trasparente, leggibile su schede chiare e scure grazie al contorno abete.
files['brand/logo/favicon.svg'] = svgDoc(48, 48, `<rect width="48" height="48" rx="11" fill="${c.abete}"/><g transform="translate(6 6) scale(0.75)">${symbolSvg({ d: c.crema, arrow: c.zafferano })}</g>`, { title: 'Direzia' });

/* ---------- Tre concept (Fase 0) ---------- */
files['brand/logo/concepts/concept-a-wordmark.svg'] = svgDoc(
  Math.ceil(wm.width + 60), 64,
  `<path fill="${c.abete}" transform="translate(4 46)" d="${wm.d}"/><path fill="${c.zafferano}" transform="translate(${wm.width + 14} 22) scale(0.6)" d="M0 8H11V0L24 12L11 24V16H0Z"/>`,
  { title: 'Concept A: wordmark con freccia' },
);
files['brand/logo/concepts/concept-b-simbolo-wordmark.svg'] = horizontal({ d: c.abete, arrow: c.zafferano, text: c.inchiostro });
files['brand/logo/concepts/concept-c-monogramma.svg'] = svgDoc(
  64, 64,
  `<rect width="64" height="64" rx="14" fill="${c.abete}"/><g transform="translate(8 8)">${symbolSvg({ d: c.crema, arrow: c.zafferano })}</g>`,
  { title: 'Concept C: monogramma D' },
);

for (const [rel, svg] of Object.entries(files)) write(rel, svg);

/* ---------- PNG ---------- */
const png = async (svg, width, { bg, density = 400 } = {}) => {
  let img = sharp(Buffer.from(svg), { density }).resize({ width });
  if (bg) img = img.flatten({ background: bg });
  return img.png({ compressionLevel: 9 }).toBuffer();
};
const save = (rel, buf) => write(rel, buf);

save('brand/logo/direzia-orizzontale.png', await png(files['brand/logo/direzia-orizzontale.svg'], 1200));
save('brand/logo/direzia-principale.png', await png(files['brand/logo/direzia-principale.svg'], 800));
save('brand/logo/direzia-negativo.png', await png(files['brand/logo/direzia-negativo.svg'], 1200));
save('brand/logo/direzia-simbolo.png', await png(files['brand/logo/direzia-simbolo.svg'], 512));
save('brand/logo/direzia-monocromatico.png', await png(files['brand/logo/direzia-monocromatico.svg'], 1200));

const fav = files['brand/logo/favicon.svg'];
const iconsDir = 'brand/logo/favicon';
save(`${iconsDir}/favicon-32.png`, await png(fav, 32));
save(`${iconsDir}/apple-touch-icon-180.png`, await png(
  svgDoc(48, 48, `<rect width="48" height="48" fill="${c.abete}"/><g transform="translate(6 6) scale(0.75)">${symbolSvg({ d: c.crema, arrow: c.zafferano })}</g>`), 180, { bg: c.abete }));
save(`${iconsDir}/icon-512.png`, await png(fav, 512));
write(`${iconsDir}/favicon.svg`, fav);

// Copia in public/ per il sito
write('public/favicon.svg', fav);
save('public/favicon-32.png', fs_read(`${iconsDir}/favicon-32.png`));
save('public/apple-touch-icon.png', fs_read(`${iconsDir}/apple-touch-icon-180.png`));
save('public/icon-512.png', fs_read(`${iconsDir}/icon-512.png`));

import fs from 'node:fs';
import path from 'node:path';
function fs_read(rel) { return fs.readFileSync(path.join(root, rel)); }

/* ---------- Asset derivati ---------- */
const { deliveryDays, priceMax, vatIncluded } = offer;
const priceText = `massimo ${euro(priceMax)}${vatIncluded ? ' IVA inclusa' : ' + IVA'}`;

/** Righe di testo su tracciati. */
function lines(font, rows, x, y, size, lh, fill, ls = 0) {
  return rows.map((t, i) => `<path fill="${fill}" d="${textPath(font, t, x, y + i * lh, size, ls).d}"/>`).join('');
}
const hWidth = (font, t, size, ls = 0) => textPath(font, t, 0, 0, size, ls).width;

/** Motivo di sfondo: griglia di piccole frecce, generata in codice. */
function arrowPattern(w, h, color, opacity, step = 90, size = 14) {
  let out = `<g fill="${color}" opacity="${opacity}">`;
  for (let y = step / 2, r = 0; y < h; y += step, r++) {
    for (let x = (r % 2 ? step : step / 2); x < w; x += step * 2) {
      out += `<path transform="translate(${x} ${y}) scale(${size / 24})" d="M0 8H11V0L24 12L11 24V16H0Z"/>`;
    }
  }
  return out + '</g>';
}

const logoNeg = (scale, x, y) => {
  const baseline = 24 - (wmTop + wmBottom) / 2;
  return `<g transform="translate(${x} ${y}) scale(${scale})">${symbolSvg({ d: c.crema, arrow: c.zafferano })}${wmPath(c.crema, 62, baseline)}</g>`;
};

// OG 1200x630
{
  const W = 1200, H = 630;
  const big = `<g transform="translate(700 70) scale(11.5)" opacity="1"><path fill="${c.abeteScuro}" fill-rule="evenodd" d="${symbolD}${symbolArrow}"/><path fill="${c.zafferano}" d="${symbolArrow}"/></g>`;
  const svg = svgDoc(W, H,
    `<rect width="${W}" height="${H}" fill="${c.abete}"/>${arrowPattern(W, H, c.crema, 0.07, 100, 16)}${big}` +
    logoNeg(1.5, 64, 56) +
    lines(serif, ['Il tuo sito in', `${deliveryDays} giorni.`], 64, 268, 104, 108, c.crema) +
    lines(sans, [`${priceText[0].toUpperCase()}${priceText.slice(1)}.`, 'Soddisfatti o rimborsati.'], 64, 478, 36, 50, c.abeteChiaro) +
    `<rect x="64" y="548" width="${hWidth(sans, 'Richiedi il tuo sito', 30) + 60}" height="58" rx="14" fill="${c.zafferano}"/>` +
    `<path fill="${c.abeteScuro}" d="${textPath(sans, 'Richiedi il tuo sito', 94, 587, 30).d}"/>`,
    { title: 'Direzia: il tuo sito in 3 giorni' });
  write('brand/assets/og-1200x630.svg', svg);
  const buf = await png(svg, W, { bg: c.abete, density: 144 });
  write('brand/assets/og-1200x630.png', buf);
  write('public/og.png', buf);
}

// Avatar social 800x800
{
  const svg = svgDoc(80, 80, `<rect width="80" height="80" fill="${c.abete}"/><g transform="translate(14 14) scale(1.0833)">${symbolSvg({ d: c.crema, arrow: c.zafferano })}</g>`);
  write('brand/assets/avatar-800.png', await png(svg, 800, { bg: c.abete }));
}

// Banner LinkedIn 1584x396 e Facebook 1640x624
function banner(W, H, name, { logoScale, headSize }) {
  const pad = Math.round(H * 0.17);
  const svg = svgDoc(W, H,
    `<rect width="${W}" height="${H}" fill="${c.abete}"/>${arrowPattern(W, H, c.crema, 0.07, Math.round(H / 4), Math.round(H / 26))}` +
    logoNeg(logoScale, pad, pad) +
    lines(serif, [`Il tuo sito in ${deliveryDays} giorni.`], pad, H - pad - headSize * 0.9 - 6, headSize, headSize, c.crema) +
    lines(sans, [`${priceText[0].toUpperCase()}${priceText.slice(1)}. Soddisfatti o rimborsati.`], pad, H - pad, Math.round(headSize * 0.36), 0, c.abeteChiaro) +
    `<g transform="translate(${W - H * 0.95} ${-H * 0.12}) scale(${H / 48 * 0.95})" opacity="1"><path fill="${c.abeteScuro}" fill-rule="evenodd" d="${symbolD}${symbolArrow}"/><path fill="${c.zafferano}" d="${symbolArrow}"/></g>`);
  return png(svg, W, { bg: c.abete, density: 144 }).then((b) => write(`brand/assets/${name}`, b));
}
await banner(1584, 396, 'banner-linkedin-1584x396.png', { logoScale: 1.1, headSize: 70 });
await banner(1640, 624, 'banner-facebook-1640x624.png', { logoScale: 1.5, headSize: 96 });

// Intestazione one-pager (A4, 1240x300 a 150 dpi) – usata anche dalla pagina /one-pager
{
  const W = 1240, H = 260;
  const svg = svgDoc(W, H,
    `<rect width="${W}" height="${H}" fill="${c.abete}"/>${arrowPattern(W, H, c.crema, 0.07, 80, 12)}` +
    logoNeg(1.6, 70, 56) +
    lines(serif, [`Il tuo sito in ${deliveryDays} giorni.`], 70, 215, 54, 54, c.crema) +
    `<g transform="translate(${W - 250} -20) scale(6)"><path fill="${c.abeteScuro}" fill-rule="evenodd" d="${symbolD}${symbolArrow}"/><path fill="${c.zafferano}" d="${symbolArrow}"/></g>`);
  write('brand/assets/onepager-header.svg', svg);
  write('brand/assets/onepager-header.png', await png(svg, W, { bg: c.abete, density: 144 }));
}

// Firma email in HTML (tabelle e stili inline, compatibile con i client di posta)
{
  const logoUrl = 'https://[DOMINIO]/brand/direzia-orizzontale.png';
  const html = `<!-- Firma email Direzia. Sostituisci i segnaposto e carica il logo su un URL pubblico. -->
<table cellpadding="0" cellspacing="0" role="presentation" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.45;color:${c.inchiostro};border-collapse:collapse">
  <tr>
    <td style="padding:0 0 10px 0"><img src="${logoUrl}" alt="Direzia" width="150" height="auto" style="display:block;border:0"></td>
  </tr>
  <tr>
    <td style="padding:10px 0 0 0;border-top:3px solid ${c.zafferano}">
      <strong style="font-size:15px">${company.founders[0].name}</strong><br>
      <span style="color:${c.muschio}">${company.founders[0].role}, ${company.brandName}</span>
    </td>
  </tr>
  <tr>
    <td style="padding:8px 0 0 0">
      <a href="tel:${company.phone.tel}" style="color:${c.abete};text-decoration:none;font-weight:bold">${company.phone.display}</a><br>
      <a href="mailto:${company.email}" style="color:${c.abete};text-decoration:none">${company.email}</a>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 0 0 0;color:${c.abete};font-weight:bold">Il tuo sito in ${deliveryDays} giorni. ${priceText[0].toUpperCase()}${priceText.slice(1)}. Soddisfatti o rimborsati.</td>
  </tr>
  <tr>
    <td style="padding:6px 0 0 0;color:${c.muschio};font-size:12px">${company.legalName} · P.IVA ${company.vatId} · ${company.address.street}, ${company.address.zip} ${company.address.city}</td>
  </tr>
</table>
`;
  write('brand/assets/firma-email.html', html);
}

// Copia scaricabile per il team (pagina /brand): logo e asset in public/brand/
{
  fs.rmSync(path.join(root, 'public/brand'), { recursive: true, force: true });
  for (const dir of ['brand/logo', 'brand/assets']) {
    for (const f of fs.readdirSync(path.join(root, dir))) {
      if (!/\.(svg|png)$/.test(f)) continue;
      write(`public/brand/${f}`, fs_read(`${dir}/${f}`));
    }
  }
}

console.log('Asset del brand generati in brand/ e public/.');
