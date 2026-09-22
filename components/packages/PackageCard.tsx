"use client";

import { HeartPulse } from "lucide-react";
import type { HealthPackage } from "@/lib/types";
import { buildHealthPackageEnquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import IconBadge from "@/components/ui/IconBadge";

export default function PackageCard({ pkg }: { pkg: HealthPackage }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10">
      <IconBadge icon={HeartPulse} tone="amber" size="md" />
      <h3 className="mt-4 text-lg font-bold text-slate-900">{pkg.name}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{pkg.description}</p>
      <p className="mt-3 text-xs font-medium text-slate-500">
        Contact us for package details and pricing.
      </p>
      <button
        type="button"
        onClick={() => openWhatsApp(buildHealthPackageEnquiryMessage(pkg.name))}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbf5a]"
      >
        ENQUIRE ON WHATSAPP
      </button>
    </div>
  );
}
