import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PhotoBanner from "@/components/ui/PhotoBanner";
import PackageCard from "@/components/packages/PackageCard";
import { HEALTH_PACKAGES } from "@/lib/health-packages";

export const metadata: Metadata = {
  title: "Health Packages",
  description:
    "Curated health checkup packages at 4M Diagnostics, Narendrapur — basic, complete, diabetes, thyroid, heart, liver, kidney, women's, men's and senior citizen checkups.",
  alternates: { canonical: "/health-packages" },
};

export default function HealthPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Packages"
        title="Curated health checkup packages"
        subtitle="Contact us for package details and pricing. Our team will help you choose the right checkup for your needs."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <PhotoBanner
            src="/images/blood-typing-card.jpg"
            alt="Laboratory diagnostic testing as part of a health checkup"
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HEALTH_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
