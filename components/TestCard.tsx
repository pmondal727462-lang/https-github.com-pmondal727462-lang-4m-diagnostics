import Link from "next/link";
import { Card } from "./ui/Card";
import { formatINR } from "../lib/format";
import type { Test, TestCategory } from "../generated/prisma/client";

export function TestCard({ test }: { test: Test & { category: TestCategory } }) {
  const hasOffer = test.offerPrice !== null && Number(test.offerPrice) < Number(test.price);

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            {test.category.name}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{test.name}</h3>
        </div>
        {test.homeCollectionAvailable ? (
          <span className="shrink-0 rounded-full bg-brand-accent/10 px-2.5 py-1 text-[11px] font-semibold text-brand-accent">
            Home Collection
          </span>
        ) : null}
      </div>

      {test.description ? (
        <p className="mt-2 line-clamp-2 text-sm text-muted">{test.description}</p>
      ) : null}

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
        {test.sampleType ? (
          <div>
            <dt className="font-medium text-foreground/70">Sample</dt>
            <dd>{test.sampleType}</dd>
          </div>
        ) : null}
        <div>
          <dt className="font-medium text-foreground/70">Fasting</dt>
          <dd>{test.fastingRequired ? `${test.fastingDurationHours ?? ""} hrs` : "Not required"}</dd>
        </div>
        {test.reportTimeHours ? (
          <div>
            <dt className="font-medium text-foreground/70">Report time</dt>
            <dd>{test.reportTimeHours} hrs</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-4 flex flex-1 items-end justify-between gap-3">
        <div>
          {hasOffer ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">
                {formatINR(test.offerPrice!)}
              </span>
              <span className="text-sm text-muted line-through">{formatINR(test.price)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-foreground">{formatINR(test.price)}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/tests/${test.slug}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-primary hover:text-brand-primary"
          >
            View Details
          </Link>
          <Link
            href={`/book-test?testId=${test.id}`}
            className="rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-primary-dark"
          >
            Book Now
          </Link>
        </div>
      </div>
    </Card>
  );
}
