import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PostSlice from "./PostSlice";

const appStore = configureStore({
  reducer: {
    authStore: AuthSlice.reducer,
    postsStore: PostSlice.reducer,
  },
});

export default appStore;
