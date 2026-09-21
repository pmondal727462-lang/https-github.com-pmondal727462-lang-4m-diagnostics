import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { BUSINESS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-3xl font-bold text-foreground">Refund &amp; Cancellation Policy</h1>
      <div className="prose prose-neutral mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          This policy covers cancellations and refunds for tests, packages, home sample
          collection, and doctor appointments booked through the {BUSINESS.name} website.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Cancelling a booking</h2>
        <p>
          You can request cancellation of a booking before your sample has been collected or
          your appointment has taken place by contacting {BUSINESS.name} at {BUSINESS.phone} or
          through your patient dashboard, quoting your booking ID.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Refunds</h2>
        <p>
          Refund eligibility depends on the status of your booking at the time of cancellation.
          Once a sample has been collected or processing has begun, the booking may no longer be
          eligible for a full refund. Approved refunds are issued to the original payment method
          through our payment gateway; processing times depend on your bank or payment provider.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Home sample collection</h2>
        <p>
          If our collection staff are unable to reach you at the scheduled time and address due
          to incorrect details provided at booking, a rescheduling or cancellation charge may
          apply.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Need help?</h2>
        <p>
          For the current status of a refund or to discuss a specific booking, please contact us
          directly — our team will confirm the exact amount and timeline for your case.
        </p>
      </div>
    </Container>
  );
}
