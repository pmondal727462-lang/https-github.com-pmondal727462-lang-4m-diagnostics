export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-surface p-5">
      <div className="h-3 w-20 rounded bg-border" />
      <div className="mt-3 h-4 w-3/4 rounded bg-border" />
      <div className="mt-2 h-3 w-full rounded bg-border" />
      <div className="mt-6 h-8 w-full rounded bg-border" />
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
