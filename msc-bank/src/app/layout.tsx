import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MSC Bank · Antecipação de notas para a pequena indústria",
    template: "%s · MSC Bank",
  },
  description:
    "Antecipe notas fiscais confirmadas pelo seu cliente e receba hoje, com taxa baseada no risco do comprador. Plataforma em fase beta.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh antialiased">
        <noscript>
          <style>{`.reveal{animation:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
