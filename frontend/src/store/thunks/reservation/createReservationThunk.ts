import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError } from "axios";
import i18n from "../../../localization/i18n";
import {
  ReservationRequest,
  ReservationResponse,
} from "../../../types/Reservation";

const createReservationThunk = createAsyncThunk<
  ReservationResponse,
  ReservationRequest,
  { rejectValue: string }
>(
  "reservation/createReservationThunk",
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await api.post("/reservation/create", reservation);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data?.details.join(", "));
      }

      return rejectWithValue(i18n.t("apiErrors.unknownError"));
    }
  }
);

export default createReservationThunk;
