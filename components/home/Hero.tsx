import { LinkButton } from "../ui/Button";
import { Container } from "../ui/Container";
import { BUSINESS } from "../../lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-white to-background">
      <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
            Diagnostic Centre in Narendrapur, Rajpur Sonarpur
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Accurate Diagnostics.
            <br />
            Better Healthcare.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Reliable diagnostic, pathology and polyclinic services with convenient digital
            booking and patient support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/book-test" size="lg">
              Book a Test
            </LinkButton>
            <LinkButton href="/home-sample-collection" variant="outline" size="lg">
              Home Sample Collection
            </LinkButton>
            <LinkButton href="/ai-assistant" variant="ghost" size="lg">
              🤖 Ask 4M AI
            </LinkButton>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <span className="font-medium text-foreground">{BUSINESS.name}</span>
            <span>{BUSINESS.category}</span>
            <span>{BUSINESS.services.join(" · ")}</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg rounded-3xl border border-border bg-surface p-8 shadow-xl shadow-brand-primary/5">
          <div className="grid h-full grid-cols-2 gap-4">
            <HeroStat label="Digital reports" value="Secure access" />
            <HeroStat label="Home collection" value="At your address" />
            <HeroStat label="Bookings" value="Online, anytime" />
            <HeroStat label="Support" value="Call or WhatsApp" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-brand-primary/5 p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
