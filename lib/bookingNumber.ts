import type { Prisma } from "../generated/prisma/client";

export type PrismaTx = Prisma.TransactionClient;

/** Generates booking numbers like 4M202609210001 — must run inside a transaction. */
export async function nextBookingNumber(tx: PrismaTx): Promise<string> {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const prefix = `4M${datePart}`;

  const countToday = await tx.booking.count({
    where: { bookingNumber: { startsWith: prefix } },
  });

  const sequence = String(countToday + 1).padStart(4, "0");
  return `${prefix}${sequence}`;
}
