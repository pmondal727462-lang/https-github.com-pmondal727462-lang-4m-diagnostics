import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for using the 4M Diagnostics website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-slate flex flex-col gap-6 text-sm leading-7 text-slate-700">
            <p>
              By using this website, you agree to the following terms and
              conditions.
            </p>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Nature of This Website
              </h2>
              <p className="mt-2">
                This website is an informational, frontend-only site for{" "}
                {BUSINESS.name}. It does not process online payments, does not
                include a patient login or dashboard, and does not store
                personal or medical data in a database. All test bookings and
                doctor appointment requests are submitted as WhatsApp
                messages to our team, who will confirm details with you
                directly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Appointment & Booking Confirmation
              </h2>
              <p className="mt-2">
                Submitting a form on this website does not guarantee an
                appointment or test slot. All bookings are subject to
                confirmation by {BUSINESS.name} over WhatsApp or phone,
                including availability, timing and pricing.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Pricing
              </h2>
              <p className="mt-2">
                Test and package prices are not published on this website, as
                pricing may vary. Please contact {BUSINESS.name} directly for
                current pricing and availability.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Contact
              </h2>
              <p className="mt-2">
                For questions about these terms, contact us at{" "}
                {BUSINESS.phoneDisplay} or via WhatsApp.
              </p>
            </div>

            <p className="text-xs text-slate-500">
              This page should be reviewed and confirmed by 4M Diagnostics
              staff before publishing.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
