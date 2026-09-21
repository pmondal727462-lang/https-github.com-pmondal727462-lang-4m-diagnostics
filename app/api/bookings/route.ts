import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createBookingSchema } from "../../../lib/validations/booking";
import { nextBookingNumber, type PrismaTx } from "../../../lib/bookingNumber";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = createBookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;

  if (input.type === "HOME_COLLECTION" && !input.homeCollection) {
    return NextResponse.json(
      { error: "Home collection details are required" },
      { status: 400 },
    );
  }

  try {
    const booking = await prisma.$transaction(async (tx: PrismaTx) => {
      const patient = await tx.patient.upsert({
        where: { mobile: input.patient.mobile },
        update: {
          name: input.patient.name,
          email: input.patient.email || undefined,
          age: input.patient.age,
          gender: input.patient.gender,
          address: input.patient.address,
          pincode: input.patient.pincode || undefined,
        },
        create: {
          name: input.patient.name,
          mobile: input.patient.mobile,
          email: input.patient.email || undefined,
          age: input.patient.age,
          gender: input.patient.gender,
          address: input.patient.address,
          pincode: input.patient.pincode || undefined,
        },
      });

      const testIds = input.items.map((i) => i.testId).filter((v): v is string => Boolean(v));
      const packageIds = input.items
        .map((i) => i.packageId)
        .filter((v): v is string => Boolean(v));

      const [tests, packages] = await Promise.all([
        testIds.length
          ? tx.test.findMany({ where: { id: { in: testIds }, isActive: true } })
          : Promise.resolve([]),
        packageIds.length
          ? tx.package.findMany({ where: { id: { in: packageIds }, isActive: true } })
          : Promise.resolve([]),
      ]);

      if (tests.length !== testIds.length || packages.length !== packageIds.length) {
        throw new Error("One or more selected tests or packages are no longer available");
      }

      const lineItems = [
        ...tests.map((t) => ({
          testId: t.id,
          packageId: undefined as string | undefined,
          priceAtBooking: Number(t.offerPrice ?? t.price),
        })),
        ...packages.map((p) => ({
          testId: undefined as string | undefined,
          packageId: p.id,
          priceAtBooking: Number(p.offerPrice ?? p.regularPrice),
        })),
      ];

      const subtotal = lineItems.reduce((sum, item) => sum + item.priceAtBooking, 0);

      let discount = 0;
      let couponId: string | undefined;
      if (input.couponCode) {
        const coupon = await tx.coupon.findUnique({ where: { code: input.couponCode.trim().toUpperCase() } });
        const now = new Date();
        if (
          coupon &&
          coupon.isActive &&
          coupon.startDate <= now &&
          coupon.endDate >= now &&
          (coupon.usageLimit === null || coupon.usedCount < coupon.usageLimit) &&
          (coupon.minAmount === null || subtotal >= Number(coupon.minAmount))
        ) {
          discount =
            coupon.discountType === "PERCENTAGE"
              ? (subtotal * Number(coupon.discountValue)) / 100
              : Number(coupon.discountValue);
          if (coupon.maxDiscount !== null) {
            discount = Math.min(discount, Number(coupon.maxDiscount));
          }
          discount = Math.min(discount, subtotal);
          couponId = coupon.id;
          await tx.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
        }
      }

      const totalAmount = subtotal - discount;
      const bookingNumber = await nextBookingNumber(tx);

      const created = await tx.booking.create({
        data: {
          bookingNumber,
          patientId: patient.id,
          type: input.type,
          status: "PENDING",
          scheduledDate: new Date(input.scheduledDate),
          scheduledSlot: input.scheduledSlot,
          subtotal,
          discount,
          couponId,
          totalAmount,
          items: { create: lineItems },
        },
        include: { items: true },
      });

      if (input.type === "HOME_COLLECTION" && input.homeCollection) {
        await tx.homeCollection.create({
          data: {
            bookingId: created.id,
            patientName: input.patient.name,
            mobile: input.patient.mobile,
            email: input.patient.email || undefined,
            address: input.homeCollection.address,
            landmark: input.homeCollection.landmark,
            pincode: input.homeCollection.pincode,
            scheduledDate: new Date(input.scheduledDate),
            scheduledSlot: input.scheduledSlot,
            specialInstructions: input.homeCollection.specialInstructions,
            status: "PENDING",
          },
        });
      }

      return created;
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
