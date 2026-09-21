import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ROLES: { name: "SUPER_ADMIN" | "ADMIN" | "LAB_MANAGER" | "RECEPTIONIST" | "DOCTOR" | "COLLECTION_STAFF" | "ACCOUNTANT"; description: string }[] = [
  { name: "SUPER_ADMIN", description: "Full access to every module, including staff and settings." },
  { name: "ADMIN", description: "Manages day-to-day operations across all modules." },
  { name: "LAB_MANAGER", description: "Manages tests, packages, and report workflow." },
  { name: "RECEPTIONIST", description: "Manages bookings, appointments, and patient check-in." },
  { name: "DOCTOR", description: "Views their own schedule and appointments." },
  { name: "COLLECTION_STAFF", description: "Handles assigned home sample collection visits." },
  { name: "ACCOUNTANT", description: "Manages payments, invoices, and refunds." },
];

// Real, business-provided facts only — no invented tests, prices, doctors, or offers.
const WEBSITE_SETTINGS: { key: string; value: string }[] = [
  { key: "business_name", value: "4M Diagnostics" },
  { key: "business_category", value: "Diagnostic Center" },
  {
    key: "address",
    value: "Ward No:25, Southern Bypass 402, School Rd, Dakshin Jagaddal, Narendrapur, Rajpur Sonarpur, West Bengal - 700151, India",
  },
  { key: "phone", value: "+91 81003 47637" },
  { key: "google_maps_url", value: "https://maps.app.goo.gl/xdnfqXeNGwo5j46q8" },
];

const SERVICES: { name: string; slug: string; displayOrder: number }[] = [
  { name: "Diagnostic Services", slug: "diagnostic-services", displayOrder: 1 },
  { name: "Pathology", slug: "pathology", displayOrder: 2 },
  { name: "Polyclinic", slug: "polyclinic", displayOrder: 3 },
];

async function main() {
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }
  console.log(`Seeded ${ROLES.length} roles.`);

  for (const setting of WEBSITE_SETTINGS) {
    await prisma.websiteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`Seeded ${WEBSITE_SETTINGS.length} website settings.`);

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { name: service.name, displayOrder: service.displayOrder, isActive: true },
      create: { ...service, isActive: true },
    });
  }
  console.log(`Seeded ${SERVICES.length} services.`);

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const superAdminRole = await prisma.role.findUniqueOrThrow({ where: { name: "SUPER_ADMIN" } });
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: "Super Admin",
        email: adminEmail,
        passwordHash,
        roleId: superAdminRole.id,
      },
    });
    console.log(`Seeded initial SUPER_ADMIN account: ${adminEmail}`);
    console.log("Change this password immediately after first login.");
  } else {
    console.log("SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipped admin account.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
