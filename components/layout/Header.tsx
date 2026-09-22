"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Header() {
  const [open, setOpen] = useState(false);

  const whatsappHref = buildWhatsAppUrl(
    buildGeneralEnquiryMessage("your services")
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="4M Diagnostics and Healthcare logo"
            width={44}
            height={44}
            priority
            className="h-11 w-11 shrink-0 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-slate-900">
              4M Diagnostics
            </span>
            <span className="text-xs text-slate-500">Diagnostic Center</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/book-test"
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            BOOK TEST
          </Link>
          <Link
            href="/appointment"
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            APPOINTMENT
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
          >
            WHATSAPP
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={BUSINESS.phoneHref}
            aria-label="Call 4M Diagnostics"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/book-test"
              onClick={() => setOpen(false)}
              className="rounded-full bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              BOOK TEST
            </Link>
            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="rounded-full bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              APPOINTMENT
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              WHATSAPP
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
