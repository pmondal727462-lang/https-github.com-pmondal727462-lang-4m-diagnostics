import { Container } from "../ui/Container";
import { SectionHeading, EmptyState } from "../ui/Card";
import { LinkButton } from "../ui/Button";
import { getActiveFaqs } from "../../lib/data/faqs";

export async function FaqPreview() {
  const faqs = await getActiveFaqs();
  const items = faqs.slice(0, 5);

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" center />
        <div className="mx-auto mt-8 max-w-3xl">
          {items.length === 0 ? (
            <EmptyState title="FAQs will appear here soon" />
          ) : (
            <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {items.map((faq) => (
                <details key={faq.id} className="group p-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:content-none">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          )}
          <div className="mt-6 text-center">
            <LinkButton href="/faq" variant="ghost">
              View all FAQs →
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
