import type { Metadata } from "next";
import type { Viewport } from "next";

import { Header } from "@/components/Header";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SettingsProvider } from "@/providers/SettingsProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tarteel-reader-app.vercel.app"),
  title: {
    default: "Tarteel Reader",
    template: "%s | Tarteel Reader"
  },
  description: "A modern Quran reading experience with searchable ayahs and personalized typography settings.",
  applicationName: "Tarteel Reader",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tarteel Reader"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#14532d",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SettingsProvider>
          <Header />
          <SettingsPanel />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
