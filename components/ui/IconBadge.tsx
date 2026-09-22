import { createElement } from "react";
import type { LucideIcon } from "lucide-react";

type Tone = "blue" | "red" | "amber" | "navy" | "white";
type Size = "sm" | "md" | "lg" | "xl";

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-blue-900/25",
  red: "bg-gradient-to-br from-red-400 to-red-600 text-white shadow-red-900/25",
  amber: "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-900/25",
  navy: "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-slate-900/30",
  white: "bg-white text-blue-700 shadow-slate-900/10 ring-1 ring-slate-100",
};

const SIZE_CLASSES: Record<Size, { wrapper: string; icon: string }> = {
  sm: { wrapper: "h-10 w-10 rounded-xl", icon: "h-5 w-5" },
  md: { wrapper: "h-12 w-12 rounded-2xl", icon: "h-6 w-6" },
  lg: { wrapper: "h-16 w-16 rounded-2xl", icon: "h-7 w-7" },
  xl: { wrapper: "h-20 w-20 rounded-3xl", icon: "h-9 w-9" },
};

export default function IconBadge({
  icon,
  tone = "blue",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const { wrapper, icon: iconSize } = SIZE_CLASSES[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center shadow-lg ${TONE_CLASSES[tone]} ${wrapper} ${className}`}
    >
      {createElement(icon, { className: iconSize, strokeWidth: 2 })}
    </span>
  );
}
