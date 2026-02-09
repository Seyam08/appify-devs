import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "@/services/api";
import type {
  DashboardPayload,
  DatasetRecord,
  DateRange,
  KpiMetrics,
  OrdersPoint,
  TrafficPoint,
  UserDistributionPoint,
  UserType,
  RevenuePoint,
} from "@/types/dashboard";

interface DashboardState {
  data: DashboardPayload | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  status: "idle",
  error: null,
};

const pickByFilters = <T>(
  records: DatasetRecord<T>[],
  range: DateRange,
  userType: UserType,
): T => {
  const exact = records.find((record) => record.range === range && record.userType === userType);
  if (exact) return exact.data;

  const byRange = records.find((record) => record.range === range && record.userType === "all");
  if (byRange) return byRange.data;

  return records[0].data;
};

export const fetchDashboardData = createAsyncThunk<
  DashboardPayload,
  { range: DateRange; userType: UserType },
  { rejectValue: string }
>("dashboard/fetchDashboardData", async ({ range, userType }, { rejectWithValue }) => {
  try {
    const [statsRes, revenueRes, ordersRes, usersRes, trafficRes] = await Promise.all([
      apiClient.get<DatasetRecord<KpiMetrics>[]>("/stats"),
      apiClient.get<DatasetRecord<RevenuePoint[]>[]>("/revenue"),
      apiClient.get<DatasetRecord<OrdersPoint[]>[]>("/orders"),
      apiClient.get<DatasetRecord<UserDistributionPoint[]>[]>("/users"),
      apiClient.get<DatasetRecord<TrafficPoint[]>[]>("/traffic"),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      stats: pickByFilters(statsRes.data, range, userType),
      revenue: pickByFilters(revenueRes.data, range, userType),
      orders: pickByFilters(ordersRes.data, range, userType),
      users: pickByFilters(usersRes.data, range, userType),
      traffic: pickByFilters(trafficRes.data, range, userType),
    };
  } catch {
    return rejectWithValue("Unable to load dashboard analytics. Please try again.");
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unexpected error";
      });
  },
});

export default dashboardSlice.reducer;
