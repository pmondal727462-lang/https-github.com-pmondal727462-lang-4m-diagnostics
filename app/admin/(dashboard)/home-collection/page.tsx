import { prisma } from "../../../../lib/prisma";
import { formatDate } from "../../../../lib/format";
import { updateHomeCollectionStatus, assignHomeCollectionStaff } from "../../../../lib/actions/homeCollection";
import { AutoSubmitSelect } from "../../../../components/admin/AutoSubmitSelect";

const STATUSES = [
  "PENDING",
  "CONFIRMED",
  "ASSIGNED",
  "COLLECTION_STARTED",
  "SAMPLE_COLLECTED",
  "LAB_RECEIVED",
  "PROCESSING",
  "REPORT_READY",
  "COMPLETED",
  "CANCELLED",
];

export default async function AdminHomeCollectionPage() {
  const [collections, staff] = await Promise.all([
    prisma.homeCollection.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.staff.findMany({ where: { isActive: true }, include: { user: true } }),
  ]);

  const staffOptions = [
    { value: "", label: "Unassigned" },
    ...staff.map((s) => ({ value: s.userId, label: s.user.name })),
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Home Sample Collection</h1>
      <p className="text-sm text-muted">Track and assign collection staff for home sample requests.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Assigned Staff</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{c.patientName}</p>
                  <p className="text-xs text-muted">{c.mobile}</p>
                </td>
                <td className="px-4 py-3 text-muted">
                  {c.address}, {c.pincode}
                </td>
                <td className="px-4 py-3 text-muted">
                  {formatDate(c.scheduledDate)} · {c.scheduledSlot}
                </td>
                <td className="px-4 py-3">
                  <AutoSubmitSelect
                    action={assignHomeCollectionStaff.bind(null, c.id)}
                    name="assignedStaffId"
                    value={c.assignedStaffId ?? ""}
                    options={staffOptions}
                  />
                </td>
                <td className="px-4 py-3">
                  <AutoSubmitSelect
                    action={updateHomeCollectionStatus.bind(null, c.id)}
                    name="status"
                    value={c.status}
                    options={STATUSES.map((s) => ({ value: s, label: s.replace(/_/g, " ") }))}
                  />
                </td>
              </tr>
            ))}
            {collections.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No home collection requests yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
