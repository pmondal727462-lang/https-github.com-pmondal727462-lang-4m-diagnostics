import Link from "next/link";

export function FloatingAIButton() {
  return (
    <Link
      href="/ai-assistant"
      className="fixed right-4 bottom-20 z-40 inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-accent/30 transition-transform hover:scale-105 lg:bottom-6"
      aria-label="Ask 4M AI Assistant"
    >
      <span aria-hidden="true">🤖</span>
      <span className="hidden sm:inline">Ask 4M AI</span>
    </Link>
  );
}
