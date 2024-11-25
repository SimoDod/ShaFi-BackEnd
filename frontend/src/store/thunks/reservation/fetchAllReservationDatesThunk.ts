import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError, HttpStatusCode } from "axios";
import i18n from "../../../localization/i18n";

const fetchAllReservationDatesThunk = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>(
  "reservation/fetchAllReservationDatesThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/reservation/all-reserved-dates");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.status === HttpStatusCode.TooManyRequests) {
          return rejectWithValue(error.response?.data);
        }
        return rejectWithValue(error.response.data?.details.join(", "));
      }

      return rejectWithValue(i18n.t("apiErrors.unknownError"));
    }
  }
);

export default fetchAllReservationDatesThunk;
