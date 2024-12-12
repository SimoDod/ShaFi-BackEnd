import { Schema, model } from "mongoose";
import type ILedger from "../types/interfaces/ILedger";

const LedgerSchema = new Schema<ILedger>(
  {
    title: { type: String, required: true },
    color: { type: String, default: "default" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expenses: [
      {
        title: { type: String, default: "" },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

LedgerSchema.virtual("total").get(function () {
  return this.expenses.reduce((sum, { amount }) => sum + amount, 0);
});

const Ledger = model<ILedger>("Ledgers", LedgerSchema);

export default Ledger;