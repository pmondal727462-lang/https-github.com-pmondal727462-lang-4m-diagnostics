import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore diagnostic services at 4M Diagnostics: blood tests, pathology tests, health checkups, home sample collection, polyclinic and specialist doctor consultations.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive diagnostic & healthcare services"
        subtitle="From routine blood work to specialist consultations, 4M Diagnostics supports your healthcare journey end to end."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
