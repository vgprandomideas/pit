import { providers } from "@/lib/providers";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";

  if (rateLimit) {
    const { success } = await rateLimit.limit(`markets:${ip}`);
    if (!success) return new Response("Rate limited", { status: 429 });
  }

  const url = new URL(req.url);
  const minProb = Number(url.searchParams.get("minProb") ?? "0.10");
  const limit = Number(url.searchParams.get("limit") ?? "100");

  const all = await Promise.all(
    providers.map((p) => p.fetchTopMarkets({ minProb, limit }).catch(() => []))
  );

  const merged = all.flat();
  merged.sort((a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0));

  return Response.json({ count: merged.length, markets: merged.slice(0, limit) });
}
