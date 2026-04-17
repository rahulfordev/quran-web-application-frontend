"use client";

import { X } from "lucide-react";

import { arabicFontOptions } from "@/lib/settings";
import { useReaderSettings } from "@/providers/SettingsProvider";

export function SettingsPanel() {
  const {
    settings,
    setArabicFont,
    setArabicFontSize,
    setTranslationFontSize,
    resetSettings,
    isPanelOpen,
    setIsPanelOpen
  } = useReaderSettings();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-stone-950/35 transition ${isPanelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsPanelOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-white/60 bg-[linear-gradient(180deg,rgba(255,251,245,0.98),rgba(247,240,231,0.96))] p-6 shadow-2xl shadow-stone-900/30 transition duration-300 ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700/70">Settings</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-stone-950">Tune your reading flow</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Adjust Arabic font style and text sizes. Your preferences are saved locally and follow you across pages.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            className="rounded-full border border-stone-200 bg-white p-2 text-stone-500 transition hover:text-stone-950"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <section className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(43,29,18,0.35)]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">Arabic font</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {arabicFontOptions.map((option) => {
                const active = option.value === settings.arabicFont;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setArabicFont(option.value)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${active ? "border-stone-950 bg-stone-950 text-stone-50" : "border-stone-200 bg-white text-stone-700 hover:border-emerald-500/50 hover:text-stone-950"}`}
                  >
                    <p className="text-sm font-medium">{option.label}</p>
                    <p
                      dir="rtl"
                      className="mt-3 text-2xl leading-none"
                      style={{
                        fontFamily:
                          option.value === "amiri"
                            ? "var(--font-arabic-amiri)"
                            : "var(--font-arabic-scheherazade)"
                      }}
                    >
                      الحمد
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(43,29,18,0.35)]">
            <label className="block text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              Arabic font size
            </label>
            <input
              type="range"
              min={1.8}
              max={3.6}
              step={0.1}
              value={settings.arabicFontSize}
              onChange={(event) => setArabicFontSize(Number(event.target.value))}
              className="mt-4 w-full accent-stone-950"
            />
            <p className="mt-3 text-sm text-stone-600">{settings.arabicFontSize.toFixed(1)}rem</p>
          </section>

          <section className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_-38px_rgba(43,29,18,0.35)]">
            <label className="block text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              Translation font size
            </label>
            <input
              type="range"
              min={0.9}
              max={1.5}
              step={0.05}
              value={settings.translationFontSize}
              onChange={(event) => setTranslationFontSize(Number(event.target.value))}
              className="mt-4 w-full accent-stone-950"
            />
            <p className="mt-3 text-sm text-stone-600">{settings.translationFontSize.toFixed(2)}rem</p>
          </section>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="mt-8 w-full rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-500/40 hover:text-stone-950"
        >
          Reset to default
        </button>
      </aside>
    </>
  );
}
