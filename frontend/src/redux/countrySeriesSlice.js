import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountrySeries = createAsyncThunk(
  "countrySeries/fetchCountrySeries",
  async () => {
    const response = await fetch("http://localhost:5000/api/v1/country_series");
    if (!response.ok) {
      throw new Error("Failed to fetch country series data");
    }
    return await response.json();
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