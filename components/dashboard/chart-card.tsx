import { ReactNode } from "react";

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="h-70">{children}</div>
    </section>
  );
}
