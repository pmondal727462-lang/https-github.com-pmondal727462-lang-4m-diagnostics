import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createAppointmentSchema } from "../../../lib/validations/appointment";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });

  const parsed = createAppointmentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const input = parsed.data;

  const doctor = await prisma.doctor.findFirst({ where: { id: input.doctorId, isActive: true } });
  if (!doctor) {
    return NextResponse.json({ error: "Selected doctor is not available" }, { status: 400 });
  }

  const patient = await prisma.patient.upsert({
    where: { mobile: input.patient.mobile },
    update: { name: input.patient.name, email: input.patient.email || undefined },
    create: {
      name: input.patient.name,
      mobile: input.patient.mobile,
      email: input.patient.email || undefined,
    },
  });

  const appointment = await prisma.appointment.create({
    data: {
      doctorId: doctor.id,
      patientId: patient.id,
      date: new Date(input.date),
      time: input.time,
      fee: doctor.consultationFee,
      status: "PENDING",
      paymentStatus: "PENDING",
    },
  });

  return NextResponse.json({ appointment }, { status: 201 });
}
