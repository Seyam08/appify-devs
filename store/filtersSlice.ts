import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DateRange, UserType } from "@/types/dashboard";

interface FiltersState {
  range: DateRange;
  userType: UserType;
}

const initialState: FiltersState = {
  range: "30d",
  userType: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<DateRange>) => {
      state.range = action.payload;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
  },
});

export const { setRange, setUserType } = filtersSlice.actions;
export default filtersSlice.reducer;
