import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { togglePackageActive, deletePackage } from "../../../../lib/actions/packages";
import { formatINR } from "../../../../lib/format";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { tests: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Packages</h1>
          <p className="text-sm text-muted">Manage health packages shown on the website.</p>
        </div>
        <Link href="/admin/packages/new" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark">
          + Add Package
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Tests</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.category.replace(/_/g, " ")}</td>
                <td className="px-4 py-3 text-muted">{p._count.tests}</td>
                <td className="px-4 py-3 text-foreground">
                  {formatINR(p.offerPrice ?? p.regularPrice)}
                  {p.offerPrice ? <span className="ml-1 text-xs text-muted line-through">{formatINR(p.regularPrice)}</span> : null}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.isActive ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/packages/${p.id}/edit`} className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                    Edit
                  </Link>
                  <form action={togglePackageActive.bind(null, p.id, !p.isActive)} className="inline">
                    <button type="submit" className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                      {p.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                  <form action={deletePackage.bind(null, p.id)} className="inline">
                    <button type="submit" className="text-xs font-semibold text-danger hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {packages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No packages yet. Add your first package to publish it on the website.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
