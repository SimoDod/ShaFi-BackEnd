import type { Types } from "mongoose";
import Ledger from "../models/Ledger";
import type ILedger from "../types/interfaces/ILedger";
import errMsg from "../utils/errorConstants";
import User from "../models/User";
import type Expense from "../types/Expense";

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

export const findLedgerByIdAndDelete = async (id: string) => {
  const ledger = await Ledger.findByIdAndDelete(id);

  if (!ledger) {
    throw new Error(errMsg.itemNotFound);
  }

  return ledger;
};

export const addNewExpense = async (
  ledgerId: string,
  userId: Types.ObjectId | null,
  newExpense: Expense,
) => {
  if (!userId) {
    throw new Error(errMsg.userNotFound);
  }

  const ledger = await Ledger.findOne({ _id: ledgerId, ownerId: userId });

  if (!ledger) {
    throw new Error(errMsg.createLedgerFail);
  }

  ledger.expenses.push(newExpense);

  const updatedLedger = await ledger.save();

  return updatedLedger;
};

export const deleteExpense = async (ledgerId: string, expenseId: string) => {
  const ledger = await Ledger.findOne({ _id: ledgerId });

  if (!ledger) {
    throw new Error(errMsg.itemNotFound);
  }

  const expenseIndex = ledger.expenses.findIndex(
    (expense) => expense._id.toString() === expenseId,
  );

  if (expenseIndex === -1) {
    throw new Error(errMsg.itemNotFound);
  }

  ledger.expenses.splice(expenseIndex, 1);

  await ledger.save();

  return ledger;
};
