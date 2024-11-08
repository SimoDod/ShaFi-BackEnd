import { createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "../../../localization/i18n";
import { AxiosError } from "axios";
import { authApi } from "../../../api/api";
import { RegisterData, User } from "../../../types/User";

export const registerThunk = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>("auth/register", async (registerData, { rejectWithValue }) => {
  try {
    const response = await authApi.post("/auth/register", registerData);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});
