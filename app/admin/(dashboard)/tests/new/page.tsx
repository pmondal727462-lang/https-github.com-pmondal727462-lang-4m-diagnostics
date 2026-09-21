import { prisma } from "../../../../../lib/prisma";
import { createTest } from "../../../../../lib/actions/tests";
import { TestForm } from "../../../../../components/admin/TestForm";

export default async function NewTestPage() {
  const categories = await prisma.testCategory.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Add Test</h1>
      {categories.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Create a test category first from{" "}
          <a href="/admin/test-categories" className="text-brand-primary underline">
            Test Categories
          </a>
          .
        </p>
      ) : (
        <div className="mt-6">
          <TestForm action={createTest} categories={categories} />
        </div>
      )}
    </div>
  );
}
