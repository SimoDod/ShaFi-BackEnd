import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../../localization/i18n";
import { AxiosError } from "axios";
import { authApi } from "../../../api/api";
import { LoginData, User } from "../../../types/User";

export const loginThunk = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await authApi.post("auth/login", loginData);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
