import { configureStore } from "@reduxjs/toolkit";
import debtReducer from "./debtSlice";


export const store = configureStore({
  reducer: {
    debt: debtReducer,
  },
});