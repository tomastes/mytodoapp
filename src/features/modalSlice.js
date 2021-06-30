import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: false,
  },
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state) => state.modalState.modal;

export default modalSlice.reducer;
