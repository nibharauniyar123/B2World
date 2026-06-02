import express from "express";

import {
  createMaintenance,
  getMaintenanceBills,
  markPaid,
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", createMaintenance);

router.get("/", getMaintenanceBills);

router.put("/:id", markPaid);

export default router;