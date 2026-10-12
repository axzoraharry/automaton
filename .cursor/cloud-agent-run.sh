#!/usr/bin/env bash
# Start the Conway Automaton agent loop (foreground).
# Conway API key OR an alternate inference provider (OpenAI / Anthropic / Ollama).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f dist/index.js ]]; then
  echo "automaton: dist/index.js missing — run: bash .cursor/cloud-agent-install.sh" >&2
  exit 1
fi

has_credentials() {
  if [[ -n "${CONWAY_API_KEY:-}" ]]; then
    return 0
  fi
  if [[ -n "${OPENAI_API_KEY:-}" || -n "${ANTHROPIC_API_KEY:-}" || -n "${OLLAMA_BASE_URL:-}" ]]; then
    return 0
  fi
  node -e "
    const fs = require('fs');
    const os = require('os');
    const dir = os.homedir() + '/.automaton';
    try {
      const raw = JSON.parse(fs.readFileSync(dir + '/automaton.json', 'utf8'));
      if (raw.conwayApiKey || raw.openaiApiKey || raw.anthropicApiKey || raw.ollamaBaseUrl) {
        process.exit(0);
      }
    } catch {}
    try {
      const raw = JSON.parse(fs.readFileSync(dir + '/config.json', 'utf8'));
      if (raw.apiKey) process.exit(0);
    } catch {}
    process.exit(1);
  "
}

if ! has_credentials; then
  echo "automaton: set one of:" >&2
  echo "  CONWAY_API_KEY (Conway credits)" >&2
  echo "  OPENAI_API_KEY / ANTHROPIC_API_KEY / OLLAMA_BASE_URL (no Conway required)" >&2
  echo "  or run: node dist/index.js --provision" >&2
  exit 1
fi

exec node dist/index.js --run
