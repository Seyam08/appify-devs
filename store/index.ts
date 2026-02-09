import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "@/store/dashboardSlice";
import filtersReducer from "@/store/filtersSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
