/**
 * Cloudflare Pages Function: riceve il modulo di contatto e lo inoltra via email (Resend) o webhook.
 * Variabili d'ambiente (vedi .env.example): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL,
 * CONTACT_WEBHOOK_URL, TURNSTILE_SECRET_KEY (facoltativa).
 * Difese: campo honeypot, controllo dell'origine, lunghezze massime, Turnstile se configurato.
 */
interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_WEBHOOK_URL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

const MAX = { name: 80, business: 100, contact: 120, message: 1000, short: 120 };
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.split('').filter((ch) => { const c = ch.charCodeAt(0); return c > 31 || c === 9 || c === 10 || c === 13; }).join('').trim().slice(0, max) : '');
const validContact = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || (/^[\d\s+().-]+$/.test(v) && v.replace(/\D/g, '').length >= 6);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) return (await request.json()) as Record<string, unknown>;
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json') || (request.headers.get('content-type') ?? '').includes('json');
  const fail = (message: string, status = 400) => (wantsJson ? json({ ok: false, error: message }, status) : new Response(message, { status }));

  // Solo richieste che arrivano dal nostro sito
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return fail('Origine non consentita.', 403);

  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request);
  } catch {
    return fail('Richiesta non valida.');
  }

  // Honeypot: se è compilato è un programma. Rispondiamo "ok" senza inoltrare nulla.
  if (clean(raw.website, 50)) return wantsJson ? json({ ok: true }) : Response.redirect(new URL('/grazie', request.url).href, 303);

  const data = {
    name: clean(raw.name, MAX.name),
    business: clean(raw.business, MAX.business),
    contact: clean(raw.contact, MAX.contact),
    message: clean(raw.message, MAX.message),
    source: clean(raw.source, 20) || 'inbound',
    page: clean(raw.page, MAX.short),
    sector: clean(raw.sector, MAX.short),
    utm_source: clean(raw.utm_source, MAX.short),
    utm_medium: clean(raw.utm_medium, MAX.short),
    utm_campaign: clean(raw.utm_campaign, MAX.short),
    utm_content: clean(raw.utm_content, MAX.short),
    utm_term: clean(raw.utm_term, MAX.short),
  };
  if (!data.name || !data.business || !validContact(data.contact)) return fail('Compila nome, attività e un contatto valido.');
  if (!raw.privacy) return fail('Serve il consenso all\'informativa privacy.');

  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(raw['cf-turnstile-response'], 2048);
    const body = new FormData();
    body.append('secret', env.TURNSTILE_SECRET_KEY);
    body.append('response', token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) body.append('remoteip', ip);
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const result = (await check.json()) as { success?: boolean };
    if (!result.success) return fail('Verifica anti-spam non superata. Riprova.');
  }

  const subject = `Nuova richiesta dal sito (${data.source === 'venditore' ? 'venditore' : 'inbound'}): ${data.business}`;
  const lines: [string, string][] = [
    ['Nome', data.name],
    ['Attività', data.business],
    ['Contatto', data.contact],
    ['Messaggio', data.message || '(nessuno)'],
    ['Fonte', data.source],
    ['Pagina', data.page],
    ['Settore', data.sector],
    ['UTM source', data.utm_source],
    ['UTM medium', data.utm_medium],
    ['UTM campaign', data.utm_campaign],
    ['UTM content', data.utm_content],
    ['UTM term', data.utm_term],
  ];
  const text = lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:15px">${lines
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;

  let delivered = false;
  try {
    if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: env.CONTACT_TO_EMAIL.split(',').map((s) => s.trim()),
          subject,
          text,
          html,
          ...(data.contact.includes('@') ? { reply_to: data.contact } : {}),
        }),
      });
      delivered = res.ok;
    }
    if (env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, text, ...data, receivedAt: new Date().toISOString() }),
      });
      delivered = delivered || res.ok;
    }
  } catch {
    delivered = false;
  }

  if (!delivered) {
    console.error('Contact form: nessun canale di inoltro configurato o invio non riuscito.');
    return fail('Invio non riuscito. Riprova o contattaci direttamente.', 502);
  }
  return wantsJson ? json({ ok: true }) : Response.redirect(new URL('/grazie', request.url).href, 303);
};

export const onRequest: PagesFunction<Env> = async () =>
  new Response('Metodo non consentito.', { status: 405, headers: { Allow: 'POST' } });
