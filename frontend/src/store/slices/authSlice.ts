import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth/loginThunk";
import { registerThunk } from "../thunks/auth/registerThunk";
import { fetchUserThunk } from "../thunks/auth/fetchUserThunk";
import { User, UserRole } from "../../types/User";

type AuthState = {
  token: string;
  user: User;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: "",
  user: { _id: "", email: "", role: UserRole.USER, token: "", username: "" },
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Login
    addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Register
    addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(registerThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(registerThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Fetch user data
    addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    addCase(fetchUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
