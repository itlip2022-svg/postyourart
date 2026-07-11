// Vercel Serverless Function: POST /api/subscribe
// Beta-Anmeldungen für postyour.art — gleiches Prinzip wie der
// Worpswede-Funnel: Kontakt landet in Brevo (Attribute VORNAME + QUELLE),
// optional in einer Liste (BREVO_LIST_ID). Die Adressen werden zunächst
// gesammelt, um potenzielle Nutzer zum Beta-Programm einzuladen.
//
// Env (Vercel-Projekt `postyourart`):
//   BREVO_API_KEY   Pflicht — ohne Key antwortet der Endpoint mit 500,
//                   damit keine Anmeldungen stillschweigend verloren gehen.
//   BREVO_LIST_ID   optional — ID der Brevo-Liste (z.B. "Beta postyour.art")

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIST_NAME = "Beta postyour.art";

// Fallback, wenn BREVO_LIST_ID nicht gesetzt ist: Liste einmal per Name
// suchen und den Treffer für die Lebensdauer der Instanz merken.
let cachedListId = null;

async function resolveListId() {
  const configured = parseInt(process.env.BREVO_LIST_ID, 10);
  if (!isNaN(configured)) return configured;
  if (cachedListId) return cachedListId;
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/lists?limit=50", {
      headers: { "api-key": process.env.BREVO_API_KEY },
    });
    if (!res.ok) return null;
    const lists = (await res.json()).lists || [];
    const hit = lists.find((l) => l.name === LIST_NAME);
    cachedListId = hit ? hit.id : null;
  } catch (err) {
    console.error("[subscribe] Listen-Lookup fehlgeschlagen:", err.message);
  }
  return cachedListId;
}

async function saveToBrevo(entry) {
  const body = {
    email: entry.email,
    updateEnabled: true,
    attributes: {
      VORNAME: entry.name || "",
      QUELLE: entry.source || "postyour.art",
    },
  };
  const listId = await resolveListId();
  if (listId) body.listIds = [listId];
  else console.error("[subscribe] Keine Liste gefunden — Kontakt landet ohne Listen-Zuordnung in Brevo.");

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // 201 = neu angelegt, 204 = aktualisiert
  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`Brevo antwortete mit ${res.status}: ${text}`);
  }
}

async function handleSubscribe(payload) {
  const { email, name, source, website, beta_hp: hp } = payload || {};

  // Honeypot: echte Nutzer füllen das unsichtbare Feld nie aus. Es heißt
  // bewusst NICHT "website" o.ä. — solche Namen befüllt Browser-Autofill,
  // und echte Anmeldungen würden hier still verworfen. ("website" bleibt
  // als Alt-Feldname aus der ersten Version berücksichtigt.)
  if (hp || website) {
    console.log("[subscribe] Honeypot ausgelöst — verworfen:", String(email || "").slice(0, 60));
    return { status: 200, body: { ok: true } };
  }

  if (!email || !EMAIL_RE.test(String(email).trim())) {
    return { status: 400, body: { ok: false, error: "invalid_email" } };
  }

  const entry = {
    email: String(email).trim().toLowerCase(),
    name: String(name || "").trim().slice(0, 100),
    source: String(source || "postyour.art").slice(0, 50),
    ts: new Date().toISOString(),
  };

  if (!process.env.BREVO_API_KEY) {
    // Bewusst ein sichtbarer Fehler statt stillem Datenverlust:
    // Vercel-Logs sind flüchtig, eine Beta-Warteliste darf nicht dort landen.
    console.error("[subscribe] BREVO_API_KEY fehlt! Anmeldung abgewiesen:", entry.email);
    return { status: 500, body: { ok: false, error: "not_configured" } };
  }

  try {
    await saveToBrevo(entry);
    console.log("[subscribe] Neue Beta-Anmeldung:", entry.email, "via", entry.source);
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error("[subscribe] Fehler:", err.message);
    return { status: 500, body: { ok: false, error: "server_error" } };
  }
}

// ESM (Root-package.json hat "type": "module")
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  const { status, body } = await handleSubscribe(req.body);
  res.status(status).json(body);
}

export { handleSubscribe };
