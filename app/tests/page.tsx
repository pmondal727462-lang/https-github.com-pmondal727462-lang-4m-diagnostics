import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading, EmptyState } from "../../components/ui/Card";
import { TestCard } from "../../components/TestCard";
import { searchTests, getActiveTestCategories } from "../../lib/data/tests";

export const metadata: Metadata = {
  title: "Tests & Packages",
  description:
    "Search laboratory tests by name, code or category at 4M Diagnostics, Narendrapur, Rajpur Sonarpur.",
  alternates: { canonical: "/tests" },
};

export default async function TestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;
  const categorySlug = typeof params.category === "string" ? params.category : undefined;
  const homeCollectionOnly = params.homeCollection === "1";
  const popularOnly = params.popular === "1";
  const page = typeof params.page === "string" ? Number(params.page) : 1;

  const [{ tests, total, totalPages }, categories] = await Promise.all([
    searchTests({ query, categorySlug, homeCollectionOnly, popularOnly, page }),
    getActiveTestCategories(),
  ]);

  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Search" title="Tests & Packages" description="Find a test by name, code, category, or keyword." />

      <form className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[1fr_auto_auto_auto_auto]" method="get">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search by test name, code, or keyword"
          className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary sm:col-span-1"
          aria-label="Search tests"
        />
        <select
          name="category"
          defaultValue={categorySlug ?? ""}
          className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-primary"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
          <input type="checkbox" name="homeCollection" value="1" defaultChecked={homeCollectionOnly} />
          Home Collection
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
          <input type="checkbox" name="popular" value="1" defaultChecked={popularOnly} />
          Popular
        </label>
        <button
          type="submit"
          className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark"
        >
          Search
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">{total} test{total === 1 ? "" : "s"} found</p>

      <div className="mt-4">
        {tests.length === 0 ? (
          <EmptyState
            title="No tests match your search"
            description="Try a different keyword, or clear the filters to see everything available."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 ? (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const qs = new URLSearchParams();
            if (query) qs.set("q", query);
            if (categorySlug) qs.set("category", categorySlug);
            if (homeCollectionOnly) qs.set("homeCollection", "1");
            if (popularOnly) qs.set("popular", "1");
            qs.set("page", String(p));
            return (
              <a
                key={p}
                href={`/tests?${qs.toString()}`}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  p === page
                    ? "bg-brand-primary text-white"
                    : "border border-border text-foreground hover:border-brand-primary"
                }`}
              >
                {p}
              </a>
            );
          })}
        </nav>
      ) : null}
    </Container>
  );
}
