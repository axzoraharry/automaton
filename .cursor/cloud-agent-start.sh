#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f dist/index.js ]]; then
  echo "automaton: dist/index.js missing — run install first" >&2
  exit 1
fi

if ! node -e "require('better-sqlite3')" 2>/dev/null; then
  echo "automaton: native module better-sqlite3 not loadable" >&2
  exit 1
fi

echo "Conway Automaton dev environment ready (Node $(node -v), pnpm $(pnpm -v))"
