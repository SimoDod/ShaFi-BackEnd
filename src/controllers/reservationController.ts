import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import { Types } from "mongoose";
import type IReservation from "../types/interfaces/IReservation";
import {
  createReservation,
  findReservationByIdAndDelete,
  getAllReservedDates,
  getReservationsByYear,
  updateReservation,
} from "../services/reservationService";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get(
  "/all-reserved-dates",
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const reservedDates = await getAllReservedDates();

      return res.status(200).json(reservedDates);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:year",
  verifyToken,
  async (
    req: AuthenticatedRequest,
    res: Response<IReservation[]>,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.params;
      const reservationsByYear = await getReservationsByYear(year);

      return res.status(200).json(reservationsByYear);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create",
  verifyToken,
  async (
    req: AuthenticatedRequest,
    res: Response<IReservation>,
    next: NextFunction,
  ) => {
    try {
      const reservationData: IReservation = req.body;
      const userId = req.user ? new Types.ObjectId(req.user) : null;
      const reservation = await createReservation(userId, reservationData);

      return res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:reservationId",
  verifyToken,
  async (
    req: AuthenticatedRequest,
    res: Response<IReservation>,
    next: NextFunction,
  ) => {    
    try {
      const { reservationId } = req.params;
      const userId = req.user ? new Types.ObjectId(req.user) : null;
      const updatedReservationData: Partial<IReservation> = req.body;

      const updatedReservation = await updateReservation(
        userId,
        reservationId,
        updatedReservationData,
      );

      return res.status(201).json(updatedReservation);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-reservation/:id",
  verifyToken,
  async (
    req: AuthenticatedRequest,
    res: Response<IReservation>,
    next: NextFunction,
  ) => {
    try {
      const reservationId = req.params.id;
      const reservation = await findReservationByIdAndDelete(reservationId);

      return res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
