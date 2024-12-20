import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import refetchReducer from "./slices/refecthUser";
import refetchRealTiemSlice from "./slices/refecthRealTime"

const store = configureStore({
  reducer: {
    auth: authReducer,
    refetchUser: refetchReducer,
    refetchRealTime: refetchRealTiemSlice, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
