export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">Probability Intelligence Terminal</h1>
      <p className="muted mt-3">
        MVP: market screener + snapshots + cron refresh. Deploy-ready on Vercel.
      </p>

      <div className="mt-6 flex gap-4">
        <a className="card" href="/dashboard">Open Dashboard</a>
        <a className="card" href="/api/health">Health</a>
      </div>

      <p className="muted mt-8">
        Next: indices, event research OS, settlement verification, integrity signals, hedging coach.
      </p>
    </main>
  );
}
