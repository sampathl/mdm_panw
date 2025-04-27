import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCountrySeriesData } from "../api/api";

export const fetchCountrySeries = createAsyncThunk(
  "countrySeries/fetchCountrySeries",
  async () => {
    return await fetchCountrySeriesData();
  }
);

const countrySeriesSlice = createSlice({
  name: "countrySeries",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountrySeries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountrySeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCountrySeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default countrySeriesSlice.reducer;