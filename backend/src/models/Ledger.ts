import { Schema, model } from "mongoose";
import type ILedger from "../types/interfaces/ILedger";

const LedgerSchema = new Schema<ILedger>(
  {
    title: { type: String, required: true },
    total: { type: Number, required: true, default: 0 },
    color: { type: String, default: "default" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
  },
  { timestamps: true },
);

const Ledger = model<ILedger>("Ledgers", LedgerSchema);

export default Ledger;
