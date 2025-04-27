import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSeriesSummaryData } from '../api/api';

export const fetchSeriesSummary = createAsyncThunk(
  'seriesSummary/fetchSeriesSummary',
  async () => {
    return await fetchSeriesSummaryData();
  }
);

const seriesSummarySlice = createSlice({
  name: 'seriesSummary',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesSummary.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSeriesSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSeriesSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default seriesSummarySlice.reducer;
