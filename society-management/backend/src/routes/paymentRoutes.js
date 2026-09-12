
import express from "express";
import {
  createPayment,
  getPayments,
  markPaymentPaid,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getPayments);

router.post("/", createPayment);

router.put("/:id", markPaymentPaid);
router.put("/update/:id", updatePayment);
router.delete("/:id", deletePayment);

export default router;