export enum ReservationModal {
  CREATE = "create",
}

export type BaseReservationValues = {
  note: string;
  reservationDate: [string, string];
  paid: number;
};

export type ReservationResponse = {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  _v: number;
} & BaseReservationValues;

export type ReservationRequest = {
  userId: string;
} & BaseReservationValues;

export type ReservationUpdateRequest = {
  reservationId: string;
} & ReservationRequest;