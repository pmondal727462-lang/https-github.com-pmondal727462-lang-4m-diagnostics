import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PhotoBanner from "@/components/ui/PhotoBanner";
import TestDirectory from "@/components/tests/TestDirectory";

export const metadata: Metadata = {
  title: "Blood Tests",
  description:
    "Comprehensive blood test catalogue at 4M Diagnostics, Narendrapur — CBC, diabetes, liver, kidney, thyroid, lipid profile and more. Book on WhatsApp.",
  alternates: { canonical: "/blood-tests" },
};

export default function BloodTestsPage() {
  return (
    <>
      <PageHero
        eyebrow="Blood Tests"
        title="Comprehensive blood test catalogue"
        subtitle="Search across CBC & hematology, diabetes, liver, kidney, thyroid, lipid profile, hormones, infections and more."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <PhotoBanner
            src="/images/blood-test-tubes.jpg"
            alt="Blood sample collection tubes ready for testing"
            className="mb-12"
          />
          <TestDirectory />
        </Container>
      </section>
    </>
  );
}
