import type { Types } from "mongoose";
import errMsg from "../utils/errorConstants";
import User from "../models/User";
import type IReservation from "../types/interfaces/IReservation";
import Reservation from "../models/Reservation";

export const createReservation = async (
  userId: Types.ObjectId | null,
  reservationData: IReservation,
) => {
  if (!userId) {
    throw new Error(errMsg.userIdNotFound);
  }

  const newReservation = new Reservation({
    ...reservationData,
    ownerId: userId,
  });

  const savedReservation = await newReservation.save();

  if (!savedReservation) {
    throw new Error(errMsg.createReservationFail);
  }

  await User.findByIdAndUpdate(
    userId,
    { $push: { reservations: newReservation._id } },
    { new: true },
  );

  return savedReservation;
};

export const getReservationsByYear = (year: string) => {
  const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
  const endOfYear = new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`);

  const reservationsByYear = Reservation.find({
    createdAt: {
      $gte: startOfYear,
      $lt: endOfYear,
    },
  });

  return reservationsByYear;
};
