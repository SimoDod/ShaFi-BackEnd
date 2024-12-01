import type { Document, ObjectId } from "mongoose";

type IReservation = {
  note: string;
  reservationDate: [string, string];
  paid: number;
  ownerId: ObjectId;
} & Document;

export default IReservation;
