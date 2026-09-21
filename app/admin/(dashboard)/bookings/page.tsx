import { prisma } from "../../../../lib/prisma";
import { formatDate, formatINR } from "../../../../lib/format";
import { updateBookingStatus } from "../../../../lib/actions/bookings";
import { StatusSelect } from "../../../../components/admin/StatusSelect";

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "REPORT_READY", "COMPLETED", "CANCELLED"] as const;

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { patient: true, items: true },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Bookings</h1>
      <p className="text-sm text-muted">All test and package bookings placed through the website.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-foreground">{b.bookingNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{b.patient.name}</p>
                  <p className="text-xs text-muted">{b.patient.mobile}</p>
                </td>
                <td className="px-4 py-3 text-muted">{b.type === "HOME_COLLECTION" ? "Home Collection" : "Centre Visit"}</td>
                <td className="px-4 py-3 text-foreground">{formatINR(b.totalAmount)}</td>
                <td className="px-4 py-3 text-muted">{formatDate(b.scheduledDate)}</td>
                <td className="px-4 py-3">
                  <StatusSelect action={updateBookingStatus.bind(null, b.id)} value={b.status} options={STATUSES} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No bookings yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
