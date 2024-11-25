import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError, HttpStatusCode } from "axios";
import i18n from "../../../localization/i18n";
import { LedgerRequest, LedgerResponse } from "../../../types/Ledger";

const createLedgerThunk = createAsyncThunk<
  LedgerResponse,
  LedgerRequest,
  { rejectValue: string }
>("ledger/createLedgerThunk", async (ledger, { rejectWithValue }) => {
  try {
    const response = await api.post("/ledger/create", ledger);

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
});

export default createLedgerThunk;
