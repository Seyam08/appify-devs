import { DashboardStats, DateRange, UserTypeFilter } from "@/types/dashboard";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const baseStats: DashboardStats = {
  kpis: [
    { id: "revenue", label: "Total Revenue", value: "$54,230", change: 12.4 },
    { id: "users", label: "Total Users", value: "1,245", change: 8.1 },
    { id: "orders", label: "Orders", value: "342", change: -2.3 },
    { id: "conversion", label: "Conversion Rate", value: "4.3%", change: 1.8 },
  ],
  revenue: MONTHS.map((month, index) => ({ month, value: 2800 + (index + 1) * 380 + (index % 2 === 0 ? 260 : -170) })),
  orders: MONTHS.map((month, index) => ({ month, value: 18 + index * 2 + (index % 3 === 0 ? 4 : -1) })),
  users: [
    { label: "Free", value: 780, color: "#60a5fa" },
    { label: "Premium", value: 345, color: "#34d399" },
    { label: "Enterprise", value: 120, color: "#fbbf24" },
  ],
  trafficSources: [
    { label: "Organic", value: 43, color: "#818cf8" },
    { label: "Paid", value: 27, color: "#f472b6" },
    { label: "Social", value: 18, color: "#22d3ee" },
    { label: "Referral", value: 12, color: "#f97316" },
  ],
};

const rangeScale: Record<DateRange, number> = {
  "7d": 0.3,
  "30d": 0.65,
  "12m": 1,
};

const userScale: Record<UserTypeFilter, number> = {
  all: 1,
  free: 0.58,
  premium: 0.3,
  enterprise: 0.12,
};

export function getFilteredStats(dateRange: DateRange, userType: UserTypeFilter): DashboardStats {
  const scale = rangeScale[dateRange] * userScale[userType];
  const minLength = dateRange === "7d" ? 4 : dateRange === "30d" ? 8 : 12;

  const scaleBy = (value: number, factor = 1) => Math.max(1, Math.round(value * scale * factor));

  return {
    kpis: baseStats.kpis.map((kpi) => {
      if (kpi.id === "revenue") return { ...kpi, value: `$${scaleBy(54230).toLocaleString()}` };
      if (kpi.id === "users") return { ...kpi, value: scaleBy(1245).toLocaleString() };
      if (kpi.id === "orders") return { ...kpi, value: scaleBy(342, 0.9).toLocaleString() };
      if (kpi.id === "conversion") return { ...kpi, value: `${Math.max(1.1, 4.3 * (0.7 + scale * 0.6)).toFixed(1)}%` };
      return kpi;
    }),
    revenue: baseStats.revenue.slice(-minLength).map((point) => ({ ...point, value: scaleBy(point.value, 1.05) })),
    orders: baseStats.orders.slice(-minLength).map((point) => ({ ...point, value: scaleBy(point.value, 1.4) })),
    users: baseStats.users.map((entry) => {
      const factor = userType === "all" ? 1 : entry.label.toLowerCase() === userType ? 1.5 : 0.25;
      return { ...entry, value: scaleBy(entry.value, factor) };
    }),
    trafficSources: baseStats.trafficSources.map((source) => ({
      ...source,
      value: scaleBy(source.value, 1.1),
    })),
  };
}
