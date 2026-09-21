import Link from "next/link";
import { Container } from "../ui/Container";
import { BUSINESS } from "../../lib/constants";

const actions = [
  {
    href: "/book-test",
    title: "Book a Test",
    description: "Search and book any diagnostic test online.",
    icon: "🧪",
  },
  {
    href: "/home-sample-collection",
    title: "Home Sample Collection",
    description: "Request a sample pickup at your address.",
    icon: "🏠",
  },
  {
    href: "/reports",
    title: "Download Report",
    description: "Access your reports securely, anytime.",
    icon: "📄",
  },
  {
    href: "/doctors",
    title: "Doctor Appointment",
    description: "Book a consultation with our doctors.",
    icon: "🩺",
  },
  {
    href: "/ai-assistant",
    title: "Ask 4M AI",
    description: "Get quick answers about tests and bookings.",
    icon: "🤖",
  },
  {
    href: BUSINESS.googleMapsUrl,
    title: "Get Directions",
    description: "Find your way to 4M Diagnostics.",
    icon: "📍",
    external: true,
  },
];

export function QuickActions() {
  return (
    <section className="py-14">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {actions.map((action) =>
            action.external ? (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="text-sm font-semibold text-foreground">{action.title}</span>
                <span className="text-xs text-muted">{action.description}</span>
              </a>
            ) : (
              <Link
                key={action.title}
                href={action.href}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="text-sm font-semibold text-foreground">{action.title}</span>
                <span className="text-xs text-muted">{action.description}</span>
              </Link>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
