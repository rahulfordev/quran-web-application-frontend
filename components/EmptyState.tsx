import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-4xl border border-white/60 bg-white/85 p-6 text-center shadow-[0_10px_24px_-18px_rgba(43,29,18,0.16)] backdrop-blur sm:p-8",
        className,
      )}
    >
      {icon ? (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-stone-50">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone-600 sm:leading-7">{description}</p>
    </div>
  );
}
