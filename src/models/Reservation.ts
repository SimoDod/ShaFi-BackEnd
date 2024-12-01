import { Schema, model } from "mongoose";
import type IReservation from "../types/interfaces/IReservation";

const ReservationSchema = new Schema<IReservation>(
  {
    note: { type: String, required: true },
    reservationDate: [
      { type: String, required: true },
      { type: String, required: true },
    ],
    paid: { type: Number, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const Reservation = model<IReservation>("Reservations", ReservationSchema);

export default Reservation;
