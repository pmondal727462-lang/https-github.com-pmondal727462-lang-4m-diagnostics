import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import FacebookIcon from "@/components/ui/icons/FacebookIcon";
import { BUSINESS } from "@/lib/constants";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact 4M Diagnostics in Narendrapur, Rajpur Sonarpur. Call, WhatsApp or get directions to our diagnostic center.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with 4M Diagnostics"
        subtitle="We're happy to help with bookings, enquiries and appointment confirmations."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-bold text-slate-900">
                {BUSINESS.name}
              </h2>
              <div className="mt-5 flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <p className="text-sm leading-6 text-slate-700">
                  {BUSINESS.addressLine1}
                  <br />
                  {BUSINESS.addressLine2}
                  <br />
                  {BUSINESS.addressLine3}
                  <br />
                  {BUSINESS.addressLine4}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-blue-700" />
                <a href={BUSINESS.phoneHref} className="text-sm font-semibold text-slate-800">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-blue-700" />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-800">
                  {BUSINESS.whatsappDisplay}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Phone className="h-4 w-4" />
                  CALL NOW
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1fbf5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WHATSAPP
                </a>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50"
                >
                  <MapPin className="h-4 w-4" />
                  GET DIRECTIONS
                </a>
                <a
                  href={BUSINESS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50"
                >
                  <FacebookIcon className="h-4 w-4" />
                  FACEBOOK
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
              <iframe
                title="4M Diagnostics location on Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  BUSINESS.addressFull
                )}&output=embed`}
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
