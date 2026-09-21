import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading, EmptyState } from "../../components/ui/Card";
import { PackageCard } from "../../components/PackageCard";
import { getActivePackages } from "../../lib/data/packages";

export const metadata: Metadata = {
  title: "Health Packages",
  description:
    "Health packages across general health, diabetes, thyroid, heart, kidney, liver and more at 4M Diagnostics.",
  alternates: { canonical: "/packages" },
};

export default async function PackagesPage() {
  const packages = await getActivePackages();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Bundled & better value"
        title="Health Packages"
        description="Curated packages covering multiple tests at once."
      />

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
  );
}
