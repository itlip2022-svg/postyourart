#!/usr/bin/env bash
# Einmalige Einrichtung der Brevo-Anbindung für das Beta-Programm.
#
# Holt den BREVO_API_KEY aus dem Worpswede-Funnel-Projekt (gleicher
# Brevo-Account), legt die Kontaktliste "Beta postyour.art" an (idempotent)
# und trägt BREVO_API_KEY + BREVO_LIST_ID im Vercel-Projekt `postyourart`
# ein. Danach wird die Produktion neu deployt, damit die Variablen greifen.
#
# Aufruf:  bash scripts/setup-brevo.sh
set -euo pipefail

FUNNEL_DIR="$HOME/Documents/chance2030/funnel"
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LIST_NAME="Beta postyour.art"
TMP_ENV="$(mktemp)"
trap 'rm -f "$TMP_ENV"' EXIT

echo "1/4  BREVO_API_KEY aus dem Funnel-Projekt ziehen …"
KEY=""
if (cd "$FUNNEL_DIR" && npx vercel env pull "$TMP_ENV" --environment=production --yes >/dev/null 2>&1); then
  KEY="$(grep '^BREVO_API_KEY=' "$TMP_ENV" | sed 's/^BREVO_API_KEY=//; s/^"//; s/"$//' || true)"
fi
# Sensitive-Variablen gibt Vercel nicht heraus — Key ggf. direkt abfragen.
# (Eingabe bleibt unsichtbar und landet nirgends außer in Brevo-Aufrufen.)
[ -z "$KEY" ] && KEY="${BREVO_API_KEY:-}"
attempt=0
while [ -z "$KEY" ] && [ $attempt -lt 3 ]; do
  echo "     Kein Key auslesbar (Sensitive-Variable). Bitte Brevo-API-Key einfügen"
  read -rs -p "     (Eingabe unsichtbar, Enter zum Bestätigen): " KEY || true
  echo
  # Whitespace/Zeilenumbrüche aus dem Clipboard entfernen; ein führender
  # Umbruch macht die erste Eingabe leer — dann fängt der nächste Versuch
  # den eigentlichen Key aus dem Puffer ab.
  KEY="$(printf '%s' "$KEY" | tr -d '[:space:]')"
  if [ -n "$KEY" ]; then
    echo "     Key erkannt: ${KEY:0:10}… (${#KEY} Zeichen)"
  fi
  attempt=$((attempt + 1))
done
if [ -z "$KEY" ]; then
  echo "FEHLER: Kein BREVO_API_KEY angegeben." >&2
  exit 1
fi
# Kurzer Verbindungstest, bevor irgendetwas angelegt wird
if ! curl -sf "https://api.brevo.com/v3/account" -H "api-key: $KEY" >/dev/null; then
  echo "FEHLER: Brevo lehnt den Key ab (401?) — bitte Key prüfen." >&2
  exit 1
fi

echo "2/4  Brevo-Liste '$LIST_NAME' anlegen (falls nicht vorhanden) …"
LIST_ID="$(curl -s "https://api.brevo.com/v3/contacts/lists?limit=50" -H "api-key: $KEY" \
  | python3 -c "import sys,json; ls=(json.load(sys.stdin).get('lists') or []); print(next((l['id'] for l in ls if l['name']=='$LIST_NAME'), ''))")"
if [ -z "$LIST_ID" ]; then
  FOLDER_ID="$(curl -s "https://api.brevo.com/v3/contacts/folders?limit=1" -H "api-key: $KEY" \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['folders'][0]['id'])")"
  LIST_ID="$(curl -s -X POST "https://api.brevo.com/v3/contacts/lists" \
    -H "api-key: $KEY" -H "content-type: application/json" \
    -d "{\"name\":\"$LIST_NAME\",\"folderId\":$FOLDER_ID}" \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")"
fi
echo "     Listen-ID: $LIST_ID"

echo "3/4  Env-Variablen im Vercel-Projekt 'postyourart' setzen …"
cd "$SITE_DIR"
npx vercel link --yes --project postyourart >/dev/null
for ENVT in production preview; do
  npx vercel env rm BREVO_API_KEY "$ENVT" --yes >/dev/null 2>&1 || true
  npx vercel env rm BREVO_LIST_ID "$ENVT" --yes >/dev/null 2>&1 || true
  printf '%s' "$KEY"     | npx vercel env add BREVO_API_KEY "$ENVT" >/dev/null
  printf '%s' "$LIST_ID" | npx vercel env add BREVO_LIST_ID "$ENVT" >/dev/null
done

echo "4/4  Vercel-Produktion neu deployen, damit die Variablen greifen …"
npx vercel --prod

echo
echo "WICHTIG — die Live-Domain postyour.art läuft über CLOUDFLARE PAGES,"
echo "nicht über Vercel. Dort müssen die Variablen von Hand gesetzt werden:"
echo
echo "  1. In Brevo einen NEUEN API-Key anlegen (Einstellungen → API-Schlüssel,"
echo "     Name z.B. 'postyour.art') — Keys sind nur bei der Erstellung sichtbar."
echo "  2. dash.cloudflare.com → Workers & Pages → Projekt 'postyourart'"
echo "     → Settings → Variables and Secrets → hinzufügen:"
echo "        BREVO_API_KEY = <neuer Key>   (als Secret)"
echo "        BREVO_LIST_ID = $LIST_ID"
echo "  3. Deployments → letztes Deployment → 'Retry deployment', damit die"
echo "     Variablen greifen."
echo
echo "Test danach: auf https://postyour.art das Beta-Formular absenden — der"
echo "Kontakt erscheint in Brevo in der Liste '$LIST_NAME' (QUELLE=postyour.art-beta)."
