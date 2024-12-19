import type { Request, Response, NextFunction } from "express";
import express from "express";
import { loginUser, findUserById } from "../services/authService.js";
import type { AuthenticatedRequest } from "../types/Authentication.js";
import errMsg from "../utils/errorConstants.js";
import verifyToken from "../middlewares/verifyToken.js";
import Ledger from "../models/Ledger.js";
import Reservation from "../models/Reservation.js";

const router = express.Router();

// router.post(
//   "/register",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { username, email, password } = req.body;
//       const result = await registerUser(username, email, password);

//       return res.status(201).json(result);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/me",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user;

      if (!userId) {
        return res.status(400).json({ message: errMsg.userIdNotFound });
      }

      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: errMsg.userNotFound });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/total-balance",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ledgers = await Ledger.find();
      const totalLedgerBalance = ledgers.reduce(
        (sum, ledger) => sum + ledger.total,
        0,
      );
      
      const reservations = await Reservation.find();
      const totalPaidReservations = reservations.reduce(
        (sum, reservation) => sum + reservation.paid,
        0,
      );

      const totalBalance = totalPaidReservations - totalLedgerBalance;

      return res.status(200).json({
        totalLedgerBalance,
        totalPaidReservations,
        totalBalance,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
