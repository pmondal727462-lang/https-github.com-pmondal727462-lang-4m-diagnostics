import type { Metadata } from "next";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import PhotoBanner from "@/components/ui/PhotoBanner";
import HomeCollectionForm from "@/components/home-collection/HomeCollectionForm";

export const metadata: Metadata = {
  title: "Home Sample Collection",
  description:
    "Book home sample collection with 4M Diagnostics in Narendrapur. Get your diagnostic samples collected conveniently from your home — confirm on WhatsApp.",
  alternates: { canonical: "/home-sample-collection" },
};

const HIGHLIGHTS = [
  {
    icon: MapPin,
    title: "Covers Narendrapur & Rajpur Sonarpur",
    description: "Serving homes across our local coverage area.",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description: "Choose a preferred date and time that works for you.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic Collection",
    description: "Trained staff follow standard hygiene protocols.",
  },
];

export default function HomeSampleCollectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Home Sample Collection"
        title="Home Sample Collection"
        subtitle="Get your diagnostic samples collected conveniently from your home. Contact 4M Diagnostics through WhatsApp to confirm availability, timing and charges."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <PhotoBanner
            src="/images/blood-test-tubes.jpg"
            alt="Sample tubes ready for home collection testing"
            className="mb-12"
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4">
                {HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <HomeCollectionForm />
          </div>
        </Container>
      </section>
    </>
  );
}
