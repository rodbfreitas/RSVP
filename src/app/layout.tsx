import type { Metadata, Viewport } from "next";
// Fontes hospedadas localmente via @fontsource (evita dependência de rede
// para fonts.googleapis.com em runtime/build — mais rápido e mais confiável
// que next/font/google, ver PRD §27 Performance).
import "@fontsource/anton/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "./globals.css";

const siteUrl = "https://pagodedosirmaos.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pagode dos Irmãos — Rodrigo 43 & Gabriel 30",
  description:
    "27.09.2026 · Arena Éssipê, Barra Funda/SP. Esporte de areia pela manhã, boteco e pagode à tarde. Confirme sua presença!",
  openGraph: {
    title: "Pagode dos Irmãos — Rodrigo 43 & Gabriel 30",
    description:
      "27.09.2026 · Arena Éssipê, Barra Funda/SP. Esporte de areia, boteco e pagode. Confirme sua presença!",
    url: siteUrl,
    siteName: "Pagode dos Irmãos",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/posters/save-the-date.jpg",
        width: 1080,
        height: 1920,
        alt: "Save the date — Pagode dos Irmãos, 27.09.2026, Arena Éssipê",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pagode dos Irmãos — Rodrigo 43 & Gabriel 30",
    description: "27.09.2026 · Arena Éssipê, Barra Funda/SP.",
    images: ["/assets/posters/save-the-date.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8d9b5",
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
