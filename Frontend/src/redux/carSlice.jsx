import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carVideo: null,
  loading: false,
  error: false,
};

export const carSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
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