import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicChrome } from "../components/layout/PublicChrome";
import { BUSINESS } from "../lib/constants";
import { medicalBusinessJsonLd, SITE_URL } from "../lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS.name} — Diagnostic Centre in Narendrapur, Rajpur Sonarpur`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Reliable diagnostic, pathology and polyclinic services in Narendrapur with convenient digital booking, home sample collection and secure online reports.",
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Accurate Diagnostics. Better Healthcare.`,
    description:
      "Reliable diagnostic, pathology and polyclinic services with convenient digital booking and patient support.",
  },
  alternates: { canonical: "/" },
};

// All pages read admin-managed content straight from the database, so the
// whole app is server-rendered per request rather than statically built —
// admin edits (tests, packages, prices, FAQs, ...) show up immediately.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
