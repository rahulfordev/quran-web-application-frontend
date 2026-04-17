import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function RootLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <LoadingSkeleton className="h-14 max-w-xl rounded-full" />
        <LoadingSkeleton className="h-6 max-w-2xl" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <LoadingSkeleton className="h-56 rounded-4xl" />
        <LoadingSkeleton className="h-56 rounded-4xl" />
        <LoadingSkeleton className="h-56 rounded-4xl" />
      </div>
    </main>
  );
}
