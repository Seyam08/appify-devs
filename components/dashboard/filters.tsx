"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRange, setUserType } from "@/store/filtersSlice";
import type { DateRange, UserType } from "@/types/dashboard";

const rangeOptions: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "12m", label: "Last 12 months" },
];

const userOptions: { value: UserType; label: string }[] = [
  { value: "all", label: "All Users" },
  { value: "free", label: "Free" },
  { value: "premium", label: "Premium" },
  { value: "enterprise", label: "Enterprise" },
];

export function DashboardFilters() {
  const dispatch = useAppDispatch();
  const { range, userType } = useAppSelector((state) => state.filters);

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 md:flex-row md:items-center">
      <label className="flex flex-1 flex-col gap-1 text-sm">
        Date range
        <select
          className="h-10 rounded-md border bg-background px-3"
          value={range}
          onChange={(event) => dispatch(setRange(event.target.value as DateRange))}
        >
          {rangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-1 text-sm">
        User type
        <select
          className="h-10 rounded-md border bg-background px-3"
          value={userType}
          onChange={(event) => dispatch(setUserType(event.target.value as UserType))}
        >
          {userOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
