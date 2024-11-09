import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserThunk } from "../thunks/auth/fetchUserThunk";
import { loginThunk } from "../thunks/auth/loginThunk";
import { registerThunk } from "../thunks/auth/registerThunk";
import createLedgerThunk from "../thunks/ledger/createLedgerThunk";
import createReservationThunk from "../thunks/reservation/createReservationThunk";
import fetchReservationByYearThunk from "../thunks/reservation/fetchReservationByYearThunk";
import fetchLedgersByYearThunk from "../thunks/ledger/fetchLedgersByYearThunk";

type NotificationState = {
  message: string;
};

const initialState: NotificationState = {
  message: "",
};

//TODO translate

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = "";
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      isAnyOf(
        fetchUserThunk.rejected,
        loginThunk.rejected,
        registerThunk.rejected,
        createLedgerThunk.rejected,
        createReservationThunk.rejected,
        fetchLedgersByYearThunk.rejected,
        fetchReservationByYearThunk.rejected
      ),
      (state, action) => {
        state.message = action.payload || "An unknown error occurred";
      }
    );
  },
});

export const { clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
