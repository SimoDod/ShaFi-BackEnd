import { Schema, model } from "mongoose";
import errMsg from "../utils/errorConstants.js";
import type IUser from "../types/interfaces/IUser.js";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

UserSchema.methods.generateSuccessMessage = function () {
  return {
    message: errMsg.createSuccess,
    user: {
      id: this._id,
      name: this.name,
      email: this.email,
    },
  };
};

const User = model<IUser>("Users", UserSchema);

export default User;
