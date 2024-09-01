import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
  name: "loading",
  initialState: { loadingState: false },
  reducers: {
    startLoading: (state) => {
      state.loadingState = true;
    },
    endLoading: (state) => {
      state.loadingState = false;
    },
  },
});

export const { startLoading, endLoading } = LoadingSlice.actions;
export default LoadingSlice;
