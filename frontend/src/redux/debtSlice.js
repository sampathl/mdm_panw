import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInternationalDebtData } from '../api/api';

export const fetchDebtData = createAsyncThunk(
  'debt/fetchDebtData',
  async () => {
    return await fetchInternationalDebtData();
  }
);

const debtSlice = createSlice({
  name: 'debt',
  initialState: {
    data: [],
    status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebtData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDebtData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDebtData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default debtSlice.reducer;
