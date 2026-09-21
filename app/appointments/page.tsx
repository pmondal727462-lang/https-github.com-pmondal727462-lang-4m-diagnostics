import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { AppointmentForm } from "../../components/booking/AppointmentForm";
import { getActiveDoctors } from "../../lib/data/doctors";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book a doctor appointment at 4M Diagnostics.",
  alternates: { canonical: "/appointments" },
};

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const doctorId = typeof params.doctorId === "string" ? params.doctorId : undefined;
  const doctors = await getActiveDoctors();

  return (
    <Container className="max-w-2xl py-14">
      <SectionHeading eyebrow="Consult a doctor" title="Book an Appointment" />
      <div className="mt-8">
        <AppointmentForm
          doctors={doctors.map((d) => ({
            id: d.id,
            name: d.name,
            specialization: d.specialization,
            consultationFee: Number(d.consultationFee),
          }))}
          defaultDoctorId={doctorId}
        />
      </div>
    </Container>
  );
}
