import { getDashboardStats, getBookingsTrend } from "../../../lib/data/adminStats";
import { formatINR } from "../../../lib/format";

export default async function AdminDashboardPage() {
  const [stats, trend] = await Promise.all([getDashboardStats(), getBookingsTrend(7)]);
  const maxCount = Math.max(1, ...trend.map((t) => t.count));

  const cards = [
    { label: "Today's Bookings", value: stats.todaysBookings },
    { label: "Today's Revenue", value: formatINR(stats.todaysRevenue) },
    { label: "New Patients Today", value: stats.newPatientsToday },
    { label: "Pending Bookings", value: stats.pendingBookings },
    { label: "Active Home Collections", value: stats.homeCollectionsActive },
    { label: "Pending Reports", value: stats.pendingReports },
    { label: "Completed Reports", value: stats.completedReports },
    { label: "Appointments Today", value: stats.appointmentsToday },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted">Overview of today&apos;s activity across 4M Diagnostics.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-medium text-muted">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-foreground">Bookings — Last 7 Days</h2>
        <div className="mt-6 flex items-end gap-3" style={{ height: 140 }}>
          {trend.map((t) => (
            <div key={t.date} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-brand-primary/80"
                style={{ height: `${Math.max(4, (t.count / maxCount) * 100)}%` }}
                title={`${t.count} bookings`}
              />
              <span className="text-[10px] text-muted">{t.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
