import type { Document, Types } from "mongoose";

type IReservation = {
  note: string;
  reservationDate: [string, string];
  paid: number;
  ownerId: Types.ObjectId;
} & Document;

export default IReservation;
