// Cloudflare Pages Function: POST /api/subscribe
//
// postyour.art wird über Cloudflare Pages ausgeliefert — dieses File ist
// das Pendant zu api/subscribe.js (Vercel), damit das Beta-Formular auf
// beiden Plattformen funktioniert. Logik bewusst gespiegelt.
//
// Env (Cloudflare Pages → Settings → Variables):
//   BREVO_API_KEY   Pflicht — ohne Key antwortet der Endpoint mit 500,
//                   damit keine Anmeldungen stillschweigend verloren gehen.
//   BREVO_LIST_ID   optional — ID der Brevo-Liste (z.B. "Beta postyour.art")

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function saveToBrevo(entry, env) {
  const body = {
    email: entry.email,
    updateEnabled: true,
    attributes: {
      VORNAME: entry.name || "",
      QUELLE: entry.source || "postyour.art",
    },
  };
  const listId = parseInt(env.BREVO_LIST_ID, 10);
  if (!isNaN(listId)) body.listIds = [listId];

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
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

async function handleSubscribe(payload, env) {
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
  };

  if (!env.BREVO_API_KEY) {
    console.error("[subscribe] BREVO_API_KEY fehlt! Anmeldung abgewiesen:", entry.email);
    return { status: 500, body: { ok: false, error: "not_configured" } };
  }

  try {
    await saveToBrevo(entry, env);
    console.log("[subscribe] Neue Beta-Anmeldung:", entry.email, "via", entry.source);
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error("[subscribe] Fehler:", err.message);
    return { status: 500, body: { ok: false, error: "server_error" } };
  }
}

export async function onRequestPost({ request, env }) {
  const payload = await request.json().catch(() => ({}));
  const { status, body } = await handleSubscribe(payload, env);
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
