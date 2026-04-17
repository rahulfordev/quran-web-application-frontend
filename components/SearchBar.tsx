"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder, className }: SearchBarProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-full border border-stone-200/80 bg-white/90 px-4 py-3 shadow-[0_20px_50px_-35px_rgba(43,29,18,0.45)] transition focus-within:border-emerald-500/60 focus-within:shadow-[0_24px_60px_-38px_rgba(16,185,129,0.55)]",
        className
      )}
    >
      <Search className="h-5 w-5 text-stone-400 transition group-focus-within:text-emerald-700" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:text-base"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-800"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
