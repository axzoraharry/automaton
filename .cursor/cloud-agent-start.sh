#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f dist/index.js ]]; then
  echo "happy-paisa: dist/index.js missing — run install first" >&2
  exit 1
fi

if [[ ! -f dist/config/happy_paisa_soul.json ]]; then
  echo "happy-paisa: dist/config/happy_paisa_soul.json missing — run install first" >&2
  exit 1
fi

if ! node -e "require('better-sqlite3')" 2>/dev/null; then
  echo "happy-paisa: native module better-sqlite3 not loadable" >&2
  exit 1
fi

echo "Happy Paisa dev environment ready (Node $(node -v), pnpm $(pnpm -v))"
