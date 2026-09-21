import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading, Card, EmptyState } from "../../components/ui/Card";
import { LinkButton } from "../../components/ui/Button";
import { getActiveServices } from "../../lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Diagnostic, pathology and polyclinic services offered by 4M Diagnostics.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <Container className="py-14">
      <SectionHeading eyebrow="What we offer" title="Our Services" />

      <div className="mt-8">
        {services.length === 0 ? (
          <EmptyState title="Services will appear here soon" />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{service.name}</h2>
                {service.description ? (
                  <p className="mt-2 text-sm text-muted">{service.description}</p>
                ) : null}
                <div className="mt-4 flex gap-3">
                  <LinkButton href="/tests" size="sm" variant="outline">
                    Browse Tests
                  </LinkButton>
                  <LinkButton href="/book-test" size="sm">
                    Book Now
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
