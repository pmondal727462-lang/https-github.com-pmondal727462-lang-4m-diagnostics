import Container from "@/components/ui/Container";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="bg-blob -left-20 -top-20 h-64 w-64 bg-blue-300" aria-hidden="true" />
      <div className="bg-blob -right-16 -bottom-16 h-64 w-64 bg-red-300" aria-hidden="true" />

      <Container className="relative py-12 sm:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 shadow-sm ring-1 ring-blue-100">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
