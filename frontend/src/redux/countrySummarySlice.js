import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCountrySummaryData } from '../api/api';

export const fetchCountrySummary = createAsyncThunk(
  'countrySummary/fetchCountrySummary',
  async () => {
    return await fetchCountrySummaryData();
  }
);

const countrySummarySlice = createSlice({
  name: 'countrySummary',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountrySummary.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountrySummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCountrySummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countrySummarySlice.reducer;
