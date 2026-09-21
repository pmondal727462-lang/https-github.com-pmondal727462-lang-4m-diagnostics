import Link from "next/link";
import { Container } from "../ui/Container";
import { Card, SectionHeading, EmptyState } from "../ui/Card";
import { getActiveServices } from "../../lib/data/services";

const ICONS: Record<string, string> = {
  "diagnostic-services": "🧬",
  pathology: "🔬",
  polyclinic: "🏥",
};

export async function ServicesSection() {
  const services = await getActiveServices();

  return (
    <section className="border-t border-border bg-surface/50 py-16">
      <Container>
        <SectionHeading
          eyebrow="What we offer"
          title="Our Services"
          description="Every service below is enabled and kept up to date from the 4M Diagnostics admin dashboard."
        />
        <div className="mt-8">
          {services.length === 0 ? (
            <EmptyState
              title="Services will appear here soon"
              description="Our team is finalising service listings in the admin dashboard."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.id} className="p-6">
                  <span className="text-3xl">{ICONS[service.slug] ?? "✅"}</span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{service.name}</h3>
                  {service.description ? (
                    <p className="mt-2 text-sm text-muted">{service.description}</p>
                  ) : null}
                  <Link
                    href="/services"
                    className="mt-4 inline-block text-sm font-semibold text-brand-primary"
                  >
                    Learn more →
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
