import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: false,
};

const refetchUserSlice = createSlice({
  name: "refetchUser",
  initialState,
  reducers: {
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setRefetch } = refetchUserSlice.actions;

export default refetchUserSlice.reducer;
