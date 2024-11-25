import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationResponse } from "../../types/Reservation";
import createReservationThunk from "../thunks/reservation/createReservationThunk";
import fetchReservationByYearThunk from "../thunks/reservation/fetchReservationByYearThunk";
import fetchAllReservationDatesThunk from "../thunks/reservation/fetchAllReservationDatesThunk";
import deleteReservationThunk from "../thunks/reservation/deleteReservationThunk";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { dateFormats } from "../../utils/date/formatDateToString";
import { format } from "date-fns/format";
import updateReservationThunk from "../thunks/reservation/updateReservationThunk";

type ReservationState = {
  reservations: ReservationResponse[];
  reservedDates: string[];
  reservedDatesWithExclusion: string[];
  isLoading: boolean;
};

const initialState: ReservationState = {
  reservations: [],
  reservedDates: [],
  reservedDatesWithExclusion: [],
  isLoading: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    getReservationByIdAndExcludeReservedDates: (
      state,
      action: PayloadAction<string>
    ) => {
      const reservationId = action.payload;
      const reservation = state.reservations.find(
        (res) => res._id === reservationId
      );

      if (reservation) {
        const [start, end] = reservation.reservationDate;

        const datesToExclude = eachDayOfInterval({ start, end }).map((date) =>
          format(date, dateFormats.yearFirstLine)
        );

        state.reservedDatesWithExclusion = state.reservedDates.filter(
          (reservedDate) =>
            !datesToExclude.some((date) => reservedDate === date)
        );
      }
    },
  },
  extraReducers: ({ addCase }) => {
    // Fetch all reserved dates
    addCase(fetchAllReservationDatesThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      fetchAllReservationDatesThunk.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.isLoading = false;
        state.reservedDates = action.payload;
      }
    );
    addCase(fetchAllReservationDatesThunk.rejected, (state) => {
      state.isLoading = false;
    });

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

    // Update
    addCase(updateReservationThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      updateReservationThunk.fulfilled,
      (state, action: PayloadAction<ReservationResponse>) => {
        state.isLoading = false;
        const reservationIndex = state.reservations.findIndex(
          ({ _id }) => action.payload._id === _id
        );

        state.reservations[reservationIndex] = action.payload;
      }
    );
    addCase(updateReservationThunk.rejected, (state) => {
      state.isLoading = false;
    });

    // Delete
    addCase(deleteReservationThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(
      deleteReservationThunk.fulfilled,
      (state, action: PayloadAction<ReservationResponse>) => {
        state.isLoading = false;
        state.reservations = state.reservations.filter(
          ({ _id }) => action.payload._id !== _id
        );
      }
    );
    addCase(deleteReservationThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { getReservationByIdAndExcludeReservedDates } =
  reservationSlice.actions;
export default reservationSlice.reducer;
