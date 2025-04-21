import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchDebtData = createAsyncThunk(
  "debt/fetchDebtData",
  async () => {
    const response = await fetch("http://localhost:5000/api/v1/debt");
    if (!response.ok) {
      throw new Error("Failed to fetch debt data");
    }
    return await response.json();
  }
);

const debtSlice = createSlice({
  name: "debt",
  initialState: {
    data: [],
    status: "idle",
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