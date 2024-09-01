import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const appStore = configureStore({
  reducer: {
    authStore: AuthSlice.reducer,
  },
});

export default appStore;
