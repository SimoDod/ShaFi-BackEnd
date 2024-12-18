import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import errMsg from "../utils/errorConstants.js";
import type { MongoError } from "../types/MongoError.js";

const errorHandler = (
  err: MongoError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Duplicate key error (MongoDB code 11000)
  if (err.code === 11000 && err.keyValue) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json([`${errMsg.duplicateValue} ${field} `]);
  }

  // Validation error (Mongoose validation)
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(
      ({ message }: { message: string }) => message,
    );

    return res.status(400).json(messages);
  }

  // Invalid credentials
  if (err.message === errMsg.invalidCredentials) {
    return res.status(401).json([errMsg.invalidCredentials]);
  }

  if (err.message === errMsg.datesReserved) {
    return res.status(400).json([errMsg.datesReserved]);
  }

  // Too many requests
  if (err.message === errMsg.tooManyRequests) {
    return res.status(429).json([errMsg.tooManyRequests]);
  }

  // Default to 500 server error
  return res.status(500).json([err.message || errMsg.internalError]);
};

export default errorHandler;
