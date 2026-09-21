import Link from "next/link";
import { Card } from "./ui/Card";
import { formatINR } from "../lib/format";
import type { Package, PackageTest, Test } from "../generated/prisma/client";

type PackageWithTests = Package & { tests: (PackageTest & { test: Test })[] };

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

export function PackageCard({ pkg }: { pkg: PackageWithTests }) {
  const hasOffer = pkg.offerPrice !== null && Number(pkg.offerPrice) < Number(pkg.regularPrice);

  return (
    <Card className="flex flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
        {CATEGORY_LABELS[pkg.category] ?? pkg.category}
      </p>
      <h3 className="mt-1 text-base font-semibold text-foreground">{pkg.name}</h3>
      {pkg.description ? (
        <p className="mt-2 line-clamp-2 text-sm text-muted">{pkg.description}</p>
      ) : null}
      <p className="mt-3 text-xs text-muted">{pkg.tests.length} tests included</p>

      <div className="mt-4 flex flex-1 items-end justify-between gap-3">
        <div>
          {hasOffer ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {formatINR(pkg.offerPrice!)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatINR(pkg.regularPrice)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-foreground">
              {formatINR(pkg.regularPrice)}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/packages/${pkg.slug}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-primary hover:text-brand-primary"
          >
            View Details
          </Link>
          <Link
            href={`/book-test?packageId=${pkg.id}`}
            className="rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-primary-dark"
          >
            Book Now
          </Link>
        </div>
      </div>
    </Card>
  );
}
