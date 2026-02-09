"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { DashboardFilters } from "@/components/dashboard/filters";
import { OrdersChart, RevenueChart, TrafficSourceChart, UsersPieChart } from "@/components/dashboard/charts";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDashboardData } from "@/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function DashboardShell() {
  const dispatch = useAppDispatch();
  const { range, userType } = useAppSelector((state) => state.filters);
  const { data, status, error } = useAppSelector((state) => state.dashboard);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData({ range, userType }));
  }, [dispatch, range, userType]);

  const kpiData = useMemo(() => {
    if (!data) return [];

    return [
      { title: "Total Revenue", value: `$${data.stats.totalRevenue.toLocaleString()}`, change: data.stats.revenueChange },
      { title: "Total Users", value: data.stats.totalUsers.toLocaleString(), change: data.stats.usersChange },
      { title: "Orders", value: data.stats.orders.toLocaleString(), change: data.stats.ordersChange },
      { title: "Conversion Rate", value: `${data.stats.conversionRate}%`, change: data.stats.conversionChange },
    ];
  }, [data]);

  return (
    <div className="flex min-h-screen bg-muted/25">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <main className="space-y-6 p-4 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <DashboardFilters />
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(fetchDashboardData({ range, userType }))}
              className="hidden md:flex"
            >
              <RefreshCcw className="mr-1 h-3.5 w-3.5" /> Refresh
            </Button>
          </div>

          {status === "loading" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-28" />
                ))}
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-80" />
                ))}
              </div>
            </div>
          )}

          {status === "failed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-rose-600">Error loading dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{error}</p>
                <Button onClick={() => dispatch(fetchDashboardData({ range, userType }))}>Retry</Button>
              </CardContent>
            </Card>
          )}

          {status === "succeeded" && data && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpiData.map((kpi) => (
                  <KpiCard key={kpi.title} {...kpi} />
                ))}
              </section>

              {data.revenue.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center text-muted-foreground">No analytics for selected filters.</CardContent>
                </Card>
              ) : (
                <section className="grid gap-4 xl:grid-cols-2">
                  <RevenueChart data={data.revenue} />
                  <OrdersChart data={data.orders} />
                  <UsersPieChart data={data.users} />
                  <TrafficSourceChart data={data.traffic} />
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
