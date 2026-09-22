import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import TestDirectory from "@/components/tests/TestDirectory";

export const metadata: Metadata = {
  title: "All Diagnostic Tests",
  description:
    "Browse all diagnostic and pathology tests available at 4M Diagnostics, Narendrapur. Search by test name or category and book instantly on WhatsApp.",
  alternates: { canonical: "/tests" },
};

export default function TestsPage() {
  return (
    <>
      <PageHero
        eyebrow="All Diagnostic Tests"
        title="Search our complete diagnostic test catalogue"
        subtitle="Find the right test by name or category. Book on WhatsApp and our team will confirm availability and pricing."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <TestDirectory />
        </Container>
      </section>
    </>
  );
}
