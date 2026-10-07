// Lighthouse mobile sulle pagine chiave del build in dist/ (serve con `astro preview`).
// Uso: npm run build && npm run lighthouse   (CHROME_PATH=/percorso/chrome se Chrome non è nel percorso standard)
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/per-ristoranti', '/privacy', '/termini-garanzia'];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

// Server statico con compressione (come fa Cloudflare Pages), così il peso misurato è quello reale in rete.
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(dist, p);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = fs.existsSync(`${file}.html`) ? `${file}.html` : path.join(dist, '404.html');
  const ext = path.extname(file);
  const buf = fs.readFileSync(file);
  const headers = { 'Content-Type': types[ext] ?? 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' };
  const compressible = /\.(html|css|js|svg|xml|txt)$/.test(ext);
  if (compressible && /br/.test(req.headers['accept-encoding'] ?? '')) {
    res.writeHead(200, { ...headers, 'Content-Encoding': 'br' });
    res.end(zlib.brotliCompressSync(buf));
  } else {
    res.writeHead(200, headers);
    res.end(buf);
  }
});
await new Promise((r) => server.listen(4399, r));

const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'], chromePath: process.env.CHROME_PATH });
let failed = false;
for (const p of paths) {
  const { lhr } = await lighthouse(`http://localhost:4399${p}`, { port: chrome.port, output: 'json', logLevel: 'error' }, undefined);
  const s = Object.fromEntries(['performance', 'accessibility', 'best-practices', 'seo'].map((k) => [k, Math.round(lhr.categories[k].score * 100)]));
  const a = lhr.audits;
  const bytes = a['total-byte-weight'].numericValue;
  const imgBytes = lhr.audits['network-requests'].details.items.filter((i) => i.resourceType === 'Image').reduce((n, i) => n + (i.transferSize || 0), 0);
  console.log(`${p}\n  Performance ${s.performance} · Accessibilità ${s.accessibility} · Best Practices ${s['best-practices']} · SEO ${s.seo}`);
  console.log(`  LCP ${(a['largest-contentful-paint'].numericValue / 1000).toFixed(2)} s · CLS ${a['cumulative-layout-shift'].numericValue.toFixed(3)} · TBT ${Math.round(a['total-blocking-time'].numericValue)} ms · peso ${(bytes / 1024).toFixed(0)} KB (di cui immagini ${(imgBytes / 1024).toFixed(0)} KB)`);
  if (Object.values(s).some((v) => v < 95)) failed = true;
}
await chrome.kill();
server.close();
if (failed) { console.error('\nAlmeno un punteggio è sotto 95.'); process.exit(1); }
