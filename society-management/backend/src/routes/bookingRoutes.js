import express from "express";

import {
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
} from "../controllers/bookingController.js";

const router =
  express.Router();

router.get(
  "/",
  getBookings
);

router.post(
  "/",
  createBooking
);

router.delete(
  "/:id",
  deleteBooking
);

router.put(
  "/:id",
  updateBooking
);

export default router;