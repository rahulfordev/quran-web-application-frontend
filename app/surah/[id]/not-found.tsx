import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EmptyState } from "@/components/EmptyState";

export default function SurahNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <EmptyState
        title="That surah could not be found"
        description="The route does not match a prepared surah page, or the backend could not return its data."
      />
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-emerald-500/40 hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all surahs
        </Link>
      </div>
    </main>
  );
}
