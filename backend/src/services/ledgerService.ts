import type { Types } from "mongoose";
import Ledger from "../models/Ledger";
import type ILedger from "../types/interfaces/ILedger";
import errMsg from "../utils/errorConstants";
import User from "../models/User";

export const createLedger = async (
  userId: Types.ObjectId | null,
  ledgerData: ILedger,
) => {
  if (!userId) {
    throw new Error(errMsg.userIdNotFound);
  }

  const newLedger = new Ledger({
    ...ledgerData,
    ownerId: userId,
  });

  const savedLedger = await newLedger.save();

  if (!savedLedger) {
    throw new Error(errMsg.createLedgerFail);
  }

  await User.findByIdAndUpdate(
    userId,
    { $push: { ledgers: newLedger._id } },
    { new: true },
  );

  return savedLedger;
};

export const getLedgersByYear = (year: string) => {
  const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
  const endOfYear = new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`);

  const ledgersByYear = Ledger.find({
    createdAt: {
      $gte: startOfYear,
      $lt: endOfYear,
    },
  });

  return ledgersByYear;
};
