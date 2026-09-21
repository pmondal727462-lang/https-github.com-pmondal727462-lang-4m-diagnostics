import { prisma } from "../prisma";

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getDashboardStats() {
  const todayStart = startOfDay(new Date());
  const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  const [
    todaysBookings,
    todaysRevenue,
    newPatientsToday,
    pendingBookings,
    homeCollectionsActive,
    pendingReports,
    completedReports,
    appointmentsToday,
  ] = await Promise.all([
    prisma.booking.count({ where: { createdAt: { gte: todayStart, lt: tomorrowStart } } }),
    prisma.payment.aggregate({
      where: { status: "PAID", createdAt: { gte: todayStart, lt: tomorrowStart } },
      _sum: { amount: true },
    }),
    prisma.patient.count({ where: { createdAt: { gte: todayStart, lt: tomorrowStart } } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.homeCollection.count({
      where: { status: { notIn: ["COMPLETED", "CANCELLED"] } },
    }),
    prisma.report.count({ where: { status: "PROCESSING" } }),
    prisma.report.count({ where: { status: { in: ["READY", "DOWNLOADED"] } } }),
    prisma.appointment.count({ where: { date: { gte: todayStart, lt: tomorrowStart } } }),
  ]);

  return {
    todaysBookings,
    todaysRevenue: Number(todaysRevenue._sum.amount ?? 0),
    newPatientsToday,
    pendingBookings,
    homeCollectionsActive,
    pendingReports,
    completedReports,
    appointmentsToday,
  };
}

export async function getBookingsTrend(days = 7) {
  const results: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date(startOfDay(new Date()).getTime() - i * 24 * 60 * 60 * 1000);
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
    const count = await prisma.booking.count({
      where: { createdAt: { gte: dayStart, lt: dayEnd } },
    });
    results.push({
      date: dayStart.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      count,
    });
  }
  return results;
}
