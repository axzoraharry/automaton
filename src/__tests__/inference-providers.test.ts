import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  hasExternalInferenceProvider,
  resolveOpenAiApiKey,
} from "../inference/providers.js";
import type { AutomatonConfig } from "../types.js";
import { DEFAULT_CONFIG, DEFAULT_TREASURY_POLICY } from "../types.js";

function minimalConfig(
  overrides: Partial<AutomatonConfig> = {},
): AutomatonConfig {
  return {
    name: "test",
    genesisPrompt: "test",
    creatorAddress: "0x0",
    registeredWithConway: false,
    sandboxId: "",
    conwayApiUrl: "https://api.conway.tech",
    conwayApiKey: "",
    inferenceModel: "gpt-5.2",
    maxTokensPerTurn: 1024,
    heartbeatConfigPath: "~/.automaton/heartbeat.yml",
    dbPath: "~/.automaton/state.db",
    logLevel: "info",
    walletAddress: "0x0",
    version: "0.2.1",
    skillsDir: "~/.automaton/skills",
    maxChildren: 3,
    treasuryPolicy: DEFAULT_TREASURY_POLICY,
    ...DEFAULT_CONFIG,
    ...overrides,
  } as AutomatonConfig;
}

describe("inference providers", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.OLLAMA_BASE_URL;
  });

  afterEach(() => {
    process.env = env;
  });

  it("detects OpenAI from env", () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const config = minimalConfig();
    expect(hasExternalInferenceProvider(config)).toBe(true);
    expect(resolveOpenAiApiKey(config)).toBe("sk-test");
  });

  it("detects Ollama URL from config", () => {
    const config = minimalConfig({ ollamaBaseUrl: "http://localhost:11434" });
    expect(hasExternalInferenceProvider(config)).toBe(true);
  });

  it("false when no providers configured", () => {
    expect(hasExternalInferenceProvider(minimalConfig())).toBe(false);
  });
});
