import { LinkButton } from "../components/ui/Button";
import { Container } from "../components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">Page not found</h1>
      <p className="mt-3 max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <LinkButton href="/">Go to Homepage</LinkButton>
        <LinkButton href="/contact" variant="outline">
          Contact Us
        </LinkButton>
      </div>
    </Container>
  );
}
