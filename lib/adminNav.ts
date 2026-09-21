export interface AdminNavItem {
  href: string;
  label: string;
  group: string;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", group: "Overview" },

  { href: "/admin/patients", label: "Patients", group: "People" },
  { href: "/admin/doctors", label: "Doctors", group: "People" },
  { href: "/admin/staff", label: "Staff", group: "People" },

  { href: "/admin/services", label: "Services", group: "Catalogue" },
  { href: "/admin/tests", label: "Tests", group: "Catalogue" },
  { href: "/admin/test-categories", label: "Test Categories", group: "Catalogue" },
  { href: "/admin/packages", label: "Packages", group: "Catalogue" },
  { href: "/admin/coupons", label: "Coupons", group: "Catalogue" },
  { href: "/admin/offers", label: "Offers", group: "Catalogue" },

  { href: "/admin/bookings", label: "Bookings", group: "Operations" },
  { href: "/admin/home-collection", label: "Home Collection", group: "Operations" },
  { href: "/admin/appointments", label: "Appointments", group: "Operations" },
  { href: "/admin/payments", label: "Payments", group: "Operations" },
  { href: "/admin/invoices", label: "Invoices", group: "Operations" },
  { href: "/admin/reports", label: "Reports", group: "Operations" },

  { href: "/admin/faqs", label: "FAQs", group: "Content" },
  { href: "/admin/blog", label: "Blog", group: "Content" },
  { href: "/admin/ai-knowledge", label: "AI Knowledge Base", group: "Content" },

  { href: "/admin/notifications", label: "Notifications", group: "Communication" },
  { href: "/admin/whatsapp", label: "WhatsApp", group: "Communication" },
  { href: "/admin/email", label: "Email", group: "Communication" },

  { href: "/admin/settings", label: "Settings", group: "System" },
  { href: "/admin/audit-logs", label: "Audit Logs", group: "System" },
];

export const ADMIN_NAV_GROUPS = Array.from(new Set(ADMIN_NAV.map((i) => i.group)));
