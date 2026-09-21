import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "../../../components/ui/Container";
import { LinkButton } from "../../../components/ui/Button";
import { formatINR } from "../../../lib/format";
import { getPackageBySlug } from "../../../lib/data/packages";

const CATEGORY_LABELS: Record<string, string> = {
  GENERAL_HEALTH: "General Health",
  DIABETES: "Diabetes",
  THYROID: "Thyroid",
  WOMENS_HEALTH: "Women's Health",
  MENS_HEALTH: "Men's Health",
  SENIOR_CITIZEN: "Senior Citizen",
  HEART_HEALTH: "Heart Health",
  KIDNEY_HEALTH: "Kidney Health",
  LIVER_HEALTH: "Liver Health",
};

export async function generateMetadata(props: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: pkg.name,
    description: pkg.description ?? `${pkg.name} health package at 4M Diagnostics.`,
    alternates: { canonical: `/packages/${pkg.slug}` },
  };
}

export default async function PackageDetailPage(props: PageProps<"/packages/[slug]">) {
  const { slug } = await props.params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const hasOffer = pkg.offerPrice !== null && Number(pkg.offerPrice) < Number(pkg.regularPrice);

  return (
    <Container className="py-14">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
        {CATEGORY_LABELS[pkg.category] ?? pkg.category}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{pkg.name}</h1>
      {pkg.description ? <p className="mt-4 max-w-2xl text-muted">{pkg.description}</p> : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Tests Included ({pkg.tests.length})
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {pkg.tests.map(({ test }) => (
              <li key={test.id} className="rounded-lg border border-border px-3 py-2 text-sm text-muted">
                {test.name}
              </li>
            ))}
          </ul>

          {pkg.preparation ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground">Preparation</h2>
              <p className="mt-2 text-sm text-muted">{pkg.preparation}</p>
            </div>
          ) : null}

          <p className="mt-10 rounded-xl border border-border bg-surface/60 p-4 text-xs text-muted">
            This page provides general information about the package. It is not a substitute for
            professional medical advice — please consult a qualified healthcare professional to
            interpret your results.
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          {hasOffer ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {formatINR(pkg.offerPrice!)}
              </span>
              <span className="text-muted line-through">{formatINR(pkg.regularPrice)}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-foreground">
              {formatINR(pkg.regularPrice)}
            </span>
          )}

          <div className="mt-5 flex flex-col gap-3">
            <LinkButton href={`/book-test?packageId=${pkg.id}`} className="w-full">
              Book Now
            </LinkButton>
            {pkg.homeCollectionAvailable ? (
              <LinkButton
                href={`/home-sample-collection?packageId=${pkg.id}`}
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
