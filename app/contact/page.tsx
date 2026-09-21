import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { LinkButton } from "../../components/ui/Button";
import { BUSINESS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${BUSINESS.name} in Narendrapur, Rajpur Sonarpur — call, WhatsApp, or get directions.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Get in touch" title={`Contact ${BUSINESS.name}`} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-lg font-semibold text-foreground">{BUSINESS.name}</h2>
          <address className="mt-3 not-italic leading-relaxed text-muted">
            {BUSINESS.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4 font-semibold text-foreground">{BUSINESS.phone}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={BUSINESS.phoneHref}>Call Now</LinkButton>
            <LinkButton href={BUSINESS.whatsappHref} variant="accent" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </LinkButton>
            <LinkButton href={BUSINESS.googleMapsUrl} variant="outline" target="_blank" rel="noopener noreferrer">
              Get Directions
            </LinkButton>
          </div>
        </div>

        <a
          href={BUSINESS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center transition-shadow hover:shadow-md"
        >
          <div>
            <span className="text-4xl">📍</span>
            <p className="mt-3 font-semibold text-foreground">Open in Google Maps</p>
            <p className="text-sm text-muted">Narendrapur, Rajpur Sonarpur, West Bengal</p>
          </div>
        </a>
      </div>
    </Container>
  );
}
