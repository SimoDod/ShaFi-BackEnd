import type { Request } from "express";

export type AuthenticatedRequest<T = unknown> = {
  user?: string;
  body: T;
} & Request;
