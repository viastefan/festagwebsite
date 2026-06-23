import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./landing.css";
import { SiteNav } from "./_components/SiteNav";
import { SiteFooter } from "./_components/SiteFooter";

const aeonik = localFont({
  src: [
    { path: "../public/fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
    // Festag rule: Aeonik Bold is forbidden — bolder weights resolve to Medium.
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://festag.app"),
  title: {
    default: "Festag — Softwareentwicklung, strukturiert gemacht",
    template: "%s, Festag",
  },
  description:
    "Festag ist ein KI-natives Produktionssystem, das Softwareentwicklung in einen transparenten, planbaren und jederzeit sichtbaren Prozess verwandelt.",
  applicationName: "Festag",
  keywords: [
    "Festag",
    "KI-native Softwareproduktion",
    "Softwareentwicklung System",
    "Projektsichtbarkeit",
    "strukturierte Delivery",
    "Produktionssystem",
  ],
  openGraph: {
    title: "Festag — Softwareentwicklung, strukturiert gemacht",
    description:
      "Ein System, das Softwareentwicklung transparent, planbar und nachvollziehbar macht.",
    url: "https://festag.app",
    siteName: "Festag",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festag — Softwareentwicklung, strukturiert gemacht",
    description:
      "Ein System, das Softwareentwicklung transparent, planbar und nachvollziehbar macht.",
  },
  icons: {
    icon: [
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${aeonik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1e1e1e] antialiased">
        <SiteNav />
        <main className="lp-main flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
