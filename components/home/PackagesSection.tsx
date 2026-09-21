import { Container } from "../ui/Container";
import { SectionHeading, EmptyState } from "../ui/Card";
import { LinkButton } from "../ui/Button";
import { PackageCard } from "../PackageCard";
import { getActivePackages } from "../../lib/data/packages";

export async function PackagesSection() {
  const packages = await getActivePackages(6);

  return (
    <section className="border-t border-border bg-surface/50 py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Bundled & better value"
            title="Health Packages"
            description="Curated health packages across general health, diabetes, thyroid, heart, and more."
          />
          <LinkButton href="/packages" variant="outline">
            View All Packages
          </LinkButton>
        </div>

        <div className="mt-8">
          {packages.length === 0 ? (
            <EmptyState
              title="Health packages will appear here soon"
              description="Our lab team is publishing health packages in the admin dashboard."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
