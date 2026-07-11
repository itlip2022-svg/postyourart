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
(cd "$FUNNEL_DIR" && npx vercel env pull "$TMP_ENV" --environment=production --yes >/dev/null)
KEY="$(grep '^BREVO_API_KEY=' "$TMP_ENV" | sed 's/^BREVO_API_KEY=//; s/^"//; s/"$//')"
if [ -z "$KEY" ]; then
  echo "FEHLER: BREVO_API_KEY im Funnel-Projekt nicht gefunden." >&2
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

echo "4/4  Produktion neu deployen, damit die Variablen greifen …"
npx vercel --prod

echo
echo "Fertig. Test: auf https://www.postyour.art das Beta-Formular absenden —"
echo "der Kontakt erscheint in Brevo in der Liste '$LIST_NAME' (QUELLE=postyour.art-beta)."
