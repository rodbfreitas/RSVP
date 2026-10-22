import type { Metadata, Viewport } from "next";
// Fontes hospedadas localmente via @fontsource (evita dependência de rede
// para fonts.googleapis.com em runtime/build — mais rápido e mais confiável
// que next/font/google, ver PRD §27 Performance).
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/700.css";
import "./globals.css";

const siteUrl = "https://encontro-governanca.vercel.app";
const title = "Encontro GRC 17.12 — Ger. Sr. Governança, Riscos e Continuidade";
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
    siteName: "Encontro Ger. Sr. Governança, Riscos e Continuidade",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/posters/og-grc.png",
        width: 1200,
        height: 630,
        alt: "Encontro Ger. Sr. Governança, Riscos e Continuidade — 17.12.2026, Arena Éssipê",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/posters/og-grc.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
