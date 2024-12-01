import type { Document, Types } from "mongoose";

type IUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  ledgers: Types.ObjectId[];
  reservations: Types.ObjectId[];
  generateSuccessMessage(): { message: string; user: object };
} & Document;

export default IUser;
