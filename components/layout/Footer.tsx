import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { BUSINESS, FOOTER_LINKS } from "@/lib/constants";
import FacebookIcon from "@/components/ui/icons/FacebookIcon";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 pb-24 text-slate-300 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="4M Diagnostics and Healthcare logo"
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-lg bg-white object-contain p-0.5"
              />
              <span className="text-lg font-bold text-white">4M Diagnostics</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {BUSINESS.tagline} Diagnostic, pathology, health checkup and
              specialist consultation services with convenient WhatsApp
              booking.
            </p>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="4M Diagnostics on Facebook"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{BUSINESS.addressFull}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-red-400" />
                <a href={BUSINESS.phoneHref} className="hover:text-white">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get Directions
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Find 4M Diagnostics easily on Google Maps.
            </p>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} 4M Diagnostics. All rights
            reserved.
          </span>
          <span>Narendrapur, Rajpur Sonarpur, West Bengal</span>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-600 sm:text-left">
          Stock photography via Wikimedia Commons. Stethoscope photo &copy;{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:2023_Stetoskop.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400"
          >
            Jacek Halicki
          </a>
          , licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-400"
          >
            CC BY-SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
