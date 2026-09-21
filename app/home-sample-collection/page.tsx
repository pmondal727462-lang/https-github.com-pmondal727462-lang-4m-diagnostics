import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { BookingForm, type CatalogItem } from "../../components/booking/BookingForm";
import { getTestById } from "../../lib/data/tests";
import { getPackageById } from "../../lib/data/packages";

export const metadata: Metadata = {
  title: "Home Sample Collection",
  description: "Request home sample collection for diagnostic tests in Narendrapur, Rajpur Sonarpur.",
  alternates: { canonical: "/home-sample-collection" },
};

export default async function HomeSampleCollectionPage({
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
      <SectionHeading eyebrow="At your doorstep" title="Home Sample Collection" />
      <div className="mt-8">
        <BookingForm defaultType="HOME_COLLECTION" initialItem={initialItem} />
      </div>
    </Container>
  );
}
