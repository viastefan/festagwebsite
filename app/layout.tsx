import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteChrome } from "./_components/site/SiteChrome";

const aeonik = localFont({
  src: [
    { path: "../public/fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const DESCRIPTION =
  "Festag ist die Operational-Intelligence-Schicht über GitHub, Linear, Jira und Slack. Tagro übersetzt Arbeitssignale in Status, Risiken und Entscheidungen — klar für Kunden und Führung.";

export const metadata: Metadata = {
  metadataBase: new URL("https://festag.app"),
  title: {
    default: "Festag — Operational Intelligence für Teams, die liefern",
    template: "%s · Festag",
  },
  description: DESCRIPTION,
  applicationName: "Festag",
  openGraph: {
    title: "Festag — Operational Intelligence für Teams, die liefern",
    description: DESCRIPTION,
    url: "https://festag.app",
    siteName: "Festag",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festag — Operational Intelligence",
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f7f5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={aeonik.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
