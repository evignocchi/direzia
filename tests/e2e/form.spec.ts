import { test, expect } from '@playwright/test';

test.describe('Modulo di contatto', () => {
  test('mostra errori chiari e porta il focus sul primo campo sbagliato', async ({ page }) => {
    await page.goto('/#contatti');
    await page.getByRole('button', { name: 'Invia la richiesta' }).click();
    await expect(page.locator('#cf-name-err')).toHaveText('Questo campo è obbligatorio.');
    await expect(page.locator('#cf-privacy-err')).toContainText('informativa');
    await expect(page.locator('#cf-name')).toBeFocused();
    await expect(page.locator('#cf-name')).toHaveAttribute('aria-invalid', 'true');

    await page.fill('#cf-name', 'Giorgio');
    await page.fill('#cf-business', 'Osteria');
    await page.fill('#cf-contact', 'non valido');
    await page.getByRole('button', { name: 'Invia la richiesta' }).click();
    await expect(page.locator('#cf-contact-err')).toContainText('telefono o un\'email');
    await expect(page.locator('#cf-contact')).toBeFocused();
  });

  test('invia i dati con fonte, pagina e UTM e mostra la conferma', async ({ page }) => {
    let payload: Record<string, string> | undefined;
    await page.route('**/api/contact', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto('/?r=marco&utm_source=whatsapp&utm_medium=venditore&utm_campaign=autunno');
    await page.fill('#cf-name', 'Giorgio Bianchi');
    await page.fill('#cf-business', 'Osteria del Test');
    await page.fill('#cf-contact', '333 123 4567');
    await page.fill('#cf-message', 'Vorrei un sito');
    await page.check('#cf-privacy');
    await page.getByRole('button', { name: 'Invia la richiesta' }).click();
    await expect(page.locator('#cf-status')).toContainText('Grazie!');
    await expect(page.locator('#cf-status')).toBeFocused();
    expect(payload).toMatchObject({
      name: 'Giorgio Bianchi',
      business: 'Osteria del Test',
      contact: '333 123 4567',
      source: 'venditore',
      utm_source: 'whatsapp',
      utm_medium: 'venditore',
      utm_campaign: 'autunno',
      page: '/',
      website: '',
    });
    expect(JSON.stringify(payload).toLowerCase()).not.toContain('marco');
  });

  test('senza ?r= la fonte è "inbound"', async ({ page }) => {
    let payload: Record<string, string> | undefined;
    await page.route('**/api/contact', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto('/per-ristoranti');
    await page.fill('#cf-name', 'Anna');
    await page.fill('#cf-business', 'Bar');
    await page.fill('#cf-contact', 'anna@example.it');
    await page.check('#cf-privacy');
    await page.getByRole('button', { name: 'Invia la richiesta' }).click();
    await expect(page.locator('#cf-status')).toContainText('Grazie!');
    expect(payload).toMatchObject({ source: 'inbound', sector: 'ristoranti', page: '/per-ristoranti' });
  });

  test('se il server risponde con un errore avvisa e permette di riprovare', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({ status: 502, json: { ok: false } }));
    await page.goto('/#contatti');
    await page.fill('#cf-name', 'Anna');
    await page.fill('#cf-business', 'Bar');
    await page.fill('#cf-contact', 'anna@example.it');
    await page.check('#cf-privacy');
    const submit = page.getByRole('button', { name: 'Invia la richiesta' });
    await submit.click();
    await expect(page.locator('#cf-status')).toContainText('Qualcosa non ha funzionato');
    await expect(submit).toBeEnabled();
  });
});
