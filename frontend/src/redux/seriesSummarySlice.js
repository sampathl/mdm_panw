import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSeriesSummary = createAsyncThunk(
  "seriesSummary/fetchSeriesSummary",
  async () => {
    const response = await fetch("http://localhost:5000/api/v1/series_summary");
    if (!response.ok) {
      throw new Error("Failed to fetch series summary data");
    }
    return await response.json();
  }
);

const seriesSummarySlice = createSlice({
  name: "seriesSummary",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesSummary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSeriesSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSeriesSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default seriesSummarySlice.reducer;