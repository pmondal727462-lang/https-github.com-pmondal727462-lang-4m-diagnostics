import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PhotoBanner from "@/components/ui/PhotoBanner";
import DoctorDirectory from "@/components/doctors/DoctorDirectory";

export const metadata: Metadata = {
  title: "Consult Our Doctors",
  description:
    "Consult specialist doctors at 4M Diagnostics polyclinic in Narendrapur. Search by name, specialty, day or time and book an appointment on WhatsApp.",
  alternates: { canonical: "/doctors" },
};

export default async function DoctorsPage(props: PageProps<"/doctors">) {
  const searchParams = await props.searchParams;
  const specialtyParam = searchParams?.specialty;
  const initialSpecialty = Array.isArray(specialtyParam)
    ? specialtyParam[0]
    : specialtyParam ?? "All";

  return (
    <>
      <PageHero
        eyebrow="Doctors"
        title="Consult Our Doctors"
        subtitle="Choose a specialist and request an appointment through WhatsApp."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <PhotoBanner
            src="/images/stethoscope.jpg"
            alt="Stethoscope used for specialist doctor consultations"
            className="mb-12"
          />
          <DoctorDirectory initialSpecialty={initialSpecialty} />
        </Container>
      </section>
    </>
  );
}
