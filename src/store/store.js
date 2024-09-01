import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import LoadingSlice from "./LoadingSlice";

const appStore = configureStore({
  reducer: {
    authStore: AuthSlice.reducer,
    loadingStore: LoadingSlice.reducer,
  },
});

export default appStore;
