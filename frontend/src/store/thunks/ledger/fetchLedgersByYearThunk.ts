import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/api";
import { AxiosError } from "axios";
import i18n from "../../../localization/i18n";
import { LedgerResponse } from "../../../types/Ledger";

const fetchLedgersByYearThunk = createAsyncThunk<
  LedgerResponse[],
  string,
  { rejectValue: string }
>("ledger/fetchLedgersByYearThunk", async (year, { rejectWithValue }) => {
  try {
    const response = await api.get("/ledger/" + year);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data?.details.join(", "));
    }

    return rejectWithValue(i18n.t("apiErrors.unknownError"));
  }
});

export default fetchLedgersByYearThunk;
