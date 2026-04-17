import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SettingsProvider } from "@/providers/SettingsProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tarteel Reader",
    template: "%s | Tarteel Reader"
  },
  description: "A modern Quran reading experience with searchable ayahs and personalized typography settings."
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
