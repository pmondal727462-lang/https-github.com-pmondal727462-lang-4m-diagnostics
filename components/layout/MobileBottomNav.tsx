"use client";

import Link from "next/link";
import { CalendarCheck, FlaskConical, MessageCircle, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function MobileBottomNav() {
  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  const items = [
    { label: "Call", href: BUSINESS.phoneHref, icon: Phone, external: true },
    { label: "WhatsApp", href: whatsappHref, icon: MessageCircle, external: true },
    { label: "Book Test", href: "/book-test", icon: FlaskConical, external: false },
    { label: "Appointment", href: "/appointment", icon: CalendarCheck, external: false },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 py-2.5 text-slate-600 active:bg-slate-50"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2.5 text-slate-600 active:bg-slate-50"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
