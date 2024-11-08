import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LedgerResponse } from "../../types/Ledger";
import createLedgerThunk from "../thunks/ledger/createLedgerThunk";

type LedgerState = {
  ledgers: LedgerResponse[];
  isLoading: boolean;
};

const initialState: LedgerState = {
  ledgers: [],
  isLoading: false,
};

const ledgerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Create
    addCase(createLedgerThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      createLedgerThunk.fulfilled,
      (state, action: PayloadAction<LedgerResponse>) => {
        state.isLoading = false;
        state.ledgers = [...state.ledgers, action.payload];
      }
    );
    addCase(createLedgerThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default ledgerSlice.reducer;
