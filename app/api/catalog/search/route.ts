import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ tests: [], packages: [] });
  }

  const [tests, packages] = await Promise.all([
    prisma.test.findMany({
      where: { isActive: true, name: { contains: q, mode: "insensitive" } },
      select: { id: true, name: true, price: true, offerPrice: true },
      take: 8,
    }),
    prisma.package.findMany({
      where: { isActive: true, name: { contains: q, mode: "insensitive" } },
      select: { id: true, name: true, regularPrice: true, offerPrice: true },
      take: 8,
    }),
  ]);

  return NextResponse.json({
    tests: tests.map((t) => ({
      id: t.id,
      name: t.name,
      price: Number(t.offerPrice ?? t.price),
    })),
    packages: packages.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.offerPrice ?? p.regularPrice),
    })),
  });
}
