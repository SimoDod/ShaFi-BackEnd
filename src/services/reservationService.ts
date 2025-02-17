import type { Types } from "mongoose";
import errMsg from "../utils/errorConstants.js";
import User from "../models/User.js";
import type IReservation from "../types/interfaces/IReservation.js";
import Reservation from "../models/Reservation.js";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { format, parseISO } from "date-fns";
import { dateFormats } from "../utils/constants.js";

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
  const startOfYear = `${year}-0-01`;
  const endOfYear = `${year}-11-30`;

  const reservations = await Reservation.find({
    "reservationDate.0": {
      $gte: startOfYear,
      $lte: endOfYear,
    },
  }).exec();

  return reservations;
};

export const updateReservation = async (
  userId: Types.ObjectId | null,
  reservationId: string,
  updatedReservationData: Partial<IReservation>,
) => {
  if (!userId) {
    throw new Error(errMsg.userIdNotFound);
  }

  const existingReservation = await Reservation.findOne({
    _id: reservationId,
    ownerId: userId,
  });

  if (!existingReservation) {
    throw new Error(errMsg.itemNotFound);
  }

  if (updatedReservationData.reservationDate) {
    const { reservationDate } = updatedReservationData;
    const [start, end] = reservationDate;
    const reservedDates = eachDayOfInterval({
      start,
      end,
    }).map((date) => format(date, dateFormats.yearFirstLine));

    const overlappingReservations = await Reservation.find({
      _id: { $ne: reservationId },
      reservationDate: { $in: reservedDates },
    }).exec();

    if (overlappingReservations.length > 0) {
      throw new Error(errMsg.datesReserved);
    }
  }

  const updatedReservation = await Reservation.findByIdAndUpdate(
    reservationId,
    updatedReservationData,
    { new: true },
  );

  if (!updatedReservation) {
    throw new Error(errMsg.updateItemFail);
  }

  return updatedReservation;
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
