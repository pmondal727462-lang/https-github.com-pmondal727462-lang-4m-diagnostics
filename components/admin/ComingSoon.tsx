export function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface/60 p-10 text-center">
        <p className="font-semibold text-foreground">This module is being built in the next development phase</p>
        <p className="mt-1 text-sm text-muted">
          {note ?? "It will follow the same admin patterns already in place for Tests and Packages."}
        </p>
      </div>
    </div>
  );
}
