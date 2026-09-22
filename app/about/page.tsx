import type { Metadata } from "next";
import { ShieldCheck, Stethoscope, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PhotoBanner from "@/components/ui/PhotoBanner";
import IconBadge from "@/components/ui/IconBadge";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about 4M Diagnostics, a trusted diagnostic center in Narendrapur offering pathology, health checkups, home sample collection and specialist doctor consultations.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Accuracy & Trust",
    description:
      "We follow standardised diagnostic processes to deliver reliable, accurate results our patients can trust.",
  },
  {
    icon: Stethoscope,
    title: "Multi-Specialty Care",
    description:
      "Access experienced specialist doctors across general medicine, pediatrics, cardiology, orthopedics and more.",
  },
  {
    icon: Users,
    title: "Patient Convenience",
    description:
      "From home sample collection to WhatsApp booking, we make healthcare simple and accessible.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About 4M Diagnostics"
        title="Diagnostic care built around convenience and trust"
        subtitle={`${BUSINESS.name} is a ${BUSINESS.category.toLowerCase()} serving Narendrapur, Rajpur Sonarpur and the surrounding areas of West Bengal.`}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <PhotoBanner
            src="/images/stethoscope.jpg"
            alt="Diagnostic and healthcare equipment"
            className="mb-12"
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Who we are
              </h2>
              <p className="text-base leading-7 text-slate-600">
                4M Diagnostics is a diagnostic center offering pathology
                testing, health checkup packages, home sample collection and
                access to a wide network of specialist doctors through our
                polyclinic. We are located at{" "}
                {BUSINESS.addressFull}, serving patients across Narendrapur
                and Rajpur Sonarpur.
              </p>
              <p className="text-base leading-7 text-slate-600">
                Our goal is simple: make diagnostics and specialist
                consultations easy to access. Every booking &mdash; whether
                for a blood test, a health package or a doctor appointment
                &mdash; is confirmed quickly over WhatsApp, without the need
                for logins, portals or paperwork.
              </p>
            </div>

            <div className="grid gap-5">
              {VALUES.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
                  >
                    <IconBadge icon={Icon} tone="blue" size="sm" />
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
