export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.4mdiagnostics.in";

export const BUSINESS = {
  name: "4M Diagnostics",
  legalName: "4M Diagnostics",
  category: "Diagnostic Center",
  tagline: "Accurate Diagnostics. Better Healthcare.",
  addressLine1: "Ward No:25, Southern Bypass 402, School Rd",
  addressLine2: "Dakshin Jagaddal, Narendrapur",
  addressLine3: "Rajpur Sonarpur",
  addressLine4: "West Bengal - 700151, India",
  addressFull:
    "Ward No:25, Southern Bypass 402, School Rd, Dakshin Jagaddal, Narendrapur, Rajpur Sonarpur, West Bengal - 700151, India",
  locality: "Narendrapur",
  region: "West Bengal",
  postalCode: "700151",
  country: "IN",
  phoneDisplay: "+91 81003 47637",
  phoneE164: "+918100347637",
  phoneHref: "tel:+918100347637",
  whatsappNumber: "918100347637",
  whatsappDisplay: "+91 81003 47637",
  whatsappHref: "https://wa.me/918100347637",
  mapsUrl: "https://maps.app.goo.gl/xdnfqXeNGwo5j46q8",
  facebookUrl:
    "https://www.facebook.com/people/4m-Diagnostics-And-Healthcare/100077523393156/",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tests", href: "/tests" },
  { label: "Blood Tests", href: "/blood-tests" },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Doctors", href: "/doctors" },
  { label: "Home Collection", href: "/home-sample-collection" },
  { label: "Polyclinic", href: "/polyclinic" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;
