import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: false,
};

const refetchRealTiemSlice = createSlice({
  name: "refetchRealTiemSlice",
  initialState,
  reducers: {
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setRefetch } = refetchRealTiemSlice.actions;

export default refetchRealTiemSlice.reducer;