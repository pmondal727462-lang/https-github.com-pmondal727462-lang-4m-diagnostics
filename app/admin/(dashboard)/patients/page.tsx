import { prisma } from "../../../../lib/prisma";
import { formatDate } from "../../../../lib/format";

export default async function AdminPatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { _count: { select: { bookings: true, appointments: true } } },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Patients</h1>
      <p className="text-sm text-muted">Patients who have registered through bookings, appointments, or report access.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Bookings</th>
              <th className="px-4 py-3">Appointments</th>
              <th className="px-4 py-3">Registered</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.mobile}</td>
                <td className="px-4 py-3 text-muted">{p._count.bookings}</td>
                <td className="px-4 py-3 text-muted">{p._count.appointments}</td>
                <td className="px-4 py-3 text-muted">{formatDate(p.createdAt)}</td>
              </tr>
            ))}
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No patients yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
