/**
 * Illustrazioni dei siti d'esempio: forme geometriche semplici in SVG, nessuna immagine esterna, nessun marchio.
 * Le classi (fp, fa, fs, fi, fw = riempimenti; sp, sa, si, sw = tratti) prendono i colori del cliente fittizio
 * dalle variabili CSS impostate da DemoSite.
 */
const stripes = (() => {
  let out = '';
  for (let i = 0; i < 8; i++) {
    const cls = i % 2 ? 'fw' : 'fp';
    out += `<rect x="${32 + 17 * i}" y="46" width="17" height="26" class="${cls}"/><circle cx="${40.5 + 17 * i}" cy="72" r="8.5" class="${cls}"/>`;
  }
  return out;
})();

const disc = '<circle cx="100" cy="84" r="68" class="fs"/>';

export const art: Record<string, string> = {
  osteria:
    disc +
    '<path d="M100 6v24" class="si" stroke-width="3"/><path d="M70 56a30 26 0 0 1 60 0z" class="fa"/>' +
    '<ellipse cx="100" cy="110" rx="40" ry="10" class="fw"/><ellipse cx="100" cy="108" rx="26" ry="6" class="fs"/>' +
    '<circle cx="92" cy="105" r="5" class="fp"/><circle cx="107" cy="107" r="4" class="fa"/>' +
    '<rect x="34" y="120" width="132" height="10" rx="5" class="fp"/><rect x="50" y="130" width="9" height="26" rx="3" class="fi"/><rect x="141" y="130" width="9" height="26" rx="3" class="fi"/>' +
    '<path d="M54 84v22M48 84v9a6 6 0 0 0 12 0v-9" class="si" stroke-width="3"/><path d="M148 84c10 6 10 20 0 28z" class="fi"/>',
  studio:
    disc +
    '<path d="M44 62L100 30l56 32z" class="fp"/><rect x="46" y="62" width="108" height="8" class="fi"/>' +
    '<rect x="56" y="74" width="12" height="52" class="fw"/><rect x="82" y="74" width="12" height="52" class="fw"/><rect x="108" y="74" width="12" height="52" class="fw"/><rect x="134" y="74" width="12" height="52" class="fw"/>' +
    '<rect x="44" y="126" width="112" height="10" class="fi"/><rect x="38" y="136" width="124" height="8" class="fp"/><circle cx="100" cy="52" r="5" class="fa"/>',
  idraulico:
    disc +
    '<path d="M40 116h46a16 16 0 0 0 16-16V58" class="sp" stroke-width="16"/><rect x="28" y="106" width="14" height="20" rx="3" class="fi"/><rect x="92" y="42" width="20" height="12" rx="3" class="fi"/>' +
    '<path d="M138 56c9 13 17 20 17 31a17 17 0 0 1-34 0c0-11 8-18 17-31z" class="fa"/>' +
    '<g transform="rotate(32 150 120)"><rect x="146" y="102" width="9" height="46" rx="4.5" class="fi"/><circle cx="150.5" cy="98" r="12" class="fi"/><rect x="146" y="82" width="9" height="14" class="fs"/></g>',
  estetista:
    disc +
    '<ellipse cx="100" cy="64" rx="30" ry="36" class="fp"/><ellipse cx="100" cy="64" rx="23" ry="29" class="fw"/><rect x="95" y="98" width="10" height="40" rx="5" class="fp"/>' +
    '<path d="M38 132c20-4 32-18 32-40-20 4-32 18-32 40z" class="fa"/><path d="M162 132c-20-4-32-18-32-40 20 4 32 18 32 40z" class="fa"/><path d="M142 34l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" class="fa"/>',
  palestra:
    disc +
    '<g transform="rotate(-20 100 84)"><rect x="52" y="78" width="96" height="12" rx="6" class="fi"/><rect x="42" y="58" width="16" height="52" rx="5" class="fp"/><rect x="30" y="66" width="12" height="36" rx="4" class="fa"/><rect x="142" y="58" width="16" height="52" rx="5" class="fp"/><rect x="158" y="66" width="12" height="36" rx="4" class="fa"/></g>' +
    '<ellipse cx="100" cy="140" rx="46" ry="6" class="fi" opacity=".14"/>',
  bnb:
    disc +
    '<path d="M24 134c20-30 46-42 76-42s56 12 76 42z" class="fp" opacity=".3"/>' +
    '<rect x="56" y="72" width="88" height="58" class="fw"/><path d="M46 74L100 36l54 38z" class="fp"/>' +
    '<rect x="66" y="86" width="22" height="22" class="fa"/><rect x="112" y="86" width="22" height="22" class="fa"/><rect x="90" y="104" width="20" height="26" class="fi"/><circle cx="152" cy="38" r="10" class="fa"/>',
  immobiliare:
    disc +
    '<path d="M42 86L100 34l58 52z" class="fp"/><rect x="56" y="86" width="88" height="48" class="fw"/><rect x="88" y="102" width="24" height="32" class="fi"/>' +
    '<rect x="64" y="96" width="16" height="16" class="fa"/><rect x="120" y="96" width="16" height="16" class="fa"/>' +
    '<circle cx="152" cy="132" r="10" class="sa" stroke-width="5"/><path d="M162 132h20M174 132v10" class="sa" stroke-width="5"/>',
  negozio:
    disc +
    '<rect x="40" y="72" width="120" height="62" class="fw"/>' +
    stripes +
    '<rect x="50" y="84" width="54" height="38" rx="2" class="fs"/><rect x="116" y="84" width="30" height="50" class="fi"/><circle cx="140" cy="110" r="2.5" class="fa"/><rect x="34" y="134" width="132" height="6" rx="3" class="fp"/>',
};
