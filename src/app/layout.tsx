import type { Metadata } from "next";
import "./globals.css";
import { FinancialProvider } from "../context/FinancialContext";

export const metadata: Metadata = {
  title: "Kamino Quantum | Enterprise Financial OS",
  description: "Plataforma Enterprise de Gestão Financeira com Inteligência em 4 Vetores, OCR de Cupons, Voz e Conexão Open Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-ground text-navy-900 antialiased min-h-screen">
        <FinancialProvider>
          {children}
        </FinancialProvider>
      </body>
    </html>
  );
}
