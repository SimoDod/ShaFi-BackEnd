import { Middleware } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth/loginThunk";
import { registerThunk } from "../thunks/auth/registerThunk";

const localStorageMiddlewere: Middleware = () => (next) => (action) => {
  if (
    loginThunk.fulfilled.match(action) ||
    registerThunk.fulfilled.match(action)
  ) {
    const user = action.payload;
    const token = action.payload.token;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  return next(action);
};

export default localStorageMiddlewere;
