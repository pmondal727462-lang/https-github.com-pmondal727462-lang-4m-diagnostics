import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { BUSINESS, SITE_URL } from "@/lib/constants";

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
    default: "4M Diagnostics | Diagnostic Center in Narendrapur",
    template: "%s | 4M Diagnostics",
  },
  description:
    "4M Diagnostics offers blood tests, pathology, health checkups, home sample collection and specialist doctor consultations in Narendrapur, Rajpur Sonarpur, West Bengal. Book instantly on WhatsApp.",
  keywords: [
    "4M Diagnostics",
    "diagnostic center Narendrapur",
    "diagnostic centre Narendrapur",
    "pathology lab Narendrapur",
    "blood test Narendrapur",
    "blood test near Narendrapur",
    "diagnostic center Rajpur Sonarpur",
    "doctor consultation Narendrapur",
    "specialist doctor Narendrapur",
    "home sample collection Narendrapur",
    "polyclinic Narendrapur",
    "cardiologist Narendrapur",
    "gynecologist Narendrapur",
    "orthopedic doctor Narendrapur",
    "pediatrician Narendrapur",
  ],
  openGraph: {
    title: "4M Diagnostics | Diagnostic Center in Narendrapur",
    description:
      "Diagnostic, pathology, health checkup and specialist consultation services with convenient WhatsApp booking.",
    url: SITE_URL,
    siteName: BUSINESS.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.png", width: 955, height: 960, alt: BUSINESS.name }],
  },
  twitter: {
    card: "summary",
    title: "4M Diagnostics | Diagnostic Center in Narendrapur",
    description:
      "Diagnostic, pathology, health checkup and specialist consultation services with convenient WhatsApp booking.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: BUSINESS.name,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}`,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    hasMap: BUSINESS.mapsUrl,
    priceRange: "$$",
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
