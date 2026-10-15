import type { Metadata, Viewport } from "next";
// Fontes hospedadas localmente via @fontsource (evita dependência de rede
// para fonts.googleapis.com em runtime/build — mais rápido e mais confiável
// que next/font/google, ver PRD §27 Performance).
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";

const siteUrl = "https://encontro-governanca.vercel.app";
const title = "Encontro da Governança de Segurança — 17.12.2026";
const description =
  "17.12.2026 · 09h às 22h · Arena Éssipê, Barra Funda/SP. Reunião de fechamento 2026, quadras de areia, comes e bebes. Confirme sua presença até 01/11.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Encontro da Governança de Segurança",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/posters/og-govsec.png",
        width: 1200,
        height: 630,
        alt: "Encontro da Governança de Segurança — 17.12.2026, Arena Éssipê",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/posters/og-govsec.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1116",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
