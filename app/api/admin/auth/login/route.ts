import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { adminLoginSchema } from "../../../../../lib/validations/adminAuth";
import { verifyPassword } from "../../../../../lib/auth/password";
import { createAdminSession } from "../../../../../lib/auth/session";
import { recordAudit } from "../../../../../lib/audit";

export async function POST(request: Request) {
  const ipAddress = request.headers.get("x-forwarded-for") ?? undefined;
  const json = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });

  if (!user || !user.isActive) {
    await recordAudit({ action: "LOGIN", module: "AUTH", ipAddress, result: "FAILURE", description: email });
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    await recordAudit({ userId: user.id, action: "LOGIN", module: "AUTH", ipAddress, result: "FAILURE" });
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await createAdminSession({ userId: user.id, role: user.role.name, name: user.name, email: user.email });
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await recordAudit({ userId: user.id, action: "LOGIN", module: "AUTH", ipAddress, result: "SUCCESS" });

  return NextResponse.json({ ok: true, role: user.role.name });
}
