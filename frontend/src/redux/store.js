import { configureStore } from "@reduxjs/toolkit";
import debtReducer from "./debtSlice";
import filterReducer from "./filterSlice"


export const store = configureStore({
  reducer: {
    debt: debtReducer,
    filters: filterReducer,
  },
});