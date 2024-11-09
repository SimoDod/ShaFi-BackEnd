import type { Response, NextFunction } from "express";
import express from "express";
import type { AuthenticatedRequest } from "../types/Authentication";
import type ILedger from "../types/interfaces/ILedger";
import { createLedger, getLedgersByYear } from "../services/ledgerService";
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

export default router;
