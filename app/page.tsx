export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 760 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 8px" }}>
          Probability Intelligence Terminal
        </h1>

        <p style={{ margin: "0 0 24px", opacity: 0.8, fontSize: 16 }}>
          Market monitoring and probability snapshots.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <a
            href="/dashboard"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              textDecoration: "none",
            }}
          >
            Open Dashboard
          </a>

          <a
            href="/api/health"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Health
          </a>
        </div>

        <div style={{ marginTop: 28, opacity: 0.55, fontSize: 12 }}>
          © {new Date().getFullYear()} PIT
        </div>
      </div>
    </main>
  );
}
