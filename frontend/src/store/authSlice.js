import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  isAuthenticated: !!tokenFromStorage,
  token: tokenFromStorage,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
    },

    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
