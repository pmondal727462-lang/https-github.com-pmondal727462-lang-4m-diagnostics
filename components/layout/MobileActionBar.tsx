import Link from "next/link";
import { BUSINESS } from "../../lib/constants";

const items = [
  { href: BUSINESS.phoneHref, label: "Call", icon: "call", external: true, emphasized: false },
  { href: BUSINESS.whatsappHref, label: "WhatsApp", icon: "whatsapp", external: true, emphasized: false },
  { href: "/book-test", label: "Book", icon: "book", external: false, emphasized: true },
  { href: "/reports", label: "Reports", icon: "report", external: false, emphasized: false },
  { href: BUSINESS.googleMapsUrl, label: "Directions", icon: "map", external: true, emphasized: false },
] as const;

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {items.map((item) =>
        item.external ? (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-foreground/70"
          >
            <ActionIcon name={item.icon} emphasized={item.emphasized} />
            {item.label}
          </a>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-foreground/70"
          >
            <ActionIcon name={item.icon} emphasized={item.emphasized} />
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

function ActionIcon({ name, emphasized }: { name: string; emphasized?: boolean }) {
  const cls = emphasized
    ? "flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white"
    : "flex h-6 w-6 items-center justify-center text-brand-primary";

  const paths: Record<string, string> = {
    call: "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z",
    whatsapp:
      "M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm5.2 12.8c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.9-4.6-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.7 1.9.8 2 .1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.6.6 1 1.3 1.8 2.2 2.3.2.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.9.3.1.5.2.5.4.1.2.1.5-.1 1.1z",
    book: "M4 5.5A2.5 2.5 0 016.5 3H19a1 1 0 011 1v14a1 1 0 01-1 1H6.5A2.5 2.5 0 014 16.5v-11zM4 16.5A2.5 2.5 0 006.5 19H19",
    report: "M7 3h7l5 5v13H7V3zm7 0v5h5M9 12h6M9 16h6",
    map: "M9 20l-6-2V6l6 2m0 12l6-2m-6 2V8m6 10l6-2V4l-6 2m0 12V6m0 0L9 8",
  };

  return (
    <span className={cls}>
      <svg width={emphasized ? 16 : 20} height={emphasized ? 16 : 20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={paths[name]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
