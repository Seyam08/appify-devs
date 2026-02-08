import { Button } from "@/components/ui/button";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-30 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-80 rounded-xl bg-muted" />
        <div className="h-80 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

export function DashboardError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center">
      <p className="text-sm text-red-700">{message}</p>
      <Button className="mt-4" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

export function DashboardEmpty() {
  return <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">No analytics data available for the selected filters.</div>;
}
