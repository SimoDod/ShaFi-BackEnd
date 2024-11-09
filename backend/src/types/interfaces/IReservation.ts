import type { Document, Types } from "mongoose";

type IReservation = {
  note: string;
  reservationStart: string;
  reservationEnd: string;
  paid: number;
  ownerId: Types.ObjectId;
} & Document;

export default IReservation;
