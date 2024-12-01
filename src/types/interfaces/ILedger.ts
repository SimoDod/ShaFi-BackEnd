import type { Document, Types } from "mongoose";
import type Expense from "../Expense";

type ILedger = Document & {
  title: string;
  total: number;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "info"
    | "error";
  ownerId: Types.ObjectId;
  expenses: Expense[];
};

export default ILedger;
