import type { Document, ObjectId } from "mongoose";

type IUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  ledgers: ObjectId[];
  reservations: ObjectId[];
  generateSuccessMessage(): { message: string; user: object };
} & Document;

export default IUser;
