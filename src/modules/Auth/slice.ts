// src/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState,  } from "./types";

export const initialState: AuthState = {
  userId: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: string; email: string }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;