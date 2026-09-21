import { redirect } from "next/navigation";
import { getAdminSession } from "../../../lib/auth/session";
import { AdminSidebar } from "../../../components/admin/AdminSidebar";
import { AdminTopbar } from "../../../components/admin/AdminTopbar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar name={session.name} role={session.role} />
        <main className="flex-1 overflow-x-hidden p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
