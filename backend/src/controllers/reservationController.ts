import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import { Types } from "mongoose";
import type IReservation from "../types/interfaces/IReservation";
import {
  createReservation,
  getReservationsByYear,
} from "../services/reservationService";

const router = express.Router();

router.get(
  "/:year",
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

export default router;
