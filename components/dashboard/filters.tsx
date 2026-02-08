"use client";

import { DateRange, UserTypeFilter } from "@/types/dashboard";

interface FiltersProps {
  dateRange: DateRange;
  userType: UserTypeFilter;
  onDateRangeChange: (value: DateRange) => void;
  onUserTypeChange: (value: UserTypeFilter) => void;
}

export function DashboardFilters({ dateRange, userType, onDateRangeChange, onUserTypeChange }: FiltersProps) {
  return (
    <section className="grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2">
      <label className="space-y-1 text-sm">
        <span className="font-medium">Date range</span>
        <select
          value={dateRange}
          onChange={(event) => onDateRangeChange(event.target.value as DateRange)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="12m">Last 12 months</option>
        </select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">User type</span>
        <select
          value={userType}
          onChange={(event) => onUserTypeChange(event.target.value as UserTypeFilter)}
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="all">All users</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </label>
    </section>
  );
}
