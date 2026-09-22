import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for 4M Diagnostics website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-slate flex flex-col gap-6 text-sm leading-7 text-slate-700">
            <p>
              This Privacy Policy explains how {BUSINESS.name} (&quot;we&quot;, &quot;us&quot;,
              &quot;our&quot;) handles information in connection with your use of this
              website.
            </p>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Information We Collect
              </h2>
              <p className="mt-2">
                This website does not have a login system, patient portal, or
                database. When you fill in a booking or appointment form
                (such as your name, age, gender, mobile number, preferred
                date/time, or test/appointment details), that information is
                only used to generate a pre-filled message that opens in
                WhatsApp. We do not store, transmit to a server, or process
                this information ourselves through this website &mdash; it is
                sent directly from your device to our WhatsApp number when
                you choose to send the message.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                How WhatsApp Communication Works
              </h2>
              <p className="mt-2">
                Clicking any &quot;Book on WhatsApp&quot;, &quot;Book Appointment&quot; or similar
                button opens WhatsApp (web or app) with a pre-filled message.
                You control whether to send this message. Once sent, your
                communication with {BUSINESS.name} over WhatsApp is subject to
                WhatsApp&apos;s own privacy policy and terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Cookies & Analytics
              </h2>
              <p className="mt-2">
                This website may use basic, privacy-respecting analytics to
                understand overall site usage and improve our services. We do
                not sell personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Contact Us
              </h2>
              <p className="mt-2">
                For any questions about this Privacy Policy, please contact us
                at {BUSINESS.phoneDisplay} or via WhatsApp.
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Last updated: this page describes the current, frontend-only
              nature of the website. It should be reviewed and confirmed by
              4M Diagnostics before publishing.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
