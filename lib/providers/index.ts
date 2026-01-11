import { PolymarketProvider } from "./polymarket";

export type Market = {
  provider: string;
  marketId: string;
  title: string;
  slug?: string;
  pYes?: number;
  pNo?: number;
  volume24h?: number;
  liquidity?: number;
  endTimeUtc?: string;
  raw: unknown;
};

export interface Provider {
  name: string;
  fetchTopMarkets(opts: { minProb?: number; limit?: number }): Promise<Market[]>;
}

export const providers: Provider[] = [new PolymarketProvider()];
