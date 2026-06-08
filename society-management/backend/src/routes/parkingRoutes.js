import express from "express";

import {
  getParkingSlots,
  createParkingSlot
} from "../controllers/parkingController.js";

const router = express.Router();

router.get("/",getParkingSlots);

router.post("/",createParkingSlot);

export default router;