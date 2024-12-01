const errMsg = {
  invalidCredentials: "Invalid credentials",
  createSuccess: "User created successfully",
  mustBeUnique: "Must be unique",
  validationError: "Validation error",
  somethingWrong: "Something went wrong",
  internalError: "Internal Server Error",
  mongoUriNotDefined:
    "MONGODB_URI is not defined in the environment variables.",
  failAcquireToken: "Failed to acquire jwt token",
  invalidToken: "Invalid token",
  missingToken: "Missing token",
  userNotFound: "User not found",
  userIdNotFound: "User ID not found in the request",
  duplicate: "Duplicate",
  createLedgerFail: "Failed to create new ledger.",
  createReservationFail: "Failed to create new reservation.",
  updateItemFail: "Failed to update the item.",
  duplicateValue: "Duplicate value",
  datesReserved: "Some of these dates are already reserved.",
  itemNotFound: "Item not found.",
  tooManyRequests: "Too many requests from this IP, please try again later.",
} as const;

export default errMsg;
