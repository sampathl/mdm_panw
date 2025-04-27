import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountrySummary = createAsyncThunk(
  "countrySummary/fetchCountrySummary",
  async () => {
    const response = await fetch("http://localhost:5000/api/v1/country_summary");
    if (!response.ok) {
      throw new Error("Failed to fetch country summary data");
    }
    return await response.json();
  }
);

const countrySummarySlice = createSlice({
  name: "countrySummary",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountrySummary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountrySummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCountrySummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default countrySummarySlice.reducer;