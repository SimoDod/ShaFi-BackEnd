import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError, HttpStatusCode } from "axios";
import i18n from "../../../localization/i18n";
import {
  ReservationResponse,
  ReservationUpdateRequest,
} from "../../../types/Reservation";

const updateReservationThunk = createAsyncThunk<
  ReservationResponse,
  ReservationUpdateRequest,
  { rejectValue: string }
>(
  "reservation/updateReservationThunk",
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/reservation/${reservation.reservationId}`,
        reservation
      );

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

export default updateReservationThunk;
