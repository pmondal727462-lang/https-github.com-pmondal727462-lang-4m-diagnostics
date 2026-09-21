import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading, Card, EmptyState } from "../../components/ui/Card";
import { LinkButton } from "../../components/ui/Button";
import { formatINR } from "../../lib/format";
import { getActiveDoctors } from "../../lib/data/doctors";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const metadata: Metadata = {
  title: "Doctors",
  description: "Meet our doctors and book a consultation at 4M Diagnostics.",
  alternates: { canonical: "/doctors" },
};

export default async function DoctorsPage() {
  const doctors = await getActiveDoctors();

  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Our doctors" title="Doctor Appointments" />

      <div className="mt-8">
        {doctors.length === 0 ? (
          <EmptyState
            title="Doctor profiles will appear here soon"
            description="Our team is publishing doctor profiles and schedules in the admin dashboard."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{doctor.name}</h2>
                <p className="text-sm text-brand-accent">{doctor.specialization}</p>
                <p className="mt-1 text-sm text-muted">{doctor.qualification}</p>

                {doctor.schedules.length > 0 ? (
                  <p className="mt-3 text-xs text-muted">
                    Available: {doctor.schedules.map((s) => DAYS[s.dayOfWeek]).join(", ")}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    {formatINR(doctor.consultationFee)}
                  </span>
                  <LinkButton href={`/appointments?doctorId=${doctor.id}`} size="sm">
                    Book Appointment
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
