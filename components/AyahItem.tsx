import type { Ayah } from "@/types/api";

interface AyahItemProps {
  ayah: Ayah;
}

export function AyahItem({ ayah }: AyahItemProps) {
  return (
    <article className="rounded-4xl border border-white/60 bg-white/85 p-5 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.18)] backdrop-blur sm:p-8">
      <div className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-stone-500 sm:text-sm sm:tracking-[0.24em]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800">
          {ayah.numberInSurah}
        </span>
        <span>Ayah</span>
      </div>

      <p
        dir="rtl"
        className="mt-6 text-right leading-[2.1] text-stone-950 [font-size:var(--reader-arabic-size)]"
        style={{ fontFamily: "var(--font-arabic-current)" }}
      >
        {ayah.arabicText}
      </p>

      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

      <p className="mt-6 max-w-3xl leading-7 text-stone-700 [font-size:var(--reader-translation-size)] sm:leading-8">
        {ayah.translationText}
      </p>
    </article>
  );
}
