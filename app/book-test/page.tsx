import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import BookTestForm from "@/components/tests/BookTestForm";

export const metadata: Metadata = {
  title: "Book a Test",
  description:
    "Book a diagnostic or blood test at 4M Diagnostics, Narendrapur. Fill in your details and confirm instantly on WhatsApp.",
  alternates: { canonical: "/book-test" },
};

export default async function BookTestPage(
  props: PageProps<"/book-test">
) {
  const searchParams = await props.searchParams;
  const testParam = searchParams?.test;
  const initialTest = Array.isArray(testParam) ? testParam[0] : testParam ?? "";

  return (
    <>
      <PageHero
        eyebrow="Book a Test"
        title="Book a diagnostic test"
        subtitle="Fill in your details below. We will confirm test availability, pricing and your preferred date on WhatsApp."
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-2xl">
          <BookTestForm initialTest={initialTest} />
        </Container>
      </section>
    </>
  );
}
