// Bewerbung für das Netzwerk → E-Mail ins eigene Postfach, ohne Drittdienst.
//
// Pro Bewerbung gehen über das Postfach (SMTP, united-domains) zwei Mails raus:
//   1. Benachrichtigung an MAIL_TO mit allen Angaben — „Antworten" schreibt
//      direkt an die Bewerberin / den Bewerber
//   2. Eingangsbestätigung an die Bewerberin / den Bewerber in ihrer Sprache
// Das Postfach ist damit die einzige Ablage: Kommt die Benachrichtigung nicht
// durch, bekommt die Seite einen Fehler und zeigt ihn an, statt „angekommen".
//
// Env (Cloudflare Pages → Settings → Variables, „Production"):
//   SMTP_PASS   Pflicht, als Secret — Kennwort des Postfachs
//   SMTP_USER   optional, Default hello@mas.art (oder Postfachname)
//   SMTP_HOST   optional, Default smtps.udag.de
//   SMTP_PORT   optional, Default 465 (SSL/TLS)
//   MAIL_TO     optional, Default hello@mas.art — Empfänger der Bewerbungen
//   MAIL_FROM   optional, Default hello@mas.art — Absenderadresse

import { buildMessage, sendViaSmtp } from './smtp.js';

const MAILBOX = 'hello@mas.art';
const FROM_NAME = 'postyour.art';
const LANGS = ['de', 'en', 'fr', 'es', 'it', 'pt', 'ru'];
// Zusätzlich zur Grundform keine Zeichen, die Adressen in SMTP-Befehlen oder
// Kopfzeilen aufbrechen könnten.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Link zu den Arbeiten: http(s)-Adressen, Domains und Instagram-Handles werden
// klickbar, alles andere bleibt reiner Text (kein javascript: o.ä.).
function portfolioLink(raw) {
  if (/^https?:\/\/\S+$/i.test(raw)) return raw;
  const handle = raw.match(/^@([A-Za-z0-9._]{1,30})$/);
  if (handle) return `https://www.instagram.com/${handle[1]}/`;
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(raw)) return `https://${raw}`;
  return null;
}

function notifyMail(entry) {
  const time = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  const link = entry.portfolio ? portfolioLink(entry.portfolio) : null;
  const rows = [
    ['Name', entry.name || '—'],
    ['E-Mail', entry.email],
    ['Arbeiten', entry.portfolio || '—'],
    ['Sprache', entry.lang.toUpperCase()],
    ['Eingang', time],
  ];
  const text = [
    'Neue Bewerbung über postyour.art',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    ...(link && link !== entry.portfolio ? [`Link: ${link}`] : []),
    '',
    'Nachricht:',
    entry.message || '—',
    '',
    `Auf diese Mail antworten = direkt an ${entry.email} schreiben.`,
  ].join('\n');
  const cell = (k, v) => `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0">${v}</td></tr>`;
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">Neue Bewerbung über postyour.art</h2>
      <table style="border-collapse:collapse">
        ${cell('Name', esc(entry.name || '—'))}
        ${cell('E-Mail', `<a href="mailto:${esc(entry.email)}">${esc(entry.email)}</a>`)}
        ${cell('Arbeiten', entry.portfolio ? (link ? `<a href="${esc(link)}">${esc(entry.portfolio)}</a>` : esc(entry.portfolio)) : '—')}
        ${cell('Sprache', entry.lang.toUpperCase())}
        ${cell('Eingang', esc(time))}
      </table>
      <p style="margin:16px 0 4px;color:#666">Nachricht</p>
      <div style="white-space:pre-wrap;border-left:3px solid #ff5a2e;padding:4px 0 4px 12px">${entry.message ? esc(entry.message) : '—'}</div>
      <p style="margin-top:20px;color:#666">Auf diese Mail antworten = direkt an ${esc(entry.email)} schreiben.</p>
    </div>`;
  return { subject: `Neue Bewerbung: ${entry.name || entry.email}`, text, html };
}

const CONFIRM = {
  de: { subject: 'Deine Bewerbung bei postyour.art', hi: (n) => (n ? `Hallo ${n},` : 'Hallo,'), body: ['danke für deine Bewerbung — sie ist bei uns angekommen.', 'Wir schauen uns deine Arbeiten in Ruhe an und melden uns persönlich bei dir.', 'Wenn du in der Zwischenzeit Fragen hast, antworte einfach auf diese Mail.'], bye: 'Herzliche Grüße aus Worpswede' },
  en: { subject: 'Your application to postyour.art', hi: (n) => (n ? `Hello ${n},` : 'Hello,'), body: ['thank you for your application — it has reached us.', 'We will take a calm look at your work and get back to you personally.', 'If you have any questions in the meantime, simply reply to this email.'], bye: 'Warm regards from Worpswede' },
  fr: { subject: 'Ta candidature chez postyour.art', hi: (n) => (n ? `Bonjour ${n},` : 'Bonjour,'), body: ['merci pour ta candidature — elle nous est bien parvenue.', 'Nous allons regarder ton travail avec attention et te répondre personnellement.', "Si tu as des questions d'ici là, réponds simplement à cet e-mail."], bye: 'Bien chaleureusement, depuis Worpswede' },
  es: { subject: 'Tu solicitud en postyour.art', hi: (n) => (n ? `Hola ${n}:` : 'Hola:'), body: ['gracias por tu solicitud — nos ha llegado.', 'Miraremos tu trabajo con calma y te responderemos personalmente.', 'Si mientras tanto tienes preguntas, simplemente responde a este correo.'], bye: 'Un cordial saludo desde Worpswede' },
  it: { subject: 'La tua candidatura a postyour.art', hi: (n) => (n ? `Ciao ${n},` : 'Ciao,'), body: ['grazie per la tua candidatura — è arrivata.', 'Guarderemo il tuo lavoro con calma e ti risponderemo personalmente.', 'Se nel frattempo hai domande, rispondi semplicemente a questa e-mail.'], bye: 'Un caro saluto da Worpswede' },
  pt: { subject: 'A tua candidatura à postyour.art', hi: (n) => (n ? `Olá ${n},` : 'Olá,'), body: ['obrigado pela tua candidatura — chegou até nós.', 'Vamos ver o teu trabalho com calma e responder-te pessoalmente.', 'Se entretanto tiveres perguntas, responde simplesmente a este e-mail.'], bye: 'Um abraço de Worpswede' },
  ru: { subject: 'Твоя заявка в postyour.art', hi: (n) => (n ? `Здравствуй, ${n}!` : 'Здравствуй!'), body: ['спасибо за заявку — мы её получили.', 'Мы спокойно посмотрим твои работы и ответим тебе лично.', 'Если до тех пор появятся вопросы, просто ответь на это письмо.'], bye: 'Сердечный привет из Ворпсведе' },
};

function confirmMail(entry) {
  const c = CONFIRM[entry.lang] || CONFIRM.en;
  const text = [c.hi(entry.name), '', ...c.body.flatMap((p) => [p, '']), c.bye, 'Markus Lippeck · postyour.art', 'https://www.postyour.art/'].join('\n');
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
      <p>${esc(c.hi(entry.name))}</p>
      ${c.body.map((p) => `<p>${esc(p)}</p>`).join('')}
      <p>${esc(c.bye)}<br>Markus Lippeck · <a href="https://www.postyour.art/" style="color:#ff5a2e">postyour.art</a></p>
    </div>`;
  return { subject: c.subject, text, html };
}

export async function handleApply(payload, env, connect) {
  const { email, name, source, website, beta_hp: hp, portfolio, message, lang } = payload || {};

  // Honeypot: echte Nutzer füllen das unsichtbare Feld nie aus. Es heißt
  // bewusst NICHT "website" o.ä. — solche Namen befüllt Browser-Autofill.
  // ("website" bleibt als Alt-Feldname aus der ersten Version berücksichtigt.)
  if (hp || website) {
    console.log('[apply] Honeypot ausgelöst — verworfen:', String(email || '').slice(0, 60));
    return { status: 200, body: { ok: true } };
  }

  if (!email || !EMAIL_RE.test(String(email).trim())) {
    return { status: 400, body: { ok: false, error: 'invalid_email' } };
  }

  const entry = {
    email: String(email).trim().toLowerCase(),
    name: String(name || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 100),
    portfolio: String(portfolio || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 300),
    message: String(message || '').trim().slice(0, 2000),
    lang: LANGS.includes(lang) ? lang : 'en',
    source: String(source || 'postyour.art-bewerbung').slice(0, 50),
  };

  if (!env.SMTP_PASS) {
    console.error('[apply] SMTP_PASS fehlt! Bewerbung abgewiesen:', entry.email);
    return { status: 500, body: { ok: false, error: 'not_configured' } };
  }

  const mailbox = env.MAIL_TO || MAILBOX;
  const from = { email: env.MAIL_FROM || MAILBOX, name: FROM_NAME };
  const domain = from.email.split('@')[1];
  const applicant = { email: entry.email, name: entry.name };

  const notify = notifyMail(entry);
  const confirm = confirmMail(entry);
  const messages = [
    { to: { email: mailbox }, raw: buildMessage({ from, to: { email: mailbox }, replyTo: applicant, domain, ...notify }) },
    { to: applicant, raw: buildMessage({ from, to: applicant, replyTo: { email: mailbox }, domain, ...confirm }) },
  ];

  let results;
  try {
    results = await sendViaSmtp({
      connect,
      host: env.SMTP_HOST || 'smtps.udag.de',
      port: Number(env.SMTP_PORT) || 465,
      user: env.SMTP_USER || MAILBOX,
      pass: env.SMTP_PASS,
      envelopeFrom: from.email,
      messages,
    });
  } catch (err) {
    console.error('[apply] Versand fehlgeschlagen:', err.message);
    return { status: 500, body: { ok: false, error: 'server_error' } };
  }

  if (!results[0]) {
    return { status: 500, body: { ok: false, error: 'server_error' } };
  }
  if (!results[1]) console.error('[apply] Bestätigung an Bewerber fehlgeschlagen:', entry.email);
  console.log('[apply] Neue Bewerbung:', entry.email, '| via', entry.source);
  return { status: 200, body: { ok: true } };
}
