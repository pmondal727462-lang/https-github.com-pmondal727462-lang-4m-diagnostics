import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { BUSINESS } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
      <div className="prose prose-neutral mt-6 space-y-5 text-sm leading-relaxed text-muted">
        <p>
          {BUSINESS.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
          explains what information we collect through this website, why we collect it, and how
          we protect it.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
        <p>
          When you book a test, request home sample collection, book an appointment, or contact
          us, we collect information you provide directly — such as your name, mobile number,
          email address, age, gender, and address. When you complete a booking, we also record
          the tests or packages selected and payment status. We do not publicly expose patient
          information through website URLs.
        </p>

        <h2 className="text-lg font-semibold text-foreground">How we use your information</h2>
        <p>
          We use your information to process bookings and appointments, deliver diagnostic
          reports securely, send booking and payment confirmations by SMS, WhatsApp or email,
          and respond to support requests. We restrict access to sensitive information to
          authorised staff on a need-to-know basis.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Reports and health information</h2>
        <p>
          Diagnostic reports are considered sensitive personal information. Access to reports
          requires mobile number and OTP verification, and every report access is logged for
          audit purposes. Reports are never accessible through simple, guessable URLs.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Data sharing</h2>
        <p>
          We do not sell your personal information. We share information only with service
          providers necessary to operate this website and deliver our services (for example,
          payment processing, SMS/WhatsApp delivery, and secure file storage), and only to the
          extent required for that purpose.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information by
          contacting us using the details on our{" "}
          <a href="/contact" className="text-brand-primary underline">
            Contact page
          </a>
          .
        </p>

        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p>
          For any privacy-related questions, please contact {BUSINESS.name} at {BUSINESS.phone}{" "}
          or visit us at {BUSINESS.addressLines.join(", ")}.
        </p>
      </div>
    </Container>
  );
}
