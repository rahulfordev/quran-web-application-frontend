"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  type ArabicFontOption,
  defaultReaderSettings,
  type ReaderSettings,
  sanitizeSettings,
  settingsStorageKey
} from "@/lib/settings";

interface SettingsContextValue {
  settings: ReaderSettings;
  setArabicFont: (font: ArabicFontOption) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  resetSettings: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const applySettingsToDocument = (settings: ReaderSettings) => {
  document.documentElement.dataset.arabicFont = settings.arabicFont;
  document.documentElement.style.setProperty("--reader-arabic-size", `${settings.arabicFontSize}rem`);
  document.documentElement.style.setProperty(
    "--reader-translation-size",
    `${settings.translationFontSize}rem`
  );
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    if (typeof window === "undefined") {
      return defaultReaderSettings;
    }

    try {
      const rawSettings = window.localStorage.getItem(settingsStorageKey);
      const parsedSettings = rawSettings ? (JSON.parse(rawSettings) as Partial<ReaderSettings>) : null;
      return sanitizeSettings(parsedSettings);
    } catch {
      return defaultReaderSettings;
    }
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    applySettingsToDocument(settings);
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPanelOpen]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      setArabicFont: (font) => setSettings((current) => ({ ...current, arabicFont: font })),
      setArabicFontSize: (size) => setSettings((current) => sanitizeSettings({ ...current, arabicFontSize: size })),
      setTranslationFontSize: (size) =>
        setSettings((current) => sanitizeSettings({ ...current, translationFontSize: size })),
      resetSettings: () => setSettings(defaultReaderSettings),
      isPanelOpen,
      setIsPanelOpen
    }),
    [isPanelOpen, settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useReaderSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useReaderSettings must be used within a SettingsProvider");
  }

  return context;
};
