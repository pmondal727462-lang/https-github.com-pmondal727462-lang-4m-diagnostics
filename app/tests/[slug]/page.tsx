import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "../../../components/ui/Container";
import { LinkButton } from "../../../components/ui/Button";
import { formatINR } from "../../../lib/format";
import { getTestBySlug } from "../../../lib/data/tests";

export async function generateMetadata(props: PageProps<"/tests/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const test = await getTestBySlug(slug);
  if (!test) return {};
  return {
    title: test.name,
    description: test.description ?? `${test.name} at 4M Diagnostics, Narendrapur.`,
    alternates: { canonical: `/tests/${test.slug}` },
  };
}

export default async function TestDetailPage(props: PageProps<"/tests/[slug]">) {
  const { slug } = await props.params;
  const test = await getTestBySlug(slug);
  if (!test) notFound();

  const hasOffer = test.offerPrice !== null && Number(test.offerPrice) < Number(test.price);

  return (
    <Container className="py-14">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
        {test.category.name} &middot; {test.code}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{test.name}</h1>
      {test.description ? <p className="mt-4 max-w-2xl text-muted">{test.description}</p> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <dl className="grid gap-6 sm:grid-cols-2">
            <Detail label="Sample Type" value={test.sampleType ?? "—"} />
            <Detail label="Preparation" value={test.preparation ?? "No special preparation required"} />
            <Detail
              label="Fasting Requirement"
              value={test.fastingRequired ? "Required" : "Not required"}
            />
            {test.fastingRequired ? (
              <Detail
                label="Fasting Duration"
                value={test.fastingDurationHours ? `${test.fastingDurationHours} hours` : "—"}
              />
            ) : null}
            <Detail
              label="Report Turnaround Time"
              value={test.reportTimeHours ? `${test.reportTimeHours} hours` : "—"}
            />
            <Detail
              label="Home Collection"
              value={test.homeCollectionAvailable ? "Available" : "Not available"}
            />
          </dl>

          {test.parameters.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-foreground">Parameters Covered</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {test.parameters.map((param) => (
                  <li key={param.id} className="rounded-lg border border-border px-3 py-2 text-sm text-muted">
                    {param.name}
                    {param.unit ? ` (${param.unit})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-10 rounded-xl border border-border bg-surface/60 p-4 text-xs text-muted">
            This page provides general information about the test. It is not a substitute for
            professional medical advice — please consult a qualified healthcare professional to
            interpret your results.
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          {hasOffer ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {formatINR(test.offerPrice!)}
              </span>
              <span className="text-muted line-through">{formatINR(test.price)}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-foreground">{formatINR(test.price)}</span>
          )}

          <div className="mt-5 flex flex-col gap-3">
            <LinkButton href={`/book-test?testId=${test.id}`} className="w-full">
              Book Now
            </LinkButton>
            {test.homeCollectionAvailable ? (
              <LinkButton
                href={`/home-sample-collection?testId=${test.id}`}
                variant="outline"
                className="w-full"
              >
                Home Collection
              </LinkButton>
            ) : null}
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
