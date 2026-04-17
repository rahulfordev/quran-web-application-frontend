import { clamp } from "./utils";

export const settingsStorageKey = "quran-reader-settings";

export const arabicFontOptions = [
  { value: "amiri", label: "Amiri" },
  { value: "scheherazade", label: "Scheherazade New" }
] as const;

export type ArabicFontOption = (typeof arabicFontOptions)[number]["value"];

export interface ReaderSettings {
  arabicFont: ArabicFontOption;
  arabicFontSize: number;
  translationFontSize: number;
}

export const defaultReaderSettings: ReaderSettings = {
  arabicFont: "amiri",
  arabicFontSize: 2.3,
  translationFontSize: 1
};

export const sanitizeSettings = (value: Partial<ReaderSettings> | null | undefined): ReaderSettings => ({
  arabicFont:
    value?.arabicFont && arabicFontOptions.some((option) => option.value === value.arabicFont)
      ? value.arabicFont
      : defaultReaderSettings.arabicFont,
  arabicFontSize: clamp(value?.arabicFontSize ?? defaultReaderSettings.arabicFontSize, 1.8, 3.6),
  translationFontSize: clamp(
    value?.translationFontSize ?? defaultReaderSettings.translationFontSize,
    0.9,
    1.5
  )
});
