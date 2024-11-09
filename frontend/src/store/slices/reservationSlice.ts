import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationResponse } from "../../types/Reservation";
import createReservationThunk from "../thunks/reservation/createReservationThunk";
import fetchReservationByYearThunk from "../thunks/reservation/fetchReservationByYearThunk";

type ReservationState = {
  reservations: ReservationResponse[];
  isLoading: boolean;
};

const initialState: ReservationState = {
  reservations: [],
  isLoading: false,
};

const ledgerSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Fetch by year
    addCase(fetchReservationByYearThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      fetchReservationByYearThunk.fulfilled,
      (state, action: PayloadAction<ReservationResponse[]>) => {
        state.isLoading = false;
        state.reservations = action.payload;
      }
    );
    addCase(fetchReservationByYearThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Create
    addCase(createReservationThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      createReservationThunk.fulfilled,
      (state, action: PayloadAction<ReservationResponse>) => {
        state.isLoading = false;
        state.reservations = [...state.reservations, action.payload];
      }
    );
    addCase(createReservationThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default ledgerSlice.reducer;
