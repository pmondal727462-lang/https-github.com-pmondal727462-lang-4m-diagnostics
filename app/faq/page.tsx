import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading, EmptyState } from "../../components/ui/Card";
import { getActiveFaqs } from "../../lib/data/faqs";
import { faqJsonLd } from "../../lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about tests, bookings, and reports at 4M Diagnostics.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getActiveFaqs();

  return (
    <Container className="py-14">
      <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />

      <div className="mt-8 max-w-3xl">
        {faqs.length === 0 ? (
          <EmptyState title="FAQs will appear here soon" />
        ) : (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
                ),
              }}
            />
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {faqs.map((faq) => (
                <details key={faq.id} className="group p-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
