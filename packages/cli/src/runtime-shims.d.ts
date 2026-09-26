declare module "@conway/automaton/config.js" {
  export interface AutomatonCliConfig {
    name: string;
    walletAddress: string;
    creatorAddress: string;
    sandboxId: string;
    dbPath: string;
    inferenceModel: string;
    conwayApiUrl: string;
    conwayApiKey: string;
    openaiApiKey?: string;
    anthropicApiKey?: string;
    socialRelayUrl?: string;
  }

  export type AutomatonConfig = AutomatonCliConfig;

  export function loadConfig(): AutomatonCliConfig | null;
  export function saveConfig(config: AutomatonCliConfig): void;
  export function createConfig(params: {
    name: string;
    genesisPrompt: string;
    creatorMessage?: string;
    creatorAddress: string;
    registeredWithConway: boolean;
    sandboxId: string;
    walletAddress: string;
    apiKey: string;
    openaiApiKey?: string;
    anthropicApiKey?: string;
    ollamaBaseUrl?: string;
    parentAddress?: string;
    chainType?: string;
  }): AutomatonCliConfig;
  export function resolvePath(p: string): string;
}

declare module "@conway/automaton/identity/provision.js" {
  export function loadApiKeyFromConfig(): string | null;
}

declare module "@conway/automaton/identity/wallet.js" {
  export function getWallet(
    chainType?: string,
  ): Promise<{
    chainIdentity: { address: string; chainType: string };
  }>;
}

declare module "@conway/automaton/state/database.js" {
  export interface CliToolCall {
    name: string;
    result: string;
    error?: string;
  }

  export interface CliTurn {
    id: string;
    timestamp: string;
    state: string;
    input?: string;
    inputSource?: string;
    thinking: string;
    toolCalls: CliToolCall[];
    tokenUsage: { totalTokens: number };
    costCents: number;
  }

  export interface CliHeartbeatEntry {
    enabled: boolean;
  }

  export interface CliInstalledTool {
    id: string;
    name: string;
  }

  export interface AutomatonCliDatabase {
    getAgentState(): string;
    getTurnCount(): number;
    getInstalledTools(): CliInstalledTool[];
    getHeartbeatEntries(): CliHeartbeatEntry[];
    getRecentTurns(limit: number): CliTurn[];
    close(): void;
  }

  export function createDatabase(path: string): AutomatonCliDatabase;
}
