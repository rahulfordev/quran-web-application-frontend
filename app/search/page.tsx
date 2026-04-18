import { SearchExperience } from "@/components/SearchExperience";

export const metadata = {
  title: "Search"
};

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-4xl border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(247,240,231,0.84))] p-6 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.22)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-700/80">Search</p>
        <h1 className="mt-4 font-display text-3xl tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">Find an ayah by meaning</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
          Search the English translation text, review results in a focused list, and jump directly into the full surah reader.
        </p>
      </section>

      <section className="mt-12">
        <SearchExperience />
      </section>
    </main>
  );
}
