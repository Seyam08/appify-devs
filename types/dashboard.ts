export type DateRange = "7d" | "30d" | "12m";
export type UserTypeFilter = "all" | "free" | "premium" | "enterprise";

export interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
}

export interface TrendPoint {
  month: string;
  value: number;
}

export interface DistributionPoint {
  label: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  kpis: KPI[];
  revenue: TrendPoint[];
  orders: TrendPoint[];
  users: DistributionPoint[];
  trafficSources: DistributionPoint[];
}

export interface DashboardResponse {
  filters: {
    dateRange: DateRange;
    userType: UserTypeFilter;
  };
  data: DashboardStats;
}
