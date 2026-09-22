import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import DoctorCard from "@/components/doctors/DoctorCard";
import PackageCard from "@/components/packages/PackageCard";
import PhotoBanner from "@/components/ui/PhotoBanner";
import { SERVICES } from "@/lib/services";
import { DOCTORS } from "@/lib/doctors";
import { HEALTH_PACKAGES } from "@/lib/health-packages";
import { BUSINESS } from "@/lib/constants";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Home() {
  const featuredDoctors = DOCTORS.slice(0, 3);
  const featuredPackages = HEALTH_PACKAGES.slice(0, 3);
  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  return (
    <>
      <Hero />

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Get Started"
            title="What would you like to do?"
            subtitle="Everything you need, one tap away — booked instantly on WhatsApp."
          />
          <div className="mt-10">
            <QuickActions />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive diagnostic & healthcare services"
            subtitle="From routine blood work to specialist consultations, 4M Diagnostics supports your healthcare journey end to end."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <PhotoBanner
              src="/images/blood-test-tubes.jpg"
              alt="Blood sample collection tubes ready for testing"
              imgClassName="h-48 w-full object-cover sm:h-56"
            />
            <PhotoBanner
              src="/images/stethoscope.jpg"
              alt="Stethoscope used for specialist doctor consultations"
              imgClassName="h-48 w-full object-cover sm:h-56"
            />
            <PhotoBanner
              src="/images/blood-typing-card.jpg"
              alt="Laboratory diagnostic testing"
              imgClassName="h-48 w-full object-cover sm:h-56"
            />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <SectionHeading
              align="left"
              eyebrow="Specialist Doctors"
              title="Consult experienced specialist doctors"
              subtitle="Choose a specialist and request an appointment through WhatsApp."
            />
            <Link
              href="/doctors"
              className="shrink-0 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              View All Doctors
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <SectionHeading
              align="left"
              eyebrow="Health Packages"
              title="Curated health checkup packages"
              subtitle="Contact us for package details and pricing tailored to your needs."
            />
            <Link
              href="/health-packages"
              className="shrink-0 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              View All Packages
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="relative grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-red-600 p-8 shadow-xl shadow-blue-900/20 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:20px_20px]"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Visit 4M Diagnostics
              </h2>
              <p className="mt-3 text-sm text-blue-100 sm:text-base">
                {BUSINESS.addressFull}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1fbf5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="relative z-10 rounded-2xl bg-white/10 p-6 text-sm text-blue-50 ring-1 ring-white/20 backdrop-blur">
              <p className="font-semibold text-white">Call or WhatsApp us</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {BUSINESS.phoneDisplay}
              </p>
              <p className="mt-2 text-blue-100">
                Available for bookings, enquiries and appointment confirmations.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
