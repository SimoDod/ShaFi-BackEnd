import type { Types } from "mongoose";
import errMsg from "../utils/errorConstants";
import User from "../models/User";
import type IReservation from "../types/interfaces/IReservation";
import Reservation from "../models/Reservation";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { format, parseISO } from "date-fns";
import { dateFormats } from "../utils/constants";

export const createReservation = async (
  userId: Types.ObjectId | null,
  reservationData: IReservation,
) => {
  if (!userId) {
    throw new Error(errMsg.userIdNotFound);
  }
  const { reservationDate } = reservationData;
  const [start, end] = reservationDate;
  const reservedDates = eachDayOfInterval({
    start,
    end,
  }).map((date) => format(date, dateFormats.yearFirstLine));

  const existingReservations = await Reservation.find({
    reservationDate: { $in: reservedDates },
  }).exec();

  if (existingReservations.length > 0) {
    throw new Error(errMsg.datesReserved);
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

export const getReservationsByYear = async (year: string) => {
  const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59Z`);

  const reservations = await Reservation.find({
    createdAt: {
      $gte: startOfYear,
      $lte: endOfYear,
    },
  }).exec();

  return reservations;
};

export const getAllReservedDates = async (): Promise<string[]> => {
  const reservations = await Reservation.find().exec();

  const reservedDates = reservations
    .flatMap(({ reservationDate }) => {
      const [startDate, endDate] = reservationDate;
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      return eachDayOfInterval({ start, end }).map((date) =>
        format(date, dateFormats.yearFirstLine),
      );
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  return reservedDates;
};

export const findReservationByIdAndDelete = async (id: string) => {
  const reservation = await Reservation.findByIdAndDelete(id);

  if (!reservation) {
    throw new Error(errMsg.itemNotFound);
  }

  return reservation;
};
