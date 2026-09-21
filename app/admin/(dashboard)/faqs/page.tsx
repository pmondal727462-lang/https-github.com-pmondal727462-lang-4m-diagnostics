import { prisma } from "../../../../lib/prisma";
import { createFaq, toggleFaqActive, deleteFaq } from "../../../../lib/actions/faqs";

export default async function AdminFaqsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">FAQs</h1>
      <p className="text-sm text-muted">Published FAQs also power the 4M AI Assistant&apos;s answers.</p>

      <form action={createFaq} className="mt-6 space-y-3 rounded-2xl border border-border bg-surface p-5">
        <input name="question" required placeholder="Question" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea name="answer" required placeholder="Answer" rows={2} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="category" placeholder="Category (optional)" className="w-full max-w-xs rounded-lg border border-border px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark">
          Add FAQ
        </button>
      </form>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between gap-4 p-5">
            <div>
              <p className="font-medium text-foreground">{f.question}</p>
              <p className="mt-1 text-sm text-muted">{f.answer}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <form action={toggleFaqActive.bind(null, f.id, !f.isActive)}>
                <button type="submit" className="text-xs font-semibold text-brand-primary hover:underline">
                  {f.isActive ? "Deactivate" : "Activate"}
                </button>
              </form>
              <form action={deleteFaq.bind(null, f.id)}>
                <button type="submit" className="text-xs font-semibold text-danger hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {faqs.length === 0 ? <p className="p-5 text-center text-sm text-muted">No FAQs yet.</p> : null}
      </div>
    </div>
  );
}
