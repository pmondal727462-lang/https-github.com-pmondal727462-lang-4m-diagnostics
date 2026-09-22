import Link from "next/link";
import {
  CalendarCheck2,
  FlaskConical,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { DOCTORS } from "@/lib/doctors";
import { BLOOD_TEST_CATEGORIES } from "@/lib/blood-tests";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import IconBadge from "@/components/ui/IconBadge";

export default function Hero() {
  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  const stats = [
    { icon: Stethoscope, label: `${DOCTORS.length}+ Specialist Doctors` },
    { icon: FlaskConical, label: `${BLOOD_TEST_CATEGORIES.length}+ Test Categories` },
    { icon: MessageCircle, label: "WhatsApp Confirmation" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="bg-dot-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="bg-blob -left-24 -top-24 h-80 w-80 bg-blue-300" aria-hidden="true" />
      <div className="bg-blob -right-16 top-1/3 h-96 w-96 bg-red-300" aria-hidden="true" />
      <div className="bg-blob left-1/3 -bottom-24 h-72 w-72 bg-amber-200" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
              <ShieldCheck className="h-4 w-4" />
              Trusted Diagnostic Center in Narendrapur
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Accurate Diagnostics.
              <br />
              <span className="bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent">
                Better Healthcare.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
              Diagnostic, pathology, health checkup and specialist consultation
              services with convenient WhatsApp booking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-test"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-transform hover:-translate-y-0.5 hover:bg-blue-800"
              >
                BOOK A TEST
              </Link>
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-0.5 hover:bg-red-700"
              >
                BOOK DOCTOR APPOINTMENT
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition-transform hover:-translate-y-0.5 hover:bg-[#1fbf5a]"
              >
                <MessageCircle className="h-4 w-4" />
                WHATSAPP US
              </a>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 transition-transform hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <MapPin className="h-4 w-4" />
                GET DIRECTIONS
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <IconBadge icon={stat.icon} tone="white" size="sm" />
                  <span className="text-sm font-semibold text-slate-700">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-6 z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg shadow-slate-900/10 ring-1 ring-slate-100 sm:-right-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Booking confirmed on WhatsApp
              </span>
            </div>

            <div className="rounded-3xl bg-white/80 p-6 shadow-xl shadow-blue-900/10 ring-1 ring-slate-100 backdrop-blur sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-semibold text-slate-900">
                  Why choose 4M Diagnostics?
                </span>
                <IconBadge icon={Sparkles} tone="red" size="sm" />
              </div>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  { icon: FlaskConical, text: "Accurate pathology & diagnostic testing" },
                  { icon: Stethoscope, text: "Multi-specialty doctor consultations" },
                  { icon: MapPin, text: "Convenient home sample collection" },
                  { icon: CalendarCheck2, text: "Simple WhatsApp booking & confirmation" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <IconBadge icon={item.icon} tone="blue" size="sm" />
                    <span className="text-sm text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
