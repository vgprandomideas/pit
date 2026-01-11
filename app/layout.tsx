import "@/styles/globals.css";

export const metadata = {
  title: "Probability Intelligence Terminal",
  description: "Institutional-grade probability market intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
