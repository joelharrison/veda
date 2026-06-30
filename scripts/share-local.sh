#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"
HOST="${HOST:-127.0.0.1}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared is not installed. Run: brew install cloudflared" >&2
  exit 1
fi

if ! curl --silent --fail --head "http://${HOST}:${PORT}" >/dev/null 2>&1; then
  echo "VEDA is not responding at http://${HOST}:${PORT}" >&2
  echo "Start it with: npm run start" >&2
  exit 1
fi

echo "Creating a temporary Cloudflare URL for http://${HOST}:${PORT}"
echo "For durable sharing, deploy with GitHub Pages instead."
cloudflared tunnel --url "http://${HOST}:${PORT}"
