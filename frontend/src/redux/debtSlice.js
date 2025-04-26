// src/redux/debtSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch international debt data
export const fetchDebtData = createAsyncThunk(
  "debt/fetchDebtData",
  async () => {
    const response = await fetch("http://localhost:5000/api/v1/international_debt");
    if (!response.ok) {
      throw new Error("Failed to fetch international debt data");
    }
    return await response.json();
  }
);

const debtSlice = createSlice({
  name: "debt",
  initialState: {
    data: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebtData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDebtData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDebtData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default debtSlice.reducer;