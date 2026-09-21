import { notFound } from "next/navigation";
import { prisma } from "../../../../../../lib/prisma";
import { updatePackage } from "../../../../../../lib/actions/packages";
import { PackageForm } from "../../../../../../components/admin/PackageForm";

export default async function EditPackagePage(props: PageProps<"/admin/packages/[id]/edit">) {
  const { id } = await props.params;
  const [pkg, tests] = await Promise.all([
    prisma.package.findUnique({ where: { id }, include: { tests: { include: { test: true } } } }),
    prisma.test.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!pkg) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Edit Package</h1>
      <div className="mt-6">
        <PackageForm action={updatePackage.bind(null, id)} tests={tests} pkg={pkg} />
      </div>
    </div>
  );
}
