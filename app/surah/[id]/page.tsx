import { notFound } from "next/navigation";

import { AyahItem } from "@/components/AyahItem";
import { ErrorState } from "@/components/ErrorState";
import { ApiClientError, getSurahById, getSurahs } from "@/services/api";
import type { SurahDetailsPayload } from "@/types/api";

export const revalidate = 3600;

export async function generateStaticParams() {
  const response = await getSurahs();
  return response.items.map((surah) => ({ id: surah.id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await getSurahById(Number(id));
    return {
      title: `${response.surah.nameEnglish} - ${response.surah.nameArabic}`
    };
  } catch {
    return {
      title: "Surah not found"
    };
  }
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let payload: SurahDetailsPayload;

  try {
    payload = await getSurahById(Number(id));
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }

    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState description="The backend could not return this surah right now. Please try again after confirming the API is available." />
      </main>
    );
  }

  if (!payload.ayahs?.length) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState title="This surah did not include ayah data" description="The backend returned the surah metadata, but the ayah list was missing or empty." />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-4xl border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(247,240,231,0.86))] p-8 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.22)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-700/80">{payload.surah.revelationType}</p>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-5xl tracking-tight text-stone-950 sm:text-6xl">{payload.surah.nameEnglish}</h1>
            <p className="mt-3 text-lg text-stone-500">{payload.surah.nameEnglishTranslation}</p>
          </div>
          <div className="text-right">
            <p
              dir="rtl"
              className="text-5xl leading-none text-stone-950 sm:text-6xl"
              style={{ fontFamily: "var(--font-arabic-current)" }}
            >
              {payload.surah.nameArabic}
            </p>
            <p className="mt-3 text-sm text-stone-500">{payload.surah.ayahCount} ayahs</p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        {payload.ayahs.map((ayah) => (
          <div key={ayah.globalNumber} id={`ayah-${ayah.numberInSurah}`}>
            <AyahItem ayah={ayah} />
          </div>
        ))}
      </section>
    </main>
  );
}
