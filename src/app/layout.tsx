import type { Metadata } from "next";
import "./globals.css";
import { FinancialProvider } from "../context/FinancialContext";

export const metadata: Metadata = {
  title: "Quantum Mission Control | SpaceX Telemetry Finance HUD",
  description: "Copiloto Financeiro Autônomo e de Ultra-Baixa Fricção com Telemetria SpaceX/NASA, OCR, Voz e Open Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-space-950 text-slate-200 antialiased min-h-screen relative hud-grid">
        <div className="fixed inset-0 scanline-overlay pointer-events-none z-50"></div>
        <FinancialProvider>
          {children}
        </FinancialProvider>
      </body>
    </html>
  );
}
