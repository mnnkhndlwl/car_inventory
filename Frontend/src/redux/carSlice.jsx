import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCar: null,
  loading: false,
  error: false,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentCar = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure} =
  carSlice.actions;

export default carSlice.reducer;