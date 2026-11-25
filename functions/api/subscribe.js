// Cloudflare Pages Function: POST /api/subscribe — Bewerbung für das Netzwerk.
// Die Logik steckt in server/apply.js; hier nur die Anbindung an Cloudflare
// (TCP-Verbindung für den Mailversand übers eigene Postfach).

import { connect } from 'cloudflare:sockets';
import { handleApply } from '../../server/apply.js';

export async function onRequestPost({ request, env }) {
  const payload = await request.json().catch(() => ({}));
  const { status, body } = await handleApply(payload, env, connect);
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequest({ request, env }) {
  if (request.method === 'POST') return onRequestPost({ request, env });
  return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
    status: 405,
    headers: { 'content-type': 'application/json' },
  });
}
