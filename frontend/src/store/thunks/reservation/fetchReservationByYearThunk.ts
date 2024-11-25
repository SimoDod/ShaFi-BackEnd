import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError, HttpStatusCode } from "axios";
import i18n from "../../../localization/i18n";
import { ReservationResponse } from "../../../types/Reservation";

const fetchReservationByYearThunk = createAsyncThunk<
  ReservationResponse[],
  string,
  { rejectValue: string }
>(
  "reservation/fetchReservationByYearThunk",
  async (year, { rejectWithValue }) => {
    try {
      const response = await api.get("/reservation/" + year);

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

export default fetchReservationByYearThunk;
