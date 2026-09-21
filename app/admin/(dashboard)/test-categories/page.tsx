import { prisma } from "../../../../lib/prisma";
import { createTestCategory, toggleTestCategoryActive, deleteTestCategory } from "../../../../lib/actions/testCategories";

export default async function AdminTestCategoriesPage() {
  const categories = await prisma.testCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: { _count: { select: { tests: true } } },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Test Categories</h1>
      <p className="text-sm text-muted">Categories organise tests for search and filtering.</p>

      <form action={createTestCategory} className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-border bg-surface p-5">
        <input name="name" required placeholder="Category name" className="flex-1 min-w-[200px] rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="description" placeholder="Description (optional)" className="flex-[2] min-w-[240px] rounded-lg border border-border px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark">
          Add Category
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Tests</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.slug}</td>
                <td className="px-4 py-3 text-muted">{c._count.tests}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.isActive ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={toggleTestCategoryActive.bind(null, c.id, !c.isActive)} className="inline">
                    <button type="submit" className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                      {c.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                  <form action={deleteTestCategory.bind(null, c.id)} className="inline">
                    <button type="submit" className="text-xs font-semibold text-danger hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No categories yet. Add your first category above.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
