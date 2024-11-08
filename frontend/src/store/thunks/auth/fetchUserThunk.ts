import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../types/User";
import { api } from "../../../api/api";
import { AxiosError } from "axios";
import i18n from "../../../localization/i18n";

export const fetchUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserThunk", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/auth/me");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data?.message);
    }

    return rejectWithValue(i18n.t("apiErrors.unknownError"));
  }
});
