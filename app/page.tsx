import { BookOpenText, Compass } from "lucide-react";

import { ErrorState } from "@/components/ErrorState";
import { SurahDirectory } from "@/components/SurahDirectory";
import { getSurahs } from "@/lib/api-server";

export const revalidate = 3600;

export default async function HomePage() {
  const response = await loadSurahs();

  if (!response) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState description="The surah list could not be loaded from the backend API. Make sure the backend is running and the API base URL is correct." />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="rounded-4xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,240,231,0.84))] p-8 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.22)] backdrop-blur sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-700/80">Quran Directory</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight text-stone-950 sm:text-6xl">
            A calm, typography-first Quran reading experience.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
            Browse every surah, step into a focused reading view, and personalize Arabic typography for long, comfortable sessions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_8px_18px_-14px_rgba(43,29,18,0.14)] backdrop-blur">
            <BookOpenText className="h-6 w-6 text-emerald-700" />
            <p className="mt-5 text-4xl font-semibold tracking-tight text-stone-950">{response.total}</p>
            <p className="mt-1 text-sm text-stone-500">Surahs statically rendered from the backend API.</p>
          </div>
          <div className="rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_8px_18px_-14px_rgba(43,29,18,0.14)] backdrop-blur">
            <Compass className="h-6 w-6 text-amber-700" />
            <p className="mt-5 text-lg font-semibold tracking-tight text-stone-950">Designed for reading, not dashboards</p>
            <p className="mt-2 text-sm leading-7 text-stone-500">
              Larger Arabic text, softer surfaces, and distraction-light spacing to keep the page comfortable.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SurahDirectory surahs={response.items} />
      </section>
    </main>
  );
}

async function loadSurahs() {
  try {
    return await getSurahs();
  } catch {
    return null;
  }
}
