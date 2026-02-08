"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { DashboardFilters } from "@/components/dashboard/filters";
import { dashboardStore, useDashboardStore } from "@/store/dashboard-store";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { RevenueLineChart } from "@/components/dashboard/charts/revenue-line-chart";
import { OrdersBarChart } from "@/components/dashboard/charts/orders-bar-chart";
import { DistributionPieChart } from "@/components/dashboard/charts/distribution-pie-chart";
import { DashboardEmpty, DashboardError, DashboardSkeleton } from "@/components/dashboard/dashboard-states";
import { cn } from "@/lib/utils";

export function DashboardShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dateRange, userType, loading, error, data } = useDashboardStore();

  useEffect(() => {
    dashboardStore.refresh();
  }, []);

  const hasData = Boolean(data && data.kpis.length > 0);
  const gridClass = useMemo(() => "grid gap-4 lg:grid-cols-2 2xl:grid-cols-3", []);

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className={cn("transition-all duration-300", collapsed ? "lg:pl-20" : "lg:pl-70")}>
        <Topbar onToggleSidebar={() => setCollapsed((current) => !current)} onToggleMobile={() => setMobileOpen((current) => !current)} />

        <main className="space-y-5 p-4 lg:p-8">
          <DashboardFilters
            dateRange={dateRange}
            userType={userType}
            onDateRangeChange={(value) => dashboardStore.setDateRange(value)}
            onUserTypeChange={(value) => dashboardStore.setUserType(value)}
          />

          {loading && <DashboardSkeleton />}
          {!loading && error && <DashboardError message={error} onRetry={dashboardStore.refresh} />}
          {!loading && !error && !hasData && <DashboardEmpty />}

          {!loading && !error && data && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {data.kpis.map((item) => (
                  <KpiCard key={item.id} item={item} />
                ))}
              </section>

              <section className={gridClass}>
                <ChartCard title="Revenue Over Time">
                  <RevenueLineChart data={data.revenue} />
                </ChartCard>
                <ChartCard title="Orders Per Month">
                  <OrdersBarChart data={data.orders} />
                </ChartCard>
                <ChartCard title="User Distribution">
                  <DistributionPieChart data={data.users} label="User Distribution" />
                </ChartCard>
              </section>

              <section className="rounded-xl border bg-card p-4 shadow-sm lg:max-w-xl">
                <h2 className="mb-4 text-sm font-medium text-muted-foreground">Traffic Source</h2>
                <div className="h-70">
                  <DistributionPieChart data={data.trafficSources} label="Traffic Sources" />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
