import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import type { SurahSummary } from "@/lib/api";
import { cn, formatAyahCount } from "@/lib/utils";

interface SurahCardProps {
  surah: SurahSummary;
  className?: string;
}

export function SurahCard({ surah, className }: SurahCardProps) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className={cn(
        "group relative overflow-hidden rounded-4xl border border-white/70 bg-white/85 p-5 shadow-[0_24px_70px_-40px_rgba(43,29,18,0.45)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-emerald-500/30 hover:shadow-[0_36px_90px_-42px_rgba(16,185,129,0.35)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(180,83,9,0.08),transparent_26%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-sm font-semibold text-stone-50">
            {surah.id}
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700/80">{surah.revelationType}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-stone-950">{surah.nameEnglish}</h3>
            <p className="mt-1 text-sm text-stone-500">{surah.nameEnglishTranslation}</p>
          </div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-stone-300 transition group-hover:text-emerald-700" />
      </div>

      <div className="relative mt-7 flex items-end justify-between gap-4">
        <div>
          <p
            dir="rtl"
            className="text-[1.95rem] leading-none text-stone-950"
            style={{ fontFamily: "var(--font-arabic-current)" }}
          >
            {surah.nameArabic}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-600">
            <BookOpen className="h-4 w-4" />
            <span>{formatAyahCount(surah.ayahCount)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
