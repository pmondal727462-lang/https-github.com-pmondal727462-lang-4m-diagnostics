import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about booking tests, doctor appointments, home sample collection and pricing at 4M Diagnostics, Narendrapur.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Everything you need to know about booking tests, appointments and home sample collection."
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion items={FAQS} />
        </Container>
      </section>
    </>
  );
}
