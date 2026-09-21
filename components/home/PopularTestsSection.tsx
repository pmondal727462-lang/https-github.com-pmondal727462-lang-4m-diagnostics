import { Container } from "../ui/Container";
import { SectionHeading, EmptyState } from "../ui/Card";
import { LinkButton } from "../ui/Button";
import { TestCard } from "../TestCard";
import { getPopularTests } from "../../lib/data/tests";

export async function PopularTestsSection() {
  const tests = await getPopularTests(6);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Frequently booked"
            title="Popular Tests"
            description="Search our full catalogue of laboratory tests by name, code or category."
          />
          <LinkButton href="/tests" variant="outline">
            View All Tests
          </LinkButton>
        </div>

        <div className="mt-8">
          {tests.length === 0 ? (
            <EmptyState
              title="Tests will appear here soon"
              description="Our lab team is publishing the test catalogue in the admin dashboard."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
