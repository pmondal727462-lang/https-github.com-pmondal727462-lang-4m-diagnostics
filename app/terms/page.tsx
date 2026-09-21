import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { BUSINESS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
      <div className="prose prose-neutral mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          These terms govern your use of the {BUSINESS.name} website and the booking of tests,
          packages, home sample collection, and doctor appointments through it. By using this
          website, you agree to these terms.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Bookings</h2>
        <p>
          Test, package, and appointment availability, along with prices and offers, are
          maintained by {BUSINESS.name} and may change. A booking is confirmed once payment is
          successfully processed and you receive a booking confirmation.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Accuracy of information</h2>
        <p>
          Please provide accurate personal, contact, and address information at the time of
          booking. Incorrect information may delay sample collection, appointments, or report
          delivery.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Reports and medical advice</h2>
        <p>
          Diagnostic reports are prepared by our laboratory and are intended to support, not
          replace, consultation with a qualified healthcare professional. {BUSINESS.name} does
          not provide medical diagnosis through this website or its AI assistant.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Payments</h2>
        <p>
          Payments made through this website are processed via a secure third-party payment
          gateway. {BUSINESS.name} does not store your full payment card details.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of this website after an
          update constitutes acceptance of the revised terms.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p>
          For questions about these terms, contact {BUSINESS.name} at {BUSINESS.phone}.
        </p>
      </div>
    </Container>
  );
}
