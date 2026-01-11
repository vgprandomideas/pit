// app/page.tsx
import Link from "next/link";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] tracking-wide text-white/70">
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
      <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {sub ? <div className="mt-1 text-xs text-white/50">{sub}</div> : null}
    </div>
  );
}

function Action({
  href,
  title,
  desc,
  primary,
}: {
  href: string;
  title: string;
  desc: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative block rounded-2xl border p-5 transition",
        primary
          ? "border-white/15 bg-white/10 hover:bg-white/12"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-white/40 transition group-hover:text-white/70">
          ↗
        </div>
      </div>
      <div className="mt-2 text-sm leading-6 text-white/55">{desc}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] transition group-hover:opacity-100" />
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">
      {/* Subtle terminal grid + vignette */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_60%_20%,rgba(39,120,255,0.10),transparent_60%),radial-gradient(900px_500px_at_20%_10%,rgba(0,255,180,0.06),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,13,0.55)_55%,rgba(7,9,13,0.95)_100%)]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]" />
            <div className="text-sm font-semibold tracking-wide">
              PIT <span className="text-white/40">/</span>{" "}
              <span className="text-white/70">Probability Intelligence Terminal</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Chip>Non-custodial</Chip>
            <Chip>Read-only analytics</Chip>
            <Link
              href="/dashboard"
              className="ml-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/12"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Ticker strip */}
        <div className="relative overflow-hidden border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-6 py-2">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-white/55">
              <span className="text-white/70">Live</span>
              <span>Markets</span>
              <span>Probabilities</span>
              <span>Snapshots</span>
              <span>Change</span>
              <span>Liquidity</span>
              <span>Spread</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left: headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Probability monitoring terminal
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight">
              Institutional-grade view of prediction markets.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
              Screen markets, capture snapshots, and track probability movement with a
              clean, terminal-style workflow.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Action
                href="/dashboard"
                title="Open Dashboard"
                desc="Market screener with filters and snapshot history."
                primary
              />
              <Action
                href="/api/health"
                title="System Health"
                desc="Check API and database connectivity."
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Chip>Fast refresh</Chip>
              <Chip>Rate-limited</Chip>
              <Chip>Neon Postgres</Chip>
              <Chip>Vercel cron</Chip>
            </div>
          </div>

          {/* Right: stats / status */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Session</div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Ready
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="Mode" value="Terminal" sub="Dark UI / low noise" />
                <Stat label="Data" value="Live" sub="Provider-backed" />
                <Stat label="Storage" value="Neon" sub="Postgres snapshots" />
                <Stat label="Ops" value="Cron" sub="Scheduled refresh" />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                  Quick links
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <Link className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 hover:bg-white/[0.06]" href="/dashboard">
                    Dashboard
                  </Link>
                  <Link className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 hover:bg-white/[0.06]" href="/api/markets?minProb=0.1&limit=25">
                    Markets API
                  </Link>
                  <Link className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 hover:bg-white/[0.06]" href="/api/cron/refresh">
                    Manual Refresh
                  </Link>
                  <Link className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 hover:bg-white/[0.06]" href="/api/health">
                    Health
                  </Link>
                </div>

                <div className="mt-3 text-xs text-white/45">
                  Note: Manual refresh may require CRON_SECRET in headers when enforced.
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/40">
              © {new Date().getFullYear()} PIT — internal analytics interface
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
