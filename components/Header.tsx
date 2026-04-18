"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LibraryBig, Search, Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useReaderSettings } from "@/providers/SettingsProvider";

const navigationItems = [
  { href: "/", label: "Surahs", icon: LibraryBig },
  { href: "/search", label: "Search", icon: Search },
];

export function Header() {
  const pathname = usePathname();
  const { setIsPanelOpen } = useReaderSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[rgba(250,246,240,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-stone-200/80 bg-white/90 shadow-[0_8px_18px_-14px_rgba(43,29,18,0.14)] sm:h-11 sm:w-11">
            <Image
              src="/favicon.png"
              alt="Tarteel Reader logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-xl object-cover sm:h-9 sm:w-9"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg tracking-tight text-stone-950 sm:text-xl">
              Tarteel Reader
            </p>
            <p className="hidden text-xs uppercase tracking-[0.32em] text-stone-500 sm:block">
              Quran reading companion
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 p-1.5 shadow-[0_10px_24px_-18px_rgba(43,29,18,0.16)] md:flex">
          {navigationItems.map(({ href, icon: Icon, label }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-stone-950 !text-stone-50"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 shadow-[0_10px_24px_-18px_rgba(43,29,18,0.16)] transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-stone-950 md:hidden"
            aria-label="Open ayah search"
          >
            <Search className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsPanelOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-stone-200/80 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 shadow-[0_10px_24px_-18px_rgba(43,29,18,0.16)] transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-stone-950 sm:px-4"
            aria-label="Open reading settings"
          >
            <Settings2 className="h-4 w-4" />
            <span className="hidden md:inline">Reading settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
