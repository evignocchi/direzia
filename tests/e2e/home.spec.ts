import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('mostra promessa, prezzo e garanzia da un\'unica fonte', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Il tuo sito in 3 giorni/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Il tuo sito in 3 giorni/);
    const hero = page.locator('#hero-title').locator('xpath=ancestor::section');
    await expect(hero).toContainText('500 €');
    await expect(hero).toContainText('rimborsiamo');
    // Tabellone: tre giorni e tre fatti
    const rows = hero.getByRole('listitem');
    await expect(rows).toHaveCount(4);
    await expect(hero.getByLabel(/Come funziona/)).toContainText('Chiamata e materiale');
    await expect(hero.getByLabel(/Come funziona/)).toContainText('Max 500 €');
    await expect(hero.getByLabel(/Come funziona/)).toContainText('14 giorni');
    await expect(hero.getByLabel(/Come funziona/)).toContainText('Dopo la bozza');
  });

  test('il tabellone mostra la data vera di arrivo', async ({ page }) => {
    await page.goto('/');
    const arrive = page.locator('[data-day-offset="2"]');
    await expect(arrive).toHaveText(/^(lun|mar|mer|gio|ven|sab|dom) \d{1,2} [a-z]{3}$/);
  });

  test('il pulsante principale porta al modulo di contatto', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-cta="request-hero"]').click();
    await expect(page).toHaveURL(/#contatti$/);
    await expect(page.locator('#cf-name')).toBeVisible();
  });

  test('?r=nome personalizza il saluto senza eseguire codice e senza salvarlo', async ({ page }) => {
    await page.goto('/?r=marco');
    await expect(page.locator('#saluto')).toHaveText('Ciao Marco, ecco cosa possiamo fare per te.');
    const stored = await page.evaluate(() => JSON.stringify({ ...sessionStorage }) + JSON.stringify({ ...localStorage }) + document.cookie);
    expect(stored.toLowerCase()).not.toContain('marco');

    await page.goto('/?r=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');
    await expect(page.locator('#saluto img')).toHaveCount(0);
    await page.goto('/');
    await expect(page.locator('#saluto')).toBeHidden();
  });

  test('i link WhatsApp e telefono sono corretti', async ({ page }) => {
    await page.goto('/');
    const wa = await page.locator('[data-cta="whatsapp-hero"]').getAttribute('href');
    expect(wa).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(wa!)).toContain('sito in 3 giorni');
    const tel = await page.locator('[data-cta="phone-contact"]').getAttribute('href');
    expect(tel).toMatch(/^tel:\+?\d+/);
  });

  test('quattro progetti in vista, gli altri su richiesta', async ({ page }) => {
    await page.goto('/#progetti');
    const cards = page.locator('#progetti [data-project-card]');
    await expect(cards).toHaveCount(8);
    await expect(page.locator('#progetti details[open] [data-project-card]')).toHaveCount(0);
    await page.getByText('Mostra altri progetti').click();
    await expect(page.locator('#progetti details[open] [data-project-card]')).toHaveCount(4);
  });

  test('le FAQ si aprono da tastiera', async ({ page }) => {
    await page.goto('/');
    const first = page.locator('#domande summary').first();
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#domande details').first()).toHaveAttribute('open', '');
  });

  test('i contenuti demo sono etichettati e non entrano nei dati strutturati', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('[data-demo-badge]').count()).toBeGreaterThan(10);
    await expect(page.locator('footer [data-demo-note]')).toBeVisible();
    const jsonld = await page.locator('script[type="application/ld+json"]').innerText();
    expect(jsonld).toContain('FAQPage');
    expect(jsonld).toContain('"@type":"Service"');
    expect(jsonld).not.toContain('AggregateRating');
    expect(jsonld).not.toContain('"@type":"Review"');
  });

  test('nessun testo segnaposto tipo lorem ipsum', async ({ page }) => {
    await page.goto('/');
    const text = (await page.locator('body').innerText()).toLowerCase();
    expect(text).not.toContain('lorem');
    expect(text).not.toContain('ipsum');
  });
});

test.describe('Mobile', () => {
  test.beforeEach(({ page: _page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'solo mobile');
  });

  test('la barra fissa ha Chiama, WhatsApp e Richiedi', async ({ page }) => {
    await page.goto('/');
    const bar = page.getByRole('navigation', { name: 'Contattaci subito' });
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: 'Chiama' })).toHaveAttribute('href', /^tel:/);
    await expect(bar.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', /wa\.me/);
    await bar.getByRole('link', { name: 'Richiedi' }).click();
    await expect(page).toHaveURL(/#contatti$/);
  });

  test('il menu si apre, si chiude e naviga', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('#menu-button');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const menu = page.locator('#menu');
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: 'Prezzi' }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#prezzi$/);
    await button.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });

  test('nessuno scroll orizzontale a 375 px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('Desktop', () => {
  test('la barra mobile non compare e l\'header ha CTA e telefono', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'solo desktop');
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Contattaci subito' })).toBeHidden();
    await expect(page.locator('[data-cta="request-header"]')).toBeVisible();
    await expect(page.locator('[data-cta="phone-header"]')).toBeVisible();
  });
});
