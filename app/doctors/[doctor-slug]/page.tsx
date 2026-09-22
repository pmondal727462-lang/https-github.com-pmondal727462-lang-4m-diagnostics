import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Calendar, GraduationCap } from "lucide-react";
import Container from "@/components/ui/Container";
import IconBadge from "@/components/ui/IconBadge";
import AppointmentModal from "@/components/doctors/AppointmentModal";
import { getAllDoctorSlugs, getDoctorBySlug, getScheduleLines } from "@/lib/doctors";
import { getSpecialtyIcon } from "@/components/ui/icon-map";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return getAllDoctorSlugs().map((slug) => ({ "doctor-slug": slug }));
}

export async function generateMetadata(
  props: PageProps<"/doctors/[doctor-slug]">
): Promise<Metadata> {
  const params = await props.params;
  const doctor = getDoctorBySlug(params["doctor-slug"]);

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  const description = `${doctor.name} (${doctor.specialty}) — ${doctor.qualification}. Book an appointment at 4M Diagnostics, Narendrapur via WhatsApp.`;

  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description,
    alternates: { canonical: `/doctors/${doctor.slug}` },
    openGraph: { title: doctor.name, description },
  };
}

export default async function DoctorDetailPage(
  props: PageProps<"/doctors/[doctor-slug]">
) {
  const params = await props.params;
  const doctor = getDoctorBySlug(params["doctor-slug"]);

  if (!doctor) {
    notFound();
  }

  const Icon = getSpecialtyIcon(doctor.specialty);
  const scheduleLines = getScheduleLines(doctor);

  const physicianJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    url: `${SITE_URL}/doctors/${doctor.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="bg-blob -left-16 -top-24 h-64 w-64 bg-blue-300"
          aria-hidden="true"
        />
        <div
          className="bg-blob -right-16 top-10 h-72 w-72 bg-red-300"
          aria-hidden="true"
        />
        <Container className="relative py-10 sm:py-14">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <IconBadge icon={Icon} tone="blue" size="xl" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {doctor.name}
              </h1>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-red-700">
                {doctor.specialty}
              </p>
              {doctor.role ? (
                <p className="mt-2 text-sm text-slate-600">{doctor.role}</p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  <GraduationCap className="h-4 w-4" />
                  Qualifications
                </h2>
                <p className="mt-2 text-base text-slate-800">{doctor.qualification}</p>
                {doctor.specialization ? (
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">Specialization: </span>
                    {doctor.specialization}
                  </p>
                ) : null}
                {doctor.additional ? (
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">Additional: </span>
                    {doctor.additional}
                  </p>
                ) : null}
              </div>

              {doctor.affiliation ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    <Building2 className="h-4 w-4" />
                    Hospital / Affiliation
                  </h2>
                  <p className="mt-2 text-base text-slate-800">{doctor.affiliation}</p>
                </div>
              ) : null}

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  <Calendar className="h-4 w-4" />
                  Consultation Schedule
                </h2>
                <div className="mt-3 flex flex-col gap-1.5">
                  {scheduleLines.length > 0 ? (
                    scheduleLines.map((line) => (
                      <p key={line} className="text-base font-medium text-slate-800">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-base font-semibold text-amber-700">
                      By Appointment
                    </p>
                  )}
                  {doctor.byAppointment && scheduleLines.length > 0 ? (
                    <span className="mt-2 inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
                      Appointment: By Appointment
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <p className="text-sm text-slate-600">
                  Ready to consult {doctor.name.replace(/^Dr\.\s*/, "Dr. ")}?
                </p>
                <div className="mt-4">
                  <AppointmentModal
                    doctor={doctor}
                    triggerLabel="BOOK APPOINTMENT ON WHATSAPP"
                    triggerClassName="inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
