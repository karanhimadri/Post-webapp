import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    userName: null,
    status: false,
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.userData;
      state.userName = action.payload.userName;
      state.status = true;
    },
    logout: (state) => {
      state.userData = null;
      state.status = false;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice;
