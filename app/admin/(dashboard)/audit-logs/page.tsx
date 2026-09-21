import { prisma } from "../../../../lib/prisma";
import { formatDate } from "../../../../lib/format";

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Audit Logs</h1>
      <p className="text-sm text-muted">The most recent 100 administrative and authentication events.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase text-muted">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-muted">{formatDate(log.createdAt)}</td>
                <td className="px-4 py-3 text-foreground">{log.user?.name ?? "—"}</td>
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3 text-muted">{log.module}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${log.result === "SUCCESS" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                    {log.result}
                  </span>
                </td>
              </tr>
            ))}
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No activity recorded yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
