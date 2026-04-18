"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SearchPayload } from "@/lib/api";

interface PaginationControlsProps {
  pagination: SearchPayload["pagination"];
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  pagination,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <nav
      className="flex flex-col gap-3 rounded-4xl border border-white/70 bg-white/85 p-4 shadow-[0_10px_24px_-18px_rgba(43,29,18,0.16)] backdrop-blur sm:flex-row sm:items-center sm:justify-between"
      aria-label="Search result pages"
    >
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700/70">
          Browse results
        </p>
        <p className="mt-1 text-sm text-stone-500">
          Showing page {pagination.page} of {pagination.totalPages} across{" "}
          {pagination.totalResults} matches.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
          disabled={!pagination.hasPreviousPage}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-emerald-500/40 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="inline-flex min-h-11 items-center rounded-full border border-stone-200/80 bg-white px-4 py-2 text-sm font-medium text-stone-600">
          {pagination.page} / {pagination.totalPages}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-emerald-500/40 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
