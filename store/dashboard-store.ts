"use client";

import { useSyncExternalStore } from "react";
import { DashboardResponse, DateRange, UserTypeFilter } from "@/types/dashboard";

interface DashboardState {
  dateRange: DateRange;
  userType: UserTypeFilter;
  loading: boolean;
  error: string | null;
  data: DashboardResponse["data"] | null;
}

type Listener = () => void;

const state: DashboardState = {
  dateRange: "12m",
  userType: "all",
  loading: false,
  error: null,
  data: null,
};

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<DashboardState>) {
  Object.assign(state, partial);
  emit();
}

async function fetchDashboard() {
  setState({ loading: true, error: null });

  try {
    const response = await fetch(`/api/dashboard?dateRange=${state.dateRange}&userType=${state.userType}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Unable to fetch dashboard analytics.");
    }

    const payload = (await response.json()) as DashboardResponse;
    setState({ data: payload.data, loading: false });
  } catch (error) {
    setState({
      error: error instanceof Error ? error.message : "Unexpected dashboard error.",
      loading: false,
    });
  }
}

export const dashboardStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },
  setDateRange(dateRange: DateRange) {
    if (state.dateRange !== dateRange) {
      setState({ dateRange });
      void fetchDashboard();
    }
  },
  setUserType(userType: UserTypeFilter) {
    if (state.userType !== userType) {
      setState({ userType });
      void fetchDashboard();
    }
  },
  refresh() {
    void fetchDashboard();
  },
};

export function useDashboardStore() {
  return useSyncExternalStore(dashboardStore.subscribe, dashboardStore.getSnapshot, dashboardStore.getSnapshot);
}
