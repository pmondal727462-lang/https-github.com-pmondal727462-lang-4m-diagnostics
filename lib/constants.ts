/**
 * Verified business facts, provided directly by 4M Diagnostics.
 * These are the only hard-coded business details in the app; everything
 * else (tests, packages, doctors, prices, offers, FAQs, blog) is managed
 * from the Admin Dashboard and read from the database.
 */
export const BUSINESS = {
  name: "4M Diagnostics",
  category: "Diagnostic Center",
  addressLines: [
    "Ward No:25, Southern Bypass 402, School Rd",
    "Dakshin Jagaddal, Narendrapur",
    "Rajpur Sonarpur",
    "West Bengal - 700151, India",
  ],
  phone: "+91 81003 47637",
  phoneHref: "tel:+918100347637",
  whatsappHref: "https://wa.me/918100347637",
  googleMapsUrl: "https://maps.app.goo.gl/xdnfqXeNGwo5j46q8",
  services: ["Diagnostic Services", "Pathology", "Polyclinic"],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tests", label: "Tests & Packages" },
  { href: "/home-sample-collection", label: "Home Collection" },
  { href: "/doctors", label: "Doctors" },
  { href: "/reports", label: "Reports" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
