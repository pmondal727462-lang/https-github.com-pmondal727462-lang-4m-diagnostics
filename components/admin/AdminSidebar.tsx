"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV, ADMIN_NAV_GROUPS } from "../../lib/adminNav";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-sm font-bold text-white">
          4M
        </span>
        <span className="font-bold text-foreground">Admin</span>
      </div>
      <nav className="space-y-6 overflow-y-auto px-3 py-5" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group}>
            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted">{group}</p>
            <div className="mt-2 space-y-0.5">
              {ADMIN_NAV.filter((item) => item.group === group).map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                      active
                        ? "bg-brand-primary text-white"
                        : "text-foreground/80 hover:bg-brand-primary/5 hover:text-brand-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
