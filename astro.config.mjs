import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { projects } from './src/data/projects.ts';

// URL pubblico del sito: impostalo con SITE_URL (vedi .env.example). Serve a canonical, sitemap e immagine OG.
const site = process.env.SITE_URL || 'https://direzia.pages.dev';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    sitemap({
      // Pagine di servizio e pagine dei progetti dimostrativi (noindex) restano fuori dalla sitemap
      filter: (page) => {
        const path = page.replace(/\/$/, '');
        if (/\/(brand|one-pager|lascia-una-recensione|grazie|404)$/.test(path)) return false;
        const demo = projects.find((p) => path.endsWith(`/progetti/${p.slug}`))?.demo;
        return !demo;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  image: { layout: 'constrained' },
});
