"use client";

import { useRouter } from "next/navigation";

export function AdminTopbar({ name, role }: { name: string; role: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5">
      <p className="text-sm font-semibold text-foreground">Admin Dashboard</p>
      <div className="flex items-center gap-4">
        <div className="text-right text-sm">
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted">{role.replace("_", " ")}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-primary hover:text-brand-primary"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
