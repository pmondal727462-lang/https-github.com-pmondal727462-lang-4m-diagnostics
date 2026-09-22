import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/services";
import { getServiceIcon } from "@/components/ui/icon-map";
import IconBadge from "@/components/ui/IconBadge";

export default function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {QUICK_ACTIONS.map((action) => {
        const Icon = getServiceIcon(action.icon);
        const isExternal = action.href.startsWith("http");
        return (
          <Link
            key={action.title}
            href={action.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
          >
            <IconBadge icon={Icon} tone={action.tone} size="md" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{action.title}</p>
              <p className="truncate text-xs text-slate-500">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </Link>
        );
      })}
    </div>
  );
}
