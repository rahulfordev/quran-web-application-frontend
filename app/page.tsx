import { BookOpenText, Compass } from "lucide-react";

import { ErrorState } from "@/components/ErrorState";
import { SurahDirectory } from "@/components/SurahDirectory";
import { getSurahs } from "@/services/api";

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
      <section className="grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-8">
        <div className="min-w-0 overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,240,231,0.84))] p-6 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.22)] backdrop-blur sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-700/80">Quran Directory</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-display tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
            A calm, typography-first Quran reading experience.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            Browse every surah, step into a focused reading view, and personalize Arabic typography for long, comfortable sessions.
          </p>
        </div>

        <div className="min-w-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="min-w-0 overflow-hidden rounded-4xl border border-white/70 bg-white/85 p-5 shadow-[0_8px_18px_-14px_rgba(43,29,18,0.14)] backdrop-blur sm:p-6">
            <BookOpenText className="h-6 w-6 text-emerald-700" />
            <p className="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:mt-5 sm:text-4xl">{response.total}</p>
            <p className="mt-1 text-sm text-stone-500">Surahs statically rendered from the backend API.</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-4xl border border-white/70 bg-white/85 p-5 shadow-[0_8px_18px_-14px_rgba(43,29,18,0.14)] backdrop-blur sm:p-6">
            <Compass className="h-6 w-6 text-amber-700" />
            <p className="mt-4 text-base font-semibold tracking-tight text-stone-950 sm:mt-5 sm:text-lg">Designed for reading, not dashboards</p>
            <p className="mt-2 text-sm leading-6 text-stone-500 sm:leading-7">
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
