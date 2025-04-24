import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    selectedYear: "All",
    selectedCountry: "All",
  },
  reducers: {
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setSelectedYear, setSelectedCountry } = filterSlice.actions;
export default filterSlice.reducer;