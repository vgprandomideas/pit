import { env } from "../env";
import type { Provider, Market } from "./index";

/**
 * Provider adapter is intentionally isolated.
 * If Polymarket API changes, only this file needs updates.
 */
export class PolymarketProvider implements Provider {
  name = "polymarket";

  async fetchTopMarkets(opts: { minProb?: number; limit?: number }): Promise<Market[]> {
    const minProb = opts.minProb ?? 0.10;
    const limit = Math.min(opts.limit ?? 100, 200);

    const url = new URL("/markets", env.POLYMARKET_API_BASE);
    url.searchParams.set("active", "true");
    url.searchParams.set("closed", "false");
    url.searchParams.set("limit", String(limit));

    const res = await fetch(url.toString(), {
      headers: { accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Polymarket API error ${res.status}: ${text.slice(0, 200)}`);
    }

    const data = (await res.json()) as any[];

    const mapped: Market[] = data.map((m) => {
      const pYes = typeof m?.probability === "number" ? m.probability : undefined;
      const pNo = pYes !== undefined ? 1 - pYes : undefined;

      return {
        provider: this.name,
        marketId: String(m?.id ?? m?.conditionId ?? m?.slug ?? crypto.randomUUID()),
        title: String(m?.title ?? m?.question ?? "Untitled market"),
        slug: m?.slug ? String(m.slug) : undefined,
        pYes,
        pNo,
        volume24h: typeof m?.volume24hr === "number" ? m.volume24hr : undefined,
        liquidity: typeof m?.liquidity === "number" ? m.liquidity : undefined,
        endTimeUtc: m?.endDate ? String(m.endDate) : undefined,
        raw: m,
      };
    });

    return mapped.filter((x) => (x.pYes ?? 0) >= minProb);
  }
}
