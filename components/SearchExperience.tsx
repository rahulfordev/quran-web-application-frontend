"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Search as SearchIcon } from "lucide-react";

import {
  type SearchPayload,
  type SearchResultItem,
  ApiClientError,
  searchAyahs,
} from "@/lib/api";
import { normalizeText } from "@/lib/utils";

import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { SearchBar } from "./SearchBar";

const highlightText = (text: string, query: string) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return text;
  }

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "ig",
  );
  const segments = text.split(regex);

  return segments.map((segment, index) =>
    normalizeText(segment) === normalizedQuery ? (
      <mark
        key={`${segment}-${index}`}
        className="rounded bg-emerald-100 px-1 text-emerald-900"
      >
        {segment}
      </mark>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    ),
  );
};

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [results, setResults] = useState<SearchPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const trimmedQuery = deferredQuery.trim();
  const shouldSearch = trimmedQuery.length >= 2;

  useEffect(() => {
    if (!shouldSearch) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      setErrorMessage(null);
      setResults(null);

      try {
        const payload = await searchAyahs(trimmedQuery, controller.signal);
        setResults(payload);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setResults(null);
        setErrorMessage(
          error instanceof ApiClientError
            ? error.message
            : "Unable to search right now. Please try again.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 280);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [shouldSearch, trimmedQuery]);

  const visibleResults = shouldSearch ? results : null;
  const visibleError = shouldSearch ? errorMessage : null;

  const helperState = useMemo(() => {
    if (!query.trim()) {
      return (
        <EmptyState
          title="Search by translation"
          description="Start with a word like mercy, light, patience, or guidance and we will search the English translation across the Quran."
          icon={<SearchIcon className="h-6 w-6" />}
        />
      );
    }

    if (query.trim().length < 2) {
      return (
        <EmptyState
          title="Add a little more context"
          description="Search works best with at least two characters so the results stay useful."
          icon={<Compass className="h-6 w-6" />}
        />
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-4">
          <LoadingSkeleton className="h-40 rounded-4xl" />
          <LoadingSkeleton className="h-40 rounded-4xl" />
          <LoadingSkeleton className="h-40 rounded-4xl" />
        </div>
      );
    }

    if (visibleError) {
      return <ErrorState description={visibleError} />;
    }

    if (visibleResults && visibleResults.items.length === 0) {
      return (
        <EmptyState
          title="No ayahs matched that phrase"
          description="Try a broader keyword or a different English translation phrase. Search is case-insensitive and supports partial matching."
          icon={<SearchIcon className="h-6 w-6" />}
        />
      );
    }

    return null;
  }, [isLoading, query, visibleError, visibleResults]);

  return (
    <div className="space-y-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search the translation text, for example: mercy, truth, patience"
        className="max-w-3xl"
      />

      {visibleResults &&
      visibleResults.items.length > 0 &&
      !isLoading &&
      !visibleError ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700/70">
                Results
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-stone-950">
                {visibleResults.pagination.totalResults} ayah matches for &quot;
                {visibleResults.query}&quot;
              </h2>
            </div>
            <p className="text-sm text-stone-500">
              Page {visibleResults.pagination.page} of{" "}
              {visibleResults.pagination.totalPages}
            </p>
          </div>

          {visibleResults.items.map((result) => (
            <SearchResultCard
              key={`${result.surahId}-${result.ayahNumber}-${result.translationText}`}
              item={result}
              query={visibleResults.query}
            />
          ))}
        </div>
      ) : null}

      {helperState}
    </div>
  );
}

function SearchResultCard({
  item,
  query,
}: {
  item: SearchResultItem;
  query: string;
}) {
  return (
    <article className="rounded-4xl border border-white/70 bg-white/88 p-6 shadow-[0_12px_28px_-20px_rgba(43,29,18,0.18)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700/70">
            {item.revelationType}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-950">
            {item.surahNameEnglish} - Ayah {item.ayahNumber}
          </h3>
          <p
            dir="rtl"
            className="mt-2 text-2xl text-stone-800"
            style={{ fontFamily: "var(--font-arabic-current)" }}
          >
            {item.surahNameArabic}
          </p>
        </div>

        <Link
          href={`/surah/${item.surahId}#ayah-${item.ayahNumber}`}
          className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-emerald-500/40 hover:text-stone-950"
        >
          Open in reader
        </Link>
      </div>

      <p
        dir="rtl"
        className="mt-6 text-right leading-[2] text-stone-950 [font-size:var(--reader-arabic-size)]"
        style={{ fontFamily: "var(--font-arabic-current)" }}
      >
        {item.arabicText}
      </p>

      <p className="mt-5 leading-8 text-stone-700 [font-size:var(--reader-translation-size)]">
        {highlightText(item.translationText, query)}
      </p>
    </article>
  );
}
