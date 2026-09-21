import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getPatientSession } from "../../../lib/auth/session";

export async function GET(request: Request) {
  const session = await getPatientSession();
  if (!session) {
    return NextResponse.json({ error: "Please verify your mobile number to view reports." }, { status: 401 });
  }

  const reports = await prisma.report.findMany({
    where: { patientId: session.patientId },
    orderBy: { createdAt: "desc" },
    include: { files: true },
  });

  const ipAddress = request.headers.get("x-forwarded-for") ?? undefined;
  if (reports.length > 0) {
    await prisma.reportAccessLog.createMany({
      data: reports.map((r) => ({
        reportId: r.id,
        patientId: session.patientId,
        action: "VIEW" as const,
        ipAddress,
      })),
    });
  }

  return NextResponse.json({
    reports: reports.map((r) => ({
      id: r.id,
      testName: r.testName,
      status: r.status,
      reportDate: r.reportDate,
      hasFile: r.files.length > 0,
    })),
  });
}
