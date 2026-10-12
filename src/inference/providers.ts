/**
 * Resolve BYOK / local inference credentials (no Conway API required).
 */

import type { AutomatonConfig } from "../types.js";

export function resolveOpenAiApiKey(
  config: AutomatonConfig,
): string | undefined {
  const key = process.env.OPENAI_API_KEY || config.openaiApiKey;
  return key?.trim() ? key.trim() : undefined;
}

export function resolveAnthropicApiKey(
  config: AutomatonConfig,
): string | undefined {
  const key = process.env.ANTHROPIC_API_KEY || config.anthropicApiKey;
  return key?.trim() ? key.trim() : undefined;
}

export function resolveOllamaBaseUrl(
  config: AutomatonConfig,
): string | undefined {
  const url = process.env.OLLAMA_BASE_URL || config.ollamaBaseUrl;
  return url?.trim() ? url.trim() : undefined;
}

/** True when chat can run without Conway credits / API key. */
export function hasExternalInferenceProvider(
  config: AutomatonConfig,
): boolean {
  return !!(
    resolveOpenAiApiKey(config) ||
    resolveAnthropicApiKey(config) ||
    resolveOllamaBaseUrl(config)
  );
}
