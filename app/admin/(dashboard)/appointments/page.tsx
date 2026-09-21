import { prisma } from "../../../../lib/prisma";
import { formatDate, formatINR } from "../../../../lib/format";
import { updateAppointmentStatus } from "../../../../lib/actions/appointments";
import { AutoSubmitSelect } from "../../../../components/admin/AutoSubmitSelect";

const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: "desc" },
    take: 100,
    include: { doctor: true, patient: true },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Appointments</h1>
      <p className="text-sm text-muted">Doctor appointment requests from the website.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{a.patient.name}</p>
                  <p className="text-xs text-muted">{a.patient.mobile}</p>
                </td>
                <td className="px-4 py-3 text-muted">{a.doctor.name}</td>
                <td className="px-4 py-3 text-muted">
                  {formatDate(a.date)} · {a.time}
                </td>
                <td className="px-4 py-3 text-foreground">{formatINR(a.fee)}</td>
                <td className="px-4 py-3">
                  <AutoSubmitSelect
                    action={updateAppointmentStatus.bind(null, a.id)}
                    name="status"
                    value={a.status}
                    options={STATUSES.map((s) => ({ value: s, label: s.replace(/_/g, " ") }))}
                  />
                </td>
              </tr>
            ))}
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No appointments yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
