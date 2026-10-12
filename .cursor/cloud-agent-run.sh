#!/usr/bin/env bash
# Start the Conway Automaton agent loop (foreground). Requires a Conway API key.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f dist/index.js ]]; then
  echo "automaton: dist/index.js missing — run: bash .cursor/cloud-agent-install.sh" >&2
  exit 1
fi

has_key() {
  if [[ -n "${CONWAY_API_KEY:-}" ]]; then
    return 0
  fi
  node -e "
    const fs = require('fs');
    const os = require('os');
    const dir = os.homedir() + '/.automaton';
    for (const file of ['automaton.json', 'config.json']) {
      try {
        const raw = JSON.parse(fs.readFileSync(dir + '/' + file, 'utf8'));
        if (raw.conwayApiKey || raw.apiKey) process.exit(0);
      } catch {}
    }
    process.exit(1);
  "
}

if ! has_key; then
  echo "automaton: no Conway API key (set CONWAY_API_KEY or run: node dist/index.js --provision)" >&2
  exit 1
fi

exec node dist/index.js --run
