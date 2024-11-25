import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, HttpStatusCode } from "axios";
import { api } from "../../../api/api";
import i18n from "../../../localization/i18n";
import { ReservationResponse } from "../../../types/Reservation";

const deleteReservationThunk = createAsyncThunk<
  ReservationResponse,
  string,
  { rejectValue: string }
>("reservation/delete-reservation", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete("/reservation/delete-reservation/" + id);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.status === HttpStatusCode.TooManyRequests) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error.response.data?.details.join(", "));
    }

    return rejectWithValue(i18n.t("apiError.unknownError"));
  }
});

export default deleteReservationThunk;
