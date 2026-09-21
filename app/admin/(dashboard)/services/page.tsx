import { prisma } from "../../../../lib/prisma";
import { createService, toggleServiceActive, deleteService } from "../../../../lib/actions/services";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Services</h1>
      <p className="text-sm text-muted">Control which service cards are published on the website.</p>

      <form action={createService} className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-border bg-surface p-5">
        <input name="name" required placeholder="Service name" className="flex-1 min-w-[200px] rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="description" placeholder="Description (optional)" className="flex-[2] min-w-[240px] rounded-lg border border-border px-3 py-2 text-sm" />
        <button type="submit" className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-dark">
          Add Service
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.description ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.isActive ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
                    {s.isActive ? "Published" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={toggleServiceActive.bind(null, s.id, !s.isActive)} className="inline">
                    <button type="submit" className="mr-3 text-xs font-semibold text-brand-primary hover:underline">
                      {s.isActive ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={deleteService.bind(null, s.id)} className="inline">
                    <button type="submit" className="text-xs font-semibold text-danger hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
