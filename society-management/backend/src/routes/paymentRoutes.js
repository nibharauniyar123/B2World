
// import express from "express";
// import {
//   createPayment,
//   getPayments,
//   markPaymentPaid,
//   updatePayment,
//   deletePayment,
// } from "../controllers/paymentController.js";

// const router = express.Router();

// router.get("/", getPayments);

// router.post("/", createPayment);

// router.put("/:id", markPaymentPaid);
// router.put("/update/:id", updatePayment);
// router.delete("/:id", deletePayment);

// export default router;
import express from "express";

import {
  createPayment,
  getPayments,
  markPaymentPaid,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL PAYMENTS
router.get(
  "/",
  protect,
  getPayments
);


// CREATE PAYMENT
router.post(
  "/",
  protect,
  createPayment
);


// MARK AS PAID
router.put(
  "/:id",
  protect,
  markPaymentPaid
);


// UPDATE PAYMENT
router.put(
  "/update/:id",
  protect,
  updatePayment
);


// DELETE PAYMENT
router.delete(
  "/:id",
  protect,
  deletePayment
);


export default router;