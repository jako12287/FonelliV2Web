import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import refetchReducer from "./slices/refecthUser";
import refetchRealTiemSlice from "./slices/refecthRealTime"
import openModalNotify from "./slices/openModalNotify"

const store = configureStore({
  reducer: {
    auth: authReducer,
    refetchUser: refetchReducer,
    refetchRealTime: refetchRealTiemSlice, 
    openModalNotify
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
