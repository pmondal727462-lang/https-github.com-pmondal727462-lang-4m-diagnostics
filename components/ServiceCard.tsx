import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceIcon } from "@/components/ui/icon-map";
import IconBadge from "@/components/ui/IconBadge";

export default function ServiceCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  const Icon = getServiceIcon(icon);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10">
      <IconBadge icon={Icon} tone="red" size="md" />
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:gap-2.5 transition-all hover:text-blue-800"
      >
        Learn more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
