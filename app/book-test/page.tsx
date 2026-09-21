import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { BookingForm, type CatalogItem } from "../../components/booking/BookingForm";
import { getTestById } from "../../lib/data/tests";
import { getPackageById } from "../../lib/data/packages";

export const metadata: Metadata = {
  title: "Book a Test",
  description: "Book a diagnostic test or health package online at 4M Diagnostics.",
  alternates: { canonical: "/book-test" },
};

export default async function BookTestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const testId = typeof params.testId === "string" ? params.testId : undefined;
  const packageId = typeof params.packageId === "string" ? params.packageId : undefined;

  let initialItem: CatalogItem | null = null;
  if (testId) {
    const test = await getTestById(testId);
    if (test) {
      initialItem = { id: test.id, kind: "test", name: test.name, price: Number(test.offerPrice ?? test.price) };
    }
  } else if (packageId) {
    const pkg = await getPackageById(packageId);
    if (pkg) {
      initialItem = {
        id: pkg.id,
        kind: "package",
        name: pkg.name,
        price: Number(pkg.offerPrice ?? pkg.regularPrice),
      };
    }
  }

  return (
    <Container className="max-w-3xl py-14">
      <SectionHeading eyebrow="Online booking" title="Book a Test" />
      <div className="mt-8">
        <BookingForm defaultType="CENTER_VISIT" initialItem={initialItem} />
      </div>
    </Container>
  );
}
