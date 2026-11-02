#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "== Building locally first =="
npm run build

echo
echo "== Deploying to Vercel production =="
OUTPUT=$(npx vercel --prod --yes)
echo "$OUTPUT"

URL=$(echo "$OUTPUT" | grep -oE '"productionUrl": *"[^"]+"' | sed -E 's/.*"([^"]+)"$/\1/')

if [ -z "$URL" ]; then
  echo
  echo "✗ Could not find a production URL in Vercel's output. Check the output above."
  exit 1
fi

echo
echo "== Checking https://$URL =="
CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$URL")

if [ "$CODE" = "200" ]; then
  echo "✓ Live and responding 200: https://$URL"
else
  echo "✗ Got HTTP $CODE from https://$URL — open it and check before walking in."
  exit 1
fi
