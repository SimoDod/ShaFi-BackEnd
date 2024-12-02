import type { Document } from "mongoose";

type IUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  generateSuccessMessage(): { message: string; user: object };
} & Document;

export default IUser;
