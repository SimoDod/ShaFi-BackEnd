import { Router } from "express";
import authController from "./controllers/authController.js";
import ledgerController from "./controllers/ledgerController.js";
import reservationController from "./controllers/reservationController.js";
import verifyToken from "./middlewares/verifyToken.js";
import delayResponse from "./middlewares/delayResponse.js";

const router = Router();
const delayResponseMs = 0;

router.use("/auth", delayResponse(delayResponseMs), authController);
router.use(
  "/ledger",
  delayResponse(delayResponseMs),
  verifyToken,
  ledgerController,
);
router.use(
  "/reservation",
  delayResponse(delayResponseMs),
  reservationController,
);

export default router;
