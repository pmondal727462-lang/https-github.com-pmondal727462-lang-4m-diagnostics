import { notFound } from "next/navigation";
import { prisma } from "../../../../../../lib/prisma";
import { updateTest } from "../../../../../../lib/actions/tests";
import { TestForm } from "../../../../../../components/admin/TestForm";

export default async function EditTestPage(props: PageProps<"/admin/tests/[id]/edit">) {
  const { id } = await props.params;
  const [test, categories] = await Promise.all([
    prisma.test.findUnique({ where: { id } }),
    prisma.testCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!test) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Edit Test</h1>
      <div className="mt-6">
        <TestForm action={updateTest.bind(null, id)} categories={categories} test={test} />
      </div>
    </div>
  );
}
