import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { toggleTestActive, deleteTest } from "../../../../lib/actions/tests";
import { formatINR } from "../../../../lib/format";

export default async function AdminTestsPage() {
  const tests = await prisma.test.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Tests</h1>
          <p className="text-sm text-muted">Manage the diagnostic tests shown on the website.</p>
        </div>
        <Link href="/admin/tests/new" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark">
          + Add Test
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.code}</p>
                </td>
                <td className="px-4 py-3 text-muted">{t.category.name}</td>
                <td className="px-4 py-3 text-foreground">
                  {formatINR(t.offerPrice ?? t.price)}
                  {t.offerPrice ? <span className="ml-1 text-xs text-muted line-through">{formatINR(t.price)}</span> : null}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.isActive ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
                    {t.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/tests/${t.id}/edit`} className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                    Edit
                  </Link>
                  <form action={toggleTestActive.bind(null, t.id, !t.isActive)} className="inline">
                    <button type="submit" className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                      {t.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                  <form action={deleteTest.bind(null, t.id)} className="inline">
                    <button type="submit" className="text-xs font-semibold text-danger hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {tests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No tests yet. Add your first test to publish it on the website.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
