import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import notification from "./slices/notificationSlice";
import loader from "./slices/loaderSlice";
import ledger from "./slices/ledgerSlice";
import reservation from "./slices/reservationSlice";

const rootReducer = combineReducers({
  auth,
  notification,
  loader,
  ledger,
  reservation,
});

export default rootReducer;
