async function getMarkets() {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/markets?minProb=0.10&limit=50`, {
    cache: "no-store",
  });

  if (!res.ok) return { markets: [] as any[] };
  return res.json();
}

export default async function Dashboard() {
  const data = await getMarkets();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Top Markets</h2>
          <p className="muted mt-1">Filtered by p(YES) ≥ 10%, sorted by 24h volume.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {(data.markets ?? []).map((m: any) => (
          <div key={`${m.provider}-${m.marketId}`} className="card">
            <div className="font-medium">{m.title}</div>
            <div className="muted mt-2 text-sm">
              Provider: {m.provider} • pYes: {(m.pYes ?? 0).toFixed(3)} • Vol24h: {(m.volume24h ?? 0).toFixed(0)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
