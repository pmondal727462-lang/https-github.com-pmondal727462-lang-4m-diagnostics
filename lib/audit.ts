import { prisma } from "./prisma";

export async function recordAudit(params: {
  userId?: string;
  action: string;
  module: string;
  description?: string;
  ipAddress?: string;
  result: "SUCCESS" | "FAILURE";
}) {
  await prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      module: params.module,
      description: params.description,
      ipAddress: params.ipAddress,
      result: params.result,
    },
  });
}
