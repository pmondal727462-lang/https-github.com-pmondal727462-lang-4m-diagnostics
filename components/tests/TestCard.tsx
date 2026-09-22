import Link from "next/link";
import { FlaskConical } from "lucide-react";
import type { BloodTest } from "@/lib/types";
import IconBadge from "@/components/ui/IconBadge";

export default function TestCard({ test }: { test: BloodTest }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10">
      <div className="flex items-start gap-3">
        <IconBadge icon={FlaskConical} tone="red" size="sm" />
        <div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
            {test.category}
          </span>
          <h3 className="mt-1.5 text-sm font-bold text-slate-900">{test.name}</h3>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm text-slate-600">{test.description}</p>
      <p className="mt-3 text-xs font-medium text-slate-500">
        Price &amp; availability: Contact 4M Diagnostics
      </p>
      <Link
        href={`/book-test?test=${encodeURIComponent(test.name)}`}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
      >
        BOOK ON WHATSAPP
      </Link>
    </div>
  );
}
