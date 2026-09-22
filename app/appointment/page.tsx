import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import AppointmentForm from "@/components/appointment/AppointmentForm";

export const metadata: Metadata = {
  title: "Book Doctor Appointment",
  description:
    "Book a specialist doctor appointment at 4M Diagnostics polyclinic, Narendrapur. Fill in patient details and confirm instantly on WhatsApp.",
  alternates: { canonical: "/appointment" },
};

export default async function AppointmentPage(
  props: PageProps<"/appointment">
) {
  const searchParams = await props.searchParams;
  const doctorParam = searchParams?.doctor;
  const initialDoctorSlug = Array.isArray(doctorParam)
    ? doctorParam[0]
    : doctorParam ?? "";

  return (
    <>
      <PageHero
        eyebrow="Doctor Appointment"
        title="Book a doctor appointment"
        subtitle="Select a doctor, enter patient details, and continue to WhatsApp — 4M Diagnostics will confirm your appointment."
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-2xl">
          <AppointmentForm initialDoctorSlug={initialDoctorSlug} />
        </Container>
      </section>
    </>
  );
}
