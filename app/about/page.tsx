import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { BUSINESS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${BUSINESS.name}, a diagnostic centre offering diagnostic, pathology and polyclinic services in Narendrapur, Rajpur Sonarpur.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="About us" title={`About ${BUSINESS.name}`} />
      <div className="mt-6 max-w-3xl space-y-4 text-muted">
        <p>
          {BUSINESS.name} is a {BUSINESS.category.toLowerCase()} based in Narendrapur, Rajpur
          Sonarpur, West Bengal, offering {BUSINESS.services.join(", ").toLowerCase()} to the
          local community.
        </p>
        <p>
          We combine in-centre visits with convenient digital booking, home sample collection,
          and secure online access to reports — so patients can manage their diagnostic needs
          without unnecessary friction.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {BUSINESS.services.map((service) => (
          <div key={service} className="rounded-2xl border border-border bg-surface p-6">
            <p className="font-semibold text-foreground">{service}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
