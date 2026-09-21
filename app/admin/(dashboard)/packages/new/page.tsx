import { prisma } from "../../../../../lib/prisma";
import { createPackage } from "../../../../../lib/actions/packages";
import { PackageForm } from "../../../../../components/admin/PackageForm";

export default async function NewPackagePage() {
  const tests = await prisma.test.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Add Package</h1>
      <div className="mt-6">
        <PackageForm action={createPackage} tests={tests} />
      </div>
    </div>
  );
}
