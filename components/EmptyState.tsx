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
        "rounded-4xl border border-white/60 bg-white/85 p-8 text-center shadow-[0_24px_60px_-35px_rgba(43,29,18,0.4)] backdrop-blur",
        className,
      )}
    >
      {icon ? (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-stone-50">
          {icon}
        </div>
      ) : null}
      <h3 className="text-xl font-semibold tracking-tight text-stone-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-stone-600">{description}</p>
    </div>
  );
}
