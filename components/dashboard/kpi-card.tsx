import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { KPI } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export function KpiCard({ item }: { item: KPI }) {
  const isPositive = item.change >= 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm text-muted-foreground">{item.label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
      <p className={cn("mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs", isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
        <Icon className="size-3" />
        {isPositive ? "+" : ""}
        {item.change}%
      </p>
    </article>
  );
}
