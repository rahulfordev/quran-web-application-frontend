"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import type { SurahSummary } from "@/lib/api";
import { normalizeText } from "@/lib/utils";

import { EmptyState } from "./EmptyState";
import { SearchBar } from "./SearchBar";
import { SurahCard } from "./SurahCard";

interface SurahDirectoryProps {
  surahs: SurahSummary[];
}

export function SurahDirectory({ surahs }: SurahDirectoryProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredSurahs = useMemo(() => {
    const normalizedQuery = normalizeText(deferredQuery);

    if (!normalizedQuery) {
      return surahs;
    }

    return surahs.filter((surah) =>
      [
        surah.nameEnglish,
        surah.nameArabic,
        surah.nameEnglishTranslation,
        `${surah.id}`,
      ]
        .map(normalizeText)
        .some((value) => value.includes(normalizedQuery)),
    );
  }, [deferredQuery, surahs]);

  return (
    <div className="space-y-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Filter surahs by number, Arabic name, or English title"
        className="max-w-2xl"
      />

      {filteredSurahs.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredSurahs.map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No surah matched that search"
          description="Try a surah number, an English title, or the Arabic name. The full list is still available once you clear the filter."
          icon={<Sparkles className="h-6 w-6" />}
        />
      )}
    </div>
  );
}
