// Minimaler SMTP-Versand über ein eigenes Postfach (implizites TLS, Port 465).
//
// `connect` ist die TCP-Funktion der Laufzeit: in Cloudflare Pages Functions
// `connect` aus "cloudflare:sockets", in Tests ein lokaler Ersatz. Sie liefert
// ein Objekt mit `readable` und `writable` (Web Streams).
//
// Mehrere Nachrichten gehen über eine Verbindung; scheitert eine, wird sie mit
// RSET verworfen und die nächste trotzdem versucht. Rückgabe: je Nachricht
// true (zugestellt an den Server) oder false.

const enc = new TextEncoder();
const dec = new TextDecoder();

export function base64(text) {
  const bytes = enc.encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

const wrap76 = (b64) => b64.replace(/.{76}/g, '$&\r\n');

// Kopfzeilen dürfen nie Zeilenumbrüche aus Nutzereingaben enthalten.
const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim();

// RFC 2047: Nicht-ASCII-Text in Kopfzeilen als UTF-8/Base64 kodieren.
function encodeWord(text) {
  const clean = oneLine(text);
  return /^[\x20-\x7e]*$/.test(clean) ? clean : `=?UTF-8?B?${base64(clean)}?=`;
}

function mailbox({ email, name }) {
  const addr = oneLine(email);
  return name ? `${encodeWord(name)} <${addr}>` : `<${addr}>`;
}

export function buildMessage({ from, to, replyTo, subject, text, html, domain }) {
  const boundary = `b${crypto.randomUUID().replace(/-/g, '')}`;
  const headers = [
    `From: ${mailbox(from)}`,
    `To: ${mailbox(to)}`,
    ...(replyTo ? [`Reply-To: ${mailbox(replyTo)}`] : []),
    `Subject: ${encodeWord(subject)}`,
    `Date: ${new Date().toUTCString().replace('GMT', '+0000')}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  // Base64-Körper beginnen nie mit einem Punkt — kein Dot-Stuffing nötig.
  return [
    ...headers,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap76(base64(text)),
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap76(base64(html)),
    `--${boundary}--`,
  ].join('\r\n');
}

export async function sendViaSmtp({ connect, host, port = 465, user, pass, envelopeFrom, helo = 'postyour.art', messages, timeoutMs = 15000 }) {
  const socket = connect({ hostname: host, port }, { secureTransport: 'on', allowHalfOpen: false });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  let buffer = '';
  let timer;

  const withTimeout = (promise) => Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('SMTP: Zeitüberschreitung')), timeoutMs); }),
  ]).finally(() => clearTimeout(timer));

  // Liest eine (ggf. mehrzeilige) Antwort: "250-…" Folgezeilen, "250 …" Ende.
  async function reply() {
    for (;;) {
      const lines = buffer.split('\r\n');
      for (let i = 0; i < lines.length - 1; i++) {
        if (/^\d{3}(?: |$)/.test(lines[i])) {
          const text = lines.slice(0, i + 1).join(' | ');
          buffer = lines.slice(i + 1).join('\r\n');
          return { code: Number(lines[i].slice(0, 3)), text };
        }
      }
      const { value, done } = await withTimeout(reader.read());
      if (done) throw new Error('SMTP: Verbindung vom Server geschlossen');
      buffer += dec.decode(value, { stream: true });
    }
  }

  // `label` statt der Zeile selbst in Fehlermeldungen — AUTH enthält das Passwort.
  async function command(line, expected, label) {
    if (line !== null) await writer.write(enc.encode(`${line}\r\n`));
    const res = await reply();
    if (!expected.includes(res.code)) throw new Error(`SMTP ${label}: ${res.text}`);
    return res;
  }

  const results = [];
  try {
    await command(null, [220], 'Begrüßung');
    await command(`EHLO ${helo}`, [250], 'EHLO');
    await command(`AUTH PLAIN ${base64(`\u0000${user}\u0000${pass}`)}`, [235], 'Anmeldung');

    for (const msg of messages) {
      try {
        await command(`MAIL FROM:<${envelopeFrom}>`, [250], 'MAIL FROM');
        await command(`RCPT TO:<${oneLine(msg.to.email)}>`, [250, 251], 'RCPT TO');
        await command('DATA', [354], 'DATA');
        await command(`${msg.raw}\r\n.`, [250], 'Nachricht');
        results.push(true);
      } catch (err) {
        console.error('[smtp]', err.message);
        results.push(false);
        await command('RSET', [250], 'RSET').catch(() => {});
      }
    }
    await command('QUIT', [221], 'QUIT').catch(() => {});
  } finally {
    try { writer.releaseLock(); reader.releaseLock(); } catch { /* bereits geschlossen */ }
    try { socket.close?.(); } catch { /* egal */ }
  }
  return results;
}
