import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/Card";
import { ChatWidget } from "../../components/ai/ChatWidget";
import { AI_DISCLAIMER } from "../../lib/ai/assistant";

export const metadata: Metadata = {
  title: "4M AI Assistant",
  description: "Ask 4M AI about tests, packages, bookings, home collection and reports.",
  alternates: { canonical: "/ai-assistant" },
};

export default function AiAssistantPage() {
  return (
    <Container className="max-w-2xl py-14">
      <SectionHeading eyebrow="🤖 Ask 4M AI" title="4M AI Assistant" />
      <p className="mt-3 rounded-lg border border-border bg-surface/60 p-3 text-xs text-muted">
        {AI_DISCLAIMER}
      </p>
      <div className="mt-6">
        <ChatWidget />
      </div>
    </Container>
  );
}
