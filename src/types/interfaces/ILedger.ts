import type { Document, Types } from "mongoose";

type ILedger = {
  title: string;
  total: Number;
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
  expenses: Types.ObjectId[];
} & Document;

export default ILedger;
