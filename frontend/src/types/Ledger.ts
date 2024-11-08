import { ledgerColors } from "../utils/constants";

export enum LedgerModal {
  CREATE = "create",
}

export type BaseLedgerValues = {
  title: string;
  color: (typeof ledgerColors)[number] | "";
};

export type LedgerResponse = {
  _id: string;
  total: number;
  _createdAt: Date;
  _updatedAt: Date;
  _v: number;
} & BaseLedgerValues;

export type LedgerRequest = {
  userId: string;
} & BaseLedgerValues;
