export type DateRange = "7d" | "30d" | "12m";
export type UserType = "all" | "free" | "premium" | "enterprise";

export interface KpiMetrics {
  totalRevenue: number;
  revenueChange: number;
  totalUsers: number;
  usersChange: number;
  orders: number;
  ordersChange: number;
  conversionRate: number;
  conversionChange: number;
}

export interface RevenuePoint {
  month: string;
  value: number;
}

export interface OrdersPoint {
  month: string;
  value: number;
}

export interface UserDistributionPoint {
  name: string;
  value: number;
}

export interface TrafficPoint {
  source: string;
  value: number;
}

export interface DashboardPayload {
  stats: KpiMetrics;
  revenue: RevenuePoint[];
  orders: OrdersPoint[];
  users: UserDistributionPoint[];
  traffic: TrafficPoint[];
}

export interface DatasetRecord<T> {
  id: number;
  range: DateRange;
  userType: UserType;
  data: T;
}
