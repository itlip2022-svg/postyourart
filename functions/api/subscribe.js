// Cloudflare Pages Function: POST /api/subscribe — Bewerbung für das Netzwerk
//
// Pro Bewerbung:
//   1. Kontakt in Brevo anlegen/aktualisieren, Liste „Bewerbungen postyour.art"
//      (wird bei Bedarf angelegt)
//   2. Benachrichtigung an NOTIFY_EMAIL mit allen Angaben (Antworten gehen
//      direkt an den Bewerber)
//   3. Eingangsbestätigung an den Bewerber in seiner Sprache
// Die Bewerbung gilt als angekommen, sobald Schritt 1 ODER 2 klappt — so geht
// keine verloren, wenn z.B. die Liste fehlt oder ein Attribut abgelehnt wird.
//
// Env (Cloudflare Pages → Settings → Variables, „Production"):
//   BREVO_API_KEY       Pflicht
//   BREVO_SENDER_EMAIL  optional — sonst wird ein aktiver, in Brevo
//                       verifizierter Absender automatisch gewählt
//   BREVO_SENDER_NAME   optional, Default „Markus von postyour.art"
//   BREVO_LIST_ID       optional — feste Listen-ID statt Suche per Name
//   NOTIFY_EMAIL        optional, Default markus@lippeck.de

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIST_NAME = "Bewerbungen postyour.art";
const NOTIFY_DEFAULT = "markus@lippeck.de";
const SENDER_NAME_DEFAULT = "Markus von postyour.art";
const LANGS = ["de", "en", "fr", "es", "it", "pt", "ru"];
const BREVO = "https://api.brevo.com/v3";

// Pro Instanz gemerkt, damit nicht jede Bewerbung erneut nachschlägt.
let cachedListId = null;
let cachedSender = null;

function brevo(env, path, init = {}) {
  return fetch(`${BREVO}${path}`, {
    ...init,
    headers: { "api-key": env.BREVO_API_KEY, "content-type": "application/json", accept: "application/json", ...(init.headers || {}) },
  });
}

async function resolveListId(env) {
  const configured = parseInt(env.BREVO_LIST_ID, 10);
  if (!isNaN(configured)) return configured;
  if (cachedListId) return cachedListId;

  const res = await brevo(env, "/contacts/lists?limit=50");
  if (res.ok) {
    const hit = ((await res.json()).lists || []).find((l) => l.name === LIST_NAME);
    if (hit) return (cachedListId = hit.id);
  }

  // Liste fehlt: im ersten vorhandenen Ordner anlegen.
  const folders = await brevo(env, "/contacts/folders?limit=1");
  const folderId = folders.ok ? ((await folders.json()).folders || [])[0]?.id : null;
  if (!folderId) return null;
  const created = await brevo(env, "/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: LIST_NAME, folderId }),
  });
  if (!created.ok) return null;
  return (cachedListId = (await created.json()).id);
}

// Absender muss in Brevo verifiziert sein. Ohne feste Vorgabe nehmen wir einen
// aktiven Absender aus dem Konto, bevorzugt von den eigenen Domains.
async function resolveSender(env) {
  if (env.BREVO_SENDER_EMAIL) {
    return { email: env.BREVO_SENDER_EMAIL, name: env.BREVO_SENDER_NAME || SENDER_NAME_DEFAULT };
  }
  if (cachedSender) return cachedSender;
  const res = await brevo(env, "/senders");
  if (!res.ok) return null;
  const active = ((await res.json()).senders || []).filter((s) => s.active !== false);
  const preferred = ["lippeck.de", "mas.art", "postyour.art", "findyour.art"];
  const pick = preferred.map((d) => active.find((s) => s.email.toLowerCase().endsWith(`@${d}`))).find(Boolean) || active[0];
  if (!pick) return null;
  return (cachedSender = { email: pick.email, name: env.BREVO_SENDER_NAME || SENDER_NAME_DEFAULT });
}

async function saveContact(entry, env) {
  const body = {
    email: entry.email,
    updateEnabled: true,
    attributes: { VORNAME: entry.name, QUELLE: entry.source },
  };
  const listId = await resolveListId(env);
  if (listId) body.listIds = [listId];
  else console.error("[apply] Liste nicht gefunden/anlegbar — Kontakt ohne Listen-Zuordnung.");

  const res = await brevo(env, "/contacts", { method: "POST", body: JSON.stringify(body) });
  // 201 = neu angelegt, 204 = aktualisiert
  if (!res.ok && res.status !== 204) {
    throw new Error(`Kontakt: Brevo ${res.status} ${await res.text()}`);
  }
}

async function sendMail(env, { to, subject, html, replyTo }) {
  const sender = await resolveSender(env);
  if (!sender) throw new Error("Kein verifizierter Absender in Brevo gefunden");
  const res = await brevo(env, "/smtp/email", {
    method: "POST",
    body: JSON.stringify({ sender, to: [to], subject, htmlContent: html, ...(replyTo ? { replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Mail: Brevo ${res.status} ${await res.text()}`);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Link zu den Arbeiten: http(s)-Adressen und Instagram-Handles werden
// klickbar, alles andere bleibt reiner Text (kein javascript: o.ä.).
function portfolioHtml(raw) {
  if (/^https?:\/\/\S+$/i.test(raw)) return `<a href="${esc(raw)}">${esc(raw)}</a>`;
  const handle = raw.match(/^@([A-Za-z0-9._]{1,30})$/);
  if (handle) return `<a href="https://www.instagram.com/${handle[1]}/">${esc(raw)}</a> (Instagram)`;
  if (/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(raw)) return `<a href="https://${esc(raw)}">${esc(raw)}</a>`;
  return esc(raw);
}

function notifyHtml(entry) {
  const row = (label, value) => `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${label}</td><td style="padding:6px 0">${value}</td></tr>`;
  const time = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  return `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">Neue Bewerbung über postyour.art</h2>
      <table style="border-collapse:collapse">
        ${row("Name", esc(entry.name || "—"))}
        ${row("E-Mail", `<a href="mailto:${esc(entry.email)}">${esc(entry.email)}</a>`)}
        ${row("Arbeiten", entry.portfolio ? portfolioHtml(entry.portfolio) : "—")}
        ${row("Sprache", entry.lang.toUpperCase())}
        ${row("Eingang", esc(time))}
      </table>
      <p style="margin:16px 0 4px;color:#666">Nachricht</p>
      <div style="white-space:pre-wrap;border-left:3px solid #ff5a2e;padding:4px 0 4px 12px">${entry.message ? esc(entry.message) : "—"}</div>
      <p style="margin-top:20px;color:#666">Auf diese Mail antworten = direkt an ${esc(entry.email)} schreiben.</p>
    </div>`;
}

const CONFIRM = {
  de: { subject: "Deine Bewerbung bei postyour.art", hi: (n) => (n ? `Hallo ${n},` : "Hallo,"), body: ["danke für deine Bewerbung — sie ist bei uns angekommen.", "Wir schauen uns deine Arbeiten in Ruhe an und melden uns persönlich bei dir.", "Wenn du in der Zwischenzeit Fragen hast, antworte einfach auf diese Mail."], bye: "Herzliche Grüße aus Worpswede" },
  en: { subject: "Your application to postyour.art", hi: (n) => (n ? `Hello ${n},` : "Hello,"), body: ["thank you for your application — it has reached us.", "We will take a calm look at your work and get back to you personally.", "If you have any questions in the meantime, simply reply to this email."], bye: "Warm regards from Worpswede" },
  fr: { subject: "Ta candidature chez postyour.art", hi: (n) => (n ? `Bonjour ${n},` : "Bonjour,"), body: ["merci pour ta candidature — elle nous est bien parvenue.", "Nous allons regarder ton travail avec attention et te répondre personnellement.", "Si tu as des questions d'ici là, réponds simplement à cet e-mail."], bye: "Bien chaleureusement, depuis Worpswede" },
  es: { subject: "Tu solicitud en postyour.art", hi: (n) => (n ? `Hola ${n}:` : "Hola:"), body: ["gracias por tu solicitud — nos ha llegado.", "Miraremos tu trabajo con calma y te responderemos personalmente.", "Si mientras tanto tienes preguntas, simplemente responde a este correo."], bye: "Un cordial saludo desde Worpswede" },
  it: { subject: "La tua candidatura a postyour.art", hi: (n) => (n ? `Ciao ${n},` : "Ciao,"), body: ["grazie per la tua candidatura — è arrivata.", "Guarderemo il tuo lavoro con calma e ti risponderemo personalmente.", "Se nel frattempo hai domande, rispondi semplicemente a questa e-mail."], bye: "Un caro saluto da Worpswede" },
  pt: { subject: "A tua candidatura à postyour.art", hi: (n) => (n ? `Olá ${n},` : "Olá,"), body: ["obrigado pela tua candidatura — chegou até nós.", "Vamos ver o teu trabalho com calma e responder-te pessoalmente.", "Se entretanto tiveres perguntas, responde simplesmente a este e-mail."], bye: "Um abraço de Worpswede" },
  ru: { subject: "Твоя заявка в postyour.art", hi: (n) => (n ? `Здравствуй, ${n}!` : "Здравствуй!"), body: ["спасибо за заявку — мы её получили.", "Мы спокойно посмотрим твои работы и ответим тебе лично.", "Если до тех пор появятся вопросы, просто ответь на это письмо."], bye: "Сердечный привет из Ворпсведе" },
};

function confirmHtml(entry) {
  const c = CONFIRM[entry.lang] || CONFIRM.en;
  return `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
      <p>${esc(c.hi(entry.name))}</p>
      ${c.body.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p>${esc(c.bye)}<br>Markus Lippeck · <a href="https://www.postyour.art/" style="color:#ff5a2e">postyour.art</a></p>
    </div>`;
}

export async function handleApply(payload, env) {
  const { email, name, source, website, beta_hp: hp, portfolio, message, lang } = payload || {};

  // Honeypot: echte Nutzer füllen das unsichtbare Feld nie aus. Es heißt
  // bewusst NICHT "website" o.ä. — solche Namen befüllt Browser-Autofill.
  // ("website" bleibt als Alt-Feldname aus der ersten Version berücksichtigt.)
  if (hp || website) {
    console.log("[apply] Honeypot ausgelöst — verworfen:", String(email || "").slice(0, 60));
    return { status: 200, body: { ok: true } };
  }

  if (!email || !EMAIL_RE.test(String(email).trim())) {
    return { status: 400, body: { ok: false, error: "invalid_email" } };
  }

  const entry = {
    email: String(email).trim().toLowerCase(),
    name: String(name || "").trim().slice(0, 100),
    portfolio: String(portfolio || "").trim().slice(0, 300),
    message: String(message || "").trim().slice(0, 2000),
    lang: LANGS.includes(lang) ? lang : "en",
    source: String(source || "postyour.art-bewerbung").slice(0, 50),
  };

  if (!env.BREVO_API_KEY) {
    console.error("[apply] BREVO_API_KEY fehlt! Bewerbung abgewiesen:", entry.email);
    return { status: 500, body: { ok: false, error: "not_configured" } };
  }

  let saved = false;
  let notified = false;
  try {
    await saveContact(entry, env);
    saved = true;
  } catch (err) {
    console.error("[apply] Kontakt nicht gespeichert:", err.message);
  }
  try {
    await sendMail(env, {
      to: { email: env.NOTIFY_EMAIL || NOTIFY_DEFAULT },
      subject: `Neue Bewerbung: ${entry.name || entry.email}`,
      html: notifyHtml(entry),
      replyTo: { email: entry.email, ...(entry.name ? { name: entry.name } : {}) },
    });
    notified = true;
  } catch (err) {
    console.error("[apply] Benachrichtigung fehlgeschlagen:", err.message);
  }

  if (!saved && !notified) {
    return { status: 500, body: { ok: false, error: "server_error" } };
  }

  try {
    await sendMail(env, {
      to: { email: entry.email, ...(entry.name ? { name: entry.name } : {}) },
      subject: (CONFIRM[entry.lang] || CONFIRM.en).subject,
      html: confirmHtml(entry),
      replyTo: { email: env.NOTIFY_EMAIL || NOTIFY_DEFAULT },
    });
  } catch (err) {
    console.error("[apply] Bestätigung an Bewerber fehlgeschlagen:", err.message);
  }

  console.log("[apply] Neue Bewerbung:", entry.email, "| gespeichert:", saved, "| benachrichtigt:", notified);
  return { status: 200, body: { ok: true } };
}

export async function onRequestPost({ request, env }) {
  const payload = await request.json().catch(() => ({}));
  const { status, body } = await handleApply(payload, env);
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function onRequest({ request, env }) {
  if (request.method === "POST") return onRequestPost({ request, env });
  return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
    status: 405,
    headers: { "content-type": "application/json" },
  });
}
