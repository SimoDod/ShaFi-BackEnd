import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import type ILedger from "../types/interfaces/ILedger";
import {
  createLedger,
  addNewExpense,
  findLedgerByIdAndDelete,
  getLedgersByYear,
  deleteExpense,
} from "../services/ledgerService";
import { Types } from "mongoose";

const router = express.Router();

router.get(
  "/:year",
  async (
    req: AuthenticatedRequest,
    res: Response<ILedger[]>,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.params;
      const ledgersByYear = await getLedgersByYear(year);

      return res.status(200).json(ledgersByYear);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create",
  async (
    req: AuthenticatedRequest,
    res: Response<ILedger>,
    next: NextFunction,
  ) => {
    try {
      const ledgerData: ILedger = req.body;
      const userId = req.user ? new Types.ObjectId(req.user) : null;
      const ledger = await createLedger(userId, ledgerData);

      return res.status(201).json(ledger);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/add-expense/:ledgerId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { ledgerId } = req.params;
      const ledger = req.body;
      const userId = req.user ? new Types.ObjectId(req.user) : null;
      const updatedLedger = await addNewExpense(ledgerId, userId, ledger);

      return res.status(200).json(updatedLedger);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-expense/:ledgerId/:expenseId",
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { ledgerId, expenseId } = req.params;
      const updatedLedger = await deleteExpense(ledgerId, expenseId);

      return res.status(200).json(updatedLedger);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete-ledger/:ledgerId",
  async (
    req: AuthenticatedRequest,
    res: Response<ILedger>,
    next: NextFunction,
  ) => {
    try {
      const ledgerId = req.params.ledgerId;
      const ledger = await findLedgerByIdAndDelete(ledgerId);

      return res.status(201).json(ledger);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
