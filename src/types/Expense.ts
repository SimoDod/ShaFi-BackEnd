import type { Types } from "mongoose";

type Expense = {
  title: string;
  amount: number;
  _id: Types.ObjectId;
  date?: Date;
};

export default Expense;
