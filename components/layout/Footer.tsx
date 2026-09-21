import Link from "next/link";
import { BUSINESS } from "../../lib/constants";
import { Container } from "../ui/Container";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "Diagnostic Services" },
      { href: "/services", label: "Pathology" },
      { href: "/services", label: "Polyclinic" },
      { href: "/home-sample-collection", label: "Home Sample Collection" },
    ],
  },
  {
    title: "Patients",
    links: [
      { href: "/book-test", label: "Book a Test" },
      { href: "/doctors", label: "Doctor Appointments" },
      { href: "/reports", label: "Access Reports" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary text-base font-bold text-white">
              4M
            </span>
            <span className="text-lg font-bold text-foreground">{BUSINESS.name}</span>
          </Link>
          <address className="mt-4 max-w-xs text-sm not-italic leading-relaxed text-muted">
            {BUSINESS.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={BUSINESS.phoneHref}
            className="mt-3 inline-block text-sm font-semibold text-brand-primary"
          >
            {BUSINESS.phone}
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-foreground">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-brand-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p>
            4M AI provides general educational information and does not provide medical
            diagnosis or treatment.
          </p>
        </Container>
      </div>
    </footer>
  );
}
