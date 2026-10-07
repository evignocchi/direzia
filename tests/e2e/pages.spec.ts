import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/per-ristoranti', '/per-professionisti', '/per-artigiani', '/per-benessere', '/progetti/osteria-del-fico-storto', '/privacy', '/cookie', '/termini-garanzia', '/one-pager', '/lascia-una-recensione', '/brand', '/404'];

test.describe('Pagine', () => {
  for (const path of pages) {
    test(`${path} si apre, ha titolo e un solo h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect([200, 404]).toContain(res!.status());
      await expect(page).toHaveTitle(/.{10,}/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    });
  }

  test('le pagine di servizio sono noindex, la home no', async ({ page }) => {
    for (const p of ['/brand', '/one-pager', '/lascia-una-recensione', '/404']) {
      await page.goto(p);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    }
    await page.goto('/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\/[^/]+\/$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
  });

  test('ogni pagina per settore ha contenuti e messaggio WhatsApp propri', async ({ page }) => {
    await page.goto('/per-ristoranti');
    await expect(page.locator('h1')).toContainText('locale');
    const wa = decodeURIComponent((await page.locator('[data-cta="whatsapp-sector"]').getAttribute('href')) ?? '');
    expect(wa).toContain('ristorante');
    await page.goto('/per-artigiani');
    const wa2 = decodeURIComponent((await page.locator('[data-cta="whatsapp-sector"]').getAttribute('href')) ?? '');
    expect(wa2).toContain('artigiano');
  });

  test('la pagina di un progetto racconta situazione, lavoro e risultato', async ({ page }) => {
    await page.goto('/progetti/osteria-del-fico-storto');
    await expect(page.getByRole('heading', { name: 'La situazione' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cosa abbiamo fatto' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Il risultato' })).toBeVisible();
    await expect(page.locator('[data-demo-badge]').first()).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  test('il one-pager in stampa nasconde i comandi', async ({ page }) => {
    await page.goto('/one-pager');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#print-btn')).toBeHidden();
    await expect(page.locator('.sheet')).toBeVisible();
  });

  test('i link interni non sono rotti', async ({ page, request }) => {
    await page.goto('/');
    const hrefs = await page.locator('a[href]').evaluateAll((as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!))]);
    const internal = hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//')).map((h) => h.split('#')[0] || '/');
    for (const href of new Set(internal)) {
      const res = await request.get(href);
      expect(res.status(), `link ${href}`).toBe(200);
    }
  });
});

test.describe('Accessibilità (axe)', () => {
  for (const path of ['/', '/per-ristoranti', '/progetti/osteria-del-fico-storto', '/privacy', '/termini-garanzia', '/one-pager']) {
    test(`${path}: nessuna violazione seria`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
    });
  }
});
