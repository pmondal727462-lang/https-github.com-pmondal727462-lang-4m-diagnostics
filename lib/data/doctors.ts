import { prisma } from "../prisma";

export function getActiveDoctors() {
  return prisma.doctor.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: { schedules: { where: { isActive: true } } },
  });
}

export function getDoctorById(id: string) {
  return prisma.doctor.findFirst({
    where: { id, isActive: true },
    include: { schedules: { where: { isActive: true }, orderBy: { dayOfWeek: "asc" } } },
  });
}
