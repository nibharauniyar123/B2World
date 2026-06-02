
import express from "express";
import {
  createPayment,
  getPayments,
  markPaymentPaid,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getPayments);

router.post("/", createPayment);

router.put("/:id", markPaymentPaid);

export default router;