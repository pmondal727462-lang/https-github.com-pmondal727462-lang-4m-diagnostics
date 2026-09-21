import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/Card";
import { LinkButton } from "./ui/Button";
import { BUSINESS } from "../lib/constants";

export function ContactMapSection() {
  return (
    <section className="border-t border-border bg-surface/50 py-16">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Visit us" title="Find 4M Diagnostics" />
          <address className="mt-4 not-italic leading-relaxed text-muted">
            {BUSINESS.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 font-semibold text-foreground">{BUSINESS.phone}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={BUSINESS.phoneHref} variant="primary">
              Call Now
            </LinkButton>
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
          className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface text-center transition-shadow hover:shadow-md"
        >
          <div>
            <span className="text-4xl">📍</span>
            <p className="mt-3 font-semibold text-foreground">Open in Google Maps</p>
            <p className="text-sm text-muted">Narendrapur, Rajpur Sonarpur</p>
          </div>
        </a>
      </Container>
    </section>
  );
}
