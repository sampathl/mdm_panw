import { configureStore } from "@reduxjs/toolkit";
import debtReducer from "./debtSlice";
import filterReducer from "./filterSlice";
import countrySummaryReducer from "./countrySummarySlice";
import countrySeriesReducer from "./countrySeriesSlice";
import seriesSummaryReducer from "./seriesSummarySlice";


export const store = configureStore({
  reducer: {
    debt: debtReducer,
    filters: filterReducer,
    countrySummary: countrySummaryReducer,
    countrySeries: countrySeriesReducer,
    seriesSummary: seriesSummaryReducer,
  },
});