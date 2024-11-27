import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import refetchReducer from "./slices/refecthUser";

const store = configureStore({
  reducer: {
    auth: authReducer,
    refetchUser: refetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
