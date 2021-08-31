import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "mode",
  initialState: {
    mode: false,
  },
  reducers: {
    setNightMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setNightMode } = appSlice.actions;

export const selectAppState = (state) => state.appState.mode;

export default appSlice.reducer;
