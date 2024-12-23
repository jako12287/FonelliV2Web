import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const openModalSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = openModalSlice.actions;

export default openModalSlice.reducer;
