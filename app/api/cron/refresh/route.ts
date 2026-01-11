import { env } from "@/lib/env";
import { providers } from "@/lib/providers";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (secret !== env.CRON_SECRET) return new Response("Unauthorized", { status: 401 });

  const capturedAt = new Date();

  const results = await Promise.all(
    providers.map(async (p) => {
      const markets = await p.fetchTopMarkets({ minProb: 0.01, limit: 200 });

      await prisma.marketSnapshot.createMany({
        data: markets.map((m) => ({
          provider: m.provider,
          marketId: m.marketId,
          slug: m.slug,
          title: m.title,
          pYes: m.pYes,
          pNo: m.pNo,
          volume24h: m.volume24h,
          liquidity: m.liquidity,
          endTimeUtc: m.endTimeUtc ? new Date(m.endTimeUtc) : null,
          raw: m.raw as any,
          capturedAt,
        })),
      });

      return { provider: p.name, saved: markets.length };
    })
  );

  return Response.json({ ok: true, capturedAt: capturedAt.toISOString(), results });
}
